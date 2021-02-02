<template>
  <v-container>
    <v-row class="pa-15">
      <v-col cols="12" md="6">
        <v-breadcrumbs
          :items="breadcrumbs"
          large
        ></v-breadcrumbs>
        <!-- <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  收藏戲院
                </th>
                <th class="text-center">
                  操作
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(collect, idx) in userCollect"
                :key="idx"
              >
                <td>{{collect.title}}</td>
                <td class="text-center">
                  <v-btn icon @click="openEdit(collect)">
                    <v-icon
                      small
                    >
                      mdi-book-open-variant
                    </v-icon>
                    </v-btn>
                    <v-btn icon @click="deleteCollect(collect, idx)">
                    <v-icon
                      small
                    >
                      mdi-trash-can
                    </v-icon>
                    </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table> -->
        <v-data-table
            :headers="headers"
            :items="userCollect"
            :items-per-page="5"
          >
          <!-- 打開的編輯框 -->
            <template v-slot:top>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogOpen" max-width="40%" >
                <v-card class="amber lighten-5 pa-5">
                  <v-card-title class="display-1 pa-12 text-center d-flex flex-column justify-center align-center">{{ dialogItem.title }}</v-card-title>
                  <v-card-text class="d-flex flex-column">
                    <div class="text-h4">
                      <h5 class="mb-6">基本資料</h5>
                      <p class="text-body-1">所在地：{{ dialogItem.p_id ? dialogItem.p_id.location.toString() : '' }}</p>
                      <p class="text-body-1">定位精度：{{ dialogItem.p_id ? dialogItem.p_id.precision : '' }}</p>
                      <p class="text-body-1">營運日期（起）：{{ dialogItem.p_id ? dialogItem.p_id.datestart : ''}}</p>
                      <p class="text-body-1">營運日期（迄）：{{ dialogItem.p_id ? dialogItem.p_id.dateend : ''}}</p>
                      <p class="text-body-1">可考之營運年代：{{ dialogItem.p_id ? dialogItem.p_id.dateback : ''}}</p>
                    </div>
                    <div class="text-h4">
                      <h5 class="mb-6">戲院建築</h5>
                      <p class="text-body-1">建物描述：{{ dialogItem.p_id ? dialogItem.p_id.description : ''}}</p>
                      <p class="text-body-1">建物現況：{{ dialogItem.p_id ? dialogItem.p_id.state : ''}}</p>
                    </div>
                    <div class="text-h4">
                      <h5 class="mb-6">資料來源</h5>
                      <p class="text-body-1">{{ dialogItem.p_id ? dialogItem.p_id.source.toString() : ''}}</p>
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="brown darken-1" outlined text @click="closeDialog">關閉視窗</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
          </template>
          <!-- 編輯刪除的按鈕 -->
            <template v-slot:item.actions="{ item, index }">
              <v-btn icon @click="openItem (item)">
                <v-icon
                  small
                >
                  mdi-book-open-variant
                </v-icon>
              </v-btn>
              <v-btn icon @click="deleteCollect(item, index)">
                <v-icon
                  small
                >
                  mdi-trash-can
                </v-icon>
              </v-btn>
            </template>
          </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      breadcrumbs: [
        {
          text: '我的收藏',
          disabled: true,
          href: 'breadcrumbs_dashboard'
        }
      ],
      headers: [
        {
          text: '收藏戲院',
          align: 'start',
          sortable: false,
          value: 'title'
        },
        {
          text: '操作',
          align: 'center',
          sortable: false,
          value: 'actions'
        }
      ],
      // dialog: false,
      dialogOpen: false,
      // 給dialog內容用
      dialogItem: {},
      // 會員收藏
      userCollect: [],
      collect: []
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    openItem (item) {
      this.dialogItem = item
      console.log(this.dialogItem)
      this.dialogOpen = true
    },
    closeDialog () {
      this.dialogOpen = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    deleteCollect (item) {
      console.log(item)
      const idx = this.userCollect.findIndex(collect => collect._id === item._id)
      if (this.dialogItem) {
        this.axios.patch(process.env.VUE_APP_API + '/users/' + this.user.id + '/collection', { p_id: item.p_id._id })
          .then(res => {
            if (res.data.success) {
              this.$swal({
                icon: 'success',
                title: '刪除成功',
                text: res.data.message
              })
              this.userCollect.splice(idx, 1)
            } else {
              this.$swal({
                icon: 'error',
                title: '錯誤',
                text: res.data.message
              })
            }
          })
      }
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/users/' + this.user.id + '/collection')
      .then(res => {
        if (res.data.success) {
          this.userCollect = res.data.result[0].collections.map(collect => {
            collect.title = collect.p_id.name
            return collect
          })
        } else {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: res.data.message
          })
        }
      })
  }
}
</script>
