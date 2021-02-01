
const text = document.querySelector('.entry-content.clearfix p').innerText.trim()

// 基本資料
// 分割行
const json = {}
const line = text.split('\n')
for (const i in line) {
  // 用冒號分割行
  const data = line[i].split('：')
  console.log(line[i], data)
  if (data.length === 2) {
    json[data[0]] = data[1]
  } else {
    const data = line[i - 1].split('：')
    json[data[0]] += data[1]
  }
}
console.log(json)

// 戲院建築

// 人事資料

// 資料來源
