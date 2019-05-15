<template>
  <div class="overviewList">
    <ul class="overview-nav">
      <li class="nav" @click="currentView = 'CraftType'" :class="{active: currentView == 'CraftType'}">工艺类型</li>
      <li class="nav" @click="currentView = 'WorkCenter'" :class="{active: currentView == 'WorkCenter'}">工作中心</li>
      <li class="nav" @click="currentView = 'DeviceStatics'" :class="{active: currentView == 'DeviceStatics'}">设备统计</li>
      <li class="nav" @click="currentView = 'DeviceList'" :class="{active: currentView == 'DeviceList'}">设备列表</li>
    </ul>
    <keep-alive>
      <div class="overview-navCon">
        <div :is="currentView"></div>
      </div>
    </keep-alive>
  </div>
</template>
<script>
import CraftType from './components/CraftType'
import WorkCenter from './components/WorkCenter'
import DeviceList from './components/DeviceList'
import DeviceStatics from './components/DeviceStatics'

export default {
  name: 'OverViewList',
  components: {
    CraftType,
    WorkCenter,
    DeviceList,
    DeviceStatics
  },
  data() {
    return {
      currentView: 'CraftType'
    }
  }
}
</script>
<style lang="scss" scoped>
.overviewList{
  // height:550px;
  // height: 500px;
  height:100%;
  // width:1420px;
  width: 100%;
  padding:20px 10px;
  // background-color:#11213c;

  overflow: hidden;
  .overview-nav{
    width: 40px;
    float: left;
    text-align: center;
    // border:1px solid blue;
    padding: 0 5px;
  }
  .nav{
    color: #fff;cursor: pointer;
    text-align: center;
    font-size:12px;
    width: 30px;
    padding-left:5px;
    padding-right:5px;

    height: 100px;
    padding-top:18px;
    background: url('../../assets/images/overview_tab-primary.png') no-repeat;
    // border: 1px solid red;
    background-size: 100% 100%;
    
    &.active{
      background: url('../../assets/images/overview_tab-active.png') no-repeat;
      background-size: 100% 100%;
    }
  }
  .overview-navCon{
    // border:1px solid red;
    margin-left: 40px;
    height:100%;
    width: calc(100% - 40px);
  }
  .overview-gongyi{

  }

}
</style>

