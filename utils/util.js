const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}
function timeDate(timestamp) {
  var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate() ;
  return `${[year, month, day].map(formatNumber).join('-')}`
}

function timeDate2(timestamp) {
  var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate() ;
  var hour = date.getHours() ;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

module.exports = {
  formatTime,
  timeDate:timeDate,
  timeDate2:timeDate2
}
