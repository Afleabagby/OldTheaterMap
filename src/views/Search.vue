<template>
  <v-app id="Search">
    <AppHeader></AppHeader>
    <MapSearch></MapSearch>
    <AppFooter></AppFooter>
  </v-app>
</template>

<style scoped>
</style>

<script>
import AppHeader from '../components/AppHeader.vue'
import MapSearch from '../components/Mapsearch.vue'
import AppFooter from '../components/AppFooter.vue'
export default {
  name: 'Search',
  components: {
    AppHeader,
    MapSearch,
    AppFooter
  },
  data () {
    return {
    }
  }
}
</script>
