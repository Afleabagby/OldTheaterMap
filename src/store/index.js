import Vue from 'vue'
import Vuex from 'vuex'
import Persistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      id: ''
    },
    manager: {
      name: '',
      id: ''
    }
  },
  mutations: {
    // 會員登入登出狀態
    userlogOut (state) {
      state.user.name = ''
      state.user.id = ''
    },
    logInsubmit (state, data) {
      state.user.name = data.account
      state.user.id = data._id
    },
    // 管理者登入登出狀態
    manaGerlogout (state) {
      state.manager.name = ''
      state.manager.id = ''
    },
    manaGerlogin (state, data) {
      state.manager.name = data.account
      state.manager.id = data._id
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [Persistedstate()]
})
