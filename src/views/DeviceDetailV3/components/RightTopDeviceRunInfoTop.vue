<template>
    <!--顶部-->
    <ul class="topConent">
        <li class="topConentLi">
          <span  style="width:80px;">主程序</span>
          <em :title="info.mainPgm"> {{info.mainPgm}} </em>
        </li>
        <li class="topConentLi">
          <span style="width:80px;">执行程序</span>
          <em :title="info.curPgm"> {{info.curPgm}} </em>
        </li>
        <li class="topConentLi" >
          <span >执行行号/指标</span>
          <em :title="info.curNcPtr"> {{info.curNcPtr}} </em>
        </li>
        <li class="topConentLi">
          <span>模式</span>
          <em :title="info.mode"> {{info.mode}} </em>
        </li>
        <li class="topConentLi">
          <span>状态</span>
          <em :title="info.ncStatus"> {{info.ncStatus}} </em>
        </li>
        <li class="topConentLi">
          <span>报警</span>
          <em :title="info.alarm"> {{info.alarm}} </em>
        </li>
        <li class="topConentLi">
          <span>急停</span>
          <em :title="info.emg"> {{info.emg}} </em>
        </li>
    </ul>
</template>
<script>
export default {
    name: 'RightTopDeviceRunInfoTop',
    props: {
        info: {
            type: Object,
            default: function() {
                return {
                  mainPgm: '',
                  curPgm: '',
                  curNcPtr: '',
                  mode: '',
                  ncStatus: '',
                  alarm: '',
                  emg: ''
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
  .topConent{
    display: flex;background-color: rgba(0, 186, 255, 0.1);
    height: 70px;
    .topConentLi{
      flex: 1;display: flex;align-items: center;justify-content: center;
      span { font-size: 0.14rem; color: #fff;padding-right:5px; text-align:right;}
      em { 
        font-size: 0.2rem;color: #00c7fa;
        max-width: 170px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>
