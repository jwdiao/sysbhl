<template>
<el-scrollbar style="height:100%;">
  <ul class="clear overview-crafttype">
    <li
      v-for="(item, index) in list" :key="index"
      :class="`overview-navConItem ${item.totalNum?'':'overview-navConItem-disable'}`"
    >
      <div class="clear title" @click="handleClick(item)">
        <div class="left">
          <em class="num">{{index+1}}.</em>
          <span class="ellipsis name">{{item.workCenterName}}</span>
        </div>
        <div class="right amount">{{item.totalNum}}台</div>
      </div>
      <div class="content">
        <ul>
          <li>
            <span class="label">开机率</span>
            <span class="value">{{item.bootRate}}%</span>
          </li>
          <li>
            <span class="label">作业率</span>
            <span class="value">{{item.workRate}}%</span>
          </li>
          <li>
            <span class="label">故障率</span>
            <span class="value">{{item.alarmRate}}%</span>
          </li>
          <li>
            <span class="label">利用率</span>
            <span class="value">{{item.liyongLv}}%</span>
          </li>
          <li>
            <span class="label">总耗电量</span>
            <span class="value">{{item.elcPower}} kw•h</span>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</el-scrollbar>
</template>
<script>
import moment from 'moment'
import {
  reqCountDeviceMain
} from '@/api'
export default {
  name: 'CraftType',
  data() {
    return{
      currentTime: '', // 系统当前日期
      list: [],
      companyCode: '',
      refreshDataId: null
    }
  },
  computed: {
    companyCodeStr() {
      return this.$store.state.sbhlOverViewSelectedCompany;
    }
  },
  watch: {
    companyCodeStr(newvalue) {
      // console.log('craftType code:',newvalue)
      this.getCraftTypeData()
    }
  },
  mounted() {
    this.currentTime = moment(new Date()).format('YYYY-MM-DD');

    if(this.companyCodeStr) { // 页面切换tab时，this.companyCodeStr=''
       this.getCraftTypeData()
    }

    this.refreshDataId = setInterval(() => {
        this.getCraftTypeData()
      }, 10000)
  },
  methods: {
    async getCraftTypeData() {
      this.companyCode = JSON.parse(this.companyCodeStr).value
      this.list = [];
      const res = await reqCountDeviceMain(this.companyCode,'','02',this.currentTime) // 
      if(res&&res.code===200&&res.data.length){
        const resList = res.data
        const newList = resList.forEach(item => {
          /**
           * 逻辑规则：
           * 开机时间 = 作业时间 + 待机时间
           * 开机率 = 开机时间 / 自然时间
           * 作业率 = 作业时间 / 开机时间
           * 故障率 = 故障数 / 总数
           * 利用率 = 开机率 * 作业率
           * 总耗电量 = 消耗电能 / 总数 
           */

          const idleTime = item.idleTime || 0 // 待机时间（秒）
          const runTime = item.runTime || 0 // 作业时间（秒）
          const naturalTime = item.naturalTime || 0 // 自然时间（秒）
          const naturalTimeHour = naturalTime / 3600 || 0 // 自然时间（小时）

          const alarmNum = item.alarmNum || 0 // 故障数
          const totalNum = item.totalNum || 0 // 总数
          const elcPower = item.elcPower || 0 // 总耗电量

          const startUpHour = parseFloat(((idleTime + runTime)/3600).toFixed(2))||0 // 开机小时数（开机时间）
          const workHour = parseFloat((runTime/3600).toFixed(2))||0 // 作业小时数（作业时间）

          // 开机率（开机时间/自然时间）
          let bootRate = 0
          if (startUpHour) {
            bootRate = (startUpHour/naturalTimeHour)*100 > 100 ? 100 : (startUpHour/naturalTimeHour*100).toFixed(2) // 开机率
          }

          // 作业率（作业时间/开机时间）
          let workRate = 0
          if (workHour) {
            workRate = (workHour/startUpHour*100) > 100 ? 100: (workHour/startUpHour*100).toFixed(2) // 作业率
          }

          // 故障率（故障数/总数）
          let alarmRate = 0
          if (alarmNum) {
            alarmRate = (alarmNum/totalNum)*100 > 100 ? 100 :(alarmNum/totalNum*100).toFixed(2) // 故障率
          }

          // 利用率
          let liyongLv = ((bootRate/100 * workRate/100)*100).toFixed(2) // 利用率（开机率/作业率）

          let workCenterName = '';
          if (item.firstGroupCode === '01') {
            workCenterName = '下料'
          } else if (item.firstGroupCode === '02') {
            workCenterName = '成型'
          } else if (item.firstGroupCode === '03') {
            workCenterName = '焊接'
          } else if (item.firstGroupCode === '04') {
            workCenterName = '热处理'
          } else if (item.firstGroupCode === '05') {
            workCenterName = '机加'
          } else if (item.firstGroupCode === '06') {
            workCenterName = '涂装'
          } else if (item.firstGroupCode === '07') {
            workCenterName = '装配'
          } else if (item.firstGroupCode === '08') {
            workCenterName = '调试'
          }
          let obj = {
            firstGroupCode: item.firstGroupCode,
            workCenterName,
            totalNum,
            elcPower,
            bootRate,
            workRate,
            alarmRate,
            liyongLv
          }
          // 开机率
          this.list.push(obj)

        })
      }
    },
    handleClick(item) {
      if (!item.totalNum) {
        return;
      }
      const deviceHomeObj = {type: '01',typeCode: item.firstGroupCode} // 类型 01 工艺，02 加工中心 
      localStorage.setItem('sbhl-DeviceHome-Param',JSON.stringify(deviceHomeObj))

      this.$router.push('/DeviceList')

    }
  },
  destroyed() {
    clearInterval(this.refreshDataId)
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-scrollbar__wrap{
  overflow-x: hidden;
}
  .overview-crafttype{

  }
  .overview-navConItem{
    width:278px;
    height: 261px;
    background-image: url(../../../assets/images/overview_tabItem-primary.png);
    background-repeat: no-repeat;
    padding: 0 25px;
    float: left;
    margin-left:30px;
    // cursor: pointer;
    .title{
      height: 55px;line-height: 55px;cursor: pointer;
      font-size:16px;padding-left: 20px;padding-right: 10px;padding-top:5px;
      .num{color:#3d88e8;display: inline-block;vertical-align: middle}
      .name{color:#fff;max-width: 140px;display: inline-block;vertical-align: middle}
      .amount{color:#cccccc}
    }
    .content{
      font-size:16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      height: calc(100% - 55px);
      ul{
        margin-top:-15px;
      }
      li{
        margin-top:10px;
        &:first-child{
          margin-top:0;
        }
      }
      
      .label{color:#cccccc;width:100px;text-align: right;display: inline-block;}
      .value{color:#02c9fc;margin-left:10px;}
    }
  }
  .overview-navConItem-disable{
    .title{
      cursor: default;
    }
  }
</style>

