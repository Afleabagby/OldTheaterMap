<template>
    <v-container
      class="d-flex flex-column justify-center align-center justify-space-between"
      height="100vh"
    >
    <!-- 學術研究 -->
        <h1 class="mx-auto d-flex rounded-br-xl ">學術研究</h1>
        <v-container>
          <v-row class="justify-center flex-md-row flex-column ma-3">
            <v-col cols="12" md="7" class="ma-5">
                  <div class="text--secondary text-justify text-body-1">
                  <h3 class="text-center my-3">賴品蓉</h3>
                  <p>2016b〈戲院與近代都市：日治時期臺南市的戲院及其空間脈絡分析〉，發表於國立臺北藝術大學電影創作學系主辦，「第二屆臺灣與亞洲電影史國際研討會：比較殖民時期的韓國與臺灣電影」。臺北：國立臺北藝術大學藝文生態館K101視聽教室，10月1-2日。</p>
                  <p>2016a《日治時期臺南市戲院的出現及其文化意義》，國立清華大學臺灣文學研究所碩士論文。新竹：國立清華大學。</p>
                </div>
            </v-col >
            <v-col cols="12" md="7" class="ma-5">
              <div class="text--secondary text-justify text-body-1">
                  <h3 class="text-center my-3">石婉舜</h3>
                  <p>2016〈「新觀眾」登場：以《黃旺成先生日記（1912-29）年）》的戲劇記事為中心〉，發表於中央研究院臺灣史研究所、國立暨南國際大學歷史學系主辦，「第六屆日記研討會：日記中臺灣的時代轉換」學術研討會。南投：國立暨南國際大學人文學院116會議室，11月17-18日。</p>
                  <p>2015〈尋歡作樂者的淚滴──戲院、歌仔戲與殖民地的觀眾〉（增修版），收於李承機、李育霖主編，《「帝國」在臺灣：殖民地臺灣的時空、知識與情感》，頁237-275。臺北：臺灣大學出版中心。</p>
                  <p>2014b〈尋歡作樂者的淚滴──戲院、歌仔戲與殖民地的觀眾〉，《戲曲藝術：中國戲曲學院學報》第35 卷第3 期，2014 年8 月，頁82-97。【CSSCI 資料庫收錄】
                    2014a〈近代劇場空間の誕生──日本植民期臺湾における劇場の普及と特色〉，發表於日本名古屋大学大学院國際言語文化研究科、愛知大学現代中国学会、蔡瑞月文化基金會主辦，「戦中戦後の身体芸術とメディア──臺湾‧日本‧中国の連鎖」國際研討會。名古屋：名古屋大學名古屋大学文系総合館7Fカンファレンスホール，7月13日。</p>
                  <p>2013〈植民地における演劇と観衆－台湾語通俗演劇の興起を中心に〉（近藤光雄譯），《言語社會 一橋大學大學院言語社會研究科》第7 期，2013 年3 月；頁63-83。</p>
                  <p>2012〈高松豐次郎與臺灣現代劇場的揭幕〉，《戲劇研究》10：35-68。【THCI Core 資料庫收錄】</p>
                </div>
            </v-col>
          </v-row>
        </v-container>
<v-divider class="my-15"></v-divider>
    <!-- 友善連結 -->
      <h1 class="ma-auto d-flex rounded-br-xl ">友善連結</h1>
      <v-container>
        <v-row class="ma-10 justify-center">
          <v-btn data-aos="fade-up" text class="highlight" v-for="(item, i) in links" :key="i" :href="item.link">{{item.title}}</v-btn>
        </v-row>
      </v-container>
<v-divider class="my-15"></v-divider>
    <!-- 聯絡我們 -->
      <h1 class="text-center">聯絡我們</h1>
      <v-container class="pa-0 d-flex justify-center align-center mx-5">
        <v-row class="d-flex justify-center align-center mx-15"
        >
          <v-col cols="12" md="6" class="d-flex justify-center align-center ma-0">
            <v-img data-aos="fade-up" src="../assets/pocketwatch.png" max-width="350" alt=""></v-img>
          </v-col>
        <v-col cols="12" md="6" class="text-center d-flex flex-column justify-center align-center" data-aos="fade-up">
            <v-col class="pa-5 text-body-1" max-width="300px">
              <v-col class="mt-5">
              <h4 class="mb-3">一、中央研究院人社中心地理資訊科學研究專題中心</h4>
                <div><v-icon>mdi-home-variant-outline</v-icon>臺北市南港區研究院路二段128號</div>
                <div><v-icon>mdi-email-outline</v-icon>gis@gate.sinica.edu.tw</div>
                <div><v-icon>mdi-phone-outline</v-icon>02-27857108分機117</div>
                <span><v-btn icon href="http://gis.rchss.sinica.edu.tw"><v-icon>mdi-web</v-icon></v-btn></span>
                <span><v-btn icon href="https://www.facebook.com/asgis"><v-icon>mdi-facebook</v-icon></v-btn></span>
              </v-col>
              <v-col class="mt-5">
              <h4 class="mb-3">二、國立清華大學臺灣文學研究所石婉舜研究室</h4>
                <div><v-icon>mdi-home-variant-outline</v-icon>新竹市東區光復路二段101號</div>
                <div><v-icon>mdi-email-outline</v-icon>wsshih@mx.nthu.edu.tw</div>
                <div><v-icon>mdi-phone-outline</v-icon>03-571-5131分機34336</div>
                <span><v-btn icon href="http://www.tl.nthu.edu.tw/main.php"><v-icon>mdi-web</v-icon></v-btn></span>
              </v-col>
            </v-col>
          <v-col cols="12" md="9" class="text-center ma-0 text-body-1">
            中央研究院人社中心GIS專題中心暨國立清華大學臺灣文學研究所<br>石婉舜研究室 (2017)，<br>「臺灣老戲院文史地圖（1895-1945）」， 網址：http://map.net.tw/theater//，2020。
          </v-col>
        </v-col>
        </v-row>
      </v-container>
  </v-container>
</template>

<style>
@media (min-width:576px) {
  #section01{
  display:block;
}

}
#section01{
  display:none;
}

.highlight {
background: url(https://www.andyhooke.co.uk/wp-content/uploads/2018/02/yellow-brushstroke.png);
background-repeat: no-repeat;
background-size: 100% 95%;
padding: 8px 0;
mix-blend-mode: darken;
}
</style>

<script>
export default {
  name: 'Info',
  data () {
    return {
      links: [
        {
          title: '甘樂文創',
          link: 'https://www.thecan.com.tw/tw/log/detail/840'
        },
        {
          title: '欣傳媒',
          link: 'https://blog.xinmedia.com/article/148413'
        },
        {
          title: '國家文化資料庫',
          link: 'http://newnrch.digital.ntu.edu.tw/nrch/query.php?keyword=%E7%85%A7%E7%89%87+%E6%88%B2%E9%99%A2&advanced=1@%E8%80%81%E7%85%A7%E7%89%87'
        },
        {
          title: 'Tony的自然人文旅記（1092）',
          link: 'http://www.tonyhuang39.com/tony1092/tony1092.html'
        },
        {
          title: '故事StoryStudio',
          link: 'https://storystudio.tw/'
        },
        {
          title: '昭和6年勝山吉作《臺灣紹介最新寫真集》',
          link: 'https://collections.nmth.gov.tw/CollectionContent.aspx?a=132&rno=2001.008.0007'
        },
        {
          title: '台南筆記',
          link: 'https://tainan.biji.co/news/detail/3043/%E6%97%A5%E6%93%9A%E5%8F%B0%E5%8D%97%E5%9B%9B%E5%A4%A7%E9%9B%BB%E5%BD%B1%E9%99%A2'
        }
      ],
      contact1: [
        {
          title: 'facebook',
          link: 'https://www.facebook.com/asgis'
        },
        {
          title: 'facebook',
          link: 'https://www.facebook.com/asgis'
        }
      ]
    }
  }
}
</script>
