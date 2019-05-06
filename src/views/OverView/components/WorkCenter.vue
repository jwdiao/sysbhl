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
            <span class="value">{{item.kaijiLv}}%</span>
          </li>
          <li>
            <span class="label">作业率</span>
            <span class="value">{{item.zuoyeLv}}%</span>
          </li>
          <li>
            <span class="label">故障率</span>
            <span class="value">{{item.alarmLv}}%</span>
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
  name: 'WorkCenter',
  data() {
    return{
      currentTime: '', // 系统当前日期
      list: [],
      companyCode: ''
    }
  },
  computed: {
    companyCodeStr() {
      return this.$store.state.sbhlOverViewSelectedCompany;
    }
  },
  watch: {
    companyCodeStr(newvalue) {
      // console.log('workCenter code:',newvalue)
      this.getCraftTypeData()
    }
  },
  mounted() {
    this.currentTime = moment(new Date()).format('YYYY-MM-DD');
    this.getCraftTypeData()
  },
  methods: {
    async getCraftTypeData() {
      this.companyCode = JSON.parse(this.companyCodeStr).value
      this.list = [];
      const res = await reqCountDeviceMain(this.companyCode,'','04',this.currentTime) // 
      // return;
      if(res&&res.code===200&&res.data.length){
        const resList = res.data
        const newList = resList.forEach(item => {

          // debugger;
          const runTime = item.runTime == null ? 0 : item.runTime // 作业时间
          const idleTime = item.idleTime == null ? 0 : item.idleTime // 空闲时间（待机时间）
          const naturalTime = item.naturalTime == null ? 0 : item.naturalTime // 自然时间
          const alarmNum = item.alarmNum == null ? 0 : item.alarmNum // 故障数
          const totalNum = item.totalNum == null ? 0 : item.totalNum // 总数
          const elcPower = item.elcPower == null ? 0 : item.elcPower // 总耗电量

          let kaijiTime = runTime + idleTime; // 开机时间（作业时间+空闲时间）
          // let kaijiLv = kaijiTime / naturalTime; // 开机率（开机时间/自然时间）
          // let zuoyeLv = runTime / kaijiTime // 作业率（作业时间/开机时间）
          // let alarmLv = alarmNum / totalNum // 故障率（故障数/总数）
          // let liyongLv = kaijiLv / zuoyeLv // 利用率（开机率*作业率）

          let kaijiLv = 0; // 开机率（开机时间/自然时间）
          if (kaijiTime == 0) {
            kaijiLv = 0;
          } else {
            kaijiLv = (kaijiTime / naturalTime *100).toFixed(2); // 开机率（开机时间/自然时间）
          }

          let zuoyeLv = 0; // 作业率（作业时间/开机时间）
          if (runTime == 0) {
            zuoyeLv = 0;  
          } else {
            zuoyeLv = (runTime / kaijiTime *100).toFixed(2) // 作业率（作业时间/开机时间）
          }   
          
          // 故障率
          let alarmLv = 0;
          if (alarmNum == 0) {
            alarmLv = 0;
          } else {
            alarmLv = (alarmNum / totalNum *100).toFixed(2) // 故障率（故障数/总数）
          }

          // 利用率
          let liyongLv = 0
          if (kaijiLv == 0) {
            liyongLv = 0
          } else {
            liyongLv = ((kaijiLv/100 * zuoyeLv/100)*100).toFixed(2) // 利用率（开机率/作业率）
          }

          let workCenterName = item.workCenterName

          let obj = {
            workCenterCode: item.workCenterCode,
            workCenterName,
            totalNum,
            kaijiLv,
            zuoyeLv,
            alarmLv,
            liyongLv,
            elcPower
          }
          // 开机率
          this.list.push(obj)

        })
      }
    },
    handleClick(item) {
      // const deviceHomeObj = {type: '02',typeCode: item.workCenterCode} // 类型 01 工艺，02 加工中心 
      const deviceHomeObj = {type: '02',typeCode: item.workCenterName} // 类型 01 工艺，02 加工中心 
      localStorage.setItem('sbhl-DeviceHome-Param',JSON.stringify(deviceHomeObj))
      this.$router.push('/DeviceHome');

    }
  },
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

