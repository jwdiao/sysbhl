<template>
    <div class="attendance">
      <div class="attendance-item">
        <div class="home_title "> <div class="pointCircle"></div><em class="dmy">&nbsp;本日</em></div>
        <div class="day" id="sbhl-day-echarts"></div>
      </div>
      <div class="attendance-item">
        <div class="home_title "><div class="pointCircle"></div><em class="dmy">&nbsp;本月</em></div>
        <div class="month" id="sbhl-mouth-echarts"></div>
      </div>
      <div class="attendance-item">
        <div class="home_title "><div class="pointCircle"></div><em class="dmy">&nbsp;本年</em></div>
        <div class="year" id="sbhl-year-echarts"></div>
      </div>
    </div>  
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'OverviewRight',
  props: {
    'dayInfo': {
      type: Object
    },
    'monthInfo': {
      type: Object
    },
    'yearInfo': {
      type: Object
    }
  },
  data() {
    return {
      //右下侧echarts图
      sbhlDayEcharts: '', // 日
      sbhlMonthEcharts: '', // 月
      sbhlYearEcharts: '', // 年      
      allEchartsArr:[],
    }
  },
  watch: {
    'dayInfo': {
      handler: function(newVal, oldVal) {
        // console.log('dayInfo:',newVal,oldVal)
        const echartsData = this.handleData(newVal)
        this.renderDayEcharts(this.sbhlDayEcharts, echartsData)
      },
    },
    "monthInfo": {
      handler: function(newVal, oldVal) {
        // console.log('monthInfo:',newVal)
        const echartsData = this.handleData(newVal)
        this.renderMonthEcharts(this.sbhlMonthEcharts, echartsData)
      },
    },
    "yearInfo": {
      handler: function(newVal, oldVal) {
        // console.log('yearInfo:',newVal)
        const echartsData = this.handleData(newVal)
        this.renderYearEcharts(this.sbhlYearEcharts, echartsData)
      },
    },
  },
  mounted() {
    // console.log('dayInfo:',this.dayInfo)
      // 右侧====echarts图
      this.sbhlDayEcharts = echarts.init(document.getElementById('sbhl-day-echarts'));
      this.allEchartsArr.push(this.sbhlDayEcharts)
      this.sbhlMonthEcharts = echarts.init(document.getElementById('sbhl-mouth-echarts'));
      this.allEchartsArr.push(this.sbhlMonthEcharts)
      this.sbhlYearEcharts = echarts.init(document.getElementById('sbhl-year-echarts'));
      this.allEchartsArr.push(this.sbhlYearEcharts)

      //给window对象绑定resize事件
      window.addEventListener('resize', this.handleResize);
  },
  methods: {
    handleData(data) {
        return {
          xData: data.xAxis,
          startUpRateArr: data.startUpRateArr.map(item => item ? (item>100 ? 100 : item) : 0), // 开机率
          runRateArr: data.runRateArr.map(item => item ? (item>100 ? 100 : item) : 0), // 作业率
          powerUseArr: data.powerUseArr.map(item => item ? item.toFixed(2) : 0) // 能耗
        }
    },
    //本日
    renderDayEcharts(myChart, data){
      var option = {
        legend: {
          data: ['开机率(%)', '作业率(%)', '能耗(kw•h)'],  //晚6点
          show: true,
          itemWidth: 20, // 设置图例的宽高.
          itemHeight: 10,
          textStyle: { // 标题颜色
            color: '#fff'
          },
          top: 10,
          bottom: 0
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        grid: { top: '25%', left: '10%', right: '12%', bottom: '20%'},
        xAxis: [
          {
            type: 'category',
            data: data.xData,
            axisLine: { // 控制x轴线的样式
              lineStyle: {
                type: 'solid',
                color: '#2c4264',
                width: '1'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#2fdaeb'
              },
              interval: 0,
              // showMaxLabel: true, //是否显示最大 tick 的 label
              rotate: 75
            },
            axisTick: { // 控制x轴坐标刻度不显示
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 0,
            max:100,
            // max: data.maxY,
            // interval: data.intervalY,
            name: '%',
            nameTextStyle: {
              color: '#fff',
              padding:[0,0,0,-30]
            },
            axisLine: { // 控制y轴线的样式
              lineStyle: {
                type: 'solid',
                color: '#2c4264',
                width: '1'
              }
            },
            axisLabel: {
              formatter: '{value} ',
              textStyle: {
                color: '#fff'
              },
              showMinLabel: true, // 是否显示最小 tick 的 label
              showMaxLabel: true, // 是否显示最大 tick 的 label
              verticalAlign: 'middle'
            },
            splitLine: { // 网格线
              show: true,
              lineStyle: {
                color: ['#2c4264'],
                width: 1,
                type: 'dotted'
              }
            }
          },
          {
            type: 'value',
            min: 0,
            // interval: data.intervalY,
            name: 'kw•h',
            nameTextStyle: {
              color: '#fff',
              padding:[0,0,0,35]
            },
            axisLine: { // 控制y轴线的样式
              lineStyle: {
                type: 'solid',
                color: '#2c4264',
                width: '1'
              }
            },
            axisLabel: {
              formatter: '{value} ',
              textStyle: {
                color: '#fff'
              },
              showMinLabel: true, // 是否显示最小 tick 的 label
              showMaxLabel: true, // 是否显示最大 tick 的 label
              verticalAlign: 'middle'
            },
            splitLine: { // 网格线
              show: true,
              lineStyle: {
                color: ['#2c4264'],
                width: 1,
                type: 'dotted'
              }
            }
          }
        ],
        series: [
          {
            name: '开机率(%)',
            type: 'bar',
            data: data.startUpRateArr,
            itemStyle: {
              normal: {
                color: '#FCE300'
              }
            },
            barWidth: 4,  // 控制柱子的宽度
            barGap: '10%' // 控制柱子的间隔
          },
          {
            name: '作业率(%)',
            type: 'bar',
            data: data.runRateArr,
            itemStyle: {
              normal: {
                color: '#0189ff',
              }
            },
            barWidth: 4,  // 控制柱子的宽度
            barGap: '10%' // 控制柱子的间隔
          },
          {
            name: '能耗(kw•h)',
            type: 'bar',
            data: data.powerUseArr,
            itemStyle: {
              normal: {
                color: '#ff0044'
              }
            },
            barWidth: 4,  // 控制柱子的宽度
            barGap: '10%', // 控制柱子的间隔
            yAxisIndex:1,//通过这个来设置多轴时的展示
          },
        ]
      }
      myChart.setOption(option)
    }, 
    // 本月
    renderMonthEcharts(myChart, data){
      var option = {
        legend: {
          data: ['开机率(%)', '作业率(%)', '能耗(kw•h)'],  //  本月
          show: true,
          itemWidth: 20, // 设置图例的宽高
          itemHeight: 10,
          textStyle: { // 标题颜色
            color: '#fff'
          },
          top: 10,
          bottom: 0
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        grid: { top: '25%', left: '10%', right: '10%', bottom: '20%'},
        xAxis: [
          {
            type: 'category',
            data: data.xData,
            axisLine: { // 控制x轴线的样式
              lineStyle: {
                type: 'solid',
                color: '#2c4264',
                width: '1'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#2fdaeb'
              },
              interval: 0,
              rotate: 75
            },
            axisTick: { // 控制x轴坐标刻度不显示
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 0,
            max:100,
            name: '%',
            nameTextStyle: {
              color: '#fff',
              padding:[0,0,0,-30]
            },
            axisLine: { // 控制y轴线的样式
              lineStyle: {
                type: 'solid',
                color: '#2c4264',
                width: '1'
              }
            },
            axisLabel: {
              formatter: '{value} ',
              textStyle: {
                color: '#fff'//#2fdaeb
              },
              showMinLabel: true, // 是否显示最小 tick 的 label
              showMaxLabel: true, // 是否显示最大 tick 的 label
              verticalAlign: 'middle'
            },
            splitLine: { // 网格线
              show: true,
              lineStyle: {
                color: ['#2c4264'],
                width: 1,
                type: 'dotted'
              }
            }
          },
          {
            type: 'value',
            min: 0,
            // max: data.maxY,
            // interval: data.intervalY,
            name: 'kw•h',
            nameTextStyle: {
              color: '#fff',
              padding:[0,0,0,35]
            },
            axisLine: { // 控制y轴线的样式
              lineStyle: {
                type: 'solid',
                color: '#2c4264',
                width: '1'
              }
            },
            axisLabel: {
              formatter: '{value} ',
              textStyle: {
                color: '#fff'//#2fdaeb
              },
              showMinLabel: true, // 是否显示最小 tick 的 label
              showMaxLabel: true, // 是否显示最大 tick 的 label
              verticalAlign: 'middle'
            },
            splitLine: { // 网格线
              show: true,
              lineStyle: {
                color: ['#2c4264'],
                width: 1,
                type: 'dotted'
              }
            }
          }
        ],
        series: [
          {
            name: '开机率(%)',
            type: 'bar',
            data: data.startUpRateArr,
            itemStyle: {
              normal: {
                color: '#FCE300'
              }
            },
            barWidth: 3,  // 控制柱子的宽度
            barGap: '1%' // 控制柱子的间隔
          },
          {
            name: '作业率(%)',
            type: 'bar',
            data: data.runRateArr,
            itemStyle: {
              normal: {
                color: '#0189ff',
              }
            },
            barWidth: 3,  // 控制柱子的宽度
            barGap: '1%' // 控制柱子的间隔
          },
          {
            name: '能耗(kw•h)',
            type: 'bar',
            data: data.powerUseArr,
            yAxisIndex: 1,//双轴，出现多个轴的时候通过设置这个展示
            itemStyle: {
              normal: {
                color: '#ff0044'
              }
            },
            barWidth: 3,  // 控制柱子的宽度
            barGap: '1%' // 控制柱子的间隔
          },
        ]
      }
      myChart.setOption(option)
    },        
    // 本年
    renderYearEcharts(myChart, data){
      var option = {
        legend: {
          data: ['开机率(%)', '作业率(%)', '能耗(kw•h)'],   //   能耗(kw•h)
          show: true,
          itemWidth: 20, // 设置图例的宽高
          itemHeight: 10,
          textStyle: { // 标题颜色
            color: '#fff'
          },
          top: 10,
          bottom: 0
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        grid: { top: '25%', left: '10%', right: '10%', bottom: '15%'},
        xAxis: [
          {
            type: 'category',
            data: data.xData,
            axisLine: { // 控制x轴线的样式
              lineStyle: {
                type: 'solid',
                color: '#2c4264',
                width: '1'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#2fdaeb'
              },
              interval: 0,
              showMaxLabel: true, //是否显示最大 tick 的 label
            },
            axisTick: { // 控制x轴坐标刻度不显示
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 0,
            max:100,
            name: '%',
            nameTextStyle: {
              color: '#fff',
              padding:[0,0,0,-30]
            },
            axisLine: { // 控制y轴线的样式
              lineStyle: {
                type: 'solid',
                color: '#2c4264',
                width: '1'
              }
            },
            axisLabel: {
              formatter: '{value} ',
              textStyle: {
                color: '#fff'//2fdaeb
              },
              showMinLabel: true, // 是否显示最小 tick 的 label
              showMaxLabel: true, // 是否显示最大 tick 的 label
              verticalAlign: 'middle'
            },
            splitLine: { // 网格线
              show: true,
              lineStyle: {
                color: ['#2c4264'],
                width: 1,
                type: 'dotted'
              }
            }
          },
          {
            type: 'value',
            min: 0,
            name: 'kw•h',
            nameTextStyle: {
              color: '#fff',
              padding:[0,0,0,35]
            },
            axisLine: { // 控制y轴线的样式
              lineStyle: {
                type: 'solid',
                color: '#2c4264',
                width: '1'
              }
            },
            axisLabel: {
              formatter: '{value} ',
              textStyle: {
                color: '#fff'//2fdaeb
              },
              showMinLabel: true, // 是否显示最小 tick 的 label
              showMaxLabel: true, // 是否显示最大 tick 的 label
              verticalAlign: 'middle'
            },
            splitLine: { // 网格线
              show: true,
              lineStyle: {
                color: ['#2c4264'],
                width: 1,
                type: 'dotted'
              }
            }
          }
        ],
        series: [
          {
            name: '开机率(%)',   //本年
            type: 'bar',
            data: data.startUpRateArr,
            itemStyle: {
              normal: {
                color: '#FCE300'
              }
            },
            barWidth: 8, // 控制柱子的宽度
            barGap: '10%' // 控制柱子的间隔
          },
          {
            name: '作业率(%)',  //本年
            type: 'bar',
            data: data.runRateArr,
            itemStyle: {
              normal: {
                color: '#0189ff',
              }
            },
            barWidth: 8,  // 控制柱子的宽度
            barGap: '10%' // 控制柱子的间隔
          },
          {
            name: '能耗(kw•h)',  //本年
            type: 'bar',
            data: data.powerUseArr,
            itemStyle: {
              normal: {
                color: '#ff0044'
              }
            },
            yAxisIndex: 1,//双轴，出现多个轴的时候通过设置这个展示
            barWidth: 8,  // 控制柱子的宽度
            barGap: '10%' // 控制柱子的间隔
          },
        ]
      }
      myChart.setOption(option)
    },
    //根据窗口变化echarts变化（中间背景图，右侧3 个echarts图）
    handleResize() {
      this.allEchartsArr.forEach((ele, index) => {
        ele.resize()
      })
    },
    beforeDestroy() {
      console.log('beforeDestroy:')
    }
  }
}
</script>
<style lang="scss" scoped>
  .attendance {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: rgba(39, 69, 111, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 20px;
    &-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      .home_title{
        .pointCircle{
          display: inline-block;
          width: 10px;border-radius: 10px;
          height: 10px;line-height: 10px;
          background-color:#02c9fc;
        }
        .dmy{
          font-size: 0.22rem;
          color: #ffffff;
        }
      }

      .day,
      .month,
      .year {
        width: 100%;
        flex: 1
      }
    }

    &-item:nth-of-type(2) {
      margin: 20px 0px;
    }
  }
</style>
