<template>
    <div style="height:100%">
        <div class="sbhltitle clear">
            <div class="inlineBlock">
              设备总数 :
              <span style="font-size: 0.3rem">{{deviceData.totalNum}}</span>
              <em> 台</em>
            </div>
            <div class="inlineBlock marginLeft20 gray">
              离线 :
              <span style="font-size: 0.3rem">{{deviceData.outlineNum}}</span>
              <em> 台</em>
            </div>
        </div>
        <div class="statusList">
            <ul class="statusListTop">
                <li>
                <p class="statusTitle">在线</p>
                <div class="statusDiv">
                    <img src="../../../assets/images/bluePoint.png" alt="">
                    <span class="statusCount">{{deviceData.onlineNum}}</span>
                    <em class="statusDanw">台</em>
                </div>
                </li>
                <li>
                <p class="statusTitle">作业</p>
                <div class="statusDiv">
                    <img src="../../../assets/images/greenPoint.png" alt="">
                    <span class="statusCount"> {{deviceData.runNum}}</span>
                    <em class="statusDanw">台</em>
                </div>
                </li>
                <li>
                <p class="statusTitle">待机</p>
                <div class="statusDiv">
                <img src="../../../assets/images/yellowPoint.png" alt="">
                <span class="statusCount"> {{deviceData.idleNum}}</span>
                <em class="statusDanw">台</em>
                </div>
                </li>
                <li>
                <p class="statusTitle">故障</p>
                <div class="statusDiv">
                <img src="../../../assets/images/redPoint.png" alt="">
                <span class="statusCount"> {{deviceData.alarmNum}}</span>
                <em class="statusDanw">台</em>
                </div>
                </li>
                <li>
                <p class="statusTitle">关机</p>
                <div class="statusDiv">
                <img src="../../../assets/images/garyPoint.png" alt="">
                <span class="statusCount"> {{deviceData.shutDownNum}}</span>
                <em class="statusDanw">台</em>
                </div>
                </li>

            </ul>
            <ul class="statusListBottom">
                <li>
                <p class="statusNum">开机小时数</p>
                <div class="echartsImg open" ref="openID">
                    <div>
                    <p class="numPoint">{{deviceData.startUpHour}}</p>
                    <em>单位:h</em>
                    </div>
                </div>
                </li>
                <li>
                <p class="statusNum">作业小时数</p>
                <div class="echartsImg runHourNum" ref="runHourNum">
                    <div>
                    <p class="numPoint">{{deviceData.workHour}}</p>
                    <em>单位:h</em>
                    </div>
                </div>
                </li>
                <li>
                <p class="statusNum">开机率</p>
                <div class="echartsImg start" id="startLV" ref="startID">
                </div>
                </li>
                <li>
                <p class="statusNum">作业率</p>
                <div class="echartsImg runLV" id="runLV" ref="runLV">
                </div>
                </li>
                <li>
                <p class="statusNum">利用率</p>
                <div class="echartsImg planFinishLv" id="liyongLv" ref="liyongLV">
                </div>
                </li>
                <li>
                <p class="statusNum">故障率</p>
                <div class="echartsImg problem" id="problemLV" ref="problem">
                </div>
                </li>
                <li>
                <p class="statusNum">完成工件数</p>
                <div class="echartsImg totalE" ref="totalE">
                    <div>
                    <p class="numPoint">{{deviceData.overProcedureNum}}</p>
                    <em>单位: 件</em>
                    </div>
                </div>
                </li>
                <li>
                <p class="statusNum">总耗电量</p>
                <div class="echartsImg totalE" ref="totalE">
                    <div>
                    <p class="numPoint">{{deviceData.elcPower||0}}</p>
                    <em>单位:kw•h</em>
                    </div>
                </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import echarts from 'echarts'
export default {
    name: 'OverviewBaseInfo',
    props: {
        'deviceData': {
            type: Object
        }
    },
    data() {
        return {

        }
    },
    watch: {
       deviceData(newVal, oldVal) {
        //    console.log('watch==========')
           this.renderEchartsCircleHLGTree(this.deviceData) //4个率echarts(开机率\作业率\故障率\计划完成率)
       } 
    },
    methods: {
      /*左上3个率--渲染*/
      renderEchartsCircleHLGTree (carEchartsData) {
        // 开机率
        var nbcllvEcharts = document.getElementById('startLV')
        let bootRateObj = {
          name: '开机率',
          color: {
            startColor: '#ff7905',
            endColor: '#ffbf46'
          },
          value: carEchartsData.bootRate
        }
        this.renderClock(nbcllvEcharts, bootRateObj)

        // 作业率
        var wbcllvEcharts = document.getElementById('runLV')
        let workRateObj = {
          name: '作业率',
          color: {
            startColor: '#0090ff',
            endColor: '#00e2ff'
          },
          value: carEchartsData.workRate
        }
        this.renderClock(wbcllvEcharts, workRateObj)

        // 故障率
        var hclvEcharts = document.getElementById('problemLV')
        let alarmRateObj = {
          name: '故障率',
          color: {
            startColor: '#FA4551',
            endColor: '#747FFF'
          },
          value: carEchartsData.alarmRate
        }
        this.renderClock(hclvEcharts, alarmRateObj)

        // 利用率 liyongLv liyongLv
        var liyongEcharts = document.getElementById('liyongLv')
        let liyongRateObj = {
          name: '计划完成率',
          color: {
            startColor: '#33dcb5',
            endColor: '#30c759'
          },
          value: carEchartsData.liyongLv
        }
        this.renderClock(liyongEcharts, liyongRateObj)
        
      },
      /*左上3个率--echsrts*/
      renderClock (dom, data) {
        var myChart = echarts.init(dom)
        var option = null
        option = {
          tooltip: {
            formatter: '{a} {b} : {c}%',
            confine: true // 是否将tooltip框限制在图表的区域内
          },
          toolbox: {
            show: true
          },
          series: [
            {
              name: data.name,
              type: 'gauge',
              radius: '100%',
              rich: {
                color: '#fff'
              },
              axisLabel: {
                show: false
              },
              itemStyle: {
                // color: data.color, //指针颜色
                length: 5
              },
              axisTick: {
                show: false
              },
              emphasis: {
                itemStyle: {
                  color: '#fff'
                }
              },
              axisLine: { // 仪表盘轴线相关配置。
                show: false,
                lineStyle: {
                  width: 0,
                  // 0% 处的颜色
                  color: [[1, new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: data.color.startColor }, { offset: 1, color: data.color.endColor }], false)]]
                  // color: [[1,'#ff820d']]
                },
                length: 5
              },
              splitLine: {
                show: false
              },
              pointer: {
                width: 4
              },
              detail: { formatter: '{value}%', color: '#fff', offsetCenter: [0, '80%'], fontSize: 20 },
              data: [{ value: data.value, name: '' }]
            }
          ]
        }
        if (option && typeof option === 'object') {
          myChart.setOption(option, true)
        }
      },             
    }
}
</script>

<style lang="scss" scoped>
    .sbhltitle{
        color: #30adff;font-size: 0.18rem;
        margin-top: -10px;
    }
    .statusList{
        /*height: calc(100% - 0.35rem);*/
        height: 273px;
        display: flex;flex-direction: column;
        .statusListTop{
        // flex: 1;
        display: flex;align-items: center;
        background: url("../../../assets/images/title-bg.png") no-repeat;
        background-size: 100% 100%;
        margin-bottom:10px;
        padding:5px 0;
        li{
            flex: 1;text-align: center;
            .statusTitle{
            font-size: 0.18rem;color:#d5d5d5;
            margin-top: 5px;
            }
            .statusDiv{
            margin-bottom: 5px;
            }
            .statusCount{
            font-size: 0.32rem;color:#30adff;vertical-align: bottom;
            }
            .statusDanw{
            font-size: 0.19rem;color: #30adff;vertical-align: bottom;
        }
        }
        }
        .statusListBottom{
        display: flex;
        // flex: 1.8;
        /*height: 190px;*/
        li{
            flex: 1;text-align: center;margin-right: 0.1rem;
            padding: 0.1rem;
            background: rgba(42,75,133,0.3);
            .statusNum{
            font-size: 0.24rem;color:#d5d5d5;
            }
            .echartsImg{
            width: 120px;
            height: 120px;
            margin: 0.1rem;
            display: flex;justify-content: center;align-items: center;
            div{
                margin-top: 5%;
                color: #02c9fc;
                .numPoint{
                color: #02c9fc;font-size: 0.24rem;
                }
            }
            }
            .open{
            background: url("../../../assets/images/echarts_circle-blue.png") no-repeat center;
            background-size: 100% 100%;
            }
            .runHourNum{
            background: url("../../../assets/images/echarts_circle-green.png") no-repeat center;
            background-size: 100% 100%;
            }
            .start{
            background: url("../../../assets/images/echarts_clock-yellow.png") no-repeat center;
            background-size: 100% 100%;
            }
            .runLV{
            background: url("../../../assets/images/echarts_clock-blue.png") no-repeat center;
            background-size: 100% 100%;
            }
            .problem{
            background: url("../../../assets/images/echarts_clock-red.png") no-repeat center;
            background-size: 100% 100%;
            }
            .planFinishLv{
            background: url("../../../assets/images/echarts_clock-green.png") no-repeat center;
            background-size: 100% 100%;
            }
            .totalE{
            background: url("../../../assets/images/echarts_circle-blue.png") no-repeat center;
            background-size: 100% 100%;
            }
        }
        li:nth-last-child(1){
            margin-right: 0;
        }
        }
    }
</style>

