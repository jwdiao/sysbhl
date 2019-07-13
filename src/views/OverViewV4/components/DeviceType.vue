<template>
<el-scrollbar style="height:100%;">
  <div class="clear overview-crafttype">
    <div
      v-for="(item, index) in list" :key="index"
      :class="`overview-navConItem ${item.totalNum?'':'overview-navConItem-disable'}`"
      @click="handleClick(item)"
    >
      <div class="clear title">
        <div class="left">
          <em class="num">{{index+1}}.</em>
          <span class="ellipsis name">{{item.machineTypeName}}</span>
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
            <span class="value">{{item.utilization}}%</span>
          </li>
          <!-- <li>
            <span class="label">计划完成率</span>
            <span class="value">{{getItemDataById(items.machineTypeCode).planFinishRate}}%</span>
          </li> -->
          <li>
            <span class="label">总耗电量</span>
            <span class="value">{{item.elcPower}} kw•h</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</el-scrollbar>
</template>
<script>
import moment from 'moment'
import {
  reqCountDeviceMain
} from '@/api'
import { getDayStrFun, calculateRateFun, _SessionStorageObj } from '@/utils'
export default {
  name: 'CraftType',
  props: ['dayType','date'],
  data() {
    return{
      companyCode: '', // 公司编码
      list: [],
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

    if(this.companyCodeStr) { // 页面切换tab时，this.companyCodeStr=''
       this.getCraftTypeData()
    }

    // 10s
    this.refreshDataId = setInterval(() => {
        this.getCraftTypeData()
    }, 10000)
  },
  methods: {
    async getCraftTypeData() {
      this.companyCode = JSON.parse(this.companyCodeStr).value
      // const currentDayStr = getDayStrFun()
      const res = await reqCountDeviceMain(this.companyCode,'','03', this.date, this.dayType)
      if(res&&res.code===200&&res.data.length){
        const resList = res.data
        this.list = resList.map(item => {
          const rateObj = calculateRateFun(item)
          return {
            machineTypeCode: item.machineTypeCode,
            machineTypeName: item.machineTypeName,
            totalNum: rateObj.totalNum, // 总台数
            elcPower: rateObj.elcPower, // 总耗电量
            bootRate: rateObj.bootRate, // 开机率
            workRate: rateObj.workRate, // 作业率
            alarmRate: rateObj.alarmRate, // 故障率
            utilization: rateObj.utilization, // 利用率
          }
        })
      }
    },
    handleClick(item) {
      if (!item.totalNum) {
        return;
      }
      const deviceHomeObj = {type: '03',typeCode: item.machineTypeCode} // 类型 01 工艺，02 加工中心 03 设备类型
      _SessionStorageObj.set('sbhl-OverView-CenterDevicetypeCode',deviceHomeObj)

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
    // padding: 0 25px;
    padding: 0 15px 0 25px;
    float: left;
    margin-left:30px;
    cursor: pointer;
    &:hover{
      background-image: url(../../../assets/images/overview_tabItem-active.png);
    }
    .title{
      height: 55px;line-height: 55px;
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
        // margin-top:5px;
        margin-top: 10px;
        &:first-child{
          margin-top:0;
        }
      }
      
      .label{color:#cccccc;width:110px;text-align: right;display: inline-block;}
      .value{color:#02c9fc;margin-left:10px;}
    }
  }
  .overview-navConItem-disable{
    .title{
      cursor: default;
    }
  }
</style>

