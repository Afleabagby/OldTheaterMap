<template>
  <!-- 主選單 -->
  <v-container id="menu" fluid class="d-flex flex-column justify-center align-center">
    <div id="mainhead" style="width:80%;" >
      <v-row class="d-flex align-center">
            <v-col class="d-flex align-start " id="menubar" >
            <router-link to="/" id="menubarlink" class="d-flex align-start ">
              <img src="../assets/logo.svg" alt="" width="50px" class="mx-3" >
              <h1 class="font-weight-bold display-1 basil--text" >
                台灣老戲院文史地圖
              </h1>
            </router-link>
            </v-col>
        <LoginPop></LoginPop>
      </v-row>
    </div>
    <v-row class="mt-8 d-flex justify-center align-center">
      <nav id="mynavbar">
        <div>
          <div>
          <v-col>
              <v-tabs
                color="basil"
                class="d-flex justify-center align-center"
              >
                <v-tab class="my-2 ma-3" to="/home">首頁</v-tab>
                <v-tab class="my-2 ma-3" to="/search">找老戲院</v-tab>
                <v-tab class="my-2 ma-3 " to="/provide">提供戲院</v-tab>
                <v-tab class="my-2 ma-3 infomation" to="/others">文史資料</v-tab>
              </v-tabs>
          </v-col>
          </div>
        </div>
    </nav>
    </v-row>
  </v-container>
</template>
<style>
#menubarlink{
  text-decoration: none;
  color:#356859 !important;
}
#menubar{
  width:500px;
}
#mainhead{
  display:flex;
  justify-content:center;
  align-items:center;
  align-self:center;
}
#mynavbar{
  /* background-color: #fff; */
  display: flex;
  justify-content:center;
  align-items:center;
}

#mynavbar::before,
#mynavbar::after{
  content:'';
  background:rgba(0, 0, 0, 0.6);
  width:500px;
  height:2px;
}

</style>
<script>
import LoginPop from './LoginPop.vue'
export default {
  name: 'Menu',
  components: {
    LoginPop
  }
}
</script>
