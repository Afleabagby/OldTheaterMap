<template>
  <!-- 右上menu -->
  <v-container id="header">
    <v-row class="text-right d-flex mt-3 mr-3">
      <v-col class="text-right d-flex align-center justify-end">
        <v-dialog width="300" v-model="dialog">
            <!-- 按鈕 -->
            <template v-slot:activator="{ on, attrs }">
              <!-- {{user.id.length === 0 && manager.id.length === 0}} -->
              <v-btn @click="dialog = true" icon v-bind="attrs" v-on="on" v-show="isLogout">
                <v-icon>mdi-login</v-icon>會員
              </v-btn>
            </template>
            <!-- 跳出內容 -->
            <v-card >
              <v-tabs
              color="brown darken-4 accent-4"
              class="primary"
              centered
              slider-color="brown darken-4"
              grow
              height="60px">
                <!-- 頁籤 -->
                  <v-tab class="secondary mx-0 text-h6" color="brown lighten-5"><v-icon class="mr-2">mdi-account-multiple-plus</v-icon> 註冊會員</v-tab>
                  <v-tab class="secondary mx-0 text-h6"><v-icon class="mr-2">mdi-location-enter</v-icon> 登入會員</v-tab>
                <!-- 頁籤內容 -->
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <v-form @submit.prevent="signUpsubmit">
                            <v-text-field
                              v-model="name"
                              label="姓名"
                              :rules="[rules.required]"
                            ></v-text-field>
                            <v-text-field
                              v-model="account"
                              :rules="[rules.required, rules.min, rules.max]"
                              label="註冊信箱"
                              :state="accountState"
                            ></v-text-field>
                            <v-text-field
                              v-model="password"
                              :rules="[rules.required, rules.min, rules.max]"
                              label="註冊密碼"
                              :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                              @click:append="show4 = !show4"
                              :type="show4 ? 'text' : 'password'"
                            ></v-text-field>
                            <v-row class="d-flex align-center justify-center mb-5">
                                    <v-col class="d-flex align-center justify-center">
                                      <v-btn type="submit">
                                      確認送出
                                    </v-btn>
                                    </v-col>
                            </v-row>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <v-form @submit.prevent="logInsubmit">
                            <v-text-field
                              v-model="account"
                              :rules="[rules.required, rules.min, rules.max]"
                              label="請輸入信箱"
                              :state="accountState"
                            ></v-text-field>
                            <v-text-field
                              v-model="password"
                              :rules="[rules.required, rules.min, rules.max]"
                              label="請輸入密碼"
                              :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                              @click:append="show4 = !show4"
                              :type="show4 ? 'text' : 'password'"
                              required
                            ></v-text-field>
                            <v-row class="d-flex align-center justify-center mb-5">
                                    <v-col class="d-flex align-center justify-center">
                                      <v-btn @click="dialog = true" type="submit">
                                      確認送出
                                    </v-btn>
                                    </v-col>
                            </v-row>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </v-card>
        </v-dialog>
      <v-divider class="mx-5" vertical v-show="isLogout"></v-divider>
        <v-dialog max-width="300">
          <!-- 管理者登入 -->
          <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" v-show="isLogout">
                <v-icon>mdi-account</v-icon>
                <div>管理者</div>
              </v-btn>
          </template>
            <v-card flat class="primary">
              <v-toolbar flat color="#356859" >
                <v-spacer></v-spacer>
                <v-toolbar-title id="toolbartitle" color="#ffffff">管理者登入</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="manaGerlogin">
                  <v-text-field
                    v-model="account"
                    label="請輸入信箱"
                    required
                  ></v-text-field>
                  <v-text-field
                  v-model="password"
                  label="請輸入密碼"
                  :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show4 = !show4"
                  :type="show4 ? 'text' : 'password'"
                  required
                  ></v-text-field>
                  <v-row class="d-flex align-center justify-center mb-5">
                    <v-col class="d-flex align-center justify-center">
                      <v-btn type="submit">管理者登入</v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row class="text-right d-flex mt-3 mr-3">
      <v-col class="text-right d-flex align-center justify-end">
        <v-btn  icon @click="userlogOut" v-if="user.id.length > 0">
          <v-icon>mdi-message-arrow-left-outline</v-icon>
          <div>登出</div>
        </v-btn>
        <v-btn  icon @click="manaGerlogout" v-if="manager.id.length > 0">
          <v-icon>mdi-message-arrow-left-outline</v-icon>
          <div>登出</div>
        </v-btn>
        <v-divider class="mx-5" vertical></v-divider>
        <v-btn icon link to="/userBack" v-if="user.id.length > 0">
          <v-icon>mdi-account-box-outline</v-icon>
          會員<br>資料
        </v-btn>
        <v-btn icon link to="/managerBack" v-if="manager.id.length > 0">
          <v-icon>mdi-account-cog-outline</v-icon>
          管理<br>後台
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss">
  .v-dialog{
    overflow:hidden;
  }
  #header{
    width:500px;
  }
  #toolbartitle{
    color:#fff;
  }
</style>
<script>
export default {
  name: 'LoginPop',
  data () {
    return {
      valid: true,
      name: '',
      account: '',
      password: '',
      rules: {
        required: value => !!value || '必填',
        max: value => value.length <= 20 || '最多 20 個字',
        min: v => v.length >= 4 || '最少 4 個字',
        emailMatch: () => ('帳號與密碼不符')
      },
      show4: false,
      dialog: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    isLogout () {
      return this.user.id.length === 0 && this.manager.id.length === 0
    },
    manager () {
      return this.$store.state.manager
    },
    accountState () {
      if (this.account.length === 0) {
        return null
      } else if (this.account.length >= 4 && this.account.length <= 20) {
        return true
      } else {
        return false
      }
    },
    passwordState () {
      if (this.password.length === 0) {
        return null
      } else if (this.password.length >= 4 && this.password.length <= 20) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    // 使用者註冊
    signUpsubmit () {
      // 如果帳號密碼驗證通過
      if (this.accountState && this.passwordState) {
        this.axios.post(process.env.VUE_APP_API + '/users/', this.$data)
          .then(res => {
            if (res.data.success) {
              this.name = ''
              this.account = ''
              this.password = ''
              this.dialog = false
              this.$swal({
                icon: 'success',
                title: '註冊成功'
              }).then(() => {
                this.$router.push('/home')
              })
            } else {
              this.$swal({
                icon: 'error',
                title: '發生錯誤',
                text: res.data.message
              })
            }
          })
      }
    },
    // 使用者登入
    logInsubmit () {
      // 如果帳號密碼驗證通過
      if (this.accountState && this.passwordState) {
        this.axios.post(process.env.VUE_APP_API + '/users/login', this.$data)
          .then(res => {
            this.$store.commit('logInsubmit', res.data.result)
            if (res.data.success) {
              this.account = ''
              this.password = ''
              this.dialog = false
              this.$swal({
                icon: 'success',
                title: '登入成功'
              }).then(() => {
                // sweet alert 對話框關掉後才跳到相簿頁
                this.$router.push('/userBack')
              })
            } else {
              this.$swal({
                icon: 'error',
                title: '發生錯誤',
                text: res.data.message
              })
            }
          })
      }
    },
    // 使用者登出
    userlogOut () {
      this.axios.delete(process.env.VUE_APP_API + '/users/logout')
        .then(res => {
          // 如果登出成功
          if (res.data.success) {
            this.$swal({
              icon: 'success',
              title: '成功',
              text: '登出成功'
            })

            // 清除 vuex
            this.$store.commit('userlogOut')
            // 導回首頁
            if (this.$route.path !== '/home') {
              this.$router.push('/home')
            }
            // location.reload()
          } else {
            this.$swal({
              icon: 'error',
              title: '錯誤',
              text: res.data.message
            })
          }
        })
        .catch(error => {
          // 如果回來的狀態碼不是 200，直接 alert 錯誤訊息
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: error.response.data.message
          })
        })
    },
    // 管理者登入
    manaGerlogin () {
      // 如果帳號密碼驗證通過
      if (this.accountState && this.passwordState) {
        this.axios.post(process.env.VUE_APP_API + '/managers/login', this.$data)
          .then(res => {
            this.$store.commit('manaGerlogin', res.data.result)
            if (res.data.success) {
              this.$swal({
                icon: 'success',
                title: '登入成功'
              }).then(() => {
                // sweet alert 對話框關掉後才跳到相簿頁
                this.$router.push('/managerBack')
              })
              this.$v.$touch()
            } else {
              this.$swal({
                icon: 'error',
                title: '發生錯誤',
                text: res.data.message
              })
            }
          })
      }
    },
    // 管理者登出
    manaGerlogout () {
      this.axios.delete(process.env.VUE_APP_API + '/managers/logout')
        .then(res => {
          // 如果登出成功
          if (res.data.success) {
            this.$swal({
              icon: 'success',
              title: '成功',
              text: '登出成功'
            })

            // 清除 vuex
            this.$store.commit('manaGerlogout')

            // 導回首頁
            if (this.$route.path !== '/home') {
              this.$router.push('/home')
            }
            // location.reload()
          } else {
            this.$swal({
              icon: 'error',
              title: '錯誤',
              text: res.data.message
            })
          }
        })
        .catch(error => {
          // 如果回來的狀態碼不是 200，直接 alert 錯誤訊息
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: error.response.data.message
          })
        })
    }
  }
}
</script>
