<template>
  <v-app id="managerBack">

    <v-navigation-drawer
      v-model="drawer"
      app
      class="lime lighten-4"
    >
      <v-sheet
        color="basil darken"
        class="pa-4 text-center"
      >
        <v-avatar
          class="ma-5 mx-auto"
          color="grey darken-1"
          size="70"
        ></v-avatar>
        <div>{{manager.name}}</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item link to="/userManage"  active-class="teal--text">
        <v-list-item-icon>
          <v-icon>mdi-account-edit</v-icon>
        </v-list-item-icon>
        <v-list-item-title>會員資料管理</v-list-item-title>
      </v-list-item>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
        active-class="teal--text"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>戲院資料管理</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item to="/AlltheaterManage" active-class="teal--text">
          <v-list-item-content>
            <v-list-item-title>全部戲院</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/PendingtheaterManage" active-class="teal--text">
          <v-list-item-content>
            <v-list-item-title>待審核</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
      <v-divider></v-divider>
<!-- 回網頁前台 -->
      <v-list >
        <v-list-item link to="/home">
          <v-list-item-icon>
            <v-icon>mdi-page-previous-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-subtitle-1">回網頁前台</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
<!-- 右邊頁面內容 -->
    <v-main>
    <router-view></router-view>
  </v-main>
  </v-app>
</template>
<style>
  *{
    color:grey lighten-5;
  }
</style>
<script>
export default {
  data () {
    return {
      cards: ['Today', 'Yesterday'],
      drawer: null,
      items: [
        {
          action: 'mdi-movie-edit',
          items: [
            { title: 'List Item' },
            { title: 'New American' }
          ],
          title: ''
        }
      ]
    }
  },
  computed: {
    manager () {
      return this.$store.state.manager
    }
  }
}
</script>
