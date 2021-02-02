<template>
  <v-container id="mapsearch" height="100vh" class="pa-10" fluid>
    <h1 class="text-center" cols="12">找老戲院</h1>
    <v-row class="ma-10 flex-column align-center justify-center">
      <v-col cols="12" md="7">
        <div class="text-body-1 mb-10 text--secondary text-justify">
        根據現存日治時期警察統計資料，自1912年始有紀錄開始，直到戰爭期戲劇統制前夕的1939年為止，以每五年為級距製表觀察臺灣戲院數量的變化，發現全島戲院急劇成長期落在1920年代的十年間。若不計入資料不完整的專門電影院，在1921-1932十二年間，全島戲院從22間增加到95間，成長4.3倍。再以第一波戲院興建熱結束的1916年與中日事變前夕的1936年的數值進行比較，則全島戲院從16間增加到104間，二十年間成長6.5倍，儘管期間臺灣經濟幾度衰退，戲院產業仍然蓬勃發展。
        </div>
      </v-col>
      <v-col cols="12" md="7" class="d-flex align-center justify-center">
        <apexchart id="apexchartcenter" width="700" type="line" :options="chartOptions" :series="series"></apexchart>
      </v-col>
    </v-row>

<v-divider class="my-15"></v-divider>
<!-- 地圖搜尋區 -->
    <v-row class="pa-3 ma-15 justify-space-around align-center" height="100%">
      <v-col id="map" cols="12" md="4" lg="4" class="ma-4">
        <div class="text-body-2 mb-10 text-left text--secondary text-justify" cols="12">
          台灣日治時期的行政區劃，指台灣於1895年至1945年間的地方行政區劃，從最初的三縣一廳到最後的五州三廳，共經歷十次的更動，大致可分為縣治時期、廳制時期和州制時期。其中尤其以1920年後州廳制持續的時間最長，亦超過日治時期一半的時間，在相當程度上影響了戰後國民政府在台灣的行政區劃。（維基百科）
        </div>
          <p class="text-subtitle-1">年代篩選</p>
      <v-btn-toggle v-model="years" :items="yearitems" class="text-center justify-space-around mb-10">
            <v-btn value="1895-1909" outlined cols="12">
              縣制時期
              <br>
              （1895-1909）
            </v-btn>

            <v-btn value="1910-1919" outlined cols="12">
              廳制時期
              <br>
              （1910-1919）
            </v-btn>

            <v-btn value="1920-1945" outlined cols="12">
              州制時期
              <br>
              （1920-1945）
            </v-btn>
            <v-btn value="?" outlined cols="12">
              未知年份
              <br>
              ?
            </v-btn>
      </v-btn-toggle>
        <br>
        <div class="ma-5">
          <v-chip v-model="this.city"
          class="ma-auto pa-3"
          color="secondary"
          outlined
          large
          v-if="years === '1895-1909' || years === '1910-1919' || years === '1920-1945'"
          >
          <v-icon>mdi-source-commit-start-next-local</v-icon>
          {{this.city}}</v-chip>
        </div>
          <!-- <v-select
            v-model="years"
            :items="yearitems"
            label="年代篩選"
            solo
            floating
            cols="6"
            background-color="primary"
          ></v-select> -->
          <div v-if="years === '1895-1909'"><MapSVG class="mx-auto my-0" @click="clickmap"></MapSVG></div>
          <div v-else-if="years === '1910-1919'"><MapSVG2 class="mx-auto my-0" @click="clickmap"></MapSVG2></div>
          <div v-else-if="years === '1920-1945'"><MapSVG3 class="mx-auto my-0" @click="clickmap"></MapSVG3></div>
          <div v-else></div>
      </v-col>
      <v-col id="pagination" cols="12" md="6" lg="5">
        <v-card>
        <v-card-title class="accent" style="color:white">
          戲院一覽表
          <v-spacer></v-spacer>
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
        :items="tableitems"
        :items-per-page="5"
        :search="search"
        style="color:black"
        >
        <template v-slot:top>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialogOpen" max-width="40%" cols="12" scrollable>
              <v-card class="amber lighten-5 pa-5">
                <v-card-title class="display-1 pa-12 text-center d-flex flex-column justify-center align-center">{{ dialogItem.name }}</v-card-title>
                <v-card-text class="d-flex flex-column">
                  <div class="text-h4">
                    <h5 class="mb-6 ">基本資料</h5>
                    <p class="text-body-1 ">所在地：{{ dialogItem.location ? dialogItem.location.toString() : '' }}</p>
                    <p class="text-body-1 ">定位精度：{{ dialogItem.precision }}</p>
                    <p class="text-body-1 ">營運日期（起）：{{ dialogItem.datestart }}</p>
                    <p class="text-body-1 ">營運日期（迄）：{{ dialogItem.dateend }}</p>
                    <p class="text-body-1 ">可考之營運年代：{{ dialogItem.dateback }}</p>
                  </div>
                  <div class="text-h4">
                    <h5 class="mb-6">戲院建築</h5>
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
                  <v-btn color="brown darken-1" outlined text @click="closeDialog">關閉視窗</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
        </template>
        <template v-slot:item.details="{ item }">
          <v-btn icon>
            <v-icon
              small
              @click="openItem(item)"
            >
              mdi-book-open-variant
            </v-icon>
          </v-btn>
        </template>
        <template v-slot:item.collections="{ item }" v-if="user.id.length > 0">
          <v-btn icon>
            <v-icon
              small
              @click="addCollection(item)"
            >
            <!-- mdi-bookmark-outline -->
            <!-- some() 方法會透過給定函式、測試陣列中是否至少有一個元素，通過該函式所實作的測試。這方法回傳的是布林值。 -->
            {{ userCollect[0].collections.some(collect => collect.p_id === item._id) ? 'mdi-bookmark' : 'mdi-bookmark-outline' }}
            </v-icon>
          </v-btn>
        </template>
        </v-data-table>
      </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
#map svg {
width:70%;
max-width:100%;
height:90%;
}
#path2831{
  fill: rgb(189, 185, 185);
}
path:not(#path2831){
  transition: 1s;
  cursor: pointer;
}
path:not(#path2831):hover {
  transform: translate(-10px,-10px);
  fill: goldenrod;
}
#gallerybox{
  padding: 1rem;
}

</style>
<script>
import MapSVG from './MapSVG'
import MapSVG2 from './MapSVG2'
import MapSVG3 from './MapSVG3'
export default {
  name: 'MapSearchMap',
  components: {
    MapSVG,
    MapSVG2,
    MapSVG3
  },
  data () {
    return {
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          },
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1912, 1916, 1921, 1926, 1932, 1936, 1939]
        },
        title: {
          text: '日治時期臺灣戲院數量的成長',
          align: 'center'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        }
      },
      series: [{
        name: '戲院數',
        data: [14, 16, 22, 45, 95, 104, 117]
      }],
      yearitems: ['1895-1909', '1910-1919', '1920-1945', '?'],
      search: '',
      // 給tableitems用，所有戲院
      items: [],
      // 使用者收藏
      userCollect: [],
      years: '',
      city: '',
      // dialog: false,
      dialogOpen: false,
      // 給dialog內容用
      dialogItem: {},
      headers: [
        {
          text: '名稱',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        {
          text: '詳細介紹',
          align: 'center',
          sortable: false,
          value: 'details'
        },
        {
          text: '收藏',
          align: 'center',
          sortable: false,
          value: 'collections'
        }
      ]
    }
  },
  computed: {
    urlsearch () {
      return this.$route.query
    },
    tableitems () {
      return this.items.filter(item => {
        if (this.urlsearch.years) {
          if (item.datestart) {
            const theaterStartYear = item.datestart.split('-')[0]
            const theaterEndYear = item.dateend.split('-')[0]
            // console.log(item.dateend.split('-')[0])
            const urlYearRange = this.urlsearch.years.split('-')
            const isinlocation = item.location.find(lo => {
              return lo.includes(this.urlsearch.city)
            })
            if (item.datestart === '?') {
              return item.datestart.includes(this.urlsearch.years)
            } else {
              if (theaterEndYear === '?') {
                return urlYearRange[0] >= theaterStartYear && isinlocation
              } else {
                return theaterEndYear >= urlYearRange[0] && theaterStartYear <= urlYearRange[1] && isinlocation
              }
            }
          } else return false
        }
      })
      //   return item.dateback.includes(this.urlsearch.years) && item.location.includes(this.urlsearch.city)
      // })
    },
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    clickmap (city) {
      if (city !== 'path2831') {
        this.city = city
        const query = Object.assign({}, this.$route.query, { city })
        this.$router.push({ query }).catch(() => {})
      }
    },
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
    addCollection (item) {
      const idx = this.userCollect[0].collections.findIndex(collect => collect.p_id === item._id)
      if (this.dialogItem) {
        if (idx === -1) {
          this.dialogItem = item
          this.axios.patch(process.env.VUE_APP_API + '/users/' + this.user.id + '/collection', { p_id: this.dialogItem._id })
            .then(res => {
              console.log(res)
              if (res.data.success) {
                this.$swal({
                  icon: 'success',
                  title: '收藏成功',
                  text: res.data.message
                })
                this.userCollect[0].collections.push({ p_id: item._id })
              } else {
                this.$swal({
                  icon: 'error',
                  title: '錯誤',
                  text: res.data.message
                })
              }
            })
        } else {
          this.axios.patch(process.env.VUE_APP_API + '/users/' + this.user.id + '/collection', { p_id: this.dialogItem._id })
            .then(res => {
              if (res.data.success) {
                this.$swal({
                  icon: 'success',
                  title: '取消收藏',
                  text: res.data.message
                })
                this.userCollect[0].collections.splice(idx, 1)
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
    }
  },
  watch: {
    years (years) {
      const query = Object.assign({}, this.$route.query, { years })
      if (years === '1895-1909' || years === '1910-1919') {
        query.city = '臺北廳'
      } else if (years === '1920-1945') {
        query.city = '臺北州'
      }
      this.$router.push({ query }).catch(() => {})
    },
    // dialog (val) {
    //   val || this.close()
    // },
    dialogOpen (val) {
      val || this.closeDialog()
    }
  },
  mounted () {
    if (this.$route.query.years) {
      this.years = this.$route.query.years
    }
    if (this.$route.query.city) {
      this.city = this.$route.query.city
    }
    // 取得所有戲院
    this.axios.get(process.env.VUE_APP_API + '/theaters/')
      .then(res => {
        if (res.data.success) {
          this.items = res.data.result
        } else {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: res.data.message
          })
        }
      })
      // 取得會員收藏
    this.axios.get(process.env.VUE_APP_API + '/users/' + this.user.id + '/collection')
      .then(res => {
        if (res.data.success) {
          this.userCollect = res.data.result
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
