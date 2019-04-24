const formatTime = date => {

  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()

  return [month, day].map(formatNumber).join('/') + ' ' + [hour, minute,].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 时间戳转日期
const toDate = function (timeStamp) {
  // console.log('转为日期')
  var date = new Date(timeStamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  // console.log(date);
  var Y = date.getFullYear() + '.';
  var M = (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
  var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  return Y + M + D
}

export default formatTime


