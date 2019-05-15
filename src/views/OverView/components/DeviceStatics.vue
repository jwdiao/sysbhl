<template>
  <div class="overview-deviceStaticsBox">
    <div class="searchBox">
      <el-select v-model="deviceTypeValue" placeholder="请选择" class="common_select">
        <el-option
          v-for="item in deviceTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <div class="marginLeft15 inlineBlock common-btn cursorPointer" @click="searchFun">确定</div>
    </div>
    <div id="overview-deviceStatics" class="overview-deviceStatics">222</div>
  </div>
</template>
<script>
import echarts from 'echarts';
export default {
  name: 'DeviceStatics',
  data() {
    return {
      myChart: '', // dom
      myChartData: { // data
        /* xAxis: ["数控立磨A",'数控立磨A','数控立磨A','数控立磨A','数控立磨A','数控立磨A','数控立磨A','数控立磨A','数控立磨A','数控立磨A','数控立磨A'],
        unit: [10000, 2000, 1065, 2000, 3580, 9000, 2000, 1065, 2000, 3580, 9000],
        elcPower: [100, 50, 100, 5140, 110, 96, 50, 100, 140, 110, 96],
        time: [40, 150, 60, 80, 110, 96, 150, 60, 80, 110, 96] */
      },
      deviceTypeValue: '', // 设备类型值
      deviceTypeOptions: [{ // 加工中心下拉值
        value: '全部',
        label: '全部'
      },{
        value: '机加加工中心',
        label: '机加加工中心'
      },{
        value: '调试加工中心',
        label: '调试加工中心'
      }],
    }
  },
  watch: {
    myChartData(val) {
      this.renderEcharts(val)
    }
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById('overview-deviceStatics'))
    var option = {
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        right: '14%',
        left: '5%',
        top: '10%'
      },
      legend: {
        show: false, // 不现实
        data: ['单位/件','平均能耗kw','平均时间h'],
        itemWidth: 20, // 设置图例的宽高
        itemHeight: 10,
        textStyle: { // 标题颜色
          color: '#fff'
        },
        top: 10,
        bottom: 0
      },
      xAxis: [
        {
          type: 'category',
          axisLabel: { // 坐标轴刻度标签的相关设置。
            rotate: 35, // 刻度标签旋转的角度
            margin: 30, // 刻度标签与轴线之间的距离。
            color: '#53e3fd', // 刻度标签文字的颜色
            align: 'center',
          },
          axisPointer: { // 鼠标划上去阴影显示
            type: 'shadow'
          },
          axisTick: { // 坐标轴刻度相关设置。
            interval: 0, // 坐标轴刻度的显示间隔
            lineStyle: {
              color: '#55aefb',
              width: '2', // 坐标轴刻度线宽。
            }
          },
          splitLine: { //网格线
            show: true,
            lineStyle: {
              color: ['#2a436b'],
              // color:['#ff0'],
              width: '1', // 坐标轴刻度线宽。
              type: 'solid'
            }
          },
          axisLine: {  // 控制x轴线的样式
            lineStyle: {
              type: 'solid',
              color: '#55aefb',
              width: '1'
            }
          },
          data: []
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '单位/件',
          min: 0,
          position: 'left', // 位于左侧的y轴
          axisLine: {
            lineStyle: {
              color: '#51ddff' // y轴坐标轴的颜色
            }
          },
          axisLabel: {
            formatter: '{value}'
          },
          splitLine: { //网格线
            show: true,
            lineStyle: {
              color: ['#2a436b'],
              width: '1', // 坐标轴刻度线宽。
              type: 'dotted'
            }
          },
        },
        {
          type: 'value',
          name: '平均能耗kw',
          min: 0,
          position: 'right', // 位于右侧的y轴
          axisLine: {
            lineStyle: {
              color: '#10df2f' // y轴坐标轴的颜色
            }
          },
          axisLabel: {
            formatter: '{value}'
          },
          splitLine: { //网格线
            show: false,
            lineStyle: {
              color: ['#55aefb'],
              width: '1', // 坐标轴刻度线宽。
              type: 'dotted'
            }
          },
        },
        {
          type: 'value',
          name: '平均时间h',
          min: 0,
          position: 'right', // 位于右侧的y轴
          offset: 80,
          axisLine: {
            lineStyle: { 
              color: '#d48000', // y轴坐标轴的颜色
            }
          },
          axisLabel: {
            formatter: '{value}'
          },
          splitLine: { //网格线
            show: false,
            lineStyle: {
              color: ['#55aefb'],
              width: '1', // 坐标轴刻度线宽。
              type: 'dotted'
            }
          },
          
        }
      ],
      series: [
        {
          name: '单位/件',
          type: 'line',
          showSymbol: false, // 是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示。线上的分割符
          smooth: true, // 是否平滑曲线显示
          lineStyle: {
            color: '#51ddff', // 线的颜色。
            width: 2, // 线宽。
            shadowBlur: 5, // 图形阴影的模糊大小
            shadowColor: 'rgba(0,0,0,0.5)', // 阴影颜色
            shadowOffsetX: 0, // 阴影水平方向上的偏移距离。
            shadowOffsetY: 5 // 阴影垂直方向上的偏移距离。
          },
          itemStyle: { // 鼠标放上去浮层圆点的颜色
            normal: {
              color: '#51ddff',
            }
          },
          data: []
        },
        {
          name: '平均能耗kw',
          type: 'line',
          yAxisIndex: 1,
          showSymbol: false, // 是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示。线上的分割符
          smooth: true, // 是否平滑曲线显示
          lineStyle: {
            color: '#10df2f', // 线的颜色。
            width: 2, // 线宽。
            shadowBlur: 5, // 图形阴影的模糊大小
            shadowColor: 'rgba(0,0,0,0.5)', // 阴影颜色
            shadowOffsetX: 0, // 阴影水平方向上的偏移距离。
            shadowOffsetY: 5 // 阴影垂直方向上的偏移距离。
          },
          itemStyle: { // 鼠标放上去浮层圆点的颜色
            normal: {
              color: '#10df2f',
            }
          },
          data: []
        },
        {
          name: '平均时间h',
          type: 'line',
          yAxisIndex: 2,
          showSymbol: false, // 是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示。线上的分割符
          smooth: true, // 是否平滑曲线显示
          lineStyle: {
            color: '#d48000', // 线的颜色。
            width: 2, // 线宽。
            shadowBlur: 5, // 图形阴影的模糊大小
            shadowColor: 'rgba(0,0,0,0.5)', // 阴影颜色
            shadowOffsetX: 0, // 阴影水平方向上的偏移距离。
            shadowOffsetY: 5 // 阴影垂直方向上的偏移距离。
          },
          itemStyle: { // 鼠标放上去浮层圆点的颜色
            normal: {
              color: '#d48000',
            }
          },
          data: []
        }
      ]
    }
    this.myChart.setOption(option)

    this.getEchartsData() // 获取数据
    window.addEventListener('resize', this.handleResize); // resize事件
  },
  methods: {
    // 获取数据
    getEchartsData() {
      setTimeout(() => {
        this.myChartData = {
          xAxis: ["数控立磨A",'数控立磨A','数控立磨A','数控立磨A','数控立磨A','数控立磨A','数控立磨A','数控立磨A','数控立磨A','数控立磨A','数控立磨A'],
          unit: [10000, 2000, 1065, 2000, 3580, 9000, 2000, 1065, 2000, 3580, 9000],
          elcPower: [100, 50, 100, 5140, 110, 96, 50, 100, 140, 110, 96],
          time: [40, 150, 60, 80, 110, 96, 150, 60, 80, 110, 96]
        }
      },2000)
    },
    // 渲染echarts
    renderEcharts(myChartData) {
      this.myChart.setOption({
        xAxis: [
          {
            data: myChartData.xAxis,
          }
        ],
        series: [
          {
            data: myChartData.unit
          },
          {
            data: myChartData.elcPower
          },
          {
            data: myChartData.time
          },
        ]
      })
    },
    // 确定
    searchFun() {
      this.getEchartsData()
    },
    // resize事件
    handleResize() {
      this.myChart.resize()
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
}
</script>
<style lang="scss" scoped>
.overview-deviceStaticsBox{
  width: 100%;height: 100%;
}
.searchBox{
  height: 50px;text-align: right;padding-top:10px;
  // margin-right:5%;
}
.overview-deviceStatics{
  width: 100%;height: calc(100% - 50px);
  // border:1px solid red;
}
</style>

