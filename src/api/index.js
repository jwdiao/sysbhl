import {get, post, postExcelFile} from '@/api/request'

// const BASE_URL = 'http://10.19.8.22:9099' // 线上地址
// const BASE_URL = 'http://10.88.195.81:9019' // 于群
const BASE_URL = 'http://10.19.8.22:9019' // 测试
// BASE_URL = 'http://10.88.195.89:9099' // 高杰
// BASE_URL = 'http://10.88.190.36:9099' // 薄志成
// const BASE_URL = 'http://10.88.195.191:9019' // 祁甲元

//***======================================================Overview页面 start====================================================================== */
// OverView页面所有接口（除了设备列表外）
// 请求类型   01：代表上端主信息  02：代表按工艺类型查询  04：代表按工作中心查询  10：代表日统计  11：代表按月统计 12 ：代表 按年统计
export const reqCountDeviceMain = (companyCode, orgCode, requestType, currentDateStr) => post(BASE_URL+'/machineConnection/countDeviceMain',{
  companyCode: companyCode,
  orgCode: orgCode,
  requestType: requestType,
  date: currentDateStr
})
// 设备列表接口
export const reqSelectMachineByMachineStatus = (machineStatus, pageNum, pageSize, companyCode, date) => post(BASE_URL+'/machineConnection/selectMachineByMachineStatus',{
  pageNum: pageNum,
  pageSize: pageSize,
  query: {
    machineStatus: machineStatus,
    companyCode: companyCode,
    date: date
  }
})
// 设备统计
export const reqMachineWorkingPlanCount = (companyCode,date,firstGroupCode) => post(BASE_URL+'/machineworkingplan/machineWorkingPlanCount',{
  "companyCode": companyCode,
  "date": date,
  "firstGroupCode": firstGroupCode
})
//***======================================================Overview页面 end====================================================================== */



//***======================================================DeviceList页面 start====================================================================== */
//（作业、待机、故障、关机）列表接口
// 工艺类型 firstGroupCode
export const reqGetMachineInterConnectionSta = (params) => post(BASE_URL+'/machineConnection/getMachineInterConnectionSta',{
  companyCode: params.companyCode, // 子公司code
  requestType: params.requestType, // 01 工艺，02 加工中心 
  firstGroupCode: params.firstGroupCode, // 值
  date: params.date
})

// 加工中心 workCenterCode
export const reqGetMachineInterConnectionStaCenter = (params) => post(BASE_URL+'/machineConnection/getMachineInterConnectionSta',{
  companyCode: params.companyCode,
  requestType: params.requestType, // 01 工艺，02 加工中心
  workCenterCode: params.workCenterCode, // 值
  date: params.date
})

//***======================================================DeviceList页面 start====================================================================== */



//***======================================================DeviceDetail页面 start====================================================================== */
// 进度条和饼图 和页面左上角数据
export const machineConnectioninfo = (params) => post(BASE_URL+'/machineConnection/findMachineConnectioninfo',{
  onemachineNo: params.onemachineNo, // 设备id
  date: params.date // 日期
})

//0424设备互联详情页面--右上部分列表所有
export const reqDeviceRightList = (deviceID) => post(BASE_URL+'/jiChuangDataController/getNewDataToPage',{deviceID})
//0424设备互联详情页面--右上部分列表--进给率单位
export const reqJGLDanwei = (deviceID) => post(BASE_URL+'/machineConnection/getMachineInfoByNo',{deviceID})


// 1s电流 右下角
export const reqSelectByDeviceIDSs = (deviceID) => post(BASE_URL+'/machineConnection/selectByDeviceIDSs',{ machineNo: deviceID })
// 2 minutes电流 右下角
export const reqSelectByDeviceID = (deviceID) => post(BASE_URL+'/machineConnection/selectByDeviceID', { machineNo: deviceID })
//***======================================================DeviceDetail页面 end====================================================================== */

//***======================================================DeviceFailure页面 start====================================================================== */
// 获取工艺类型和机床类型下拉选项
export const reqTypecode = (companyCode, typeCode) => post(BASE_URL+'/basicCode/find/companycode/typecode', { 
  compnyCode: companyCode,
  typeCode: typeCode // 01：工艺类型 ,02：机床类型, 03:加工中心
})
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
    "machineStatus": params.query.machineStatus,
    "machineTypeCode": params.query.machineTypeCode,
    // "machineTypeName": params.query.machineTypeName,
    "workCenterCode": params.query.workCenterCode,
    // "workCenterName": params.query.workCenterName
  }
})
//***======================================================DeviceFailure页面 start====================================================================== */


//***======================================================WeekStatistics页面 start====================================================================== */
export const reqReportRateFind = (params) => post(BASE_URL+'/reportRate/find',{
  "pageNum": params.pageNum,
  "pageSize": params.pageSize,
  "query": {
    "companyCode": params.query.companyCode,
    "excelShettArr": params.query.excelShettArr,
    "firstGroupCode": params.query.firstGroupCode,
    // "firstGroupName": "",
    "machineName": params.query.machineName,
    "machineNo": params.query.machineNo,
    "weekType": params.query.weekType,
    "workCenterCode": params.query.workCenterCode,
    // "workCenterName": ""
  }
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