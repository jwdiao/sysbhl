<template>
  <div style="width:1298px;height:400px;" v-bar>
    <!-- <div class="table-thead">
      <span class="table-th">序号2</span>
      <span class="table-th">设备编号</span>
      <span class="table-th">设备名称</span>
      <span class="table-th">状态</span>
      <span class="table-th">操作模式</span>
      <span class="table-th">主轴转速(rpm)</span>
      <span class="table-th">进给倍率(%)</span>
      <span class="table-th">日开机时间(min)</span>
      <span class="table-th">日作业时间(min)</span>
      <span class="table-th">可用率</span>
    </div> -->

    <div class="table-tbody" >
      <div
        v-for="(item, index) in 20"
        :key="index"
        class="table-tr"
      >
        <span class="table-td">1</span>
        <span class="table-td">A123325RT5Y45</span>
        <span class="table-td">设备名称</span>
        <span class="table-td">故障</span>
        <span class="table-td">手动输入(MDI)</span>
        <span class="table-td">65778</span>
        <span class="table-td">120</span>
        <span class="table-td">340</span>
        <span class="table-td">120</span>
        <span class="table-td">80</span>
      </div>
    </div>



  </div>

</template>
<script>
export default {
  name: 'DeviceList'
}
</script>
<style lang="scss" scoped>

.vb > .vb-dragger {
    z-index: 5;
    width: 12px;
    right: 0 !important;
    height:148px !important;
    background-color:red;
}

.vb > .vb-dragger > .vb-dragger-styler {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: rotate3d(0,0,0,0);
    transform: rotate3d(0,0,0,0);
    -webkit-transition:
        background-color 100ms ease-out,
        margin 100ms ease-out,
        height 100ms ease-out;
    transition:
        background-color 100ms ease-out,
        margin 100ms ease-out,
        height 100ms ease-out;
    background-color: rgba(48, 121, 244,.1);
    margin: 5px 5px 5px 0;
    border-radius: 20px;
    height: calc(100% - 10px);
    display: block;
}

.vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.3);
}

.vb > .vb-dragger:hover > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
    margin: 0px;
    height: 100%;
}

.vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
    margin: 0px;
    height: 100%;
}

.vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
}


.table-thead{
  background-color:#2a4b85;
  font-size: 18px;color:#4095fe;
}
.table-tbodyBox{
  /deep/ .el-scrollbar__wrap{
    overflow-x: hidden;
  }
}
.table-tbody{
  background-color:#1b3461;
  font-size:16px;color:#02c9fc;
}
.table-tr{
  margin-bottom:12px;
}
.table-th,.table-td{
  width: 160px;display: inline-block;text-align: center;
}
.table-td{
  width: 160px;
}
</style>

