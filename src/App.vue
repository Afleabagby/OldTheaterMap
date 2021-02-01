<template>
  <v-app id="app">
      <vue-page-transition name="fade-in-down">
          <router-view></router-view>
      </vue-page-transition>
  </v-app>
</template>
<script>
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    manager () {
      return this.$store.state.manager
    }
  },
  methods: {
    heartbeat () {
      this.axios.get(process.env.VUE_APP_API + '/users/heartbeat')
        .then(res => {
          // 如果 vuex 是登入中
          if (this.user.id.length > 0) {
            // 但是後端沒登入
            if (!res.data) {
              this.$swal({
                icon: 'error',
                title: '錯誤',
                text: '登入時效已過'
              })
              // 登出
              this.$store.commit('logout')
              // 導回首頁
              if (this.$route.path !== '/') {
                this.$router.push('/')
              }
            }
          }
        })
        .catch(() => {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: '發生錯誤'
          })
          // 登出
          this.$store.commit('logout')
          // 導回首頁
          if (this.$route.path !== '/') {
            this.$router.push('/')
          }
        })
    }
  },
  mounted () {
    this.heartbeat()
    setInterval(() => {
      this.heartbeat()
    }, 5000)
  }
}
</script>
