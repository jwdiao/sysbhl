<template>
<div class="common_bg common_bg02">
  <CommonHead
    :isShowBackBtn="true"
    :isShowCurrentTime="false"
    :titleText="`${companyName}设备数据互联`"
    @backBtnClick="goBackFun"
  />
  <BasicTitle01 titleText="机床信息" headClass="deviceDetailTitle" />

  <div class="common_main common_blockColor deviceDetail">
    <div class="deviceDetail_mainLeft">
      <div class="deviceDetail_leftTop">
        <LeftTopDeviceImgModel :info="deviceDataObj" :url="deviceData.urlPath" />
      </div>
      <div class="deviceDetail_leftBottom">
          <LeftBottomCurNcBlk v-if="deviceData && deviceData.curNcBlk" :data="deviceData.curNcBlk" />
      </div>
    </div>
    <div class="deviceDetail_mainRight">
      <div class="deviceDetail_rightTop">
        <RightTopDeviceRunInfoTop :info="deviceData" />


        <!-- 中间 -->
        <ul class="centerContent">
          <li class="centerContentLi">
            <div class="centerContentTop">
              <label>给定主轴转速</label>
              <span>{{deviceData.scode}} RPM </span>
            </div>
            <div class="centerContentBottom">
              <label>实际主轴转速</label>
              <span>{{deviceData.actSpin}} RPM </span>
            </div>
          </li>
           <li class="centerContentLi">
            <div class="centerContentTop">
              <label>主轴负载率</label>
              <span>{{(deviceData.spinLoad*1>deviceData.maxSpinLoad*1)? (deviceData.maxSpinLoad) : (deviceData.spinLoad) }} % </span>
            </div>
            <div class="centerContentBottom">
              <label>主轴最大负载率</label>
              <span>{{deviceData.maxSpinLoad}} % </span>
            </div>
          </li>
         <li class="centerContentLi">
            <div class="centerContentTop">
              <label>给定进给率</label>
              <span>{{deviceData.fCode+ '&nbsp;' + danwei }} </span>
            </div>
            <div class="centerContentBottom">
              <label>实际进给率</label>
              <span>{{deviceData.actFeed+ '&nbsp;' +  danwei }}</span>
            </div>
          </li>
          <li class="centerContentLi">
            <div class="centerContentTop">
              <label>主轴一温度</label>
              <span>{{deviceData.spinTmp1 ? deviceData.spinTmp1+'&nbsp;℃':'/'}}</span>
            </div>
            <div class="centerContentBottom">
              <label>主轴二温度</label>
              <span>{{deviceData.spinTmp2 ? deviceData.spinTmp2+'&nbsp;℃':'/'}}</span>
            </div>
          </li>
        </ul>

        <!-- 底部 -->
        <div class="bottomContent">
          <div class="bottomContentLeft">
            <ul class="BLeftLine">
              <li>
                <ul class="BLeftLineUl">
                  <li class="BLeftLineUlLi bgTitle"></li>
                  <li class="BLeftLineUlLi bgTitle">X</li>
                  <li class="BLeftLineUlLi bgTitle">Y</li>
                  <li class="BLeftLineUlLi bgTitle">Z</li>
                  <li class="BLeftLineUlLi bgTitle">C</li>
                  <li class="BLeftLineUlLi bgTitle">B</li>
                </ul>
              </li>
            </ul>
            <ul class="BLeftLine">
              <li>
                <div class="BLeftLineUlDiv bgTitle">绝对坐标</div>
                <ul class="BLeftLineUl" v-for="(item,index) in deviceData.absPos">
                  <li class="BLeftLineUlLi">{{item}}</li>
                </ul>
              </li>
            </ul>
            <ul class="BLeftLine">
              <li>
                <div class="BLeftLineUlDiv bgTitle">相对坐标</div>
                <ul class="BLeftLineUl" v-for="(item,index) in deviceData.relPos">
                  <li class="BLeftLineUlLi">{{item}}</li>
                </ul>
              </li>
            </ul>
            <ul class="BLeftLine">
              <li>
                <div class="BLeftLineUlDiv bgTitle">机械坐标</div>
                <ul class="BLeftLineUl" v-for="(item,index) in deviceData.machPos">
                  <li class="BLeftLineUlLi">{{item}}</li>
                </ul>
              </li>
            </ul>
            <ul class="BLeftLine">
              <li>
                <div class="BLeftLineUlDiv bgTitle">剩余距离</div>
                <ul class="BLeftLineUl" v-for="(item,index) in deviceData.remDist">
                  <li class="BLeftLineUlLi">{{item}}</li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="bottomContentRight">
            <ul class="bottomConentLiRightUl">
              <li>
                <div class="bottomConentLiRightUlF">F</div>
                <ul class="bottomConentLiRightUlFS">
                  <li>设定F值</li>
                  <li>F倍率</li>
                  <li>实际进给</li>
                </ul>
                <ul class="bottomConentLiRightUlFS FSnumber">
                  <li>{{deviceData.fV}}</li>
                  <li>{{deviceData.ovFeed}}</li>
                  <li>{{deviceData.actFeed}}</li>
                </ul>
              </li>
              <li>
                <div class="bottomConentLiRightUlF">S</div>
                <ul class="bottomConentLiRightUlFS">
                  <li>设定S值</li>
                  <li>主轴倍率</li>
                  <li>主轴负载</li>
                </ul>
                <ul class="bottomConentLiRightUlFS FSnumber">
                  <li>{{deviceData.rV}}</li>
                  <li>{{deviceData.ovSpin}}</li>
                  <li>{{deviceData.spinLoad}}</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="deviceDetail_rightBottom">
        <div class="deviceDetail_rightBottom-left">
              <RightBottomDeviceStatusEchartsLeft :progress-data="progress" :pie-data="echartsData" />
              <div class="deviceHourEcharts">
                <div id="deviceDetailHourDevice" style="height:100%;width: 100%"></div>
                <img class="deviceHourEcharts_legend" src="../../assets/images/deviceDetail_echartLegend.png" />
              </div>          
        </div>
        <div class="deviceDetail_rightBottom-right">
          <DianLiu ref="childcompNormal" />
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
		reqDeviceRightList,
		machineConnectioninfo,
    reqJGLDanwei,
    reqSingleDeviceFind,
  } from '../../api'
  import { getDayTypeFun, getDayStrFun, _SessionStorageObj } from '@/utils'
  import CommonHead from '@/components/Head'
  import BasicTitle01 from '@/components/BasicTitle01'

  import LeftTopDeviceImgModel from './components/LeftTopDeviceImgModel'
  import LeftBottomCurNcBlk from './components/LeftBottomCurNcBlk'
  import RightTopDeviceRunInfoTop from './components/RightTopDeviceRunInfoTop'
  import RightBottomDeviceStatusEchartsLeft from './components/RightBottomDeviceStatusEchartsLeft'
  import DianLiu from './DianLiu'
export default {
  name: 'DeviceDetail',
  components: {
    CommonHead,
    BasicTitle01,
    LeftTopDeviceImgModel,
    LeftBottomCurNcBlk,
    RightTopDeviceRunInfoTop,
    RightBottomDeviceStatusEchartsLeft,
    DianLiu
  },
  data() {
    return {
      companyCode: '0701',
      companyName: '三一德力佳',
      deviceDataObj: {
        machineModel:'', // 从上一页传过来的
        machineName: '', // 从上一页传过来的（存在localstorage里了）
        machineStatus: '', // 从饼图接口中取的
        time: '' // 从饼图接口   
      }, //首页传过来的设备名称和从接口获取的时间和设备状态
      deviceData: {
            mainPgm: '', // 主程序
            curPgm: '', // 执行程序
            mode: '', // 模式
            ncStatus: '', // 状态
            alarm: '', // 报警
            emg: '', // 急停
            curNcPtr: '', //执行行号/指标

            scode: '', // 命令主轴转速(多个值)
            actSpin: '', // 实际主轴转速(多个值)
            spinLoad: '', // 主轴负载 (多个值)
            maxSpinLoad: '', // 主轴最大负载(多个值)
            fCode: '', // 命令进给率
            actFeed: '', // 实际进给率
            spinTmp1: '', // 主轴一温度
            spinTmp2: '', // 主轴二温度

            absPos: ['','','','',''], // 绝对坐标
            relPos: ['','','','',''], // 相对坐标
            machPos: ['','','','',''] , // 机械坐标
            remDist: ['','','','',''], // 剩余距离
            
            fV: '', // 设定F值						
            ovFeed: '', // F倍率						
            actFeed : '',// 实际进给						
            rV: '',// 设定S值(多个值)						
            ovSpin: '',// 主轴倍率	(多个值)		

            curNcBlk: '', // 页面左下角数据
            urlPath: '', // 页面左上角机器图片        
      }, // 右上角设备参数信息
      danwei:'', //进给率 的单位
      progress: [
        {
          id: 1,
          title: '作业',
          percentage: 0,
          color: '#25EE3D',
          time: '00:00:00'
        }, {
          id: 2,
          title: '待机',
          percentage: 0,
          color: '#FFC620',
          time: '00:00:00'
        }, {
          id: 3,
          title: '离线',
          percentage: 0,
          color: '#444445',
          time: '00:00:00'
        },
        {
          id: 4,
          title: '故障',
          percentage: 0,
          color: '#F50400',
          time: '00:00:00'
        }, {
          id: 5,
          title: '关机',
          percentage: 0,
          color: '#48494B',
          time: '00:00:00'
        }
      ],
      echartsData: [{
          value: 335,
          name: '作业',
        },
        {
          value: 310,
          name: '待机',
          selected: true
        },
        {
          value: 0,
          name: '离线',
          selected: true
        },
        {
          value: 234,
          name: '故障',

        },
        {
          value: 135,
          name: '关机',
          selected: true
        },
      ],
      // hour24EchartData: [],
      IntervalId: null,
      dayType: 1, // 1 白班 2 夜班
      AllEchartsArr: []
    }
  },
  mounted() {
      // 选中的子公司
      const sbhlSelectedCompanyObj = _SessionStorageObj.get('sbhl-OverView-SelectedCompany')
      if (sbhlSelectedCompanyObj) {
        this.companyCode = sbhlSelectedCompanyObj.value; // 公司编码
        this.companyName = sbhlSelectedCompanyObj.label // 公司名字
      }

			const deviceInfoFromLocalstory = _SessionStorageObj.get('deviceID') // 设备信息
			const deviceID = deviceInfoFromLocalstory.machineNo // 设备id
			this.deviceDataObj.machineName = deviceInfoFromLocalstory.machineName // 设备name
			this.deviceDataObj.machineModel = deviceInfoFromLocalstory.machineModel // 设备name

			this.getDeviceParamsInfo(deviceID) // 右上角设备参数信息
			this.getJGLDanwei(deviceID) // 右上角--进给率单位

      this.findMachineConnectioninfo(deviceID); // 右侧饼图和进度条数据


      // 饼图下面的echart图
      var myChart = echarts.init(document.getElementById('deviceDetailHourDevice'));
      this.AllEchartsArr.push(myChart)
      this.renderEchartsBB(myChart,deviceID)


			window.addEventListener('resize', this.handleResize); // echarts图自适应

      this.IntervalId = setInterval(()=>{
				this.getDeviceParamsInfo(deviceID)  // 右上角设备参数信息
        this.getJGLDanwei(deviceID) // 右上角--进给率单位				
        this.findMachineConnectioninfo(deviceID);
      },5000)
  },
  methods: {
    // 返回按钮
    goBackFun() {
      const fromRouter = this.$route.params.fromRouter
      if (fromRouter) {
        this.$router.push(fromRouter)
      } else {
        this.$router.push('/DeviceList')
      }
    },
    //----------------右上角设备参数信息  start -------------->
    // 过滤数字型数据
    filtersNumber: function (value) {
      // console.log('filter:',value)
      if (value === '-100000.0F') {
        return ''
      } else if (value === null || value === '0' || value === '0.00' || value === undefined) {
        return 0
      } else {
        const valueNum = value*1
        if (valueNum) {
          return valueNum.toFixed(2)
        } else {
          return valueNum
        }
      }
    },
    // 过滤字符串型数据
    filterStr: function(value) {
      if (value === '-100000.0F') {
        return ''
      } else {
        return value
      }
    },
    // 页面顶部主信息
    async getDeviceParamsInfo(deviceID) {
      const currentDateStr = getDayStrFun()
      const dayType = getDayTypeFun()
      // console.log('currentDateStr:',currentDateStr,"dayType:",dayType)
      const res = await reqDeviceRightList(deviceID,currentDateStr,dayType)
      if (res && res.code === 200) {
        if(res.data!==null){
          const item = res.data
          this.deviceData = {
              ...item,
              mainPgm: this.filterStr(item.mainPgm), // 主程序
              curPgm: this.filterStr(item.curPgm), // 执行程序
              mode: this.filterStr(item.mode), // 模式
              ncStatus: this.filterStr(item.ncStatus), // 状态
              alarm: this.filterStr(item.alarm), // 报警
              emg: this.filterStr(item.emg), // 急停
              curNcPtr: this.filterStr(item.curNcPtr), //执行行号/指标

              scode: this.filtersNumber(item.scode), // 命令主轴转速(多个值)
              actSpin: this.filtersNumber(item.actSpin), // 实际主轴转速(多个值)
              spinLoad: this.filtersNumber(item.spinLoad), // 主轴负载 (多个值)
              maxSpinLoad: this.filtersNumber(item.maxSpinLoad), // 主轴最大负载(多个值)
              fCode: this.filtersNumber(item.fCode), // 命令进给率
              actFeed: this.filtersNumber(item.actFeed), // 实际进给率
              spinTmp1: this.filtersNumber(item.spinTmp1), // 主轴一温度
              spinTmp2: this.filtersNumber(item.spinTmp2), // 主轴二温度

              absPos: item.absPos.map(value => this.filtersNumber(value)), // 绝对坐标
              relPos: item.relPos.map(value => this.filtersNumber(value)), // 相对坐标
              machPos: item.machPos.map(value => this.filtersNumber(value)), // 机械坐标
              remDist: item.remDist.map(value => this.filtersNumber(value)), // 剩余距离
              
              fV: this.filtersNumber(item.fV), // 设定F值						
              ovFeed: this.filtersNumber(item.ovFeed), // F倍率						
              actFeed : this.filtersNumber(item.actFeed),// 实际进给						
              rV: this.filtersNumber(item.rV),// 设定S值(多个值)						
              ovSpin: this.filtersNumber(item.ovSpin),// 主轴倍率	(多个值)		

              curNcBlk: item.curNcBlk, // 页面左下角数据
              urlPath: item.urlPath, // 页面左上角机器图片
          }
        }
      }
    },
    // 获取给定进给率单位
    async getJGLDanwei(Danwei){
      const currentDateStr = getDayStrFun()
      const dayType = getDayTypeFun()
      const res = await reqJGLDanwei(Danwei,currentDateStr,dayType)
      if(res&&res.code===200){
        if(res.data!==null){
          this.danwei = res.data.dataUnit
        }
      }
    },
    //-----------------右上角设备参数信息 end ------------->
    // 饼图echarts和进度条数据 和 左上角设备工作状态和时间
    async findMachineConnectioninfo(deviceID) {
      const currentDateStr = getDayStrFun()
      const dayType = getDayTypeFun()
      const params = {
        deviceID: deviceID,
        date: currentDateStr,
        dayType: dayType
      }
      const res = await machineConnectioninfo(params);
      this.progress[0].percentage = Math.floor(res.data.startupTime * 100 * 100) / 100 // 作业百分比
      this.progress[0].time = this.countTime(res.data.startupTimeMinute) || 0 // 作业时间
      this.progress[1].percentage = Math.floor(res.data.standbyTime * 100 * 100) / 100 // 待机百分比
      this.progress[1].time = this.countTime(res.data.standbyTimeMinute) // 待机时间
      this.progress[2].percentage = Math.floor(res.data.unlineTime * 100 * 100) / 100 // 离线百分比
      this.progress[2].time = this.countTime(res.data.unlineTimeMinute) // 离线时间      
      this.progress[3].percentage = Math.floor(res.data.failureTime * 100 * 100) / 100 // 故障百分比
      this.progress[3].time = this.countTime(res.data.failureTimeMinute) // 故障时间
      this.progress[4].percentage = Math.floor(res.data.offTime * 100 * 100) / 100 // 关机百分比
      this.progress[4].time = this.countTime(res.data.offTimeMinute) // 关机时间

      this.echartsData = [{
          value: this.returnMin(res.data.startupTimeMinute), // 作业时间(min)
          name: '作业',
        },
        {
          value: this.returnMin(res.data.standbyTimeMinute), // 待机时间(min)
          name: '待机',
          selected: true
        },
        {
          value: this.returnMin(res.data.unlineTimeMinute), // 离线时间(min)
          name: '离线',
          selected: true
        },
        {
          value: this.returnMin(res.data.failureTimeMinute), // 故障时间(min)
          name: '故障',

        },
        {
          value: this.returnMin(res.data.offTimeMinute), // 关机时间(min)
          name: '关机',
          selected: true
        },
      ]

      const currentStatus = res.data.machineStatus;
      if(currentStatus===1){ // 作业
        this.deviceDataObj.time = this.progress[0].time
      } else if(currentStatus===2) { // 待机
        this.deviceDataObj.time = this.progress[1].time
      } else if(currentStatus===4) { // 故障
        this.deviceDataObj.time = this.progress[3].time
      } else if(currentStatus===3) { // 关机
        this.deviceDataObj.time = this.progress[4].time
      }  else if(currentStatus===5) { // 离线
        this.deviceDataObj.time = this.progress[2].time
      }
      this.deviceDataObj.machineStatus = currentStatus
    },
    // 计算时间函数
    countTime(value) {
      var h = Math.floor(value / 3600) < 10 ? '0' + Math.floor(value / 3600) : Math.floor(value / 3600);
      var m = Math.floor((value / 60 % 60)) < 10 ? '0' + Math.floor((value / 60 % 60)) : Math.floor((value / 60 % 60));
      var s = Math.floor(value % 60) < 10 ? '0' + Math.floor((value % 60)) : Math.floor((value % 60));
      return h + ':' + m + ':' + s
    },
    // 返回分钟
    returnMin(value) {
      var m = Math.floor(value / 60 * 100) / 100;
      return m
    },
    async renderEchartsBB(myChart,deviceID){  //本日
      const currentDateStr = getDayStrFun()
      const dayType = getDayTypeFun()
      // debugger;
      const params ={
          "companyCode": this.companyCode,
          "date": currentDateStr,
          "dayType": dayType,
          "machineNo": deviceID,
          "firstGroupCode": '',
          "machineName": '',
          "workCenterCode": ''
      }
      const res = await reqSingleDeviceFind(params)
      if (res.data.list.length<=0) return;
      const arrList = res.data.list[0].dataList
      var data = []
      arrList.forEach(item => {
        let newArr = []
        newArr[0] = new Date(moment(item.beginDate).format('YYYY/MM/DD HH:mm:ss'))
        newArr[1] = new Date(moment(item.endDate).format('YYYY/MM/DD HH:mm:ss'))
        let height = 0
        let color = ''
        let text = ''
        if (item.machineStatus == 1 ) {
          height = 200
          color = '#1cf33c'
          text = '作业'
        } else if (item.machineStatus == 2 ) {
          height = 150
          color = '#ffc31f'
          text = '待机'
        } else if (item.machineStatus == 3 ) {
          height = 20
          color = '#6b6d71'
          text = '关机'
        } else if (item.machineStatus == 4 ) {
          height = 50
          color = '#fd0101'
          text = '故障'
        } else if (item.machineStatus == 5 ) {
          height = 100
          color = '#444445'
          text = '离线'
        }
        // console.log('start:',moment(item.beginDate).format('YYYY/MM/DD HH:mm:ss'))
        // console.log('end:',moment(item.endDate).format('YYYY/MM/DD HH:mm:ss'))
        // console.log('text:',text)
        newArr[2] = height
        newArr[3] = text
        newArr[4] = color
        data.push(newArr)
      })
      // var data = [
      //   // x轴开始点、x轴结束点、高度、
      //   [new Date(moment('2019-06-24T00:00:00.000+0000').format('YYYY/MM/DD HH:mm:ss')), new Date(moment("2019-06-24T00:19:07.000+0000").format('YYYY/MM/DD HH:mm:ss')), 100, '作业','#4f81bd'], 
      //   [new Date(moment("2019-06-24T00:19:07.000+0000").format('YYYY/MM/DD HH:mm:ss')), new Date(moment("2019-06-24T00:27:21.000+0000").format('YYYY/MM/DD HH:mm:ss')), 80, '待机', '#c0504d'],
      //   [new Date(moment("2019-06-24T00:27:21.000+0000").format('YYYY/MM/DD HH:mm:ss')), new Date(moment("2019-06-24T00:28:41.000+0000").format('YYYY/MM/DD HH:mm:ss')), 60, '离线', '#948a54'],
      //   [new Date(moment("2019-06-24T00:28:41.000+0000").format('YYYY/MM/DD HH:mm:ss')), new Date(moment("2019-06-24T00:28:28.000+0000").format('YYYY/MM/DD HH:mm:ss')), 100, '作业', '#4f81bd'],

      //   // [new Date("2019-06-24T00:28:41.000+0000"), new Date("2019-06-24T00:28:28.000+0000").format('YYYY/MM/DD')), 100, '作业', '#4f81bd'],
      //   // [new Date("2019-06-24T00:28:28.000+0000"), new Date("2019-06-24T00:36:48.000+0000").format('YYYY/MM/DD')), 100, '作业', '#4f81bd'],
      //   // [new Date("2019-06-24T00:36:48.000+0000"), new Date("2019-06-24T01:05:34.000+0000"), 100, '作业', '#4f81bd'],
      //   // [new Date("2019-06-24T01:05:34.000+0000"), new Date("2019-06-24T01:33:46.000+0000"), 100, '作业', '#4f81bd'],
      //   // [18, 26, 40, '故障', '#9bbb59'],
      //   // [26, 32, 20, '关机', '#604a7b'],
      //   // [32, 56, 60, '离线', '#948a54'],
      //   // [56, 62, 100, '作业', '#4f81bd']
      // ];

      var colorList = ['#4f81bd', '#c0504d', '#9bbb59', '#604a7b', '#948a54', '#e46c0b'];

      data = echarts.util.map(data, function (item, index) {
          return {
              value: item,
              itemStyle: {
                  normal: {
                      color: item[4]
                  }
              }
          };
      });

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
            data: data
        }]        
      }
      myChart.setOption(option)
    },
    handleResize() {
        this.AllEchartsArr.forEach((ele, index) => {
          // ele.resize()
        })
    },    
  },
  beforeDestroy() {
    this.$refs.childcompNormal.clearDianLiu()
  },
  destroyed() {
    clearInterval(this.IntervalId)
  }
}
</script>
<style lang="scss" scoped>
.deviceDetailTitle{
  position: absolute; top:65px; left:100px;
}
.deviceDetail{
  overflow: hidden;
  padding: 15px;
  display: flex;
}
//=================左侧样式==================
.deviceDetail_mainLeft{
		height: 100%;width: 315px;margin-right: 15px;
    display: flex;flex-direction: column;
}
.deviceDetail_leftTop{
		background: rgba(0, 186, 255, 0.1);
		height: 360px;width: 100%;
}
.deviceDetail_leftBottom{
		background: rgba(0, 186, 255, 0.1);
		margin-top: 15px;
		font-size: 18px;
		color: #aec9ff;
		padding: 15px;
		flex: 1;overflow: hidden;
    /deep/ .el-scrollbar__wrap {
			overflow-x: hidden;
		}
}




//=================右侧样式==================
.deviceDetail_mainRight{
  flex: 1;display: flex;flex-direction: column;
}
.deviceDetail_rightTop{
  background: rgba(0, 186, 255, 0.1);
  height: 360px;padding: 15px;display: flex;flex-direction:column;

  .centerContent{
    margin: 15px 0;
    display: flex;background-color: rgba(0, 186, 255, 0.1);
    height: 90px;
    .centerContentLi{
      flex: 1;
      display: flex;justify-content: center;flex-direction:column;
      .centerContentTop{

      }
      .centerContentBottom{
        margin-top: 10px;
      }
      label { font-size: 0.14rem; color: #fff;padding-right:5px;display: inline-block;vertical-align: middle;width: 130px;text-align: right; }
      span { 
        font-size: 0.2rem;color: #00c7fa;padding-left:20px;
        max-width: 170px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        display: inline-block;vertical-align: middle
      }
    }
  }
  .bottomContent{
    display: flex;flex: 1;
  }
  .bottomContentLeft{
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    box-sizing: border-box;

    .BLeftLine {
      flex: 1;
      display: flex;
      li {
        flex: 1;
        display: flex;

        .BLeftLineUl {
          flex: 5;
          display: flex;

          .BLeftLineUlLi {
            flex: 1;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 186, 255, 0.1);
            margin: 1px 0px;
            font-size: 0.16rem;
            color: #00c7fa;
          }

          .bgTitle {
            background: linear-gradient(rgba(51, 171, 251, 0.3), rgba(136, 209, 247, 0.3));
            margin-right: 1px;color:#fff;
          }
        }

        .BLeftLineUlDiv {
          flex: 5;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(rgba(51, 171, 251, 0.3), rgba(136, 209, 247, 0.3));
          margin: 0 1px 1px 0;
          font-size: 0.16rem;
          box-sizing: border-box;
          color: #ffffff;
          text-align: center;
        }
      }
    }
  }
  .bottomContentRight{
    flex: 1;margin-left: 15px;
    background: rgba(0, 186, 255, 0.1);
    .bottomConentLiRightUl {
      display: flex;
      height: 100%;

      li {
        flex: 1;
        display: flex;
        margin: 1px;

        .bottomConentLiRightUlF {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(rgba(51, 171, 251, 0.3), rgba(136, 209, 247, 0.3));
          font-size: 0.24rem;
          color: #fff;
        }

        .bottomConentLiRightUlFS {
          flex: 2;
          display: flex;
          flex-direction: column;

          li {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(0, 186, 255, 0.1);
            font-size: 0.16rem;
            color: #fff;
          }
        }

        .FSnumber {
          li {
            font-size: 0.16rem;
            color: #00c7fa;
          }
        }
      }
    }
  }
}
.deviceDetail_rightBottom{
  
  margin-top: 15px;
  flex: 1;
  display: flex;
  
  .deviceDetail_rightBottom-left{
    flex: 1;background: rgba(0, 186, 255, 0.1);
    display: flex;flex-direction: column;
    padding:10px;
    .deviceHourEcharts{
      flex: 1;
      margin-top:10px;
      background-color: rgba(0,186,255,0.1);position: relative;
    }
    .deviceHourEcharts_legend{
      position: absolute;top:0;right:0;
    }
  }
  .deviceDetail_rightBottom-right{
    flex: 1;margin-left: 15px;background: rgba(0, 186, 255, 0.1);
  }
}
</style>

