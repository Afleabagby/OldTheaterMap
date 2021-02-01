import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '../views/Welcome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
    meta: {
      title: '歡迎頁',
      login: false
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {
      title: '首頁',
      login: false
    }
  },
  {
    path: '/search',
    name: 'Search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue'),
    meta: {
      title: '找老戲院',
      login: false
    }
  },
  {
    path: '/provide',
    name: 'Provide',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "provide" */ '../views/Provide.vue'),
    meta: {
      title: '提供戲院',
      login: false
    }
  },
  {
    path: '/others',
    name: 'Others',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "others" */ '../views/Others.vue'),
    meta: {
      title: '文史資料',
      login: false
    }
  },
  {
    path: '/userBack',
    name: 'UserBack',
    component: () => import(/* webpackChunkName: "userBack" */ '../views/UserBack.vue'),
    meta: {
      title: '會員資料',
      login: true
    },
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "userInfo" */ '../components/UserInfo.vue'),
        meta: {
          title: '會員資料',
          login: true
        }
      },
      {
        path: '/userInfo',
        name: 'UserInfo',
        component: () => import(/* webpackChunkName: "userInfo" */ '../components/UserInfo.vue'),
        meta: {
          title: '會員資料',
          login: true
        }
      },
      {
        path: '/userCollection',
        name: 'UserCollection',
        component: () => import(/* webpackChunkName: "userCollection" */ '../components/UserCollection.vue'),
        meta: {
          title: '我的收藏',
          login: true
        }
      }
    ]
  },
  {
    path: '/managerBack',
    name: 'ManagerBack',
    component: () => import(/* webpackChunkName: "managerBack" */ '../views/ManagerBack.vue'),
    meta: {
      title: '管理者後台',
      login: true
    },
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "userManage" */ '../components/UserManage.vue'),
        meta: {
          title: '管理者後台',
          login: true
        }
      },
      {
        path: '/userManage',
        name: 'UserManage',
        component: () => import(/* webpackChunkName: "userManage" */ '../components/UserManage.vue'),
        meta: {
          title: '管理者後台',
          login: true
        }
      },
      {
        path: '/AlltheaterManage',
        name: 'allTheaterManage',
        component: () => import(/* webpackChunkName: "allTheaterManage" */ '../components/AllTheaterManage.vue'),
        meta: {
          title: '管理者後台',
          login: true
        }
      },
      {
        path: '/PendingtheaterManage',
        name: 'pendingTheaterManage',
        component: () => import(/* webpackChunkName: "pendingTheaterManage" */ '../components/PendingTheaterManage.vue'),
        meta: {
          title: '管理者後台',
          login: true
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.afterEach((to, from) => {
  let title = ''
  title = to.meta.title
  document.title = title
})

export default router
