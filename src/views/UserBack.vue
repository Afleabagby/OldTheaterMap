<template>
  <v-app id="userBack">

    <v-navigation-drawer
      v-model="drawer"
      app
      class="lime lighten-4"
    >
      <v-sheet
        color="secondary"
        class="pa-4 text-center"
      >
        <v-avatar
          class="ma-5 mx-auto"
          color="grey darken-1"
          size="70"
        ></v-avatar>
        <div>{{user.name}}</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item link to="/userInfo" active-class="teal--text">
          <v-list-item-icon>
            <v-icon>mdi-account-edit</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>會員資料</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/userCollection" active-class="teal--text">
          <v-list-item-icon>
            <v-icon>mdi-bookmark</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>我的收藏</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list >
        <v-list-item link to="/home">
          <v-list-item-icon>
            <v-icon>mdi-page-previous-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-subtitle-1">回首頁</v-list-item-title>
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
      drawer: null
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>
