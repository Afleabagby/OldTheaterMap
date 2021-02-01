<template>
<vue-marquee style="height:500px" direction="left" :showProgress="false" class="mt-10 align-center">
  <vue-marquee-slide v-for="(item, i) in carousels" :key="i" id="marqueeimg">
    <img :src="item.src" height="480px" width="800" :alt="item.title">
    <video src="../assets/marquee/grey.mp4" autoplay muted loop></video>
  </vue-marquee-slide>
</vue-marquee>
</template>
<style>
#marqueeimg video{
  position:absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index:3;
  object-fit:cover;
  mix-blend-mode:lighten;
}
</style>
<script>
import { Marquee, Slide } from 'vue-marquee-component'
export default {
  name: 'CarouselHeader',
  components: {
    [Marquee.name]: Marquee,
    [Slide.name]: Slide
  },
  data () {
    return {
      carousels: [
        {
          title: '新築落成せる臺南宮古座',
          src: require('../assets/marquee/宮古座2.png')
        },
        {
          title: '台中',
          src: require('../assets/marquee/台中.png')
        },
        {
          title: '台中戲院',
          src: require('../assets/marquee/台中戲院.png')
        },
        {
          title: '淡水戲館／臺灣新舞臺',
          src: require('../assets/marquee/淡水戲館3.png')
        },
        {
          title: '高雄劇場',
          src: require('../assets/marquee/高雄劇場2.png')
        },
        {
          title: '竹塹俱樂部',
          src: require('../assets/marquee/竹塹俱樂部2.png')
        },
        {
          title: '戎館',
          src: require('../assets/marquee/戎館外部.png')
        },
        {
          title: '鹽埕座',
          src: require('../assets/marquee/鹽埕座2.png')
        },
        {
          title: '新築落成せる臺南宮古座',
          src: require('../assets/marquee/宮古座2.png')
        },
        {
          title: '台中',
          src: require('../assets/marquee/台中.png')
        },
        {
          title: '台中戲院',
          src: require('../assets/marquee/台中戲院.png')
        },
        {
          title: '淡水戲館／臺灣新舞臺',
          src: require('../assets/marquee/淡水戲館3.png')
        },
        {
          title: '高雄劇場',
          src: require('../assets/marquee/高雄劇場2.png')
        },
        {
          title: '竹塹俱樂部',
          src: require('../assets/marquee/竹塹俱樂部2.png')
        },
        {
          title: '戎館',
          src: require('../assets/marquee/戎館外部.png')
        },
        {
          title: '鹽埕座',
          src: require('../assets/marquee/鹽埕座2.png')
        }
      ]
      // hooperSettings: {
      //   itemsToShow: 2,
      //   centerMode: true,
      //   breakpoints: {
      //     576: {
      //       centerMode: true,
      //       itemsToShow: 1
      //     },
      //     768: {
      //       centerMode: true,
      //       itemsToShow: 2
      //     },
      //     1000: {
      //       itemsToShow: 3,
      //       pagination: 'fraction'
      //     }
      //   }
      // }
    }
  }
}
</script>
