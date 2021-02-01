<template>
  <v-container id="section02" class="pa-10">
    <v-row class="justify-space-around align-center">
      <v-col cols="12" md="4" lg="3">
        <img src="../assets/gongu3.svg" alt="">
      </v-col>
      <v-col cols="12" md="4" lg="4">
        <img src="../assets/tainanLogo-01.svg" alt="" class="text-left">
        <div class="mb-7 text-justify text-body-1">
          臺南市是臺灣擁有最悠久歷史文化的都市，戲院於此間出現的時間甚早，在全臺僅次於行政中樞臺北市，戲院的數量亦然，而第一間純由臺人資本興建的戲院也在這裡出現。在戲院相關討論上，臺南市可說是不容忽視的、具有代表性的案例。以下即在近代都市更新的空間脈絡下，以城牆拆除與運河完工為界，分三階段考察日治時期臺南市十間戲院的分佈狀況。從中可知1910年代以前興建的戲院在觀眾設定上明顯考慮族群，呈現臺人戲院、日人戲院分眾經營的情況。1920年代以降，殖民地同化政策背景與都市規模大致底定之下，新建戲院多強調以全體市民為對象，分眾經營的色彩顯然淡化。
        </div>
      </v-col>
    </v-row>
    <v-row class="d-flex flex-column justify-center align-center" md="4">
      <v-col cols="12" md="6">
      <v-timeline :dense="$vuetify.breakpoint.smAndDown">
        <v-timeline-item
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        data-aos-offset="500"
        data-aos-duration="500"
        v-for="(year, i) in years"
        :key="i"
        small
        >
        <template v-slot:opposite>
          <span
          :class="`headline font-weight-bold basil--text`"
          v-text="year.year"
          ></span>
        </template>
        <div class="py-4">
          <h2
          :class="`headline mb-4 basil--text font-weight-bold text-h5`"
          v-text="year.title"
          >
          </h2>
          <v-img
          :src="year.img"
          max-width="500"
          class="my-6"
          >
          </v-img>
          <div v-text="year.description" class="text--secondary text-body-2 text-justify"></div>
        </div>
        </v-timeline-item>
      </v-timeline>
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-center justify-center">
        <v-btn
          class="accent"
          text-center
          rounded
          to='/search'
          >更多資訊</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>

</style>
<script>
export default {
  name: 'Timeline',
  data () {
    return {
      years: [
        {
          year: '1895-1907',
          title: '城牆拆除以前',
          img: 'http://map.net.tw/theater/wp-content/uploads/2017/05/1.png',
          description: '第一階段為日治初期到府城西側城牆拆除前（1895-1907），此時期臺南市戲院的分佈狀況如【圖一】所示。最早出現的兩間戲院「臺南座」（約1903-約1915）與「大黑座」（1905前後），均出現於城內，距離日軍憲屯所、十五憲兵本部、步兵營、旅團司令部等軍事機構不過數步之遙，與清末繁華的五條港區與大西門外風化區之間則有城牆相隔，日臺娛樂各成天地。根據文獻紀載，這兩間戲院主要提供日式演藝節目，專供駐紮日軍娛樂慰安之用。'
        },
        {
          year: '1907-1926',
          title: '城牆拆除以後',
          img: 'http://map.net.tw/theater/wp-content/uploads/2017/05/2.png',
          description: '第二階段為西側城牆拆除後到運河整治完工（1907-1926），此時期共有五間戲院出現。遊廓區的遷移是這個階段市區規劃的重點，新建戲院的位置與遊廓的相對位置如【圖二】所示。先是高松豐次郎在臺人遊廓南端興建的「南座」（1908-約1928），接著是首座由臺人集資興建的「大舞臺」（1911-1945），位於遊廓東側偏北處的小媽祖街上。這兩間戲院的所在地在實施町制後歸入西門町，直到日治晚期，臺人族群佔該町人口比例仍維持超過八成，明顯是以臺人為觀眾對象。約與大舞臺同時，高松豐次郎另於城內臺南公館舊址設立「高松活動寫真會常設館」（1911前後）。較晚落成的「戎座」（1912-1934）與「新泉座」（約1915-1924），皆由日人興建，兩座同位於錦町，相去不遠，且與前一階段興建的「臺南座」位置接近。在1922年的人口統計資料中，日人佔錦町人口41%，遠高於全市的日人比例16%。這兩間戲院至少在興建之初的1910年代，是以日人為主要觀眾對象。'
        },
        {
          year: '1926-1945',
          title: '運河整治完工後',
          img: 'http://map.net.tw/theater/wp-content/uploads/2017/05/3.png',
          description: '第三階段從臺南運河整治工程完工一直到日治時期結束（1926-1945），此時自綠園延伸至運河盲端的「末廣町通」開通，在其沿線或鄰近區域陸續誕生了「宮古座」（1928-1977）、「世界館」（1930-1968）及「戎館」（1934-1961）三間戲院，其分佈如【圖三】所示。由末廣町通與西門町通所構成的新十字街區，取代了歷史悠久的十字大街，成為臺南市最繁華的地段；前述三間戲院亦以現代建築的嶄新姿態出現，為都市意象添加了新元素，成為當時臺南市的新地標。這三間戲院所在位置地處新興商業區，強調以整體市民為觀眾對象，相當有別於前兩個階段按族群分眾經營的色彩。（賴品蓉，2016b）'
        }
      ]
    }
  }
}
</script>
