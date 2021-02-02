<template>
  <v-container>
    <v-row class="pa-15">
      <v-col cols="12" md="8">
        <v-breadcrumbs
          :items="breadcrumbs"
          large
        ></v-breadcrumbs>
        <v-card>
          <v-card-title>
            <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="theaterItems"
            :items-per-page="5"
            :search="search"
          >
          <!-- 打開的編輯框 -->
            <template v-slot:top>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogOpen" max-width="40%">
                <v-card class="amber lighten-5 pa-10">
                  <v-card-title class="display-2 pa-12 text-center d-flex flex-column justify-center align-center">{{ dialogItem.name }}</v-card-title>
                  <v-card-text class="d-flex flex-column">
                    <div class="text-h4">
                      <h5 class="mb-6">基本資料</h5>
                      <p class="text-body-1">所在地：{{ dialogItem.location ? dialogItem.location.toString() : '' }}</p>
                      <p class="text-body-1">定位精度：{{ dialogItem.precision }}</p>
                      <p class="text-body-1">營運日期（起）：{{ dialogItem.datestart }}</p>
                      <p class="text-body-1">營運日期（迄）：{{ dialogItem.dateend }}</p>
                      <p class="text-body-1">可考之營運年代：{{ dialogItem.dateback }}</p>
                    </div>
                    <div class="text-h4">
                      <h5 class="mb-6 ">戲院建築</h5>
                      <p class="text-body-1 ">建物描述：{{ dialogItem.description }}</p>
                      <p class="text-body-1 ">建物現況：{{ dialogItem.state }}</p>
                    </div>
                    <div class="text-h4">
                      <h5 class="mb-6 ">資料來源</h5>
                      <p class="text-body-1 ">{{ dialogItem.source ? dialogItem.source.toString() : '' }}</p>
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="brown darken-1" text @click="closeDialog">關閉視窗</v-btn>
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
              <v-btn icon @click="deleteTheaterItem(item, index)">
                <v-icon
                  small
                >
                  mdi-trash-can
                </v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
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
          text: '全部戲院',
          disabled: false,
          href: '/#/AlltheaterManage'
        }
      ],
      // datatable小標
      search: '',
      headers: [
        {
          text: '戲院名稱',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        {
          text: '操作',
          align: 'center',
          sortable: false,
          value: 'actions'
        }
      ],
      // 戲院資料
      theaters: [],
      // dialog: false,
      dialogOpen: false,
      // 給dialog內容用
      dialogItem: {}
    }
  },
  computed: {
    manager () {
      return this.$store.state.manager
    },
    theaterItems () {
      return this.theaters
    }
  },
  methods: {
    openItem (item) {
      if (this.dialogItem) {
        this.dialogItem = item
        this.dialogOpen = true
      }
    },
    closeDialog () {
      this.dialogOpen = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    deleteTheaterItem (item, index) {
      console.log(index)
      this.axios.delete(process.env.VUE_APP_API + '/theaters/' + item._id)
        .then(res => {
          if (res.data.success) {
            this.theaters.splice(index, 1)
          } else {
            this.$swal({
              icon: 'error',
              title: '錯誤',
              text: res.data.message
            })
          }
        })
    }
  },
  watch: {
    dialogOpen (val) {
      val || this.closeDialog()
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/theaters/')
      .then(res => {
        if (res.data.success) {
          this.theaters = res.data.result
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
