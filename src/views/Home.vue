<template>
  <v-app id="home">
      <AppHeader></AppHeader>
      <CarouselHeader></CarouselHeader>
      <Timeline></Timeline>
      <Gallerytest></Gallerytest>
      <About></About>
      <AppFooter></AppFooter>
  </v-app>
</template>
<style>
</style>
<script>
import AppHeader from '../components/AppHeader.vue'
import CarouselHeader from '../components/CarouselHeader.vue'
import Timeline from '../components/Timeline.vue'
import Gallerytest from '../components/Gallerytest'
import About from '../components/About.vue'
import AppFooter from '../components/AppFooter'
export default {
  name: 'Home',
  components: {
    AppHeader,
    CarouselHeader,
    Timeline,
    Gallerytest,
    About,
    AppFooter
  },
  data () {
    return {
    }
  }
}
</script>
