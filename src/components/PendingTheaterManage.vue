<template>
  <v-container>
    <v-row class="pa-15">
      <v-col cols="12" md="6">
        <v-breadcrumbs
          :items="breadcrumbs"
          large
        ></v-breadcrumbs>
        <v-divider></v-divider>
        <v-data-table
        :headers="headers"
        :items="pendingItems"
        style="color:black"
        >
        <template v-slot:top>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialogOpen" max-width="40%" cols="12" scrollable>
              <v-card class="amber lighten-5 pa-10">
                <v-card-title class="display-2 text-center d-flex flex-column justify-center align-center"></v-card-title>
                <v-card-text class="d-flex flex-column">
                  <div class="text-h4">
                    <h5 class="mb-6 ">填表人基本資料</h5>
                    <p class="text-body-1 ">填表人姓名：{{ dialogItem.provider }}</p>
                    <p class="text-body-1 ">填表人信箱：{{ dialogItem.email }}</p>
                  </div>
                  <div class="text-h4 ">
                    <h5 class="mb-6">戲院基本資料</h5>
                    <p class="text-body-1 ">戲院名稱：{{ dialogItem.name }}</p>
                    <p class="text-body-1 ">所在地：{{ dialogItem.location }}</p>
                    <p class="text-body-1 ">定位精度：{{ dialogItem.precision }}</p>
                    <p class="text-body-1">營運日期（起）：{{ dialogItem.datestart }}</p>
                    <p class="text-body-1">營運日期（迄）：{{ dialogItem.dateend }}</p>
                    <p class="text-body-1">可考之營運年代：{{ dialogItem.dateback }}</p>
                  </div>
                  <div class="text-h4 ">
                    <h5 class="mb-6 ">戲院建築</h5>
                    <p class="text-body-1 ">建物描述：{{ dialogItem.description }}</p>
                    <p class="text-body-1 ">建物現況：{{ dialogItem.state }}</p>
                  </div>
                  <div class="text-h4">
                    <h5 class="mb-6 ">資料來源</h5>
                    <p class="text-body-1 ">{{ dialogItem.source }}</p>
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
        <template v-slot:item.actions="{ item, index }" >
          <v-btn icon @click="openItem(item)">
            <v-icon>mdi-pencil-box-multiple-outline</v-icon>
          </v-btn>
          <v-btn icon @click="submitPending(item)">
            <v-icon>mdi-progress-check</v-icon>
          </v-btn>
            <v-btn icon @click="deletePending(item, index)">
              <v-icon>mdi-trash-can</v-icon>
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
      // 麵包屑標題
      breadcrumbs: [
        {
          text: '戲院資料管理',
          disabled: true,
          href: 'breadcrumbs_dashboard'
        },
        {
          text: '待審核',
          disabled: false,
          href: '/#/PendingtheaterManage'
        }
      ],
      headers: [
        {
          text: '戲院名稱',
          sortable: false,
          value: 'name'
        },
        {
          text: '審核　送出　刪除',
          align: 'center',
          sortable: false,
          value: 'actions'
        }
      ],
      dialogOpen: false,
      // 給dialog內容用
      dialogItem: {},
      pendings: []
    }
  },
  computed: {
    manager () {
      return this.$store.state.manager
    },
    pendingItems () {
      return this.pendings
    }
  },
  methods: {
    openItem (item) {
      this.dialogItem = item
      this.dialogOpen = true
    },
    closeDialog () {
      this.dialogOpen = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    submitPending (item) {
      this.axios.post(process.env.VUE_APP_API + '/theaters/' + item._id)
        .then(res => {
          if (res.data.success) {
            this.$swal({
              icon: 'success',
              title: '送出成功',
              text: res.data.message
            })
          } else {
            this.$swal({
              icon: 'error',
              title: '錯誤',
              text: res.data.message
            })
          }
        })
        .catch(err => {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: err.response.data.message
          })
        })
    },
    deletePending (item, index) {
      console.log(item)
      console.log(index)
      this.axios.delete(process.env.VUE_APP_API + '/pendings/' + item._id + '/delete')
        .then(res => {
          if (res.data.success) {
            this.pendings.splice(index, 1)
          } else {
            this.$swal({
              icon: 'error',
              title: '錯誤',
              text: res.data.message
            })
          }
        })
        .catch(err => {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: err.response.data.message
          })
        })
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/pendings/')
      .then(res => {
        if (res.data.success) {
          this.pendings = res.data.result
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
