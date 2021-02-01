<template>
<v-container>
    <v-img></v-img>
    <!-- <LoginPop></LoginPop> -->
    <Menu></Menu>
</v-container>
</template>

<script>
// import LoginPop from './LoginPop.vue'
import Menu from './Menu.vue'
export default {
  name: 'AppHeader',
  components: {
    // LoginPop,
    Menu
  }
}
</script>
