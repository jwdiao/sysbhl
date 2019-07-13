
<template>
  <div class="sbhl">
    <!-- 头部 start -->
    <div class="sbhl_top">
      <div class="sbhl_imgText" @click="showCompanyDialog = true">
        {{this.companyName}}设备数据互联       
      </div>
      <!--右上角时间-->
      <em class="time" v-text="currentTime"></em>
    </div>
    <CompanyDialog
      :showflag="showCompanyDialog" 
      @confirmcallback="confirmFun"
      @showdialog="showdialogFun"
    />
    <CommonNav current="Overview" />
    <div class="dayOrnight">
      <img v-show="dayType ===1" src="../../assets/images/index_sun.png" />
      <img v-show="dayType ===2" src="../../assets/images/index_moon.png" />
      <span>{{dayType===2? '夜班':'白班'}}</span>
    </div>
    <div class="historyBtn" @click="$router.push('/EnergyHistory')">历史纪录</div>
    
    <!-- 头部 end -->

    <!-- main start -->
    <div class="sbhl_main">
      <div class="sbhl_left">
        <div class="sbhl_left_top">
          <OverviewBaseInfo :device-data="deviceData" />
        </div>
        <div class="sbhl_left_bottom">
          <OverViewList :dayType="dayType" :date="dateStr" />
        </div>
      </div>
      <div class="sbhl_right">
        <OverviewRight :dayInfo="dayEchartsDataRight" :monthInfo="monthEchartsDataRight" :yearInfo="yearEchartsDataRight" />
      </div>
    </div>
    <!-- main end -->

  </div>
</template>

<script>
  import CompanyDialog from '@/components/CompanyDialog.vue'
  import CommonNav from '@/components/Nav'
  import OverviewBaseInfo from './common/OverviewBaseInfo.vue'
  import OverviewRight from './common/OverviewRight.vue'
  import OverViewList from './OverViewList.vue'
  import {
    reqCountDeviceMain,
  } from '../../api'
  import { getCurrentDateTime, getDayStrFun,getDayTypeFun,_SessionStorageObj } from '@/utils'

  export default {
    name: 'OverView',
    data() {
      return {
        companyCode: '0701', // 选中的公司code
        companyName: '三一德力佳', // 选中的公司name
        showCompanyDialog: false, // 是否显示顶部选择子公司
        orgCode:'',   //选中的组织代码

        refreshDataIdTime: '', // 时间刷新
        refreshDataIdAll: '', // 数据刷新

        currentTime: '', // 系统当前时间
        dayType: 1, // 1白班 2夜班
        dateStr: '', // 日期      

        deviceData:{},//左上部分数据

        //右下侧echarts图
        dayEchartsDataRight: {}, // 日
        monthEchartsDataRight: {}, // 月
        yearEchartsDataRight: {}, // 年

        isOpenedNav: false, // 导航是否显示
        NavPageList: [
          {
            id: '001',
            name: '设备故障统计',
            url: '/DeviceFailure'
          },
          {
            id: '003',
            name: '设备排序统计',
            url: '/Statistics'
          },
          {
            id: '004',
            name: '设备状态图谱',
            url: '/DeviceInfo'
          },
          {
            id: '005',
            name: '设备日报表统计',
            url: '/DayStatistics'
          },
          {
            id: '002',
            name: '设备周报表统计',
            url: '/WeekStatistics'
          },          
        ],

      }
    },
    watch: {
      // 子公司改变重新加载数据
      companyCodeStr(val) {
        if(!val) return;
        this.companyCode = JSON.parse(val).value
        this.companyName = JSON.parse(val).label
				//01：左上部分数据
        this.getDeviceAllData(this.companyCode,this.orgCode,'01')
        //10：代表日统计
        this.getDeviceAllData(this.companyCode,this.orgCode,'10')
        //11：代表按月统计
        this.getDeviceAllData(this.companyCode,this.orgCode,'11')
        //12 ：代表 按年统计
        this.getDeviceAllData(this.companyCode,this.orgCode,'12')
			}
    },
    created() {
      // 获取日期
      this.dateStr = getDayStrFun()
      // 获取白夜班（1、白班 2、夜班）
      this.dayType = getDayTypeFun()
    },
    computed: {
			companyCodeStr() {
				return this.$store.state.sbhlOverViewSelectedCompany;
			}
		},
    components: {
      CompanyDialog,
      CommonNav,
      OverviewBaseInfo,
      OverviewRight,
      OverViewList,
    },
    mounted() {
      // 顶部日期时间
      this.currentTime = getCurrentDateTime()
      this.refreshDataIdTime = setInterval(() => {
        this.currentTime = getCurrentDateTime()
      }, 1000)

      // 从localStory里面取选中的公司
      const sbhlSelectedCompanyObj = _SessionStorageObj.get('sbhl-OverView-SelectedCompany')
      if (sbhlSelectedCompanyObj) {
        this.companyCode = sbhlSelectedCompanyObj.value; // 公司编码
        this.companyName = sbhlSelectedCompanyObj.label // 公司名字
      } else {
        _SessionStorageObj.set('sbhl-OverView-SelectedCompany',{label:this.companyName,value:this.companyCode})
      }
      this.$store.commit('changeOverViewSelectedCompanyMut',JSON.stringify({label:this.companyName,value:this.companyCode}))



      
      //01：左上部分数据
      this.getDeviceAllData(this.companyCode,this.orgCode,'01')
      //10：代表日统计
      this.getDeviceAllData(this.companyCode,this.orgCode,'10')
      //11：代表按月统计
      this.getDeviceAllData(this.companyCode,this.orgCode,'11')
      //12 ：代表 按年统计
       this.getDeviceAllData(this.companyCode,this.orgCode,'12')
       
      //给window对象绑定resize事件
      window.addEventListener('resize', this.handleResize);

      this.refreshDataIdAll = setInterval(() => {
        //01：左上部分数据
        this.getDeviceAllData(this.companyCode,this.orgCode,'01')
        //10：代表日统计
        this.getDeviceAllData(this.companyCode,this.orgCode,'10')
        //11：代表按月统计
        this.getDeviceAllData(this.companyCode,this.orgCode,'11')
        //12 ：代表 按年统计
        this.getDeviceAllData(this.companyCode,this.orgCode,'12')
      }, 10000)


      document.body.addEventListener('click',() =>{
        // console.log('yyy:',)
        this.isOpenedNav = false
      })
      
    },
    methods: {
      //左上部分--右侧本日本月本年后台请求数据
      async getDeviceAllData(companyCode, orgCode, requestType){
        this.dayType = getDayTypeFun()
        this.dateStr = getDayStrFun()
        // console.log('this.dateStr:',this.dayType)
        switch (requestType){
          case '01' :  //左上部分所有数据
            const res01 = await reqCountDeviceMain(companyCode, orgCode, requestType,this.dateStr,this.dayType)
            if(res01&&res01.code===200){
              const resData = res01.data

              /**
               * 逻辑规则：
               * 开机时间 = 作业时间 + 待机时间
               * 开机率 = 开机时间 / 自然时间
               * 作业率 = 作业时间 / 开机时间
               * 故障率 = 故障时间/自然时间(老的的规则已经废弃：故障数 / 总数)
               * 利用率 = 开机率 * 作业率
               * 总耗电量 = 消耗电能 / 总数 
               * 在线 = 作业 + 待机 + 故障 + 停机
               * 离线 = 设备总数 - 在线
               * 计划完成率 = 完成工件数/计划工件数
               */
              const totalNum = resData.totalNum || 0 // 设备总数
              const runNum = resData.runNum || 0 // 作业台数
              const idleNum = resData.idleNum || 0 // 待机台数
              const alarmNum = resData.alarmNum || 0 // 故障台数
              const failureTime = resData.alermTime || 0 // 故障时间
              const shutDownNum = resData.shutDownNum || 0 // 关机台数
              const onlineNum = runNum + idleNum + alarmNum + shutDownNum // 在线台数
              const outlineNum = totalNum - onlineNum // 离线台数
              const planProcedureNum = resData.planProcedureNum || 0 // 计划工件数
              const overProcedureNum = resData.overProcedureNum || 0 // 完成工件数


              const idleTime = resData.idleTime || 0 // 待机时间（秒）
              const runTime = resData.runTime || 0 // 作业时间（秒）
              const naturalTime = resData.naturalTime || 0 // 自然时间（秒）
              const naturalTimeHour = naturalTime / 3600 || 0 // 自然时间（小时）             
              const elcPower = resData.elcPower.toFixed(2) || 0 // 总耗电量

              const startUpHour = parseFloat(((idleTime + runTime)/3600).toFixed(2))||0 // 开机小时数（开机时间）
              const workHour = parseFloat((runTime/3600).toFixed(2))||0 // 作业小时数（作业时间）

              let bootRate = 0; // 开机率
              if(startUpHour){
                bootRate = (startUpHour/naturalTimeHour)*100 > 100 ? 100 : (startUpHour/naturalTimeHour*100).toFixed(2) // 开机率
              }

              let workRate = 0; // 作业率
              if(workHour) {
                workRate = (workHour/startUpHour*100) > 100 ? 100: (workHour/startUpHour*100).toFixed(2) // 作业率
              }
              let alarmRate = 0; // 故障率
              if(alarmNum) {
                // alarmRate = (alarmNum/totalNum)*100 > 100 ? 100 :(alarmNum/totalNum*100).toFixed(2) // 故障率
                alarmRate = (failureTime/naturalTime)*100 > 100 ? 100 : (failureTime/naturalTime*100).toFixed(2) // 故障率
              }

              let planFinishRate = 0 // 计划完成率
              if (overProcedureNum) {
                planFinishRate = (overProcedureNum/planProcedureNum)*100 > 100 ? 100 : (overProcedureNum/planProcedureNum*100).toFixed(2) // 计划完成率
              }

              // 利用率
              let liyongLvValue = (parseFloat(bootRate)/100) * (parseFloat(workRate)/100)*100
              let liyongLv = liyongLvValue > 100 ? 100 : liyongLvValue.toFixed(2)


              let deviceDataObj = {
                totalNum: totalNum, // 设备总数
                outlineNum: outlineNum, // 离线台数
                onlineNum: onlineNum, // 在线台数
                planProcedureNum: planProcedureNum, // 计划工件数
                runNum: runNum, // 作业台数
                idleNum: idleNum, // 待机台数
                alarmNum: alarmNum, // 故障数
                shutDownNum: shutDownNum, // 关机
                elcPower: elcPower, // 总耗电量
                startUpHour: startUpHour, // 开机小时数
                workHour: workHour, // 作业小时数
                bootRate: bootRate, // 开机率
                workRate: workRate, // 作业率
                alarmRate: alarmRate, // 故障率
                overProcedureNum: overProcedureNum, // 完成工件数
                planFinishRate: planFinishRate, // 计划完成率
                liyongLv: liyongLv // 利用率
              }
              this.deviceData = {
                ...deviceDataObj
              }
              
            } else {
              this.deviceData = {
                totalNum: 0, // 设备总数
                outlineNum: 0, // 离线台数
                onlineNum: 0, // 在线台数
                runNum: 0, // 作业台数
                idleNum: 0, // 待机台数
                alarmNum: alarmNum, // 故障数
                shutDownNum: 0, // 关机
                elcPower: 0, // 总耗电量
                startUpHour: 0, // 开机小时数
                workHour: 0, // 作业小时数
                bootRate: 0, // 开机率
                workRate: 0, // 作业率
                alarmRate: 0, // 故障率
                overProcedureNum: 0, // 完成工件数
                planFinishRate: 0, // 计划完成率
              }
            }
            break;
          case '10' : //右侧本日
            const res10 = await reqCountDeviceMain(companyCode, orgCode, requestType,this.dateStr,this.dayType)
            if(res10&&res10.code===200){
              this.dayEchartsDataRight = res10.data
            }
            break;
          case '11' : //右侧本月
            const res11 = await reqCountDeviceMain(companyCode, orgCode, requestType,this.dateStr,this.dayType)
            if(res11&&res11.code===200){
              this.monthEchartsDataRight = res11.data
            }
            break;
          case '12' : //右侧本年
            const res12 = await reqCountDeviceMain(companyCode, orgCode, requestType, this.dateStr,this.dayType)
            if(res12&&res12.code===200){
              this.yearEchartsDataRight = res12.data
            }
            break;
        }
      },
      //表头下拉框确定
      confirmFun (sbhlSelectedCompanyObj) {
        this.companyCode = sbhlSelectedCompanyObj.value; // 公司编码
        this.companyName = sbhlSelectedCompanyObj.label // 公司名字
        this.showCompanyDialog = false // 关闭弹窗
        this.$store.commit('changeOverViewSelectedCompanyMut',JSON.stringify(sbhlSelectedCompanyObj))
        _SessionStorageObj.set('sbhl-OverView-SelectedCompany',sbhlSelectedCompanyObj)

      },
      // 监听组件内弹窗状态
      showdialogFun (flag) {
        this.showCompanyDialog = flag
      },

    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize);
    },
    destroyed () {
      clearInterval(this.refreshDataIdTime);
      clearInterval(this.refreshDataIdAll);
    }

  }
</script>
<style lang="scss" scoped>
  .sbhl {
    height: 100%;
    display: flex;
    flex-direction: column;
    background-image: url(../../assets/images/index_bg.png) ;
    background-size: cover;
    color: rgb(255, 255, 255);
    background-repeat: no-repeat;
    overflow: hidden;

    .sbhl_imgText {
      font-size: 0.42rem;
      color: #fff;
      font-weight: bold;
      text-align: center;
    }
    .time {
      width: 270px;
      text-align: left;
    }
    .button {
      width: 90px;
      height: 40px;
      background: url(../../assets/images/common_back.png) no-repeat;
      position: fixed;
      top: 60px;
      left: 15px;
      cursor: pointer;
    }
    .title {
      margin: 0px auto;
    }
    .sbhl_top {
      text-align: center;
      height: 125px;
      padding-top: 20px;
      box-sizing: border-box;
      background-size: 100% 90%;
      background-repeat: no-repeat;
      padding-bottom: 20px;
      .sbhl_imgText {
        display: inline-block;
        cursor: pointer;
      }

      .time {
        font-size: 35px;
        color: #ababab;
        display: inline-block;
        vertical-align: middle;
        position: fixed;
        top: 60px;
        right: 70px;
        z-index: 10;
        font-family: fontnameUnidreamLED;
      }
    }
    .sbhl_main {
      height: calc(100% - 125px);
      .sbhl_left_top {
      }
    }
    /*左侧*/
    .sbhl_left {
      width: 73%;
      float: left;
      height: calc(100% - 20px);
      margin-right: 20px;
      box-sizing: border-box;
      display: flex;flex-direction: column;
      background: rgba(39, 69, 111, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 20px;
      margin-bottom: 20px;
      margin-left: 20px;
      /*左侧上部*/
      &_top {
        /*flex:2;*/
        width: 100%;
        height: 305px;
        /*border: 1px solid rgba(255, 255, 255, 0.1);*/
        .sbhltitle{
          color: #30adff;font-size: 0.18rem;
          margin-top: -10px;
        }
        .statusList{
          /*height: calc(100% - 0.35rem);*/
          height: 273px;
          display: flex;flex-direction: column;
          .statusListTop{
            // flex: 1;
            display: flex;align-items: center;
            background: url("../../assets/images/title-bg.png") no-repeat;
            background-size: 100% 100%;
            margin-bottom:10px;
            padding:5px 0;
            li{
              flex: 1;text-align: center;
              .statusTitle{
                font-size: 0.18rem;color:#d5d5d5;
                margin-top: 5px;
              }
              .statusDiv{
                margin-bottom: 5px;
              }
              .statusCount{
                font-size: 0.32rem;color:#30adff;vertical-align: bottom;
              }
              .statusDanw{
              font-size: 0.19rem;color: #30adff;vertical-align: bottom;
            }
            }
          }
          .statusListBottom{
            display: flex;
            // flex: 1.8;
            /*height: 190px;*/
            li{
              flex: 1;text-align: center;margin-right: 0.1rem;
              padding: 0.1rem;
              background: rgba(42,75,133,0.3);
              .statusNum{
                font-size: 0.24rem;color:#d5d5d5;
              }
              .echartsImg{
                width: 120px;
                height: 120px;
                margin: 0.1rem;
                display: flex;justify-content: center;align-items: center;
                div{
                  margin-top: 5%;
                  color: #02c9fc;
                  .numPoint{
                    color: #02c9fc;font-size: 0.24rem;
                  }
                }
              }
              .open{
                background: url("../../assets/images/echarts_circle-blue.png") no-repeat center;
                background-size: 100% 100%;
              }
              .runHourNum{
                background: url("../../assets/images/echarts_circle-green.png") no-repeat center;
                background-size: 100% 100%;
              }
              .start{
                background: url("../../assets/images/echarts_clock-yellow.png") no-repeat center;
                background-size: 100% 100%;
              }
              .runLV{
                background: url("../../assets/images/echarts_clock-blue.png") no-repeat center;
                background-size: 100% 100%;
              }
              .problem{
                background: url("../../assets/images/echarts_clock-red.png") no-repeat center;
                background-size: 100% 100%;
              }
              .totalE{
                background: url("../../assets/images/echarts_circle-blue.png") no-repeat center;
                background-size: 100% 100%;
              }
            }
            li:nth-last-child(1){
              margin-right: 0;
            }
          }
        }
      }

      &_echarts {
        width: 100%;
        height: calc(100% - 24px);
      }

      /*页面左侧下部*/
      &_bottom {
        /*flex: 3;*/
        height: calc(100% - 305px);
        /*background: rgba(39, 69, 111, 0.3);*/
        // border: 1px solid rgba(255, 255, 255, 0.1);
        width: 100%;overflow:hidden;
      }
    }

    /*右侧部分开始*/
    &_right {
      width: 24%;
      float: left;
      height: 100%;
      padding: 0px 0px 20px 0px;
      .attendance {
        height: 100%;
        display: flex;
        flex-direction: column;
        background: rgba(39, 69, 111, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 20px;
        &-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          .home_title{
            .pointCircle{
              display: inline-block;
              width: 10px;border-radius: 10px;
              height: 10px;line-height: 10px;
              background-color:#02c9fc;
            }
            .dmy{
              font-size: 0.22rem;
              color: #ffffff;
            }
          }

          .day,
          .month,
          .year {
            width: 100%;
            flex: 1
          }
        }

        &-item:nth-of-type(2) {
          margin: 20px 0px;
        }
      }
    }

    /*右侧三个eharts结束*/
    /**/
    .sbhl_overview_navBtn{
      width: 98px;
      height: 40px;
      line-height: 40px;
      border-radius: 20px;
      position: fixed;
      left: 24px;
      top: 60px;
      text-align: center;
      cursor: pointer;
      background-color: #002b55;
      img{ vertical-align: middle; }
    }
    .sbhl_pageNav_box{
      width: 200px;padding:20px 0;
      background-color: rgba(1,19,45,0.9);
      border: 2px solid #0460a5;
      position: absolute;
      top: 110px;
      left: 15px;
      z-index: 100;
      /deep/ .el-scrollbar__wrap{ overflow-x: hidden; }
    }
    .sbhl_pageNav{
      li{
        background: rgba(12,51,103,.1);
        height: 74px;
        line-height: 74px;
        border: 1px solid rgb(27,46,70);
        color: #009aff;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        padding-left: 35px;
        &:hover{ color:#fff; background-color:#4787f6;}
      }
    }
    .dayOrnight{
      position: absolute;top:35px;left:120px;
      img{vertical-align: middle;width: 80px;}
      span{
        font-size:30px;color:#ababab;
        vertical-align: middle;margin-left:-10px;
      }
    }

    .common_navBox{
      top: 58px
    }
  }
  .historyBtn{
    position: fixed;left: 260px;top: 60px;z-index:2;
    display: inline-block;vertical-align: middle;margin-left:10px;
    font-size:16px;width:1.1rem;height:38px;line-height: 38px;
    margin-left:10px;cursor: pointer;text-align: center;
    background:linear-gradient(#176275,#06437d);border-radius: 3px;
  }

</style>
