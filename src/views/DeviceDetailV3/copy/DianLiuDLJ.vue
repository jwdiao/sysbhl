<template>
  <div class="dianliu">
    <ul class="tab">
      <li
        v-for="(item, index) in tabOptions" :key="index"
        :class="item.value === currentTab ? 'active':''"
        @click="handleCurrentTab(item)"
      >{{ item.label }}</li>
    </ul>

    <div class="dianliu_top">
      <div id="deviceDetailBottomEchartsA" style="height:100%;width:100%"></div>
    </div>

    <div class="dianliu_bottom">
      <div class="con-empty" v-if="dianliuOptions.length<=0">
          <img src="../../assets/images/deviceDetail_noElec.png" />
          <span>暂无对应电表</span>
      </div>
      <div class="con-NoEmpty" v-if="dianliuOptions.length>0">
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
</template>
<script>
import echarts from 'echarts'
import {
    reqSelectByDeviceID,
    reqSelectByDeviceIDSs
} from '../../api'
export default {
  name: 'Dianliu',
  data() {
    return {
      dianliuOptions: [],
      dianliuValue: '',
      tabOptions: [
        {
          label: '2分钟',
          value: 'minute'
        },{
          label: '24小时',
          value: 'hour'
        }
      ],      
      currentTab: 'minute',

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
      // dianliuId: null

      latestTime: ''
    }
  },
  mounted() {
    // 获取电流下拉值
    this.getDianliuOptions()

    // 顶部电流
    this.EchartADom = echarts.init(document.getElementById("deviceDetailBottomEchartsA"))
    this.renderDianLiuTop()
    this.handleCurrentTab()

  },
  methods: {
    getDianliuOptions() {
      setTimeout(() => {
        const res = [
          {
            value: 'a',
            label: 'A相电流'
          }, {
            value: 'b',
            label: 'B相电流'
          }, {
            value: 'c',
            label: 'C相电流'
          }, {
            value: '选项4',
            label: '龙须面'
          }
        ]
        // const res = []
        this.dianliuOptions = res;
        if (res && res.length<=0) {
          
        } else {  // 渲染电流
          this.$nextTick(() => {
            // 底部电流
            if (document.getElementById("deviceDetailBottomEchartsB")){
              this.EchartBDom = echarts.init(document.getElementById("deviceDetailBottomEchartsB"))
              this.renderDianLiuBottom()
            }
          })
        }

      }, 0)
    },
    handleSelect() {
      this.handleCurrentTab()
    },
    handleClickTab(item) {
      this.currentTab = item.value

      // 清空
      clearInterval(this.dianliuId)
      this.EchartBData = []

      // 如果点击的是2分钟tab(需要清空echarts，请求2分钟的接口)
      if (this.currentTab === 'minute') {
        this.EchartBDom.setOption({
          series: [{
            data: []
          }]
        });
        this.getDataSecondMinutesFun()
      } else {
        // 如果点击的是24小时tab(需要清空echarts，请求24h的接口)

      }


      // if (this.currentTab === 'minute') { // 2分钟
      //   this.getDataSecondMinutesFun()
      // } else {
      //     this.EchartBDom.setOption({
      //       series: [{
      //         data: []
      //       }]
      //     });
      // }
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
    handleData(item) {
        var obj = {}
        var newTime = new Date(item.time)
        var time2 = this.getFormatTimeString(newTime)
        var yValue = item.spinLoad
        obj.name = time2
        obj.value = [time2, yValue]
        return obj
    },
    // 2分钟数据请求
    async getDataSecondMinutesFun() {
      let dataArr = []
      const response = await reqSelectByDeviceID('PM010103104221')
      if(response && response.code === 200){
          dataArr = (response.data.deviceResponseDtos).reverse()
      } else {
          return false
      }

      for(var i=0;i<dataArr.length;i++){
          this.EchartBData.push(this.handleData(dataArr[i]))
      }
      this.EchartBDom.setOption({
        series: [{
          data: this.EchartBData
        }]
      });


      this.dianliuId = setInterval(() => {          
        if (this.EchartBData.length > 120) {
          this.EchartBData.shift();
        }
        this.getDianliuDataOneSecond();
      }, 1000);
    },
    // 1秒钟获取电流
    async getDianliuDataOneSecond () {
        const responseOneSecond = await reqSelectByDeviceIDSs('PM010103104221');
        let currentSecondData = {}
        if(responseOneSecond && responseOneSecond.code === 200 && responseOneSecond.data&& responseOneSecond.data.deviceResponseDtos && responseOneSecond.data.deviceResponseDtos.length>0){

            currentSecondData = responseOneSecond.data.deviceResponseDtos[0]
        } else {
            return false
        }
        this.EchartBData.push(this.handleData(currentSecondData))
        this.EchartBDom.setOption({
          series: [{
            data: this.EchartBData
          }]
        });
    },
    // 24小时（1分钟调用一次数据）



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
    handleDataA(item, yValue) {
        var obj = {}
        var newTime = new Date(item.time)
        var time2 = this.getFormatTimeString(newTime)
        // var yValue = item.spinLoad
        obj.name = time2
        obj.value = [time2, yValue]
        return obj
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



    // ==================请求数据 start=================
    // 2分钟
    async getTwoMinutesFun() {
      let dataArr = []
      const response = await reqSelectByDeviceID("PM010702000126")
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

          if (this.EchartBDom) {
            this.EchartBData.push(this.handleDataA(dataArr[i],dataArr[i].spinLoad))
          }
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

      if (this.EchartBDom) {
        this.EchartBDom.setOption({
          series: [{
            data: this.EchartBData
          }]
        });
      }

      this.dianliuaAId = setInterval(() => {          
        if (this.EchartAData.length > 120) {
          this.EchartAData.shift();
          this.EchartAData2.shift();
          this.EchartAData3.shift();
          this.EchartAData4.shift();
        }
        if (this.EchartBDom) {
          if (this.EchartBData.length > 120) {
            this.EchartBData.shift();
          }
        }
        this.getOneSecondFun();
      }, 1000);
    },
    // 1秒
    async getOneSecondFun() {
        const responseOneSecond = await reqSelectByDeviceIDSs("PM010702000126");
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

        if (this.EchartBDom) {
        this.EchartBData.push(this.handleDataA(currentSecondData,currentSecondData.spinLoad))
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
        if (this.EchartBDom) {
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
        color:['#fe5985','#51ddff','#ffd641','#9700e2'],
        legend: {
          show: true,
          data:[{name:'主轴负载率1 (%)'},{name:'主轴负载率2 (%)'},{name:'实际主轴转速1 (RPM)'},{name:'实际主轴转速2 (RPM)'}],
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
          formatter: (params) => {
            // console.log('yyyy:',params)
            // params = params[0];
            // var date = new Date(params.name);
            // return this.getFormatTimeString(date)+' '+params.value[1];
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

    },    
    // ==================渲染echarts end=================  
    // ==================点击tab start=================
    handleCurrentTab(item) {
      if (item) {
        this.currentTab = item.value
      }
      // 清空echarts
      this.emptyEcharts()
      if (this.currentTab === 'minute') {
        // 获取2分钟数据
        this.getTwoMinutesFun()
      } else {
        this.get24HourFun()
      }
    },
    // ==================点击tab start=================
    //清空echarts
    emptyEcharts() {
      clearInterval(this.dianliuaAId)
      
      this.EchartAData = []
      this.EchartAData2 = []
      this.EchartAData3 = []
      this.EchartAData4 = []
      this.EchartADom.setOption({
        series: [{
          data: []
        },{
          data: []
        },{
          data: []
        },{
          data: []
        }]
      });

      if (this.EchartBDom){
        this.EchartBData = []
        this.EchartBDom.setOption({
          series: [{
            data: []
          }]
        });
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.dianliu{
  height: 100%;
  display: flex;flex-direction:column;
  .tab{
    text-align:right;width: 100%;padding-top:15px;padding-right:20px;
    li {
      background-color: #6e738a;color:#fff;display: inline-block;cursor: pointer;
      height:20px;width:50px;margin-left: 15px;border-radius: 4px;text-align: center;line-height: 20px;
      &.active{background-color:#00a6fc}
    }
  }
  &_top{ flex: 1 }
  &_bottom{
    flex: 1;
    .con-empty{
      width:564px;height: 139px;padding:0 50px;margin:20px auto 0;
      display: flex;justify-content: center;align-items: center;
      background: url('../../assets/images/deviceDetail_noElecEchart.png') 100% 100% no-repeat;
      span{color:#00c7fa;font-size: 14px;padding-left:8px;}
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
