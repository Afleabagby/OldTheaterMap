<template>
  <v-container id="form1" class="d-flex justify-center align-center" style="height:100%;">
    <v-row class="d-flex justify-center align-center">
      <!-- 填表說明 -->
      <v-col cols="12" md="4" lg="4" class="mx-10">
        <p class="headline my-8 text--secondary">
            填表說明
          </p>
        <v-expansion-panels focusable popout>
          <v-expansion-panel v-for="(item,i) in panels" :key="i">
            <v-expansion-panel-header class="text-h6 text--secondary secondary">
              如何填寫「{{item.title}}」
            </v-expansion-panel-header>
          <v-expansion-panel-content class="text--secondary ma-3 pa-5 text-body-1 text-justify">
            {{item.content}}
          </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <!-- 表單 -->
      <v-col cols="12" md="5" lg="5" height="100vh">
      <v-form @submit.prevent="formSubmit">
      <v-stepper v-model="e1" alt-labels >
      <v-stepper-header >
        <v-stepper-step
          :complete="e1 > 1"
          step="1"
        >
          填表人基本資料
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          :complete="e1 > 2"
          step="2"
        >
          戲院基本資料
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">
          戲院建築
        </v-stepper-step>

      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1" height="100%">
          <v-card
            class="mb-12 d-flex justify-center"
            style="background-color:transparent"
          >
            <v-card-text style="width:70%;" >
              <v-text-field
              label="您的大名"
              required
              v-model="form.provider"
              ></v-text-field>

            <v-text-field
              label="請輸入信箱"
              required
              v-model="form.email"
            ></v-text-field>
            </v-card-text>
          </v-card>

          <v-col>
            <v-btn
              text
              color="primary darken-2"
              @click="e1 = 2"
            >
              下一步
            </v-btn>
          </v-col>
        </v-stepper-content>

      <v-stepper-content step="2">
          <v-card
            class="mb-12 d-flex justify-center"
            style="background-color:transparent;"
          >
          <v-card-text style="width:70%;">
              <v-text-field
              v-model="form.name"
              :counter="10"
              label="戲院名稱"
              required
            ></v-text-field>

            <v-text-field
              v-model="form.location"
              label="所在地"
              required
            ></v-text-field>
            <v-col class="d-flex align-center justify-space-around" width="150px">
                <p class="text-subtitle-1 d-block mr-0">定位精度</p>
                <v-radio-group v-model="form.precision" row>
                  <v-radio
                    :label="`精確`"
                    :value="`精確`"
                  ></v-radio>
                  <v-radio
                    :label="`模糊`"
                    :value="`模糊`"
                  ></v-radio>
                </v-radio-group>
            </v-col>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="form.datestart"
                  label="營運日期（起）"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="form.datestart"
                no-title
                scrollable
                min="1895-06-15"
                max="1950-03-20"
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="menu = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(form.datestart)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
            <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="form.dateend"
                label="營運日期（迄）"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="form.dateend"
              @input="menu2 = false"
              min="1895-06-15"
              max="1950-03-20"
            ></v-date-picker>
          </v-menu>
            <v-text-field v-model="form.dateback"
              label="可考之營運年代"
            ></v-text-field>
          </v-card-text>
          </v-card>
          <v-col>
          <v-btn
            text
            color="primary darken-2"
            @click="e1 = 3"
          >
            下一步
          </v-btn>
          <v-btn
          text
          @click="e1 = 1"
          color="primary darken-2">
            上一步
          </v-btn>
        </v-col>

          <!-- 戲院建築 -->
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card
            class="mb-12 d-flex justify-center"
            style="background-color:transparent"
          >
          <v-card-text style="width:70%;">
            <v-textarea
            v-model="form.description"
              outlined
              name="input-7-4"
              label="建物描述"
              value=""
            ></v-textarea>
              <p class="text-subtitle-1 d-block mr-0">建物現況</p>
            <v-col class="d-flex flex-column align-center justify-space-around" width="150px"
            >
                <v-radio-group  row v-model="form.state">
                  <v-radio
                    :label="`存在`"
                    :value="`存在`"
                  ></v-radio>
                  <v-radio
                    :label="`不存在`"
                    :value="`不存在`"
                  ></v-radio>
                  <v-radio
                    :label="`未知`"
                    :value="`未知`"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-textarea
                v-model="form.source"
                outlined
                name="input-7-4"
                label="資料來源"
                value=""
              ></v-textarea>
          </v-card-text>
          </v-card>
        <v-col class="d-flex">
            <v-btn
            text
            color="primary darken-2"
              @click="e1 = 1"
            >
              返回第一頁
            </v-btn>
            <v-btn
              text
              color="primary darken-2"
              @click="e1 = 2"
            >
              上一步
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn type="submit" color="primary darken-1">
              送出
            </v-btn>
          </v-col>

        </v-stepper-content>

      </v-stepper-items>
    </v-stepper>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      panels: [
        {
          title: '戲院名稱',
          content: '將該戲院歷來之命名與更名按時序載錄，並以斜線「／」分隔。例如「龍口亭／第四世界館／南門座／第二芳乃館／活動館」，即該戲院先後有過龍口亭、第四世界館、南門座、第二芳乃館、活動館等名稱。'
        },
        {
          title: '所在地',
          content: '將歷來文獻中該戲院所在位址之紀錄，去同存異，依時序載錄。載錄方式為「所屬州廳名，位址描述（資料年代）」。例如「竹塹俱樂部」之所在地描述為「新竹州，原清代明志書院、新竹日英館餐廳舊址新建（1908）」。'
        },
        {
          title: '定位精度',
          content: '戲院所在地資訊內容及於「町」或相當層級行政區者標示為「精確」，僅及於「市郡街庄」層級或未及者標示為「模糊」。'
        },
        {
          title: '營運日期（起）~（迄）',
          content: '採西元紀年載明戲院營運日期之起迄，起迄日期資訊不明處標示問號「?」。例如「1935-02-03」、「1915-11-?」、「1933-?-?」。'
        },
        {
          title: '可考之營運年代」',
          content: '載明該戲院可查考的營運年代。例如「臺南座」雖查無明確的營運起迄日期，卻有1903-1915年間多筆報刊資料可佐證其存在，故註記可考之營運年代為「1900-1909，1910-1919」。'
        },
        {
          title: '建物描述',
          content: '選摘文獻上對該戲院建築內、外部的重要描述；原始資料若為日文，則翻譯成中文呈現，並於句首標註〔譯文〕。'
        },
        {
          title: '建物現況',
          content: '述明網站建置之際該戲院建物的現況，依建物存在與否分作「存在」、「不存在」與「未知」，前兩者為實際確認後的結果，而限於人力未及確認者則標示「未知」。'
        },
        {
          title: '資料來源',
          content: '載明該筆戲院檔案之內容出處。'
        }
      ],
      e1: 1,
      menu: false,
      menu2: false,
      items: ['存在', '不存在', '未知'],
      form: {
        name: '',
        location: '',
        precision: '',
        datestart: '',
        dateend: '',
        dateback: '',
        description: '',
        state: '',
        source: '',
        provider: '',
        email: ''
      }
    }
  },
  computed: {
    panelItems () {
      return this.panels
    }
    // dateRangeText () {
    //   return this.dates.join(' ~ ')
    // }
  },
  methods: {
    formSubmit () {
      this.axios.post(process.env.VUE_APP_API + '/pendings/', this.$data.form)
        .then(res => {
          if (res.data.success) {
            this.$swal({
              icon: 'success',
              title: '送出成功'
            })
            this.form.name = ''
            this.form.location = ''
            this.form.precision = ''
            this.form.datestart = ''
            this.form.dateend = ''
            this.form.dateback = ''
            this.form.description = ''
            this.form.state = ''
            this.form.source = ''
            this.form.provider = ''
            this.form.email = ''
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
  }
}
</script>
