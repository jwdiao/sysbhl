import {get, post, postExcelFile} from '@/api/request'

// const BASE_URL = 'http://10.88.1.31:9099' // 线上地址
const BASE_URL = 'http://10.88.1.32:9019' // 测试
// const BASE_URL = 'http://10.19.8.22:9099' // 线上地址
// const BASE_URL = 'http://10.19.8.22:9019' // 测试
// const BASE_URL = 'http://10.88.195.81:9019' // 于群
// BASE_URL = 'http://10.88.195.89:9099' // 高杰
// BASE_URL = 'http://10.88.190.36:9099' // 薄志成
// const BASE_URL = 'http://10.88.195.191:9019' // 祁甲元


//***=======================================公共接口 start=================================================== */
// 工艺类型
export const reqGroupList = (companyCode) => get(BASE_URL+'/basicCompanyGroup/find/'+companyCode)

// 工作中心
export const reqCenterList = (companyCode) => post(BASE_URL+'/basicCompanyCenter/findlist',{
  "companyCode": companyCode 
})

// 设备类型即机床类型
export const reqMachineTypeList = (companyCode) => post(BASE_URL+'/machineType/findlist',{
  "pageNum": 0,
  "pageSize": 0,
  "query": {
    "companyCode": companyCode
  }  
})
//***=======================================公共接口 end=================================================== */

//***======================================================Overview首页 start====================================================================== */
// OverView页面所有接口（除了设备列表外）
// 请求类型   01：代表上端主信息  02：代表按工艺类型查询  04：代表按工作中心查询  10：代表日统计  11：代表按月统计 12 ：代表 按年统计
export const reqCountDeviceMain = (companyCode, orgCode, requestType, currentDateStr, dayType) => post(BASE_URL+'/machineConnection/countDeviceMain',{
  companyCode: companyCode,
  orgCode: orgCode,
  requestType: requestType,
  date: currentDateStr,
  dayType: dayType
})
// 设备列表接口
export const reqSelectMachineByMachineStatus = (params) => post(BASE_URL+'/machineConnection/selectMachineByMachineStatus',{
  pageNum: params.pageNum,
  pageSize: params.pageSize,
  query: {
    machineStatus: params.query.machineStatus,
    companyCode: params.query.companyCode,
    date: params.query.date,
    dayType: params.query.dayType
  }
})
// 设备统计
export const reqMachineWorkingPlanCount = (companyCode,date,firstGroupCode, dayType) => post(BASE_URL+'/machineworkingplanMain/machineWorkingPlanCount',{
  "companyCode": companyCode,
  "date": date,
  "firstGroupCode": firstGroupCode,
  "dayType": dayType
})
//***======================================================Overview首页 end====================================================================== */



//***======================================================DeviceList页面 start====================================================================== */
//（作业、待机、故障、关机）列表接口
// 工艺类型 firstGroupCode
export const reqGetMachineInterConnectionSta = (params) => post(BASE_URL+'/machineConnection/getMachineInterConnectionSta',{
  companyCode: params.companyCode, // 子公司code
  requestType: params.requestType, // 01 工艺，02 加工中心 
  firstGroupCode: params.firstGroupCode, // 值
  date: params.date,
  dayType: params.dayType
})

// 加工中心 workCenterCode
export const reqGetMachineInterConnectionStaCenter = (params) => post(BASE_URL+'/machineConnection/getMachineInterConnectionSta',{
  companyCode: params.companyCode,
  requestType: params.requestType, // 01 工艺，02 加工中心
  workCenterCode: params.workCenterCode, // 值F
  date: params.date,
  dayType: params.dayType
})

// 设备类型
export const reqGetMachineInterConnectionStaDeviceType = (params) => post(BASE_URL+'/machineConnection/getMachineInterConnectionSta',{
  companyCode: params.companyCode, // 子公司code
  requestType: params.requestType, // 01 工艺，02 加工中心 
  machineTypeCode: params.machineTypeCode, // 值
  date: params.date,
  dayType: params.dayType
})

//***======================================================DeviceList页面 start====================================================================== */



//***======================================================DeviceDetail页面 start====================================================================== */
// 进度条和饼图 和页面左上角数据
export const machineConnectioninfo = (params) => post(BASE_URL+'/machineConnection/findMachineConnectioninfo',{
  deviceID: params.deviceID, // 设备id
  date: params.date, // 日期
  dayType: params.dayType // 白/夜班
})

//0424设备互联详情页面--右上部分列表所有
export const reqDeviceRightList = (deviceID, date, dayType) => post(BASE_URL+'/jiChuangDataController/getNewDataToPage',{
  deviceID,
  date: date,
  dayType: dayType
})
//0424设备互联详情页面--右上部分列表--进给率单位
export const reqJGLDanwei = (deviceID, date, dayType) => post(BASE_URL+'/machineConnection/getMachineInfoByNo',{
  deviceID,
  date: date,
  dayType: dayType
})

// 1s电流 右下角
export const reqSelectByDeviceIDSs = (params) => post(BASE_URL+'/machineConnection/selectByDeviceIDSs',{
  machineNo: params.deviceID,
  elecType: params.elecType,
  queryType: params.queryType
})
// 2 minutes电流 右下角
export const reqSelectByDeviceID = (params) => post(BASE_URL+'/machineConnection/selectByDeviceID', {
  machineNo: params.deviceID,
  elecType: params.elecType,
  queryType: params.queryType
})
// 2 minutes电流 焊接机器人
export const reqVoltageAndCurrentMinute = (machineNo) => get(BASE_URL+'/machineDetails/find/voltageAndCurrent/minute/'+machineNo)
export const reqVoltageAndCurrentNew = (machineNo) => get(BASE_URL+'/machineDetails/find/voltageAndCurrent/new/'+machineNo)
export const reqFindRobotDetails = (params) => post(BASE_URL+'/machineDetails/findRobotDetails',{
  "date": params.date,
  "dayType": params.dayType,
  "machineNo": params.machineNo
})
//***======================================================DeviceDetail页面 end====================================================================== */

//***======================================================DeviceFailure页面 start====================================================================== */
// 获取设备实时故障信息
export const reqCurrentFailureList = (params) => post(BASE_URL+'/machineConnection/find/all', { 
  "pageNum": params.pageNum,
  "pageSize": params.pageSize,
  "query": {
    "companyCode": params.query.companyCode,
    "beginDate": params.query.beginDate,
    "firstGroupCode": params.query.firstGroupCode,
    // "firstGroupName": params.query.firstGroupName,
    "machineName": params.query.machineName,
    "machineNo": params.query.machineNo,
    "machineStatus": params.query.machineStatus,
    "machineTypeCode": params.query.machineTypeCode,
    // "machineTypeName": params.query.machineTypeName,
    "workCenterCode": params.query.workCenterCode,
    // "workCenterName": params.query.workCenterName
  }
})
// 获取设备历史故障信息
export const reqHistoryFailureList = (params) => post(BASE_URL+'/machineRunDetails/find/all', { 
  "pageNum": params.pageNum,
  "pageSize": params.pageSize,
  "query": {
    "companyCode": params.query.companyCode,
    "beginDate": params.query.beginDate,
    "endDate": params.query.endDate,
    "firstGroupCode": params.query.firstGroupCode,
    // "firstGroupName": params.query.firstGroupName,
    "machineName": params.query.machineName,
    "machineNo": params.query.machineNo,
    "machineModel": params.query.machineModel,
    "machineStatus": params.query.machineStatus,
    "machineTypeCode": params.query.machineTypeCode,
    // "machineTypeName": params.query.machineTypeName,
    "workCenterCode": params.query.workCenterCode,
    // "workCenterName": params.query.workCenterName
  }
})
// kpi指标
export const reqKpiFind = (params) => post(BASE_URL+'/machineConnection/find/kpi', {
  "companyCode": params.companyCode,
  "date": params.date,
  "firstGroupCode": params.firstGroupCode,
  "machineModel": params.machineModel,
  "machineName": params.machineName,
  "machineNo": params.machineNo,
  "workCenterCode": params.workCenterCode
})
//***======================================================DeviceFailure页面 end====================================================================== */

//***======================================================DeviceInfo页面 start====================================================================== */
// 设备运行状态甘特图
export const reqDeviceInfoList = ({companyCode, date, dayType, workCenterCode, firstGroupCode, machineNo, machineName,machineModel }) => post(BASE_URL+'/deviceStatusMap/find',{
  companyCode,
  date,
  dayType,
  workCenterCode,
  firstGroupCode,
  machineNo,
  machineName,
  machineModel,
})
// 单台设备
export const reqSingleDeviceFind = (params) => post(BASE_URL+'/deviceStatusMap/find', {
  "companyCode": params.companyCode,
  "date": params.date,
  "dayType": params.dayType,
  "machineNo": params.machineNo,
  "firstGroupCode":  params.firstGroupCode,
  "machineName":  params.machineName,
  "workCenterCode":  params.workCenterCode
})
// 导出
export const reqDeviceStatusMapDownload = (params) => postExcelFile(BASE_URL+'/deviceStatusMap/download/excel', {
  "companyCode": params.companyCode,
  "date": params.date,
  "dayType": params.dayType,
  "machineModel": params.machineModel,
  "machineNo": params.machineNo,
  "machineName":  params.machineName,
  "firstGroupCode":  params.firstGroupCode,
  "workCenterCode":  params.workCenterCode
})
//***======================================================DeviceInfo页面 end====================================================================== */

//***======================================================EnergyHistory页面 start====================================================================== */
//能耗历史记录
export const reqEnergyHistoryList = ({companyCode, date, dayType}) => post(BASE_URL+'/machineConnection/find/historydetail',{
  companyCode,
  date,
  dayType,
})
//***======================================================EnergyHistory页面 end====================================================================== */

//***======================================================WeekStatistics页面 start====================================================================== */
// 列表
export const reqReportRateFind = (params) => post(BASE_URL+'/reportRate/find',{
  "pageNum": params.pageNum,
  "pageSize": params.pageSize,
  "query": {
    "companyCode": params.query.companyCode,
    "excelShettArr": params.query.excelShettArr,
    "firstGroupCode": params.query.firstGroupCode,
    "machineModel": params.query.machineModel, // 设备型号
    "machineName": params.query.machineName,
    "machineNo": params.query.machineNo,
    "weekType": params.query.weekType,
    "workCenterCode": params.query.workCenterCode,
    // "workCenterName": ""
  }
})
// 获取导出列
export const reqTypecode = (companyCode, typeCode) => post(BASE_URL+'/basicCode/find/companycode/typecode', { 
  compnyCode: companyCode,
  typeCode: typeCode // 04导出参数
})
// 导出Excel
export const reqReportRateExportExcel = (params) => postExcelFile(BASE_URL+'/reportRate/exportExcel',{
  "pageNum": params.pageNum,
  "pageSize": params.pageSize,
  "query": {
    "companyCode": params.query.companyCode,
    "excelShettArr": params.query.excelShettArr,
    "firstGroupCode": params.query.firstGroupCode,
    // "firstGroupName": params.query.firstGroupName,
    "machineName": params.query.machineName,
    "machineNo": params.query.machineNo,
    "weekType": params.query.weekType,
    "workCenterCode": params.query.workCenterCode,
    // "workCenterName": params.query.workCenterName
  }
})


//***======================================================WeekStatistics页面 end====================================================================== */

//***======================================================Statistics排序页面 start===================================================
//设备排序统计  requestType：请求类型 01：开机率 02：作业率 03：利用率
export const reqMachineSortCount = (params) => post(BASE_URL+'/reportSortController/machineSortCount',{
  "beginDate": params.beginDate,
  "companyCode": params.companyCode,
  "endDate": params.endDate,
  "firstGroupCode": params.firstGroupCode,
  // "machineNo": params.machineNo,
  "machineTypeCode": params.machineTypeCode,
  // "orgCode": "03",
  // "requestType": params.requestType,
  "workCenterCode": params.workCenterCode
})
//设备排序列表  requestType：请求类型 01：开机率 02：作业率 03：利用率
export const reqMachineSortList = (params) => post(BASE_URL+'/reportSortController/machineSortList',{
  "pageNum": params.pageNum,
  "pageSize": params.pageSize,
  "query": {
    "beginDate": params.query.beginDate,
    "companyCode": params.query.companyCode,
    "endDate": params.query.endDate,
    "firstGroupCode": params.query.firstGroupCode,
    // "machineNo": params.query.machineNo,
    "machineTypeCode": params.query.machineTypeCode,
    // "orgCode": "03",
    // "requestType": params.query.requestType,
    "workCenterCode": params.query.workCenterCode
  }
})
//单台设备统计
export const reqMachineHourSortCount = (params) => post(BASE_URL+'/reportSortController/machineHourSortCount',{
  "beginDate": params.beginDate,
  "companyCode": params.companyCode,
  "endDate": params.endDate,
  "firstGroupCode": params.firstGroupCode,
  "machineNo": params.machineNo,
  "machineTypeCode": params.machineTypeCode,
  // "orgCode": "03",
  // "requestType": params.requestType,
  "workCenterCode": params.workCenterCode
})
//单台设备列表
export const reqMachineHourSortList = (params) => post(BASE_URL+'/reportSortController/machineHourSortList',{
  "pageNum": params.pageNum,
  "pageSize": params.pageSize,
  "query": {
    "beginDate": params.query.beginDate,
    "companyCode": params.query.companyCode,
    "endDate": params.query.endDate,
    "firstGroupCode": params.query.firstGroupCode,
    "machineNo": params.query.machineNo,
    "machineTypeCode": params.query.machineTypeCode,
    // "orgCode": "03",
    // "requestType": params.query.requestType,
    "workCenterCode": params.query.workCenterCode
  }
})

//***======================================================Statistics排序页面 end===================================================

//***======================================================日报表页面 start===================================================
export const reqDayReport = (params) => post(BASE_URL+'/machineConnection/find/dayReport', {
  "pageNum": params.pageNum,
  "pageSize": params.pageSize,
  "query": {
    "companyCode": params.query.companyCode,
    "date": params.query.date,
    "dayType": params.query.dayType, // 白夜类型
    "firstGroupCode": params.query.firstGroupCode, // 工艺
    "workCenterCode": params.query.workCenterCode, // 加工中心code
    "machineModel": params.query.machineModel, // 设备型号
    "machineNo": params.query.machineNo, // 设备编号
    "machineName": params.query.machineName, // 设备名称
  }
})
export const reqDayReportExport = (params) => postExcelFile(BASE_URL+'/machineConnection/download/dayReport', {
  "pageNum": 0,
  "pageSize": 0,
  "query": {
    "companyCode": params.query.companyCode,
    "date": params.query.date,
    "dayType": params.query.dayType, // 白夜类型
    "firstGroupCode": params.query.firstGroupCode, // 工艺
    "workCenterCode": params.query.workCenterCode, // 加工中心code
    "machineNo": params.query.machineNo, // 设备编号
    "machineName": params.query.machineName, // 设备名称
  }
})




