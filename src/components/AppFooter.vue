<template>
        <!-- 頁尾 -->
      <v-footer
      class="mt-8 primary darken-3"
      >
      <v-row
        justify="center"
        no-gutters
      >
        <v-btn
          color="grey lighten-2"
          text
          rounded
          class="my-2"
          to="/home"
        >首頁</v-btn>
        <v-btn
          color="grey lighten-2"
          text
          rounded
          class="my-2"
          to="/search"
        >找老戲院</v-btn>
        <v-btn
          color="grey lighten-2"
          text
          rounded
          class="my-2"
          to="/provide"
        >提供戲院</v-btn>
        <v-btn
          color="grey lighten-2"
          text
          rounded
          class="my-2"
          to="/others"
        >文史資料</v-btn>
        <v-col
          class=" py-4 text-center"
          cols="12"
          color="grey lighten-2"
        >
          <strong id="rightreserved" color="grey lighten-2">@2020 All rights reserved</strong>
        </v-col>
      </v-row>
      </v-footer>
</template>
<style>
#rightreserved{
    color: grey lighten-2;
  }
</style>
<script>
export default {
  name: 'AppFooter'
}
</script>
