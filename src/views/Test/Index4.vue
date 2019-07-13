<template>
  <div id="DeviceDetail_dianliu" style="width:90%;height:80%;margin-top:20px;background-color: rgb(17, 33, 60);">EchartsLine</div>
</template>
<script>
import echarts from 'echarts'

export default {
  name: 'EchartsLine',
  data() {
    return {
        setIntervalId: ''
    }
  },
  mounted() {

    this.renderDianliu()
  },
  methods: {
    async renderDianliu() {
      let self = this;
      var myChartDidanliu = echarts.init(document.getElementById("DeviceDetail_dianliu"))
      var option = {
        grid: {
          top: 50,
          bottom: 30,
          left: 60,
          right: '20%',
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            // data: [' 实际主轴转 (RPM)', '主轴负载率 (%)','实际进给率 (%)']
        },
        color:['#fe5985','#51ddff','#ffd641'],
        legend: {
		      // data:[{name:'主轴转速 (RPM)'},{name:'主轴负载率 (%)'},{name:'进给率 (%)'}],
          icon: 'roundRect',
          itemWidth: 20, // 设置图例的宽高
          itemHeight: 4,
          textStyle: {
            fontWeight: "normal", // 标题颜色
            color: "#fff"
          },
          top: 10,
          bottom: 0
        },
        // dataZoom: {
        //     show: false,
        //     start: 0,
        //     end: 100
        // },
        xAxis:
        [
            {
                type: 'category',
                show: true,
                axisLine: {  // 控制x轴线的样式
                    lineStyle: {
                    type: 'solid',
                    color: '#293e60',
                    width: '1'
                    }
                },
                axisLabel : {
                    textStyle: {
                    color: '#2DD7EC'
                    },
                    // showMaxLabel: true, //是否显示最大 tick 的 label
                    showMinLabel: true,
                },
                splitLine: {
                    show: false
                },
                boundaryGap: true,
                // data: []
                data: (function (){
                    var now = new Date();
                    var res = [];
                    var len = 10;
                    while (len--) {
                        res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                        now = new Date(now - 2000);
                    }
                    return res;
                })()
            },
        ],
        yAxis: [
            {
              type: 'value',
              scale: true,
              name: '%',
              nameTextStyle: {
                  color: '#fff',
                  align: 'left',
                  padding:[0,20,0,0]
              },
              min: 0,
              position: 'left',
              axisLabel: {
                  formatter: '{value} ',
                  textStyle: {
                      color: '#fff'
                  }
              },
              splitLine: { //网格线
                  show: true,
                  lineStyle: {
                      color: ['#293e60'],
                      width: 1,
                      type: 'dotted'
                  }
              },
              axisLine: {  // 控制y轴线的样式
                lineStyle: {
                    type: 'solid',
                    color: '#293e60',
                    width: '1'
                }
              },
              axisTick: {
                show: false
              },
            },
            {
              type: 'value',
              scale: true,
              name: 'RPM',
              nameTextStyle: {
                  color: '#fff',
                  align: 'left',
                  padding:[0,20,0,0]
              },
              min: 0,
              position: 'right',
              offset: 80,
              axisLabel: {
                  formatter: '{value} ',
                  textStyle: {
                      color: '#fff'
                  }
              },
              splitLine: { //网格线
                  show: true,
                  lineStyle: {
                      color: ['#293e60'],
                      width: 1,
                      type: 'dotted'
                  }
              },
              axisLine: {  // 控制y轴线的样式
                  lineStyle: {
                      type: 'solid',
                      color: '#293e60',
                      width: '1'
                  }
              },
              axisTick: {
                  show: false
              },
            },
            {
              type: 'value',
              scale: true,
              name: '实际进给率',
              nameTextStyle: {
                  color: '#fff',
                  align: 'left',
                  padding:[0,20,0,0]
              },
              min: 0,
              position: 'right',
              offset: 120,
              axisLabel: {
                  formatter: '{value} ',
                  textStyle: {
                      color: '#fff'
                  }
              },
              splitLine: { //网格线
                  show: true,
                  lineStyle: {
                      color: ['#293e60'],
                      width: 1,
                      type: 'dotted'
                  }
              },
              axisLine: {  // 控制y轴线的样式
                  lineStyle: {
                      type: 'solid',
                      color: '#293e60',
                      width: '1'
                  }
              },
              axisTick: {
                  show: false
              },
            },
        ],
        series: [

            {
                name:'主轴负载率 (%)',
                type:'line',
                yAxisIndex: 0,
                showSymbol:false,
                data:(function (){
                    var res = [];
                    var len = 0;
                    while (len < 10) {
                        res.push((Math.random()*10 + 5).toFixed(1) - 0);
                        len++;
                    }
                    return res;
                })()
            },
          {
            name:'实际主轴转速 (RPM)',
            type:'line',
            xAxisIndex: 0,
            yAxisIndex: 1,
            showSymbol:false,
            data:(function (){
                var res = [];
                var len = 10;
                while (len--) {
                    res.push(Math.round(Math.random() * 1000));
                }
                return res;
            })()
          },
            {
                name:'实际进给率 (%)',
                type:'line',
                xAxisIndex: 0,
                yAxisIndex: 2,
                data:(function (){
                    var res = [];
                    var len = 0;
                    while (len < 10) {
                        res.push((Math.random()*100));
                        len++;
                    }
                    return res;
                })()
            }
        ]
      };




      this.setIntervalId = setInterval(async () =>{
        var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');


        var data0 = option.series[0].data;
        var data1 = option.series[1].data;
        var data2 = option.series[2].data;

        data0.shift();
        data0.push(Math.round(Math.random() * 1000));
        data1.shift();
        data1.push((Math.random() * 10 + 5).toFixed(1) - 0);
        data2.shift();
        data2.push((Math.random() * 5 + 5).toFixed(1) - 0);

        option.xAxis[0].data.shift();
        option.xAxis[0].data.push(axisData);

        myChartDidanliu.setOption(option);
      },1000);

    }
  },
  destroyed() {
      clearInterval(this.setIntervalId)
  }
}
</script>

