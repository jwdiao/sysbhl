<template>
  <div class="dianliu">
    <ul class="tab">
      <li
        v-for="(item, index) in tabOptions" :key="index"
        :class="item.value === currentTab ? 'active':''"
        @click="handleCurrentTab(item)"
      >{{ item.label }}</li>
    </ul>
    <div class="dianliu_main">
        <div class="dianliu_top">
          <div id="deviceDetailBottomEchartsA" style="height:100%;width:100%"></div>
        </div>

        <div class="dianliu_bottom">
          <div class="con-empty" v-show="isElec=='0'">
              <img src="../../assets/images/deviceDetail_noElec.png" />
              <span>暂无对应电表</span>
          </div>
          <div class="con-NoEmpty" v-show="isElec!='0'">
            <div class="condition">
              <el-select v-model="dianliuValue" placeholder="请选择" @change="handleSelect">
                <el-option
                  v-for="item in dianliuOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="main">
              <div id="deviceDetailBottomEchartsB" style="height:100%;width:100%"></div>
            </div>
          </div>
        </div>
    </div>    
  </div>
</template>
<script>
import echarts from 'echarts'
import moment from 'moment'
import {
    reqSelectByDeviceID,
    reqSelectByDeviceIDSs
} from '../../api'
import { _SessionStorageObj } from '@/utils'
export default {
  name: 'Dianliu',
  data() {
    return {
      deviceID: '', // 设备id
      dianliuOptions: [
        {
          label: '电流A',
          value: 'Ia'
        },
        {
          label: '电流B',
          value: 'Ib'
        },
        {
          label: '电流C',
          value: 'Ic'
        },
        {
          label: '电压A',
          value: 'Ua'
        },
      ],
      dianliuValue: 'Ia',
      tabOptions: [
        {
          label: '2分钟',
          value: '01'
        },{
          label: '24小时',
          value: '02'
        }
      ],      
      currentTab: '01',
      isInit: true,

      // 顶部电流
      EchartADom: '',
      EchartAData: [],
      EchartAData2: [],
      EchartAData3: [],
      EchartAData4: [],

      // 底部电流
      EchartBDom: '',
      EchartBData: [],
      isElec: '', // 表示无电表

      dianliuaAId: null, // 1s定时器
      AllEchartsArr: [],
    }
  },
  mounted() {
    this.deviceID = _SessionStorageObj.get('deviceID').machineNo

    // 顶部电流
    this.EchartADom = echarts.init(document.getElementById("deviceDetailBottomEchartsA"))
    this.AllEchartsArr.push(this.EchartADom)
    this.renderDianLiuTop()
    this.getTwoMinutesFun()

    window.addEventListener('resize', this.handleResize); // echarts图自适应

  },
  methods: {
    handleSelect() {
      // console.log('pp:',this.dianliuValue)
      this.handleCurrentTab()
    },

    handleDataA(item, yValue) {
        var obj = {}
        var dateStr = (item.time).substring(0,10).split('-').join('/')
        var timeStr = (item.time).substring(11,19)
        var time2 = dateStr+' '+timeStr
        var yNewValue = (yValue*1)<0?0:yValue
        obj.name = time2
        obj.value = [time2, yNewValue]
        return obj
    },
    // ==================请求数据 start=================
    // 2分钟
    async getTwoMinutesFun() {
      // console.log('deviceId:',this.deviceID)
      this.EchartAData =[]
      this.EchartAData3 = []
      const params = {
        deviceID: this.deviceID,
        elecType: this.dianliuValue, // 电表参数值
        queryType: this.currentTab //查询类型：01：2分钟，02：24小时
      }
      let dataArrDevice = []
      let dataArrElec = []
      const response = await reqSelectByDeviceID(params)
      // console.log('params.queryType1',params.queryType)
      // console.log('this.currentTab2',this.currentTab)
      if (params.queryType!==this.currentTab)return;
      if (!this.isInit) return;
      if(response && response.code === 200){
          this.isInit = false
          dataArrDevice = (response.data.deviceResponseDtos).reverse()

          this.isElec = response.data.isElec
          dataArrElec = (response.data.elecResponseDtoList).reverse()
      } else {
          return false
      }

      // 设备
      if (dataArrDevice.length) {
        for(var i=0;i<dataArrDevice.length;i++){
            this.EchartAData.push(this.handleDataA(dataArrDevice[i],dataArrDevice[i].spinLoad))//主轴负载率1 (%)
            this.EchartAData3.push(this.handleDataA(dataArrDevice[i],dataArrDevice[i].actSpin))//实际主轴转速1 (RPM)
        }
        const currentTab = this.currentTab
        this.EchartADom.setOption({
          series: [
            {
              data: this.EchartAData
            },
            {
              data: this.EchartAData3
            },
          ],
        });
      }

      // 电流
      
      if (this.isElec !== '0') {
          if (document.getElementById("deviceDetailBottomEchartsB")) {
            // 底部电流
            this.EchartBDom = echarts.init(document.getElementById("deviceDetailBottomEchartsB"))
            this.AllEchartsArr.push(this.EchartBDom)
            this.renderDianLiuBottom()
            if (dataArrElec.length) {
              for(var i=0;i<dataArrElec.length;i++){
                const attr = this.getElecValueByOpt()
                this.EchartBData.push(this.handleDataA(dataArrElec[i],dataArrElec[i][attr]))
              }
              this.EchartBDom.setOption({
                series: [{
                  data: this.EchartBData
                }]
              });
            }
          }
      }


          let setIntervalTime = 1000
          let startShiftTime = 120
          if (this.currentTab == '02') {
            setIntervalTime = 30000 // 30s
            startShiftTime = 100000
          }
          
          this.dianliuaAId = setInterval(() => {
            // 设备      
            if (this.EchartAData.length > startShiftTime) {
              this.EchartAData.shift();
              this.EchartAData3.shift();
            }
            // 电流
            if (this.isElec!=='0') {         
              if (this.EchartBData.length > startShiftTime) {
                this.EchartBData.shift();
              }
            }
            this.getOneSecondFun();
          }, setIntervalTime);

    },
    // 1秒
    async getOneSecondFun() {
      const params = {
        deviceID: this.deviceID,
          elecType: this.dianliuValue, // 电表参数值
          queryType: this.currentTab //查询类型：01：2分钟，02：24小时
        }
        let loading = false
        if (loading) {return;}
        const responseOneSecond = await reqSelectByDeviceIDSs(params);
        loading = true
        if (params.queryType!==this.currentTab)return;
        // console.log('params.queryType',params.queryType)
        // console.log('this.currentTab',this.currentTab)
        let currentDataDevice = {}
        let currentDataElec = {}
        if(responseOneSecond && responseOneSecond.code === 200 && responseOneSecond.data){
          loading = false
            if (responseOneSecond.data.deviceResponseDtos && responseOneSecond.data.deviceResponseDtos.length>0) {
              currentDataDevice = responseOneSecond.data.deviceResponseDtos[0]
            }
            if (responseOneSecond.data.elecResponseDtoList && responseOneSecond.data.elecResponseDtoList.length>0) {
              currentDataElec = responseOneSecond.data.elecResponseDtoList[0]
            }
        } else {
            return false
        }
        // 设备
        this.EchartAData.push(this.handleDataA(currentDataDevice,currentDataDevice.spinLoad))
        this.EchartAData3.push(this.handleDataA(currentDataDevice,currentDataDevice.actSpin))//实际主轴转速1 (RPM)

        const currentTab = this.currentTab
        this.EchartADom.setOption({
          series: [{
            data: this.EchartAData
          },{
            data: this.EchartAData3
          }],
        });

        if (this.isElec!=='0' && responseOneSecond.data.elecResponseDtoList.length>0) {
          if (this.EchartBDom) {
            // 电流
            const attr = this.getElecValueByOpt()
            this.EchartBData.push(this.handleDataA(currentDataElec,currentDataElec[attr]))
            this.EchartBDom.setOption({
              series: [{
                data: this.EchartBData
              }]
            });

          }
        }
    },
    // ==================请求数据 end=================   
    // ==================渲染echarts start=================
    async renderDianLiuTop() {
      var option = {
        color:['#fe5985','#ffd641'],
        legend: {
          show: true,
          data:[{name:'主轴负载率1 (%)'},{name:'实际主轴转速1 (RPM)'}],
          top: 10,
          textStyle: {
            color: "#fff"
          },
          icon: 'roundRect',
          itemWidth: 15, // 设置图例的宽高
          itemHeight: 4,
        },

        grid: {
          top:40,
          bottom: 40,
          left: 60,
          right: 60,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'time',
          axisLine: {  // 控制x轴线的样式
            lineStyle: {
              type: 'solid',
              color: '#55aefb',
              width: '1'
            }
          },
          axisPointer: {
            type: 'shadow'
          },
          axisTick: { // 控制x轴坐标刻度不显示
            show: false
          },
          axisLabel : {
            textStyle: {
              color: '#2DD7EC'
            },
            formatter: function(val) {
                return moment(val).format('HH:mm:ss')
            },
            showMinLabel: true,
          },
          splitLine: {
            show: false
          }
        },
        yAxis: [
          {
            type: 'value',
            min: 0,
            max: 100,
            name: '百分比',
            nameTextStyle: {
                color: '#fff',
                align: 'left',
                padding:[0,20,0,0]
            },
            boundaryGap: [0.2, 0.2],
            axisLabel: {
              formatter: '{value}%',
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
                color: '#55aefb',
                width: '1' }
            },
            axisTick: {
              show: false
            },
          },
          {
            type: 'value',
            name: 'RPM',
            min: '0',
            nameTextStyle: {
                color: '#fff',
                // align: 'right',
                padding:[0,-40,0,0]
            },
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
        ],
        series: [
          {
            // name: '主轴负载率',
            name:'主轴负载率1 (%)',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            animationDuration: 800,
            lineStyle: {
              color: '#fe5985',
              width: '1'
            },
            yAxisIndex: 0,
            data: [],
          },
          {
            // name: '实际主轴转速',
            name:'实际主轴转速1 (RPM)',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
              animationDuration: 800,
            lineStyle: {
              color: '#ffd641',
              width: '1'
            },
            yAxisIndex: 1,
            data: [],
          }
        ]
      };
      this.EchartADom.setOption(option, true);
    },
    async renderDianLiuBottom() {
      var option = {
        legend: {
          show: false,
          top: 0,
          right: 10,
          textStyle: {
            color: '#D3DAE2'
          }
        },

        grid: {
          top: 20,
          bottom: 20,
          left: 40,
          right: 40,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'time',
          axisLine: {  // 控制x轴线的样式
            lineStyle: {
              type: 'dotted',
              color: '#fff',
              width: '1'
            }
          },
          axisPointer: {
            type: 'shadow'
          },
          axisTick: { // 控制x轴坐标刻度不显示
            show: false
          },
          axisLabel : {
            textStyle: {
              color: '#2DD7EC'
            },
            formatter: function(val) {
                return moment(val).format('HH:mm:ss')
            },
            showMinLabel: true,
          },
          splitLine: {
            show: false
          }
        },
        yAxis: [
          {
            type: 'value',
            min: 0,
            boundaryGap: [0, '100%'],
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
                color: '#55aefb',
                width: '1' }
            },
            axisTick: {
              show: false
            },
          }
        ],
        series: [
          {
            // name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            animationDuration: 800,
            lineStyle: {
              color: '#0195e4',
              width: '1'
            },
            yAxisIndex: 0,
            data: []
          }
        ]
      };
      this.EchartBDom.setOption(option, true);

    },    
    // ==================渲染echarts end=================  
    // ==================点击tab start=================
    handleCurrentTab(item) {
        if (item) {
          this.currentTab = item.value
        }
        // 清空echarts
        this.emptyEcharts()
        this.getTwoMinutesFun()

    },
    // ==================点击tab start=================
    //清空echarts
    emptyEcharts() {
      if (this.dianliuaAId) {
        clearInterval(this.dianliuaAId)
        this.dianliuaAId = null
      }
      this.isInit = true
      this.EchartADom.clear()
      this.EchartAData = []
      this.EchartAData3 = []
      this.EchartADom.setOption({
        color:['#fe5985','#ffd641'],
        legend: {
          show: true,
          data:[{name:'主轴负载率1 (%)'},{name:'实际主轴转速1 (RPM)'}],
          top: 10,
          textStyle: {
            color: "#fff"
          },
          icon: 'roundRect',
          itemWidth: 15, // 设置图例的宽高
          itemHeight: 4,
        },

        grid: {
          top:40,
          bottom: 40,
          left: 60,
          right: 60,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'time',
          axisLine: {  // 控制x轴线的样式
            lineStyle: {
              type: 'solid',
              color: '#55aefb',
              width: '1'
            }
          },
          axisPointer: {
            type: 'shadow'
          },
          axisTick: { // 控制x轴坐标刻度不显示
            show: false
          },
          axisLabel : {
            textStyle: {
              color: '#2DD7EC'
            },
            formatter: function(val) {
                return moment(val).format('HH:mm:ss')
            },
            showMinLabel: true,
          },
          splitLine: {
            show: false
          }
        },
        yAxis: [
          {
            type: 'value',
            min: 0,
            max: 100,
            name: '百分比',
            nameTextStyle: {
                color: '#fff',
                align: 'left',
                padding:[0,20,0,0]
            },
            boundaryGap: [0.2, 0.2],
            axisLabel: {
              formatter: '{value}%',
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
                color: '#55aefb',
                width: '1' }
            },
            axisTick: {
              show: false
            },
          },
          {
            type: 'value',
            name: 'RPM',
            min: '0',
            nameTextStyle: {
                color: '#fff',
                // align: 'right',
                padding:[0,-40,0,0]
            },
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
        ],
        series: [          {
            // name: '主轴负载率',
            name:'主轴负载率1 (%)',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            animationDuration: 800,
            lineStyle: {
              color: '#fe5985',
              width: '1'
            },
            yAxisIndex: 0,
            data: [],
          },
          {
            // name: '实际主轴转速',
            name:'实际主轴转速1 (RPM)',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
              animationDuration: 800,
            lineStyle: {
              color: '#ffd641',
              width: '1'
            },
            yAxisIndex: 1,
            data: [],
          }]
      },{notMerge:true,lazyUpdate:false});

      if (this.EchartBDom){
        this.EchartBDom.clear()
        this.EchartBData = []
        this.EchartBDom.setOption({
            legend: {
              show: false,
              top: 0,
              right: 10,
              textStyle: {
                color: '#D3DAE2'
              }
            },

            grid: {
              top: 20,
              bottom: 20,
              left: 40,
              right: 40,
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                animation: false
              }
            },
            xAxis: {
              type: 'time',
              axisLine: {  // 控制x轴线的样式
                lineStyle: {
                  type: 'dotted',
                  color: '#fff',
                  width: '1'
                }
              },
              axisPointer: {
                type: 'shadow'
              },
              axisTick: { // 控制x轴坐标刻度不显示
                show: false
              },
              axisLabel : {
                textStyle: {
                  color: '#2DD7EC'
                },
                formatter: function(val) {
                    return moment(val).format('HH:mm:ss')
                },
                showMinLabel: true,
              },
              splitLine: {
                show: false
              }
            },
            yAxis: [
              {
                type: 'value',
                min: 0,
                boundaryGap: [0, '100%'],
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
                    color: '#55aefb',
                    width: '1' }
                },
                axisTick: {
                  show: false
                },
              }
            ],
            series: [
              {
                // name: '模拟数据',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                animationDuration: 800,
                lineStyle: {
                  color: '#0195e4',
                  width: '1'
                },
                yAxisIndex: 0,
                data: []
              }
            ]
        },{notMerge:true,lazyUpdate:false});
      }

    },
    // 通过电流下拉值取后台数据对应的电流值
    getElecValueByOpt() {
        let attr =''
        if (this.dianliuValue === 'Ia') {
          attr = 'elcIa'
        } else if (this.dianliuValue === 'Ib') {
          attr = 'elcIb'
        } else if (this.dianliuValue === 'Ic') {
          attr = 'elcIc'
        } else if (this.dianliuValue === 'Ua') {
          attr = 'elcUa'
        }
        return attr
    },
    handleResize() {
        this.AllEchartsArr.forEach((ele, index) => {
          ele.resize()
        })
    },
    // 注意子组件中使用destroyed不起作业，所以需要在父组件中手动调用
    clearDianLiu() {
      // console.log('YYYYYooooooooooooooooooo')
      clearInterval(this.dianliuaAId)
      this.dianliuaAId = null
    }  
  }
}
</script>
<style lang="scss" scoped>
.dianliu{
  height: 100%;padding:10px;
  .tab{
    text-align:right;width: 100%;
    li {
      background-color: #6e738a;color:#fff;display: inline-block;cursor: pointer;
      height:20px;width:50px;margin-left: 15px;border-radius: 4px;text-align: center;line-height: 20px;
      &.active{background-color:#00a6fc}
    }
  }
  &_main{
    width:100%;margin-top:10px;
    height: calc(100% - 30px);background-color: rgba(0,186,255,0.1);
    display: flex;flex-direction:column;
  }
  &_top{ flex: 1 }
  &_bottom{
    flex: 1;
    padding-top:30px;
    .con-empty{
      width:100%;height: calc(100% - 30px);padding:0 20px;margin:20px auto 0;
      display: flex;justify-content: center;align-items: center;
      background: url('../../assets/images/deviceDetail_noElecEchart.png') no-repeat center;
      background-size: 96% 100%;
      span{color:#00c7fa;font-size: 18px;padding-left:8px;}
    }


    .con-NoEmpty{
      width:100%;height: 100%;
    }
    .condition{
      display: flex;justify-content: space-between;align-items:center;padding:0 40px;
    }

    .main{
      height: calc(100% - 40px);width:100%;
      display: flex;justify-content: center;align-items: center
    }
  }
}
</style>
