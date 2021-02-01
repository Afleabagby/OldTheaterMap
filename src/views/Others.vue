<template>
  <v-app id="Others">
    <AppHeader></AppHeader>
    <Info></Info>
    <AppFooter></AppFooter>
  </v-app>
</template>

<style scoped>
</style>

<script>
import AppHeader from '../components/AppHeader'
import Info from '../components/Info.vue'
import AppFooter from '../components/AppFooter'
export default {
  name: 'Others',
  components: {
    AppHeader,
    Info,
    AppFooter
  },
  data () {
    return {
    }
  }
}
</script>
