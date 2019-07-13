<template>
    <div class='my_box'>
        <div class="myBox_left">
            <div class="progress_box">
                <div style="" class="progress_item" v-for="(item , index) in progressData" :key='"progress"+index'>
                    <div class="title">{{item.title}}</div>
                    <div class="progress">
                        <el-progress :percentage="item.percentage" :stroke-width="15" :text-inside="true" :color="item.color"></el-progress>
                    </div>
                    <div class="time">{{item.time}}</div>
                </div>
            </div>
            <div class="pie_box">
                <div id="pie" style="width:100%;height:100%">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import echarts from 'echarts'
export default {
    name: 'RightBottomDeviceStatusEchartsLeft',
    props: {
        progressData: {
            type: Array,
            default: function() {
                return []
            }
        },
        pieData: {
            type: Array,
            default: function() {
                return []
            }
        },
        // hour24EchartData: {
        //     type: Array,
        //     default: function() {
        //         return []
        //     }
        // }
    },
    watch: {
        pieData(newVal, oldVal) {
            this.renderPie(document.getElementById('pie'), newVal);
        },
    },
    data() {
        return {
            myChart: '',
            AllEchartsArr: []
        }
    },
    mounted() {
        this.myChart = echarts.init(document.getElementById('deviceDetailHourDevice'));
        this.AllEchartsArr.push(this.myChart)
    },
    methods: {
        // 饼图echarts
        renderPie(dom, data) {
            var myChart = echarts.init(dom)
            this.AllEchartsArr.push(myChart)
            var option = null
            option = {
                tooltip: {
                trigger: 'item',
                formatter: " {b} : {c}m <br/>百分比 : {d}%"
                },

                series: [{
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['center', 'center'],
                    data: data,
                    label: {
                    color: '#fff',
                    formatter: '{b}:{c}m'
                    },
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                        color: function(params) {
                            //自定义颜色
                            var colorList = ['#1cf33c','#ffc31f','#444445','#fd0101','#6b6d71'];
                            return colorList[params.dataIndex]
                        }
                    }
                },

                ]
            };
            if (option && typeof option === 'object') {
                myChart.setOption(option, true);
            }
        },
        // 渲染24小时echarts图
        render24HourEcharts(newVal) {
            // debugger;
                  var data = echarts.util.map(newVal, function (item, index) {
                    return {
                    value: item,
                        itemStyle: {
                            normal: {
                                color: item[4]
                            }
                        }
                    };
                });
            // data = echarts.util.map(data, function (item, index) {
            //     return {
            //         value: item,
            //         itemStyle: {
            //             normal: {
            //                 color: item[4]
            //             }
            //         }
            //     };
            // });

            function renderItem(params, api) {
                var yValue = api.value(2);
                var start = api.coord([api.value(0), yValue]);
                var size = api.size([api.value(1) - api.value(0), yValue]);
                var style = api.style();

                return {
                    type: 'rect',
                    shape: {
                        x: start[0],
                        y: start[1],
                        width: size[0],
                        height: size[1]
                    },
                    style: style
                };
            }    
            var option = {
                grid: { top: '15%', left: '10%', right: '10%', bottom: '15%'},
                tooltip: {
                },
                xAxis: {
                    type: 'time',
                    // min: function(value) {
                    //   console.log('min:',value)
                    //   console.log('hhh:',moment(value.min).format('YYYY-MM-DD HH:mm:ss'))
                    //   console.log('hhh2:',moment(value.max).format('YYYY-MM-DD HH:mm:ss'))
                    //   console.log('hhh3:',moment(value.min).valueOf())
                    //   // return 1561420700900
                    //   return value
                    // },
                    max: function(value) {
                    console.log('mxn:',value)
                    // return 1561420700900
                    return moment(value.min).add(1,'d').valueOf()
                    },
                    // max: '23:59:59',
                    scale: true,
                    axisLine: { // 控制x轴线的样式
                    lineStyle: {
                        type: 'dotted',
                        color: '#fff',
                        width: '1'
                    }
                    },
                    // boundaryGap: ['0%', '0%'],
                    axisLabel: {
                    textStyle: {
                        color: '#2fdaeb'
                    },
                    formatter: function(val) {
                        return moment(val).format('HH:mm:ss')
                    }
                    },
                    axisTick: { // 控制x轴坐标刻度不显示
                    show: false
                    },
                    splitLine: { // 网格线
                    show: false,
                    lineStyle: {
                        color: ['#2c4264'],
                        width: 1,
                        type: 'dotted'
                    }
                    }
                },
                yAxis: {
                    axisLine: { // 控制y轴线的样式
                    lineStyle: {
                        type: 'solid',
                        color: '#353b59',
                        width: '1'
                    }
                    },
                    axisLabel: {
                    show: false,
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
                series: [{
                    type: 'custom',
                    renderItem: renderItem,
                    label: {
                        normal: {
                            show: false,
                            position: 'top'
                        }
                    },
                    dimensions: ['开始时间：', '结束时间：', 'profit'],
                    encode: {
                        x: [0, 1],
                        y: 2,
                        // tooltip: [0, 1, 2],
                        tooltip: [0, 1],
                        itemName: 3
                    },
                    data: newVal
                }]        
            }
            this.myChart.setOption(option)            
        }       
    }
}
</script>
<style lang="scss" scoped>
    // mfs start
    .my_box {
      font-size: 12px;
      height:50%;
      display: flex;
      flex-direction: row;
      background-color: rgba(0,186,255,0.1);
      .myBox_left {
        //border: 1px solid gray;
        flex: 1;
        margin-right: 0.10rem;
        //background: rgba(39, 69, 111, 1);
        display: flex;
        flex-direction: row;
        .progress_box {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin: 0px 20px;

          .progress_item {
            display: flex;
            flex-direction: row;
            height: 0.15rem;
            margin-bottom: 0.2rem;

            .title {
              width: 0.55rem;
              text-align: center;
              color: #fff;
              position: relative;
            }

            .title:after {
              content: '';
              display: inline-block;
              width: 0.10rem;
              height: 0.10rem;
              position: absolute;
              background: #25EE3D;
              left: 0px;
              border-radius: 0.10rem;
              top: 0.03rem;
            }

            .progress {
              flex: 3;

              /deep/ .el-progress-bar__outer {
                background: rgba(20, 59, 100, .5)
              }

              /deep/ .el-progress-bar__innerText {
                color: #000;
              }
            }

            .time {
              width: 0.55rem;
              text-align: center;
              color: #3C8BC3;
            }
          }

          .progress_item:nth-of-type(2) {
            .title:after {
              background: #FFC620;
            }
          }

          .progress_item:nth-of-type(3) {
            .title:after {
              background: #444445;
            }
          }

          .progress_item:nth-of-type(4) {
            .title:after {
              background: #F50400;
            }
          }
          .progress_item:nth-of-type(5) {
            margin-bottom: 0;

            .title:after {
              background: #6b6d71;
            }
          }
        }

        .pie_box {
          flex: 1;
        }
      }

      .myBox_right {
        border: 1px solid gray;
        flex: 1;
        background: rgba(39, 69, 111, 1);
      }
    }

    //mengfs end
    // .deviceHourEcharts{
    //   height:50%;
    //   margin-top:10px;
    //   background-color: rgba(0,186,255,0.1);position: relative;
    // }
    // .deviceHourEcharts_legend{
    //   position: absolute;top:0;right:0;
    // }
</style>

