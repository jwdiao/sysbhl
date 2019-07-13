<template>
  <div>
    <div class="echartA" id="main"></div>
  </div>
</template>
<script>
import echarts from 'echarts';
export default {
  name: 'HH',
  data() {
    return {
      dataEcharts: {
        xAxis: [],
        yValue: []
      }
    }
  },
  mounted() {
    for(var i=0;i<200000;i++) {
      this.dataEcharts.xAxis.push(`x-${i}`)
      this.dataEcharts.yValue.push(i)
    }
    // this.dataEcharts.xAxis = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    // this.dataEcharts.yValue = [820, 932, 901, 934, 1290, 1330, 1320]

    var myChart = echarts.init(document.getElementById('main'))
    var option = {
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        right: '20%'
      },
      

      xAxis: [
        {
          type: 'category',
          data: this.dataEcharts.xAxis
        }
      ],
      yAxis: {
          type: 'value',
      },
      /* dataZoom: [{
          startValue: '0'
      }, {
          type: 'inside'
      }], */
      series: [
        {
          data: this.dataEcharts.yValue,
          type: 'line',
          smooth: true
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
.echartA{
  width: 1800px;
  height: 400px;
}
</style>

