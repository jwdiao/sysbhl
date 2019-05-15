<template>
  <div style="background-color:#11213c;">
    <div class="echartA" id="main"></div>
  </div>
</template>
<script>
import echarts from 'echarts';
export default {
  name: 'HH',
  data() {
    return {

    }
  },
  mounted() {
    var myChart = echarts.init(document.getElementById('main'))
    var option = {
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        right: '20%'
      },
      legend: {
        show: false,
        data: ['单位/件','平均能耗kw','平均时间h']
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
          data: ["数控立磨A",'数控立磨A','数控立磨A','数控立磨A','数控立磨A','数控立磨A','数控立磨A','数控立磨A','数控立磨A','数控立磨A','数控立磨A']
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '单位/件',
          min: 0,
          // max: 11000,
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
          // max: 200,
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
          // max: 200,
          position: 'right', // 位于右侧的y轴
          offset: 70,
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
          /* areaStyle: { // 区域填充样式。
            color: '#ff0',
            origin: 'start', // 可选值包括 'auto'（默认值）、 'start'、 'end'。
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowBlur: 10, // 图形阴影的模糊大小
            shadowColor: '',
            shadowOffsetX: '', // 阴影水平方向上的偏移距离。
            shadowOffsetY: '', // 阴影垂直方向上的偏移距离。
            opacity: 1, // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形
          }, */
          data: [10000, 2000, 1065, 2000, 3580, 9000, 2000, 1065, 2000, 3580, 9000]
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
          data: [100, 50, 100, 140, 110, 96, 50, 100, 140, 110, 96]
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
          data: [40, 150, 60, 80, 110, 96, 150, 60, 80, 110, 96]
        }
      ]
    }
    myChart.setOption(option)
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
body{
  
}
.echartA{
  width: 800px;
  height: 400px;
}
</style>

