<template>
<div class="device-list" >
  <img src="../../../assets/images/icon_allScreen.png"
  @click="handleEnterFullScreen"
  style="position:absolute;right:-8px;top:0;z-index:2;cursor:pointer" />  
  <el-scrollbar  style="height:90%" class="device-list-scroller">
    <div style="width:2100px;height:100%">
      <div class="table-thead">
        <span class="table-td table-td01">序号</span>
        <span class="table-td table-td02">设备型号</span>
        <span class="table-td table-td02">设备编号</span>
        <span class="table-td table-td03">设备名称</span>
        <span class="table-td table-td04">状态</span>
        <span class="table-td table-td05">开机小时数</span>
        <span class="table-td table-td06">作业小时数</span>
        <span class="table-td table-td07">待机小时数</span>
        <span class="table-td table-td08">开机率</span>
        <span class="table-td table-td09">作业率</span>
        <span class="table-td table-td10">利用率</span>
        <span class="table-td table-td11">故障率</span>
        <span class="table-td table-td12">完成工件数</span>
        <!-- <span class="table-td table-td13">计划完成率</span> -->
        <span class="table-td table-td14">总耗电量(kw.h)</span>
      </div>
      <el-scrollbar class="table-tbodyBox">
        <div class="table-tbody">
          <div
            v-for="(item, index) in deviceList"
            :key="index"
            class="table-tr"
            @click="handleClickItem(item)"
          >
            <span class="table-td table-td01" style="color:rgb(255, 240, 62)">{{item.num}}</span>
            <span class="table-td table-td02">{{item.machineModel}}</span>
            <span class="table-td table-td02">{{item.machineNo}}</span>
            <span class="table-td table-td03 ellipsis">{{item.machineName}}</span>

            <span class="table-td table-td04" :style="{color: getMachineStatusObj(item.machineStatus).color}">
              <i>{{getMachineStatusObj(item.machineStatus).text}}</i>
            </span>
            <span class="table-td table-td05">{{item.startUpHour}}</span>
            <span class="table-td table-td06">{{item.runTimeHour}}</span>
            <span class="table-td table-td07">{{item.idleTimeHour}}</span>
            <span class="table-td table-td08">{{item.bootRate}}%</span>
            <span class="table-td table-td09">{{item.workRate}}%</span>
            <span class="table-td table-td10">{{item.liyongLv}}%</span>
            <span class="table-td table-td11">{{item.alarmRate}}%</span>
            <span class="table-td table-td12">{{item.overProcedureNum}}</span>
            <!-- <span class="table-td table-td13">{{item.planFinishRate}}%</span> -->
            <span class="table-td table-td14">{{item.elcPower}}</span>

       
          </div>
        </div>
      </el-scrollbar>

    </div>
  </el-scrollbar>

  <div class="marginTop20 common-pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[15, 20, 25, 30]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>

  <!-- 查看全屏 -->
  <DeviceListScreen :isshowallscreen="showFullScreen" @isshowcallback="handleisshowCallback" :dayType="dayType" :date="date" />
  <!-- 查看全屏 -->
</div>
</template>
<script>
import moment from 'moment'
import {
  reqSelectMachineByMachineStatus
} from '@/api'
import { getDayStrFun, getMachineStatusText, _SessionStorageObj } from '@/utils'
import DeviceListScreen from './DeviceListScreen.vue'
export default {
  name: 'DeviceList',
  components: {
    DeviceListScreen
  },
  props: ['dayType','date'],
  data() {
    return {
      currentDate: '', // 当前日期
      showFullScreen: false, // 是否全屏显示
      companyCode: '', // 子公司码
      statusValue: '', // 设备状态
      deviceList: [], // 设备列表
      pageNum: 1, // 当前页
      pageSize: 15, // 每页多少条
      total: 0 // 总条数
    }
  },
  computed: {
    companyCodeStr() {
      return this.$store.state.sbhlOverViewSelectedCompany;
    }
  },
  watch: {
    companyCodeStr(val) {
      this.getSelectMachineByMachineStatus()
    }
  },
  mounted() {
    this.getSelectMachineByMachineStatus()
  },
  methods: {
    // 获取设备状态对象
    getMachineStatusObj(machineStatus) {
      let color = ''
      // 1 作业， 2 待机，3 关机，4 故障，5 离线
      if (machineStatus === 1) {
        color = '#42cb84'
      } else if (machineStatus === 2) {
        color = '#ffc31f'
      } else if (machineStatus === 3) {
        color = '#6b6d71'
      } else if (machineStatus === 4) {
        color = '#ff0014'
      } else if (machineStatus === 5) {
        color = '#444445'
      } else {
        color = ''
      }
      return {
        text: getMachineStatusText(machineStatus),
        color
      }
    },
    handleEnterFullScreen() {
      this.showFullScreen = true
    },
    handleisshowCallback(val) {
      this.showFullScreen = val
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getSelectMachineByMachineStatus()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getSelectMachineByMachineStatus()
    },
    async getSelectMachineByMachineStatus() {
      this.companyCode = JSON.parse(this.companyCodeStr).value;
      // this.currentDate = getDayStrFun()
      this.deviceList = []
      const params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        query: {
          machineStatus: this.statusValue,
          companyCode: this.companyCode,
          date: this.date,
          dayType: this.dayType
        }
      }
      const res = await reqSelectMachineByMachineStatus(params)
      if(res && res.code === 200 && res.data && res.data.list.length){
        /**
         * 逻辑规则：
         * 开机时间 = 作业时间 + 待机时间
         * 开机率 = 开机时间 / 自然时间
         * 作业率 = 作业时间 / 开机时间
         * 故障率 = 故障数 / 总数(修改为：故障时间/总时间)
         * 利用率 = 开机率 * 作业率
         * 总耗电量 = 消耗电能 / 总数 
         * 在线 = 作业 + 待机 + 故障 + 停机
         * 离线 = 设备总数 - 在线
         * 计划完成率 = 完成工件数/计划工件数
         */

          const deviceList = res.data.list
          deviceList.map((item, index) => {
            

            const runTimeHour = item.startupTime == null ? 0 : parseFloat((item.startupTime/3600).toFixed(2)) // 作业时间(小时)
            const idleTimeHour = item.standbyTime == null ? 0 : parseFloat((item.standbyTime/3600).toFixed(2)) // 空闲时间（待机时间）小时
            const naturalTime = item.naturalTime || 0 // 自然时间（秒）
            const naturalTimeHour = item.naturalTime == null ? 0 : parseFloat(item.naturalTime/3600) // 自然时间（小时）

            let startUpHour = (runTimeHour + idleTimeHour)? (runTimeHour + idleTimeHour).toFixed(2): 0; // 开机时间（作业时间+空闲时间）

            const failureTime = item.failureTime || 0 // 故障时间
            const planProcedureNum = parseFloat(item.orgCode) || 0 // 计划工件数
            const overProcedureNum = parseFloat(item.orgName) || 0 // 完成工件数
            const elcPower = item.totalPower ? item.totalPower.toFixed(2):0 // 总耗电量

            let bootRate = 0; // 开机率（开机时间/自然时间）
            if (startUpHour == 0) {
              bootRate = 0;
            } else {
              const bootRateTrue = (startUpHour / naturalTimeHour*100)
              bootRate = bootRateTrue > 100 ? 100 : bootRateTrue.toFixed(2); // 开机率（开机时间/自然时间）
            }

            let workRate = 0; // 作业率（作业时间/开机时间）
            if (runTimeHour == 0) {
              workRate = 0;  
            } else {
              const workRateTrue = (runTimeHour / startUpHour*100)
              workRate = workRateTrue > 100 ? 100 : workRateTrue.toFixed(2) // 作业率（作业时间/开机时间）
            }   

            // 利用率
            let liyongLv = 0
            if (bootRate == 0) {
              liyongLv = 0
            } else {
              const liyongLvTrue = ((bootRate/100 * workRate/100)*100)
              liyongLv = liyongLvTrue > 100 ? 100 : liyongLvTrue.toFixed(2) // 利用率（开机率*作业率）
            }

            // 故障率（故障时间/自然时间）
            let alarmRate = 0
            if (failureTime) {
              const alarmRateTrue = (failureTime/naturalTime)*100
              alarmRate = alarmRateTrue > 100 ? 100 : alarmRateTrue.toFixed(2) // 故障率
            }

            let planFinishRate = 0 // 计划完成率
            if (overProcedureNum) {
              const planFinishRateTrue = (overProcedureNum/planProcedureNum)*100
              planFinishRate = planFinishRateTrue > 100 ? 100 : planFinishRateTrue.toFixed(2) // 计划完成率
            }

            let obj = {
              num: ((this.pageNum - 1) * this.pageSize) + (index + 1),
              id: item.id,
              plcType: item.plcType,
              machineModel: item.machineModel, // 设备型号
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
              planFinishRate: planFinishRate, // 计划完成率
              elcPower: elcPower // 总耗电量
            }
            this.deviceList.push(obj)
          })
          
          this.pageNum = res.data.pageNum
          this.pageSize = res.data.pageSize
          this.total = res.data.total
      }
    },
    handleClickItem(item) {
      _SessionStorageObj.set('deviceID',item)
      // this.$router.push('/DeviceDetail');
      const plcType = item.plcType;
      // console.log('plcType:',item)
      if (plcType === '1') {
        this.$router.replace({name:'DeviceDetail',params:{deviceInfoArr:item,fromRouter: '/OverView'}})
      } else if (plcType === '2') {
        this.$router.replace({name:'DeviceDetailXmz',params:{deviceInfoArr:item,fromRouter: '/OverView'}})
      } else if (plcType === '3') {
					this.$router.replace({name:'DeviceDetailRobot',params:{deviceInfoArr:item,fromRouter: '/OverView'}})
			}
    }
  }
}
</script>
<style lang="scss" scoped>
.device-list{
  width:100%;
  height:100%;
  padding:0 20px;
  position: relative;
  /deep/ .el-scrollbar__bar{
    height:15px;
  }
}
/deep/ .el-scrollbar__wrap{
  height:100%;
  overflow:hidden
}
/deep/ .el-scrollbar__view{height:100%}
.table-thead{
  background-color:#2a4b85;
  font-size: 18px;color:#fff;
  padding:8px 0;
  font-weight: bold;
}
.table-tbodyBox{
  height: calc(100% - 40px);
  /deep/ .el-scrollbar__wrap{
    overflow-x: hidden;
    overflow-y: scroll
  }
}
.table-tbody{
  padding-top:20px;
  font-size:16px;
  color:#02c9fc;
  padding-bottom: 20px;
}
.table-tr{
  margin-bottom:2px;
  background-color:#1b3461;
  padding:5px 0;
  cursor: pointer;
}
.table-td{
  display: inline-block;text-align: center;
}
.table-td01{width: 100px;}
.table-td02{width: 150px;}
.table-td03{width: 200px;}
.table-td04{width: 100px;}
.table-td05{width: 150px;}
.table-td06{width: 150px;}
.table-td07{width: 150px;}
.table-td08{width: 150px;}
.table-td09{width: 150px;}
.table-td10{width: 150px;}
.table-td11{width: 150px;}
.table-td12{width: 150px;}
.table-td13{width: 150px;}
.table-td14{width: 150px;}
.device-list-scroller{
    /deep/ .el-scrollbar__bar.is-horizontal{
      height: 14px;
      background: #234176;
    }
    /deep/ .el-scrollbar__bar.is-horizontal>div {
        background: #2069ea;
    }
    /deep/ .el-scrollbar__bar{
      opacity: 1;
      bottom: 0;
    }
    .table-tbody /deep/ .el-scrollbar__bar.is-horizontal{
      // overflow-x: hidden;
      opacity: 0;
    }
}
</style>

