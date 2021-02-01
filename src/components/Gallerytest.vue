<template>
<div class="accordion">
  <ul>
    <li tabindex="1">
      <div>
        <a>
          <h2>高雄座（高雄劇場）</h2>
          <p>高雄首座西式劇場建築。</p>
        </a>
      </div>
    </li>
    <li tabindex="2">
      <div>
        <a>
          <h2>金鵄館</h2>
          <p>一九三四年（昭和九年）重新改裝設備並引入嶄新經營模式，</p>
          <p>是南台灣規模最大、品質最好的戲院，與鄰近的高雄遊廓，形成熱鬧無比的不夜城。</p>
        </a>
      </div>
    </li>
    <li tabindex="3">
      <div>
        <a>
          <h2>昔日大舞台</h2>
          <p>大舞台1911年1月22日落成，戰時遭炸毀，修建後又恢復營業。</p>
            <p>台南歌仔戲團「丹桂社」於1925年在大舞台演出，</p>
          <p>被認為是台灣第一個進入戲院內台的商業登台。</p>
        </a>
      </div>
    </li>
    <li tabindex="4">
      <div>
        <a>
          <h2>楊梅座（楊梅劇場）</h2>
          <p>1943年楊梅座（楊梅劇場）日の出劇團鍊成作業紀念。</p>
        </a>
      </div>
    </li>
    <li tabindex="5">
      <div>
        <a>
          <h2>日治時期的臺北榮町</h2>
          <p>榮町是當時台北最繁華的區域，因而有「台北銀座」之稱。</p>
          <p>台灣第一家百貨公司「菊元百貨店」於1932年（昭和7年）在榮町落成。</p>
          <p>1935年（昭和10年）設立台北市、同時也是台灣第一座紅綠燈。</p>
        </a>
      </div>
    </li>
    <li tabindex="6">
      <div>
        <a>
          <h2>國際館</h2>
          <p>1920年12月29日，位於今台北市漢中街116號的「新世界館」落成，是當時台灣最大的電影院。</p>
          <p>當日上映的電影是《陸軍航空戰記～緬甸篇》，為日本航空紀錄片的代表作，片長91分鐘，</p>
          <p>由日本映畫社製作。</p>
        </a>
      </div>
    </li>
  </ul>
</div>
</template>
<style lang="scss">
// -------------------------------------------------------------------
// Accordion Height
$a-height: 500px;

// Position text along bottom
$text-offset: $a-height - 120;

// Page Title
h1 {
  text-align:center;
  font-family:Montserrat,sans-serif;
  color:#333;
}

.accordion {
  width:100%;
  max-width:1080px;
  height:$a-height;
  overflow:hidden;
  margin:50px auto;
  ul {
    width:100%;
    display:table;
    table-layout:fixed;
    margin:0;
    padding:0;
    li {
      display:table-cell;
      vertical-align:bottom;
      position: relative;
      width:16.666%; // 6 into 100
      height:$a-height;
      background-repeat:no-repeat;
      background-position:center center;
      transition:all 500ms ease;
      div {
        display:block;
        overflow:hidden;
        width:100%;
        a {
          display:block;
          height:$a-height;
          width:100%;
          position:relative;
          z-index:3;
          // vertical-align: bottom;
          padding:15px 20px;
          box-sizing:border-box;
          color:#fff;
          text-decoration:none;
          font-family:Open Sans, sans-serif;
          transition:all 200ms ease;
          * {
            opacity:0;
            margin:0;
            width:100%;
            text-overflow:ellipsis;
            position:relative;
            z-index:5;
            white-space:nowrap;
            overflow:hidden;
            -webkit-transform:translateX(-20px);
            transform:translateX(-20px);
            -webkit-transition:all 400ms ease;
            transition:all 400ms ease;
          }
          h2 {
            font-family:Montserrat,sans-serif;
            text-overflow:clip;
            font-size:24px;
            text-transform:uppercase;
            margin-bottom:2px;
            top:$text-offset;
          }
          p {
            top:$text-offset;
            font-size:13.5px;
          }
        }
      }
    }
    // Background images
    li:nth-child(1) { background-image:url('https://storystudio.tw/wp-content/uploads/2020/11/handelaars-eylandt-yancheng-5-1024x692.jpg'); }
    li:nth-child(2) { background-image:url('https://i0.zi.org.tw/kunputw/2020/06/1591263943-78f8e938a42476d737f05d1d375a6719-1170x912.png'); }
    li:nth-child(3) { background-image:url('https://cdntwrunning.biji.co/800_ex_5507e0562606c.png'); }
    li:nth-child(4) { background-image:url('https://img.ltn.com.tw/Upload/talk/page/800/2018/05/19/phpIZGeGQ.jpg'); }
    li:nth-child(5) { background-image:url('https://upload.wikimedia.org/wikipedia/commons/8/82/%E8%87%BA%E5%8C%97%E6%A6%AE%E7%94%BA%E9%80%9A.jpg'); }
    li:nth-child(6) { background-image:url('https://imgs.gvm.com.tw/upload/gallery/20190515/%E5%A4%A7%E5%B9%B4%E5%88%9D%E4%BA%8C%E7%9A%84%E8%A5%BF%E9%96%80%E7%94%BA%201961%20vs%202018.jpg'); }

    &:hover li,
    &:focus-within li { width:8%; }
    li:focus {
      outline: none;
    }
    &:hover li:hover,
    // allow users to tab through active slides
    li:focus,
    &:focus-within li:focus {
      width:60%;
      a {
        background:rgba(0,0,0,.4);
        * {
          opacity:1;
          -webkit-transform:translateX(0);
          transform:translateX(0);
        }
      }
    }
    &:hover li {
      width: 8% !important;
      a * { opacity: 0 !important; }
    }
    &:hover li:hover {
      width:60% !important;
      a {
        background:rgba(0,0,0,.4);
        * {
          opacity:1 !important;
          -webkit-transform:translateX(0);
          transform:translateX(0);
        }
      }
    }
  }
}

// Stack items
@media screen and (max-width: 600px) {
  // IE gets fussy if this isn't here
  body { margin:0; }
  .accordion {
    height:auto;
    ul,ul:hover {
      li,li:hover {
        position:relative;
        display:table;
        table-layout:fixed;
        width:100%;
        -webkit-transition:none;
        transition:none;
      }
    }
  }
}

.about {
  text-align:center;
  font-family:'Open Sans', sans-serif;
  font-size:12px;
  color:#666;
  a {
    color:blue;
    text-decoration:none;
    &:hover { text-decoration:underline; }
  }
}

</style>
<script>
// import Gallery from 'vue-easy-gallery'
export default {
  // components: { Gallery },
  data () {
    return {
      images: [
        {
          src: 'https://www.gjtaiwan.com/new/wp-content/uploads/2019/04/000_2017-07-04_00491.jpg',
          thumbnail: '',
          height: 768,
          width: 1024
        },
        {
          src: 'https://www.upmedia.mg/upload/article/20190622223303252441.jpg',
          thumbnail: '',
          height: 768,
          width: 1024
        },
        {
          src: 'https://attach.setn.com/newsimages/2020/06/11/2603204-XXL.jpg',
          thumbnail: '',
          height: 768,
          width: 1024
        },
        {
          src: 'https://attach.setn.com/newsimages/2020/06/11/2603205-XXL.jpg',
          thumbnail: '',
          height: 768,
          width: 1024
        },
        {
          src: 'https://attach.setn.com/newsimages/2020/06/11/2603201-XXL.jpg',
          thumbnail: '',
          height: 768,
          width: 1024
        },
        {
          src: 'https://attach.setn.com/newsimages/2020/06/11/2603206-XXL.jpg',
          thumbnail: '',
          height: 768,
          width: 1024
        },
        {
          src: 'https://image.cache.storm.mg/styles/smg-800x533-fp/s3/media/image/2016/11/17/20161117-105530_U3260_M218569_155f.jpg?itok=ZKd0UTeB',
          thumbnail: '',
          height: 768,
          width: 1024
        },
        {
          src: 'https://image.cache.storm.mg/styles/smg-800xauto-er/s3/media/image/2016/11/17/20161117-105530_U3260_M218566_eaab.jpg?itok=0dLAKpQ9',
          thumbnail: '',
          height: 768,
          width: 1024
        },
        {
          src: 'https://image.cache.storm.mg/styles/smg-800xauto-er/s3/media/image/2016/11/17/20161117-105530_U3260_M218565_0b1c.jpg?itok=NTIsJNVH',
          thumbnail: '',
          height: 768,
          width: 1024
        }
      ]
    }
  }
}
</script>
