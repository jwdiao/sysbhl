<template>
<div class="common_bg common_bg02">
  <CommonHead
    :isShowBackBtn="false"
    :isShowCurrentTime="false"
    :titleText="`${companyName}设备故障信息`"
    @backBtnClick="handleBackBtn"
  />
  <CommonNav current="DeviceFailure" />
  <ul class="tab">
    <li
      v-for="item in tabList" :key="item.value"
      :class="{'tab_item': true,'active':item.value==currentTab.value}"
      @click="handleClickTab(item)">
      {{item.label}}
    </li>
  </ul>
  <div class="common_main common_blockColor padding20">
        <keep-alive>
          <div :is="currentView"></div>
      </keep-alive>
  </div>
</div>
</template>
<script>
import moment from 'moment'
import CommonHead from '@/components/Head'
import CommonNav from '@/components/Nav'
import Kpi from './components/Kpi'
import CurrentFailure from './components/CurrentFailure'
import HistoryFailure from './components/HistoryFailure'
export default {
  name: 'DeviceFailure',
  components: {
    CommonHead,
    CommonNav,
    CurrentFailure,
    HistoryFailure,
    Kpi
  },
  data() {
    return {
      companyCode: '0301', // 选中的公司code
      companyName: '北京桩机', // 选中的公司name
      tabList: [{ // 顶部tab选项
        label: '实时故障',
        value: 'current'
      },{
        label: '历史故障',
        value: 'history'
      },{
        label: 'KPI指标',
        value: 'kpi'
      }],
      currentTab: { // 选中的tab
        label: '实时故障',
        value: 'current'
      },
      currentView: 'CurrentFailure',
    }
  },
  mounted() { 
    
  },
  methods: {
    // 返回按钮回调
    handleBackBtn() {
      // console.log('back btn clicked!')
      this.$router.push('/OverView');
    },
    // tab点击
    handleClickTab(item) {
      // console.log('current tab is:', item.value)
      this.currentTab = item;

      if (this.currentTab.value === 'current') {
        this.currentView = 'CurrentFailure'
      } else if (this.currentTab.value === 'history'){
        this.currentView = 'HistoryFailure'
      } else if (this.currentTab.value === 'kpi'){
        this.currentView = 'Kpi'
      } 
    }
  }
}
</script>
<style lang="scss" scoped>
.device_empty{
  text-align: center;color: #02c9fc;font-size: 16px;width: 100%;height: 90%;padding-top:16%;
}
.tab {
  overflow: hidden;
  position: absolute;top:75px;left:120px;z-index: 10;
}
.tab_item {
  color: #fff;
  background: #02c9fc;
  float: left;
  width: 130px;height:40px;line-height: 40px;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  background: url(../../assets/images/tab_nav-primary.png);
  background-size: 100% 100%;
}
.tab_item.active {
  background: #4bd813;
  background: url(../../assets/images/tab_nav-selected.png);
  background-size: 100% 100%;
}
.deviceFailure_headBox{

}
.deviceFailure_titleBox{
  .device_circle {
    margin-left: 5px;
    font-size: 32px;
    color: rgb(2, 201, 252);
    display: inline-block;
    vertical-align: middle;
  }

  .device_title {
    display: inline-block;
    vertical-align: middle;
    font-size: 28px;
    color: #fff;
    margin-left: 10px;
    font-weight: bold;
  }

  .device_img {
    display: inline-block;
    vertical-align: middle;
    margin-left: 5px;
    padding-top: 8px;
  }
}
.deviceFailure_condition{
  text-align: right;
  padding-top: 10px;
  .search_input{
    display:inline-block;width: 160px;
  }
}
.device_main{
  height: calc(100% - 42px);
  overflow: hidden;
}
.device_table{
  width: 100%;
  // height:710px;
  // height:calc(100% - 52px);
  height: 100%;
  padding-top: 20px;overflow: hidden;
  .table-tr{cursor: default}
  .table-td-red{ color: #ff0014; }

  .common_table{
    // height:calc(100% - 52px)
  }
}

.table-tbodyBox{
  height: calc(100% - 40px - 55px);
  /deep/ .el-scrollbar__wrap{
    overflow-x: hidden;
    overflow-y: scroll
  }
}
.table-td01{width: 5%;}
.table-td02{width: 10%;}
.table-td03{width: 10%;}
.table-td04{width: 10%;}
.table-td05{width: 10%;}
.table-td06{width: 10%;}
.table-td07{width: 10%;}
.table-td08{width: 10%;}
.table-td09{width: 10%;}
.table-td10{width: 15%;}

.device_table-current{
  .table-td01{width: 5%;}
  .table-td02{width: 10%;}
  .table-td03{width: 10%;}
  .table-td04{width: 10%;}
  .table-td05{width: 10%;}
  .table-td07{width: 10%;}
  .table-td08{width: 15%;}
  .table-td09{width: 15%;}
  .table-td10{width: 15%;}
}
</style>

