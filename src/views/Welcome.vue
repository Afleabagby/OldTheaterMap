<template>
<v-app>
  <v-container fluid class="container-fluid fill-height" id="welcomebg">
    <div class="text-center" id="enter-button">
      <v-btn to='/home'>進入首頁</v-btn>
    </div>
  </v-container>
</v-app>
</template>
<style>
#welcomebg{
  background: url('../assets/bg5.jpg') no-repeat center center/cover;
  filter:sepia(1);
}
#enter-button{
  margin:auto;
}
</style>
