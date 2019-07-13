/**
 * 字段：
 * 作业时间：runTime
 * 待机时间：idleTime
 * 自然时间：naturalTime
 * 故障时间：alermTime
 * 设备总数：totalNum
 * 总耗电量：elcPower
 * **
 * 使用，overview文件夹tab
  * 逻辑规则：
  * 开机时间 = 作业时间 + 待机时间
  * 开机率 = 开机时间 / 自然时间
  * 作业率 = 作业时间 / 开机时间
  * 故障率 = 故障时间/自然时间(老的的规则已经废弃：故障数 / 总数)
  * 利用率 = 开机率 * 作业率
  * 总耗电量 = 消耗电能 / 总数 
  * 在线 = 作业 + 待机 + 故障 + 停机(自然时间-离线时间)
  * 离线 = 设备总数 - 在线
  * 计划完成率 = 完成工件数/计划工件数 
 */
export function calculateRateFun (item) {
    const idleTime = item.idleTime*1 || 0 // 待机时间（秒）
    const runTime = item.runTime*1 || 0 // 作业时间（秒）
    const naturalTime = item.naturalTime*1 || 0 // 自然时间（秒）
    const bootTime = idleTime + runTime // 开机时间
  
    // const alarmNum = item.alarmNum || 0 // 故障数
    const failureTime = item.alermTime*1 || 0 // 故障时间
    const totalNum = item.totalNum*1 || 0 // 总数
    const elcPower = item.elcPower*1 ? (item.elcPower).toFixed(2) : 0 // 总耗电量（null*1=0）
    // const planProcedureNum = item.planProcedureNum || 0 // 计划工件数
    // const overProcedureNum = item.overProcedureNum || 0 // 完成工件数
  
    // 开机率（开机时间/自然时间）
    let bootRate = 0
    if (bootTime) {
      const realBootRate = (bootTime/naturalTime)*100
      bootRate = realBootRate > 100 ? 100 : realBootRate.toFixed(2) // 开机率
    }
  
    // 作业率（作业时间/开机时间）
    let workRate = 0
    if (runTime) {
      const realWorkRate = (runTime/bootTime*100)
      workRate = realWorkRate > 100 ? 100: realWorkRate.toFixed(2) // 作业率
    }
  
    // 故障率（故障时间/总时间）
    let alarmRate = 0
    if (failureTime) {
      const realAlarmRate = (failureTime/naturalTime)*100
      alarmRate = realAlarmRate > 100 ? 100 : realAlarmRate.toFixed(2) // 故障率
    }
  
    // 利用率
    let utilization = ((bootRate/100 * workRate/100)*100).toFixed(2) // 利用率（开机率*作业率）
  
    let obj = {
      totalNum,
      elcPower,
      bootRate,
      workRate,
      alarmRate,
      utilization,
    }
    return obj  
}


// 日统计页面
export function calculateRateFun2 (item) {
    const runTime = item.startupTime*1 || 0 // 作业时间（秒）
    const idleTime = item.standbyTime*1 || 0 // 待机时间|空闲时间（秒）
    const naturalTime = item.naturalTime*1 || 0 // 自然时间（秒）
    const bootTime = idleTime + runTime // 开机时间（作业时间+空闲时间）
    const unLineTime = item.unLineTime*1 || 0 // 离线时间
    const onLineTime = naturalTime - unLineTime // 在线时间
    const failureTime = item.failureTime || 0 // 故障时间============这个字段和别的不一样
    const elcPower = item.totalPower*1 ? (item.totalPower*1).toFixed(2) : 0 // 总耗电量
  
    // 小时
    const onLineTimeHour = onLineTime ? (onLineTime/3600).toFixed(2): 0 // 在线时间(小时)
    const bootTimeHour = bootTime ? (bootTime/3600).toFixed(2): 0 // 开机时间(小时)
    const runTimeHour = runTime ? (runTime/3600).toFixed(2): 0 // 作业时间(小时)
  
    // 在线率（在线时间/自然时间）
    let onLineRate = 0
    if (onLineTime) {
      const realOnLineRate = (onLineTime/naturalTime)*100
      onLineRate = realOnLineRate > 100 ? 100 : realOnLineRate.toFixed(2)
    }
  
    // 开机率（开机时间/自然时间）
    let bootRate = 0
    if (bootTime) {
      const realBootRate = (bootTime/naturalTime)*100
      bootRate = realBootRate > 100 ? 100 : realBootRate.toFixed(2) // 开机率
    }
  
    // 作业率（作业时间/开机时间）
    let workRate = 0
    if (runTime) {
      const realWorkRate = (runTime/bootTime*100)
      workRate = realWorkRate > 100 ? 100: realWorkRate.toFixed(2) // 作业率
    }
    // 故障率（故障时间/总时间）
    let alarmRate = 0
    if (failureTime) {
      const realAlarmRate = (failureTime/naturalTime)*100
      alarmRate = realAlarmRate > 100 ? 100 : realAlarmRate.toFixed(2) // 故障率
    }
  
    // 利用率
    let utilization = 0
    const realUtilization = (bootRate/100 * workRate/100)*100
    utilization = realUtilization > 100 ? 100 : realUtilization.toFixed(2) // 利用率（开机率*作业率）
    
  
    let obj = {
      id: item.machineNo,
      machineModel: item.machineModel, // 设备型号
      machineNo: item.machineNo, // 设备编号
      machineName: item.machineName, // 设备名称
      onLineTime: onLineTimeHour, // 在线时间(自然时间-离线时间)
      onLineRate: onLineRate, // 在线率（在线时间/自然时间）
      bootTime: bootTimeHour, // 开机时间(作业时间+待机时间)
      bootRate: bootRate,// 开机率
      startupTime: runTimeHour, // 作业时间
      startupRate: workRate,// 作业率(作业时间/自然时间)
      utilizationRate: utilization,// 利用率(开机率*作业率)
      alarmRate: alarmRate, // 故障率(故障时间/自然时间)
      elcPower: elcPower // 总耗电量
    }
    return obj
}

//（暂未使用）
export function calculateRateFun3 (item) {
  const runTime = item.startupTime*1 || 0 // 作业时间（秒）
  const idleTime = item.standbyTime*1 || 0 // 待机时间|空闲时间（秒）
  const naturalTime = item.naturalTime*1 || 0 // 自然时间（秒）
  const bootTime = idleTime + runTime // 开机时间（作业时间+空闲时间）

  const failureTime = item.failureTime || 0 // 故障时间============这个字段和别的不一样
  const elcPower = item.totalPower*1 ? (item.totalPower*1).toFixed(2) : 0 // 总耗电量
  // const planProcedureNum = item.planProcedureNum || 0 // 计划工件数
  // const overProcedureNum = item.overProcedureNum || 0 // 完成工件数

  const bootTimeHour = bootTime ? ((bootTime/3600)*1).toFixed(2): 0 // 开机时间(小时)
  const runTimeHour = runTime ? ((runTime/3600)*1).toFixed(2): 0 // 作业时间(小时)
  const idleTimeHour = idleTime ? ((idleTime/3600)*1).toFixed(2): 0 // 作业时间(小时)


  // const runTimeHour = item.startupTime == null ? 0 : parseFloat((item.startupTime/3600).toFixed(2)) // 作业时间(小时)
  // const idleTimeHour = item.standbyTime == null ? 0 : parseFloat((item.standbyTime/3600).toFixed(2)) // 空闲时间（待机时间）小时
  // const naturalTime = item.naturalTime || 0 // 自然时间（秒）
  // const naturalTimeHour = item.naturalTime == null ? 0 : parseFloat(item.naturalTime/3600) // 自然时间（小时）

  // let startUpHour = (runTimeHour + idleTimeHour)? (runTimeHour + idleTimeHour).toFixed(2): 0; // 开机时间（作业时间+空闲时间）


  const planProcedureNum = parseFloat(item.orgCode) || 0 // 计划工件数
  const overProcedureNum = parseFloat(item.orgName) || 0 // 完成工件数
  // const elcPower = item.totalPower ? item.totalPower.toFixed(2):0 // 总耗电量


  // 开机率（开机时间/自然时间）
  let bootRate = 0
  if (bootTime) {
      const realBootRate = (bootTime/naturalTime)*100
      bootRate = realBootRate > 100 ? 100 : realBootRate.toFixed(2) // 开机率
  }

  // 作业率（作业时间/开机时间）
  let workRate = 0
  if (runTime) {
      const realWorkRate = (runTime/bootTime*100)
      workRate = realWorkRate > 100 ? 100: realWorkRate.toFixed(2) // 作业率
  }
  // 故障率（故障时间/总时间）
  let alarmRate = 0
  if (failureTime) {
      const realAlarmRate = (failureTime/naturalTime)*100
      alarmRate = realAlarmRate > 100 ? 100 : realAlarmRate.toFixed(2) // 故障率
  }

  // 利用率
  let utilization = 0
  const realUtilization = (bootRate/100 * workRate/100)*100
  utilization = realUtilization > 100 ? 100 : realUtilization.toFixed(2) // 利用率（开机率*作业率）


  let obj = {
      num: ((this.pageNum - 1) * this.pageSize) + (index + 1),
      id: item.id,
      plcType: item.plcType,
      machineNo: item.machineNo, // 设备编号
      machineName: item.machineName, // 设备名称
      machineStatus: item.machineStatus, // 状态
      startUpHour: startUpHour, // 开机小时数
      runTimeHour: runTimeHour, // 作业小时数
      idleTimeHour: idleTimeHour, // 待机时间(空闲时间（待机时间）)
      bootRate: bootRate,// 开机率
      workRate: workRate,// 作业率
      liyongLv: liyongLv,// 利用率
      alarmRate: alarmRate, // 故障率
      overProcedureNum: overProcedureNum, // 完成工件数
      elcPower: elcPower // 总耗电量
  }
  this.deviceList.push(obj)
}  