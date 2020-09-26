const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 格式化距离
 * */
const formatDis = dis => {
  if (dis < 0){
    console.error('距离不能小于0');
    return '0m'
  }
  let distanceFmt = ''
  if (dis < 1000) {
    distanceFmt = dis + 'm'
  } else {
    // 转换成km
    const disKm =  dis / 1000
    distanceFmt = Math.floor(disKm*100)/100 + 'km' // 保留两位小数
  }
  return distanceFmt
}

module.exports = {
  formatDis,
  formatTime: formatTime
}
