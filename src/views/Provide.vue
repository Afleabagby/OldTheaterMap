<template>
  <v-app id="Provide">
    <AppHeader></AppHeader>
    <Form1></Form1>
    <AppFooter></AppFooter>
  </v-app>
</template>

<style scoped>
</style>

<script>
import AppHeader from '../components/AppHeader'
import Form1 from '../components/Form1.vue'
import AppFooter from '../components/AppFooter'
export default {
  name: 'Provide',
  components: {
    AppHeader,
    Form1,
    AppFooter
  },
  data () {
    return {
    }
  }
}
</script>
