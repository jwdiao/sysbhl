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
      <div class="con-empty" v-if="isElec=='0'">
          <img src="../../assets/images/deviceDetail_noElec.png" />
          <span>暂无对应电表</span>
      </div>
      <div class="con-NoEmpty" v-else>
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
import { setTimeout } from 'timers';
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

      // 顶部电流
      EchartADom: '',
      EchartAData: [],
      EchartAData2: [],
      EchartAData3: [],
      EchartAData4: [],
      dianliuaAId: null,

      // 底部电流
      EchartBDom: '',
      EchartBData: [],
      isElec: '', // 表示无电表
      // dianliuId: null

      AllEchartsArr: []
    }
  },
  mounted() {
    var localStoryge = JSON.parse(localStorage.getItem('deviceID'))
    this.deviceID = localStoryge.machineNo

    // 顶部电流
    this.EchartADom = echarts.init(document.getElementById("deviceDetailBottomEchartsA"))
    this.AllEchartsArr.push(this.EchartADom)
    this.renderDianLiuTop()



    this.handleCurrentTab()

    window.addEventListener('resize', this.handleResize); // echarts图自适应

  },
  methods: {
    async renderDianLiuA() {
      var option = {
        title: {
          text: '动态数据 + 时间坐标轴',
          show: false
        },
        color:['#fe5985','#51ddff','#ffd641','#9700e2'],
        legend: {
          show: true,
          data:[{name:'主轴负载率1 (%)'},{name:'主轴负载率2 (%)'},{name:'实际主轴转速1 (RPM)'},{name:'实际主轴转速2 (RPM)'}],
          top: 10,
          left: 45,
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
          // formatter: (params) => {
          //   console.log('yyyy:',params)
          //   params = params[0];
          //   var date = new Date(params.name);
          //   return this.getFormatTimeString(date)+' '+params.value[1];
          // },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'time',
          axisLine: {  // 控制x轴线的样式
            lineStyle: {
              type: 'solid',
              color: '#293e60',
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
            // showMaxLabel: true, //是否显示最大 tick 的 label
            showMinLabel: true,
          },
          splitLine: {
            show: false
          }
        },
        yAxis: [
          {
            type: 'value',
            max: 100,
            // name: '%',
            // nameTextStyle: {
            //     color: '#fff',
            //     align: 'left',
            //     padding:[0,20,0,0]
            // },
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
                color: '#293e60',
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
              color: '#fe5985'
            },
            yAxisIndex: 0,
            data: [],
            // data: [
            //   { value: [ '2016/2/18 03:00:00', 363 ] },
            //   { value: [ '2016/2/18 04:00:00', 384 ] },
            //   { value: [ '2016/2/18 05:00:00', 371 ] },
            // ]
          },
          {
            name:'主轴负载率2 (%)',
            type:'line',
            showSymbol: false,
            hoverAnimation: false,
            animationDuration: 800,
            lineStyle: {
              color: '#51ddff'
            },
            yAxisIndex: 0,
            data: []
          },
          {
            // name: '实际主轴转速',
            name:'实际主轴转速1 (RPM)',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
              animationDuration: 800,
            lineStyle: {
              color: '#ffd641'
            },
            yAxisIndex: 1,
            data: [],
            // data: [
            //   { value: [ '2016/2/18 03:00:00', 363 ] },
            //   { value: [ '2016/2/18 04:00:00', 384 ] },
            //   { value: [ '2016/2/18 05:00:00', 371 ] },
            // ]
          },
          {
            // name: '实际主轴转速',
            name:'实际主轴转速2 (RPM)',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
              animationDuration: 800,
            lineStyle: {
              color: '#9700e2'
            },
            yAxisIndex: 1,
            data: [],
            // data: [
            //   { value: [ '2016/2/18 03:00:00', 363 ] },
            //   { value: [ '2016/2/18 04:00:00', 384 ] },
            //   { value: [ '2016/2/18 05:00:00', 371 ] },
            // ]
          },
        ]
      };
      this.EchartADom.setOption(option, true);

      // 调用数据
      this.getDataSecondMinutesFunA()


    },

    // 2分钟数据请求
    async getDataSecondMinutesFunA() {
      let dataArr = []
      const response = await reqSelectByDeviceID("PM010702000125")
      if(response && response.code === 200){
          dataArr = (response.data.deviceResponseDtos).reverse()
      } else {
          return false
      }

      for(var i=0;i<dataArr.length;i++){
          this.EchartAData.push(this.handleDataA(dataArr[i],dataArr[i].spinLoad))
          this.EchartAData2.push(this.handleDataA(dataArr[i],dataArr[i].spinLoad2))
          this.EchartAData3.push(this.handleDataA(dataArr[i],dataArr[i].actSpin))//实际主轴转速1 (RPM)
          this.EchartAData4.push(this.handleDataA(dataArr[i],dataArr[i].actSpin2))//实际主轴转速2 (RPM)
      }
      this.EchartADom.setOption({
        series: [{
          data: this.EchartAData
        },{
          data: this.EchartAData2
        },{
          data: this.EchartAData3
        },{
          data: this.EchartAData4
        }]
      });


      this.dianliuaAId = setInterval(() => {          
        if (this.EchartAData.length > 120) {
          this.EchartAData.shift();
          this.EchartAData2.shift();
          this.EchartAData3.shift();
          this.EchartAData4.shift();
        }
        this.getDianliuDataOneSecondA();
      }, 1000);
    },
    // 1秒钟获取电流
    async getDianliuDataOneSecondA () {
        const responseOneSecond = await reqSelectByDeviceIDSs("PM010702000125");
        let currentSecondData = {}
        if(responseOneSecond && responseOneSecond.code === 200 && responseOneSecond.data&& responseOneSecond.data.deviceResponseDtos && responseOneSecond.data.deviceResponseDtos.length>0){

            currentSecondData = responseOneSecond.data.deviceResponseDtos[0]
        } else {
            return false
        }
        this.EchartAData.push(this.handleDataA(currentSecondData,currentSecondData.spinLoad))
        this.EchartAData2.push(this.handleDataA(currentSecondData,currentSecondData.spinLoad2))
        this.EchartAData3.push(this.handleDataA(currentSecondData,currentSecondData.actSpin))//实际主轴转速1 (RPM)
        this.EchartAData4.push(this.handleDataA(currentSecondData,currentSecondData.actSpin2))//实际主轴转速2 (RPM)

        this.EchartADom.setOption({
        series: [{
          // type: 'line',
          data: this.EchartAData
        },{
          // type: 'line',
          data: this.EchartAData2
        },{
          // type: 'line',
          data: this.EchartAData3
        },{
          // type: 'line',
          data: this.EchartAData4
        }]
        });
    },


    handleSelect() {
      // console.log('pp:',this.dianliuValue)
      this.handleCurrentTab()
    },
    numPad(number, length) {
      return (''+number).padStart(length, 0)
    },
    getFormatTimeString(now) {
      var str1 = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/')
      var str2 = [this.numPad(now.getHours(), 2), this.numPad(now.getMinutes(), 2), this.numPad(now.getSeconds(), 2)].join(':')
      return str1 + " " + str2;
    },

    async renderDianLiuB() {
      var option = {
        title: {
          text: '动态数据 + 时间坐标轴',
          show: false
        },
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
          formatter: (params) => {
            // console.log('yyyy:',params)
            params = params[0];
            var date = new Date(params.name);
            return this.getFormatTimeString(date)+' '+params.value[1];
          },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'time',
          axisLine: {  // 控制x轴线的样式
            lineStyle: {
              type: 'solid',
              color: '#293e60',
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
            // showMaxLabel: true, //是否显示最大 tick 的 label
            showMinLabel: true,
          },
          splitLine: {
            show: false
          }
        },
        yAxis: [
          {
            type: 'value',
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
                color: '#293e60',
                width: '1' }
            },
            axisTick: {
              show: false
            },
          }
        ],
        series: [
          {
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
              animationDuration: 800,
            lineStyle: {
              color: '#0195e4'
            },
            yAxisIndex: 0,
            data: [],
            // data: [
            //   { value: [ '2016/2/18 03:00:00', 363 ] },
            //   { value: [ '2016/2/18 04:00:00', 384 ] },
            //   { value: [ '2016/2/18 05:00:00', 371 ] },
            // ]
          }
        ]
      };
      this.EchartBDom.setOption(option, true);

      // 调用数据
      this.getDataSecondMinutesFun()


    },

    handleDataA(item, yValue) {
        var obj = {}
        var newTime = new Date(item.time)
        var time2 = this.getFormatTimeString(newTime)
        var yNewValue = (yValue*1)<0?0:yValue
        obj.name = time2
        obj.value = [time2, yNewValue]
        return obj
    },
    // ==================请求数据 start=================
    // 2分钟
    async getTwoMinutesFun() {
      // console.log('deviceId:',this.deviceID)
      const params = {
        deviceID: this.deviceID,
        elecType: this.dianliuValue, // 电表参数值
        queryType: this.currentTab //查询类型：01：2分钟，02：24小时
      }
      let dataArrDevice = []
      let dataArrElec = []
      const response = await reqSelectByDeviceID(params)
      // return;
      
      if(response && response.code === 200){
          dataArrDevice = (response.data.deviceResponseDtos).reverse()

          this.isElec = response.data.isElec
          dataArrElec = (response.data.elecResponseDtoList).reverse()
      } else {
          return false
      }

      // 设备
      for(var i=0;i<dataArrDevice.length;i++){
          this.EchartAData.push(this.handleDataA(dataArrDevice[i],dataArrDevice[i].spinLoad))//主轴负载率1 (%)
          // this.EchartAData2.push(this.handleDataA(dataArrDevice[i],dataArrDevice[i].spinLoad2))//主轴负载率2 (%)
          this.EchartAData3.push(this.handleDataA(dataArrDevice[i],dataArrDevice[i].actSpin))//实际主轴转速1 (RPM)
          // this.EchartAData4.push(this.handleDataA(dataArrDevice[i],dataArrDevice[i].actSpin2))//实际主轴转速2 (RPM)
      }
      this.EchartADom.setOption({
        series: [
          {
            data: this.EchartAData
          },
          // {
          //   data: this.EchartAData2
          // },
          {
            data: this.EchartAData3
          },
          // {
          //   data: this.EchartAData4
          // }
        ]
      });

      // 电流
      
      if (this.isElec !== '0') {
        this.$nextTick(() => {
          // 底部电流
          this.EchartBDom = echarts.init(document.getElementById("deviceDetailBottomEchartsB"))
          this.AllEchartsArr.push(this.EchartBDom)
          this.renderDianLiuBottom()

                  for(var i=0;i<dataArrElec.length;i++){
            const attr = this.getElecValueByOpt()
            this.EchartBData.push(this.handleDataA(dataArrElec[i],dataArrElec[i][attr]))
          }
          this.EchartBDom.setOption({
            series: [{
              data: this.EchartBData
            }]
          });
        })
      }




      this.$nextTick(() => {
        let setIntervalTime = 1000
        if (this.currentTab == '02') {
          setIntervalTime = 30000 // 30s
        }
        
        this.dianliuaAId = setInterval(() => {
          // 设备      
          if (this.EchartAData.length > 120) {
            this.EchartAData.shift();
            this.EchartAData3.shift();
          }
          // 电流
          if (this.isElec!=='0') {         
            if (this.EchartBData.length > 1000) {
              this.EchartBData.shift();
            }
          }
          this.getOneSecondFun();
        }, setIntervalTime);
      })

    },
    // 1秒
    async getOneSecondFun() {
        const params = {
          deviceID: this.deviceID,
          elecType: this.dianliuValue, // 电表参数值
          queryType: this.currentTab //查询类型：01：2分钟，02：24小时
        }
        const responseOneSecond = await reqSelectByDeviceIDSs(params);

        // return;
        let currentDataDevice = {}
        let currentDataElec = {}
        if(responseOneSecond && responseOneSecond.code === 200 && responseOneSecond.data){
            if (responseOneSecond.data.deviceResponseDtos && responseOneSecond.data.deviceResponseDtos.length>0) {
              currentDataDevice = responseOneSecond.data.deviceResponseDtos[0]
            }
            if (responseOneSecond.data.elecResponseDtoList) {
              currentDataElec = responseOneSecond.data.elecResponseDtoList[0]
            }
        } else {
            return false
        }
        // 设备
        this.EchartAData.push(this.handleDataA(currentDataDevice,currentDataDevice.spinLoad))
        // this.EchartAData2.push(this.handleDataA(currentDataDevice,currentDataDevice.spinLoad2))
        this.EchartAData3.push(this.handleDataA(currentDataDevice,currentDataDevice.actSpin))//实际主轴转速1 (RPM)
        // this.EchartAData4.push(this.handleDataA(currentDataDevice,currentDataDevice.actSpin2))//实际主轴转速2 (RPM)

        this.EchartADom.setOption({
          series: [{
            data: this.EchartAData
          },{
            data: this.EchartAData3
          }]
        });

        if (this.isElec!=='0') {
          // 电流
          const attr = this.getElecValueByOpt()
          this.EchartBData.push(this.handleDataA(currentDataElec,currentDataElec[attr]))
          this.EchartBDom.setOption({
            series: [{
              data: this.EchartBData
            }]
          });
        }
    },
    // 24小时
    async get24HourFun() {

    },
    // ==================请求数据 end=================   
    // ==================渲染echarts start=================
    async renderDianLiuTop() {
      var option = {
        // color:['#fe5985','#51ddff','#ffd641','#9700e2'],
        color:['#fe5985','#ffd641'],
        legend: {
          show: true,
          // data:[{name:'主轴负载率1 (%)'},{name:'主轴负载率2 (%)'},{name:'实际主轴转速1 (RPM)'},{name:'实际主轴转速2 (RPM)'}],
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
          // formatter: (params) => {
          //   console.log('yyyy:',params)
          //   params = params[0];
          //   var date = new Date(params.name);
          //   return this.getFormatTimeString(date)+' '+params.value[1];
          // },
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
            // showMaxLabel: true, //是否显示最大 tick 的 label
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
            // data: [
            //   { value: [ '2016/2/18 03:00:00', 363 ] },
            //   { value: [ '2016/2/18 04:00:00', 384 ] },
            //   { value: [ '2016/2/18 05:00:00', 371 ] },
            // ]
          },
          // {
          //   name:'主轴负载率2 (%)',
          //   type:'line',
          //   showSymbol: false,
          //   hoverAnimation: false,
          //   animationDuration: 800,
          //   lineStyle: {
          //     color: '#51ddff'
          //   },
          //   yAxisIndex: 0,
          //   data: []
          // },
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
            // data: [
            //   { value: [ '2016/2/18 03:00:00', 363 ] },
            //   { value: [ '2016/2/18 04:00:00', 384 ] },
            //   { value: [ '2016/2/18 05:00:00', 371 ] },
            // ]
          },
          // {
          //   // name: '实际主轴转速',
          //   name:'实际主轴转速2 (RPM)',
          //   type: 'line',
          //   showSymbol: false,
          //   hoverAnimation: false,
          //     animationDuration: 800,
          //   lineStyle: {
          //     color: '#9700e2'
          //   },
          //   yAxisIndex: 1,
          //   data: [],
          //   // data: [
          //   //   { value: [ '2016/2/18 03:00:00', 363 ] },
          //   //   { value: [ '2016/2/18 04:00:00', 384 ] },
          //   //   { value: [ '2016/2/18 05:00:00', 371 ] },
          //   // ]
          // },
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
          // formatter: (params) => {
          //   // console.log('yyyy:',params)
          //   // params = params[0];
          //   // var date = new Date(params.name);
          //   // return this.getFormatTimeString(date)+' '+params.value[1];
          // },
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
            // showMaxLabel: true, //是否显示最大 tick 的 label
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
              color: '#0195e4'
            },
            yAxisIndex: 0,
            data: [],
            // data: [
            //   { value: [ '2016/2/18 03:00:00', 363 ] },
            //   { value: [ '2016/2/18 04:00:00', 384 ] },
            //   { value: [ '2016/2/18 05:00:00', 371 ] },
            // ]
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
      setTimeout(()=> {
        this.getTwoMinutesFun()
      },100)
      // if (this.currentTab === '01') {
      //   // 获取2分钟数据
      //   this.getTwoMinutesFun()
      // } else {
      //   this.get24HourFun()
      // }
    },
    // ==================点击tab start=================
    //清空echarts
    emptyEcharts() {
      clearInterval(this.dianliuaAId)
      
      this.EchartAData = []
      // this.EchartAData2 = []
      this.EchartAData3 = []
      // this.EchartAData4 = []
      this.EchartADom.setOption({
        series: [{
          data: []
        },{
          data: []
        }]
        // series: [{
        //   data: []
        // },{
        //   data: []
        // },{
        //   data: []
        // },{
        //   data: []
        // }]
      });

      if (this.EchartBDom){
        this.EchartBData = []
        this.EchartBDom.setOption({
          series: [{
            data: []
          }]
        });
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
    destroyed() {
      clearInterval(this.dianliuaAId)
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
