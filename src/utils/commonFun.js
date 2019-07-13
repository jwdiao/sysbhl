import moment from 'moment'
// 获取系统当前时间
export function getCurrentDateTime() {
  return moment().format('YYYY-MM-DD HH:mm:ss');
}

/**
 * 方法名：getDayTypeFun
 * 描述：判断是白班还是夜班
 * 调用：
 * 1、import { getDayTypeFun } from '../../utils/commonFun'
 * 2、const dayType = getDayTypeFun()
 */
export function getDayTypeFun () {
  var timeY = moment(new Date()).format('HH')
  let dayType = ''
  if (timeY >= 8 && timeY < 20) {
    dayType = 1 // '白班'
  } else {
    dayType = 2 // '夜班'
  }
  return dayType
}


/**
 * 方法名：getDayStrFun
 * 描述：得到当前日期早8晚8用（日期规则：2019.06.11 8：00 ~ 2019.06.12 8：00 日期为2019.06.11）
 */
export function getDayStrFun () {
  let currentDateStr = ''; // 目标日期
  const todayDateStr = moment(new Date()).format('YYYY-MM-DD'); // 今日日期
  const yesterdayStr = moment().subtract(1, 'day').format('YYYY-MM-DD'); // 昨日
  const currentHour = moment().hour() // 值从0~23
  // console.log('currentHour:',currentHour)
  // console.log('yesterdayStr:',yesterdayStr)
  // 如果当前小时<8时，日期取昨天的日期，如果当前小时>=8小时，日期取当前日期
  if (currentHour < 8) {
    currentDateStr = yesterdayStr
  } else {
    currentDateStr = todayDateStr
  }
  return 	currentDateStr
}

/**
 * 方法名：formatDurationTime
 * 参数：秒
 * 描述：秒转（时：分：秒）
 */
export function formatDurationTime(duration) {
  let hh = parseInt(duration / 3600);
  if (hh < 10) hh = "0" + hh;
  let mm = parseInt((duration - hh * 3600) / 60);
  if (mm < 10) mm = "0" + mm;
  let ss = parseInt((duration - hh * 3600) % 60);
  if (ss < 10) ss = "0" + ss;
  let str = (hh + "小时") + (mm + "分") + ss + "秒 ";
  // let str = (hh > 0 ? hh + "小时 " : '') + (mm > 0 ? mm + "分 " : '') + ss + "秒 ";
  // let str = (hh > 0 ? hh + ":" : '') + (mm > 0 ? mm + ":" : '') + ss + "";
  // let str = hh+':'+mm+':'+ss
  if (duration >= 0) {
      return str;
  } else {
      return '00:00:00';
  }
}
/**
 * 方法名：formatDurationTime
 * 参数：秒
 * 描述：秒转（时：分：秒）
 */
export function formatDurationTime2(duration) {
  let hh = parseInt(duration / 3600);
  if (hh < 10) hh = "0" + hh;
  let mm = parseInt((duration - hh * 3600) / 60);
  if (mm < 10) mm = "0" + mm;
  let ss = parseInt((duration - hh * 3600) % 60);
  if (ss < 10) ss = "0" + ss;
  // let str = (hh + "小时") + (mm + "分") + ss + "秒 ";
  // let str = (hh > 0 ? hh + "小时 " : '') + (mm > 0 ? mm + "分 " : '') + ss + "秒 ";
  // let str = (hh > 0 ? hh + ":" : '') + (mm > 0 ? mm + ":" : '') + ss + "";
  let str = hh+':'+mm+':'+ss
  if (duration >= 0) {
      return str;
  } else {
      return '00:00:00';
  }
}

/**
 * 通过设备状态标识得到设备状态文字
 * @param {*}  
 */
export function getMachineStatusText(machineStatus) {
    // 1 作业， 2 待机，3 关机，4 故障，5 离线
    if (machineStatus == 1) {
      return '作业'
    } else if (machineStatus == 2) {
      return '待机'
    } else if (machineStatus == 3) {
      return '关机'
    } else if (machineStatus == 4) {
      return '故障'
    } else if (machineStatus == 5) {
      return '离线'
    } else {
      return ''
    }
} 

