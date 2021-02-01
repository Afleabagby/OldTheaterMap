import axios from 'axios'
import cheerio from 'cheerio'
import fs from 'fs'

// 遞迴
// 先找搜尋列表
const searchresult = []
const getSearch = async (page) => {
  try {
    const response = await axios.get(`http://map.net.tw/theater/page/${page}/?s&geo-radius=100&geo-lat=0&geo-lng=0&categories=0&locations=0&dir-search=yes&pagination=100&orderby=post_date&order=DESC`)
    const $ = cheerio.load(response.data)
    const item = $('.items li')
    for (let i = 0; i < item.length; i++) {
      const thumbnail = item.eq(i).find('.thumbnail img').attr('src')
      const name = item.eq(i).find('.description h3 a').text()
      const url = item.eq(i).find('.description a').attr('href')
      const detail = await getDetails(url)
      searchresult.push({ thumbnail, name, detail })
    }
    getSearch(page + 1)
  } catch (error) {
    console.log(error)
    fs.writeFile('./searchresult2.json', JSON.stringify(searchresult, null, 2), 'utf8', () => {
      console.log('finish')
    })
  }
}
getSearch(1)

const getDetails = async (url) => {
  const res = await axios.get(url)
  const $ = cheerio.load(res.data)
  const text = $('.entry-content.clearfix p').text().trim()
  const line = text.split('\n')
  const jsonBasic = {}
  for (const i in line) {
    if (line[i]) {
      const data = line[i].split('：')
      let key = data[0]
      switch (data[0]) {
        case '戲院名稱':
          key = 'name'
          break
        case '所在地':
          key = 'location'
          break
        case '定位精度':
          key = 'precision'
          break
        case '營運日期（起）':
          key = 'datestart'
          break
        case '營運日期（迄）':
          key = 'dateend'
          break
        case '可考之營運年代':
          key = 'dateback'
          break
        case '建物描述':
          key = 'description'
          break
        case '建物現況':
          key = 'state'
          break
      }
      if (data.length === 2) {
        jsonBasic[key] = data[1]
      } else {
        if (line[i - 1]) {
          const data = line[i - 1].split('：')
          jsonBasic[key] += data[1]
        }
      }
    }
  }
  return jsonBasic
}

// const name = details.eq(i).find()
// const location =
// const precision =
// const datestart
// const dateend
// const dateback
// const year
// const description
// const state
// const source

// 細節頁
// const text = document.querySelector('.entry-content.clearfix p').innerText.trim()

// 基本資料
// 分割行
// const jsonBasic = {}
// const line = text.split('\n')
// for (const i in line) {
//   // 用冒號分割行
//   const data = line[i].split('：')
//   console.log(line[i], data)
//   if (data.length === 2) {
//     jsonBasic[data[0]] = data[1]
//   } else {
//     const data = line[i - 1].split('：')
//     jsonBasic[data[0]] += data[1]
//   }
// }
// console.log(jsonBasic)

// 戲院建築
