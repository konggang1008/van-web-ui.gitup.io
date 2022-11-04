// 封装的 一些关于时间的方法
function random(low, high) {
  if (arguments.length === 1) {
    high = low
    low = 0
  }
  return Math.floor(low + Math.random() * (high - low))
}

function randomOne(arr) {
  return arr[random(arr.length)]
}

function getDateString(date, fmt = 'yyyy-MM-dd') {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      )
    }
  }
  return fmt
}

function getDateStringCh(date) {
  if (!(date instanceof Date)) {
    return ''
  }
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  return `${year}年${month}月${day}日 ${hour}时`
}

function getWeekStartDateAndEndDateRange() {
  let oneDayLong = 24 * 60 * 60 * 1000
  let now = new Date()
  let mondayTime = now.getTime() - (now.getDay() - 1) * oneDayLong
  let sundayTime = now.getTime() + (7 - now.getDay()) * oneDayLong
  let monday = new Date(mondayTime)
  let sunday = new Date(sundayTime)
  let weekRange = [getDateString(monday), getDateString(sunday)]
  return weekRange
}

export function getRecentDays(duration = 7, fmt = 'yyyy-MM-dd hh:mm:ss') {
  let oneDayLong = 24 * 60 * 60 * 1000
  let nowTime = Date.now()
  let pre7DayTime = nowTime - duration * oneDayLong
  let now = new Date(nowTime)
  let pre7Day = new Date(pre7DayTime)
  return [getDateString(pre7Day, fmt), getDateString(now, fmt)]
}

function getMonthStartDateAndDateRange() {
  let oneDayLong = 24 * 60 * 60 * 1000
  let now = new Date()
  let year = now.getFullYear()
  let monthStartDate = new Date(year, now.getMonth(), 1) //当前月1号
  let nextMonthStartDate = new Date(year, now.getMonth() + 1, 1) //下个月1号
  let days =
    (nextMonthStartDate.getTime() - monthStartDate.getTime()) / oneDayLong //计算当前月份的天数
  let monthEndDate = new Date(year, now.getMonth(), days)
  let monthRange = [getDateString(monthStartDate), getDateString(monthEndDate)]
  return monthRange
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

function resetForm(refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields()
  }
}

function debounce(fn, delay = 1000) {
  let timer = null
  return function () {
    if (timer !== null) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn.call(this)
    }, delay)
  }
}

function randomUUID() {
  return Date.now() + Math.random() + ''
}

const resetTimer = (timer) => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}
import Utils from '@/common/js/utils.js'
export function todayTimer() {
  let nowT = new Date()
  this.nowTime = Utils.toTimeString(nowT)

  let day2 = nowT
  day2.setTime(day2.getTime())
  let end =
    day2.getFullYear() + '-' + (day2.getMonth() + 1) + '-' + day2.getDate()
  let start = Utils.getPreMonthDay(end)
  // this.currentValue3 = [start, end];
  // this.form3.start = s1;
  // this.form3.end = s2;
  // this.formDeviceMsgTotal.start =;
  // this.formDeviceMsgTotal.end = ;
  return [start + ' 00:00:00', end + ' 23:59:59']
}
// json；模板
export function funDownload(content, filename) {
  // 创建隐藏的可下载链接
  var eleLink = document.createElement('a')
  console.log(eleLink);
  eleLink.download = filename
  eleLink.style.display = 'none'
  // 字符内容转变成blob地址
  var blob = new Blob([content])
  eleLink.href = URL.createObjectURL(blob)
  // 触发点击
  document.body.appendChild(eleLink)
  eleLink.click()
  // 然后移除
  document.body.removeChild(eleLink)
}
 // 对象转json字符串
export function objToJson (obj) {
  let newObj = {}
  for (let key in obj) {
    if (key === "id") { newObj[key] = obj[key]; continue; }
    newObj[key] = JSON.stringify(obj[key]);
  }
  // return JSON.stringify(obj)
  return newObj;
}

export default {
  install(vue) {
    this.addGlobalMethods(vue)
  },
  addGlobalMethods(vue) {
    vue.prototype.$random = random
    vue.prototype.$resetForm = resetForm
    vue.prototype.$randomOne = randomOne
    vue.prototype.$getDateString = getDateString
    vue.prototype.$getRecentDays = getRecentDays
    vue.prototype.$getWeekStartDateAndEndDateRange =
      getWeekStartDateAndEndDateRange
    vue.prototype.$getMonthStartDateAndDateRange = getMonthStartDateAndDateRange
    vue.prototype.$debounce = debounce
    vue.prototype.$getDateStringCh = getDateStringCh
    vue.prototype.$randomUUID = randomUUID
    vue.prototype.$resetTimer = resetTimer
    vue.prototype.$todayTimer = todayTimer
    vue.prototype.$funDownload = funDownload
    vue.prototype.$objToJson = objToJson
  },
}
