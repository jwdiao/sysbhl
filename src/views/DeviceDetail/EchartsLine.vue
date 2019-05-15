<template>
  <div id="DeviceDetail_dianliu" style="width:100%;height:100%;margin-top:20px;">EchartsLine</div>
</template>
<script>
import echarts from 'echarts'

import {
    reqSelectByDeviceID,
    reqSelectByDeviceIDSs
} from '../../api'

export default {
  name: 'EchartsLine',
  data() {
    return {
        deviceID: '', // 设备id
        setIntervalId: ''
    }
  },
  mounted() {
    var localStoryge = JSON.parse(localStorage.getItem('deviceID'))
    this.deviceID = localStoryge.machineNo
    // this.machineName = localStoryge.machineName
    // this.machineStatus = localStoryge.machineStatus // 1，运行 2，待机，3，关机，4，故障
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
          right: 60,
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            // data:[' 实际主轴转 (RPM)', '主轴负载率 (%)','实际进给率 (%)']
            data:['实际主轴转 (RPM)', '主轴负载率 (%)']
        },
        // color:['#fe5985','#51ddff','#ffd641'],
        color:['#51ddff','#fe5985'],
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
                show: false,
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
                data: []
                // data: (function (){
                //     var now = new Date();
                //     var res = [];
                //     var len = 10;
                //     while (len--) {
                //         res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                //         now = new Date(now - 2000);
                //     }
                //     return res;
                // })()
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
                // max: 20,
                min: 0,
                boundaryGap: [0.2, 0.2],
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
                            width: '1' }
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
                boundaryGap: [0.2, 0.2],
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
            }
        ],
        series: [

            {
                name:'主轴负载率 (%)',
                type:'line',
                yAxisIndex: 0,
                showSymbol:false,
                data: []
                /* data:(function (){
                    var res = [];
                    var len = 0;
                    while (len < 10) {
                        res.push((Math.random()*10 + 5).toFixed(1) - 0);
                        len++;
                    }
                    return res;
                })() */
            },
          {
            name:'实际主轴转速 (RPM)',
            type:'line',
            xAxisIndex: 0,
            yAxisIndex: 1,
            showSymbol:false,
            data: []
            /* data:(function (){
                var res = [];
                var len = 10;
                while (len--) {
                    res.push(Math.round(Math.random() * 1000));
                }
                return res;
            })() */
          },
            /* {
                name:'实际进给率 (%)',
                type:'line',
                yAxisIndex: 0,
                data: []
                data:(function (){
                    var res = [];
                    var len = 0;
                    while (len < 10) {
                        res.push((Math.random()*100));
                        len++;
                    }
                    return res;
                })()
            } */
        ]
      };

        var data0 = option.series[0].data;
        var data1 = option.series[1].data;
        // var data2 = option.series[2].data;

        // 2分钟数据
        const res = {
            "deviceResponseDtos": [
                {
                    "actSpin": "800", // 主轴转速 (RPM)
                    "actFeed": "52", // 进给率 (%)
                    "spinLoad": "86" // 主轴负载率 (%)
                },
                {
                    "actSpin": "84",
                    "actFeed": "30",
                    "spinLoad": "54"
                },
                {
                    "actSpin": "625",
                    "actFeed": "87",
                    "spinLoad": "46"
                },
                {
                    "actSpin": "400",
                    "actFeed": "80",
                    "spinLoad": "44"
                },
                {
                    "actSpin": "700",
                    "actFeed": "47",
                    "spinLoad": "76"
                },
            ]
        }

        // if(!dataArr){ return; }
        let dataArr = []
        // debugger;
        const response = await reqSelectByDeviceID(this.deviceID)
        if(response && response.code === 200){
            dataArr = (response.data.deviceResponseDtos).reverse()
        } else {
            return false
        }
        let xAxisData = []
        for(var i=0;i<dataArr.length;i++){
            data0.push(dataArr[i].actSpin);
            data1.push(dataArr[i].spinLoad);
            // data2.push(dataArr[i].actFeed);
            xAxisData.push((dataArr[i].time).substring(11,19))
        }
        option.xAxis[0].data = xAxisData
        // option.xAxis[0].data = (function (){
        //     var now = new Date();
        //     var res = [];
        //     var len = 120;
        //     while (len--) {
        //         res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
        //         now = new Date(now - 1000*60*2);
        //     }
        //     return res;
        // })()


    //   var count = 11;
    //   myChartDidanliu.setOption(option);
    //   return;
      this.setIntervalId = setInterval(async () =>{
          var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');

          /* var data0 = option.series[0].data;
          var data1 = option.series[1].data;
          var data2 = option.series[2].data; */
        // const responseOneSecond = await http.post('http://10.19.8.22:9099/machineConnection/selectByDeviceIDSs', { machineNo: this.deviceID })
        
        const responseOneSecond = await reqSelectByDeviceIDSs(this.deviceID);
        let currentSecondData = {}
        if(responseOneSecond && responseOneSecond.code === 200 && responseOneSecond.data&& responseOneSecond.data.deviceResponseDtos && responseOneSecond.data.deviceResponseDtos.length>0){

            currentSecondData = responseOneSecond.data.deviceResponseDtos[0]
        } else {
            return false
        }
        // debugger;
        // return;

        //    console.log('len:',dataArr.length)
          if(dataArr.length>=120){
              data0.shift();
              data1.shift();
            //   data2.shift();
              option.xAxis[0].data.shift();
          }
        //   data0.shift();
          data0.push(currentSecondData.actSpin);
        //   data1.shift();
          data1.push(currentSecondData.spinLoad);
        //   data2.shift();
        //   data2.push(currentSecondData.actFeed);

        //   option.xAxis[0].data.shift();
          option.xAxis[0].data.push((currentSecondData.time).substring(11,19));

          myChartDidanliu.setOption(option);
      },1000);

    }
  },
  destroyed() {
      clearInterval(this.setIntervalId)
  }
}
</script>

