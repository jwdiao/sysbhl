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

    }
  },
  mounted() {
    var myChart = echarts.init(document.getElementById('main'))
    var option = {
      tooltip: {},
      grid: {
        right: '20%'
      },
      toolbox: {
        feature: {
          dataView: {
            show: false,
            readOnly: false
          },
          restore: {
            show: false
          },
          saveAsImage: {
            show: false
          }
        }
      },
      legend: {
        data: ['设备新增数量','产品新增数量','厂商新增数量','注册用户新增数量','XXXXXX']
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWidthLabel: false
          },
          data: ["2016-01",'2016-02','2016-03','2016-04','2016-05','2016-06']
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '设备新增数量',
          min: 0,
          max: 11000,
          position: 'left',
          axisLine: {
            lineStyle: {
              color: '#f1b81f'
            }
          },
          axisLabel: {
            formatter: '{value}'
          }
        },
        {
          type: 'value',
          name: '产品新增数量',
          min: 0,
          max: 200,
          position: 'right',
          axisLine: {
            lineStyle: {
              color: '#1ff138'
            }
          },
          axisLabel: {
            formatter: '{value}'
          }
        },
        {
          type: 'value',
          name: '厂商新增数量',
          min: 0,
          max: 200,
          position: 'right',
          offset: 80,
          axisLine: {
            lineStyle: {
              color: '#291ff1'
            }
          },
          axisLabel: {
            formatter: '{value}'
          }
        },
        {
          type: 'value',
          name: '注册用户新增数量',
          min: 0,
          max: 90000,
          position: 'right',
          offset: 150,
          axisLine: {
            lineStyle: {
              color: '#f11f1f'
            }
          },
          axisLabel: {
            formatter: '{value}'
          }
        },
        {
          type: 'value',
          name: 'XXXXXX',
          min: 0,
          max: 90000,
          position: 'right',
          offset: 220,
          axisLine: {
            lineStyle: {
              color: '#09bbf5'
            }
          },
          axisLabel: {
            formatter: '{value}'
          }
        },
      ],
      series: [
        {
          name: '设备新增数量',
          type: 'line',
          showSymbol: false,
          smooth: true,
          symbol: 'circle',
          symbolSize: 1,
          data: [10000, 2000, 1065, 2000, 3580, 9000]
        },
        {
          name: '产品新增数量',
          type: 'line',
          yAxisIndex: 1,
          showSymbol: false,
          smooth: true,
          symbol: 'circle',
          symbolSize: 1,
          data: [100, 50, 100, 140, 110, 96]
        },
        {
          name: '厂商新增数量',
          type: 'line',
          yAxisIndex: 2,
          showSymbol: false,
          smooth: true,
          symbol: 'circle',
          symbolSize: 1,
          data: [40, 150, 60, 80, 110, 96]
        },
        {
          name: '注册用户新增数量',
          type: 'line',
          yAxisIndex: 3,
          showSymbol: false,
          smooth: true,
          symbol: 'circle',
          symbolSize: 1,
          data: [6000, 10000, 50000, 45555, 88000, 25330]
        },
        {
          name: 'XXXXXX',
          type: 'line',
          yAxisIndex: 4,
          showSymbol: false,
          smooth: true,
          symbol: 'circle',
          symbolSize: 1,
          data: [3000, 500, 5000, 2555, 8000, 5330]
        },
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

