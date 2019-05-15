
<template>
  <div class="sbhl">
    <!-- 头部 start -->
    <div class="sbhl_top">
      <div class="sbhl_imgText" @click="showCompanyDialog = true">
        {{this.companyName}}设备数据互联       
      </div>
      <!--右上角时间-->
      <em class="time" v-text="currentTime"></em>
    </div>
    <CompanyDialog
      :showflag="showCompanyDialog" 
      @confirmcallback="confirmFun"
      @showdialog="showdialogFun"
    />
    <div class="sbhl_overview_navBtn" @click="isOpenedNav = !isOpenedNav">
      主页面
      <div class="triangle_top" v-if="!isOpenedNav"></div>
      <div class="triangle_bottom" v-if="isOpenedNav"></div>
    </div>
    <div class="sbhl_pageNav_box" v-if="isOpenedNav">
      <ul class="sbhl_pageNav">
        <li
          v-for="item in NavPageList"
          :key="item.id"
          @click="$router.push(item.url)"
        >{{item.name}}</li>
      </ul>
    </div>
    <!-- 头部 end -->

    <!-- main start -->
    <div class="sbhl_main">
      <div class="sbhl_left">
        <div class="sbhl_left_top">
          <div class="sbhltitle">
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
                  <img src="../../assets/images/bluePoint.png" alt="">
                  <span class="statusCount">{{deviceData.onlineNum}}</span>
                  <em class="statusDanw"></em>
                </div>
              </li>
              <li>
                <p class="statusTitle">作业</p>
                <div class="statusDiv">
                  <img src="../../assets/images/greenPoint.png" alt="">
                  <span class="statusCount"> {{deviceData.runNum}}</span>
                  <em class="statusDanw">台</em>
                </div>
              </li>
              <li>
                <p class="statusTitle">待机</p>
                <div class="statusDiv">
                <img src="../../assets/images/yellowPoint.png" alt="">
                <span class="statusCount"> {{deviceData.idleNum}}</span>
                <em class="statusDanw">台</em>
                </div>
              </li>
              <li>
                <p class="statusTitle">故障</p>
                <div class="statusDiv">
                <img src="../../assets/images/redPoint.png" alt="">
                <span class="statusCount"> {{deviceData.alarmNum}}</span>
                <em class="statusDanw">台</em>
                </div>
              </li>
              <li>
                <p class="statusTitle">关机</p>
                <div class="statusDiv">
                <img src="../../assets/images/garyPoint.png" alt="">
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
                    <p class="numPoint">{{deviceData.startUpHour}}</p> <!--开机小时数 = 作业时间+空闲时间-->
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
                <p class="statusNum">故障率</p>
                <div class="echartsImg problem" id="problemLV" ref="problem">
                </div>
              </li>
              <li>
                <p class="statusNum">完成工件数</p>
                <div class="echartsImg totalE" ref="totalE">
                  <div>
                    <p class="numPoint">{{deviceData.finishNum}}</p>
                    <em>单位: 件</em>
                  </div>
                </div>
              </li>
              <li>
                <p class="statusNum">计划完成率</p>
                <div class="echartsImg planFinishLv" id="planFinishLv" ref="runLV">
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
        <div class="sbhl_left_bottom">
          <OverViewList />
        </div>
      </div>
      <div class="sbhl_right">
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
      </div>
    </div>
    <!-- main end -->

  </div>
</template>

<script>
  import echarts from 'echarts'
  import moment from 'moment'
  import OverViewList from './OverViewList20190510.vue'
  import CompanyDialog from '@/components/CompanyDialog.vue'
  import {reqCountDeviceMain} from '../../api'

  export default {
    name: 'OverView',
    data() {
      return {
        companyCode: '0701', // 选中的公司code
        companyName: '三一德力佳', // 选中的公司name
        showCompanyDialog: false, // 是否显示顶部选择子公司
        orgCode:'',   //选中的组织代码
        refreshDataIdTime: '', // 时间刷新
        refreshDataIdAll: '', // 数据刷新
        currentTime: '', // 系统当前时间
        CarsVThreeAllEchartsArr:[],
        screenHeight:window.innerHeight,//屏幕的高
        deviceData:{},//左上部分数据
        //右下侧echarts图
        chartsBData: { // 月

        },
        chartsCData: { //年

        },
        chartsAData: { //年

        },
        isOpenedNav: false, // 导航是否显示
        NavPageList: [
          {
            id: '001',
            name: '主页面',
            url: '/OverView'
          },
          {
            id: '002',
            name: '故障页',
            url: '/DeviceFailure'
          },
        ]
      }
    },
    watch: {
      // 子公司改变重新加载数据
      companyCodeStr(val) {
        if(!val) return;
        this.companyCode = JSON.parse(val).value
        this.companyName = JSON.parse(val).label
				//01：左上部分数据
        this.getDeviceAllData(this.companyCode,this.orgCode,'01')
        //10：代表日统计
        this.getDeviceAllData(this.companyCode,this.orgCode,'10')
        //11：代表按月统计
        this.getDeviceAllData(this.companyCode,this.orgCode,'11')
        //12 ：代表 按年统计
        this.getDeviceAllData(this.companyCode,this.orgCode,'12')
			}
    },
    created() {},
    computed: {
			companyCodeStr() {
				return this.$store.state.sbhlOverViewSelectedCompany;
			}
		},
    components: {
      OverViewList,
      CompanyDialog
    },
    mounted() {
      // 顶部日期时间
      this.currentTime = this.getCurrentDateTime();
      this.refreshDataIdTime = setInterval(() => {
        this.currentTime = this.getCurrentDateTime()
      },1000)

      // 从localStory里面取选中的公司
      const sbhlSelectedCompanyStr = localStorage.getItem('sbhl-OverView-SelectedCompany')
      if(sbhlSelectedCompanyStr && sbhlSelectedCompanyStr!==undefined){
        const sbhlSelectedCompanyObj = JSON.parse(sbhlSelectedCompanyStr)
        this.companyCode = sbhlSelectedCompanyObj.value; // 公司编码
        this.companyName = sbhlSelectedCompanyObj.label // 公司名字
      } else {
        localStorage.setItem('sbhl-OverView-SelectedCompany',JSON.stringify({label:this.companyName,value:this.companyCode}))
      }

      this.$store.commit('changeOverViewSelectedCompanyMut',JSON.stringify({label:this.companyName,value:this.companyCode}))

      // 右侧====echarts图
      this.sbhlDayEcharts = echarts.init(document.getElementById('sbhl-day-echarts'));
      this.CarsVThreeAllEchartsArr.push(this.sbhlDayEcharts)
      this.sbhlMonthEcharts = echarts.init(document.getElementById('sbhl-mouth-echarts'));
      this.CarsVThreeAllEchartsArr.push(this.sbhlMonthEcharts)
      this.sbhlYearEcharts = echarts.init(document.getElementById('sbhl-year-echarts'));
      this.CarsVThreeAllEchartsArr.push(this.sbhlYearEcharts)


      
      //01：左上部分数据
      this.getDeviceAllData(this.companyCode,this.orgCode,'01')
      //10：代表日统计
      this.getDeviceAllData(this.companyCode,this.orgCode,'10')
      //11：代表按月统计
      this.getDeviceAllData(this.companyCode,this.orgCode,'11')
      //12 ：代表 按年统计
       this.getDeviceAllData(this.companyCode,this.orgCode,'12')
       
      //给window对象绑定resize事件
      window.addEventListener('resize', this.handleResize);

      this.refreshDataIdAll = setInterval(() => {
        //01：左上部分数据
        this.getDeviceAllData(this.companyCode,this.orgCode,'01')
        //10：代表日统计
        this.getDeviceAllData(this.companyCode,this.orgCode,'10')
        //11：代表按月统计
        this.getDeviceAllData(this.companyCode,this.orgCode,'11')
        //12 ：代表 按年统计
        this.getDeviceAllData(this.companyCode,this.orgCode,'12')
      }, 10000)
      
    },
    methods: {
      //左上部分--右侧本日本月本年后台请求数据
      async getDeviceAllData(companyCode, orgCode, requestType){
        const currentDateStr = moment(new Date()).format('YYYY-MM-DD');
        switch (requestType){
          case '01' :  //左上部分所有数据
            const res01 = await reqCountDeviceMain(companyCode, orgCode, requestType,currentDateStr)
            if(res01&&res01.code===200){
              const resData = res01.data

              /**
               * 逻辑规则：
               * 开机时间 = 作业时间 + 待机时间
               * 开机率 = 开机时间 / 自然时间
               * 作业率 = 作业时间 / 开机时间
               * 故障率 = 故障数 / 总数
               * 利用率 = 开机率 * 作业率
               * 总耗电量 = 消耗电能 / 总数 
               * 在线 = 作业 + 待机 + 故障 + 停机
               * 离线 = 设备总数 - 在线
               */
              const totalNum = resData.totalNum || 0 // 设备总数
              const runNum = resData.runNum || 0 // 作业台数
              const idleNum = resData.idleNum || 0 // 待机台数
              const alarmNum = resData.alarmNum || 0 // 故障台数
              const shutDownNum = resData.shutDownNum || 0 // 关机台数
              const onlineNum = runNum + idleNum + alarmNum + shutDownNum // 在线台数
              const outlineNum = totalNum - onlineNum // 离线台数


              const idleTime = resData.idleTime || 0 // 待机时间（秒）
              const runTime = resData.runTime || 0 // 作业时间（秒）
              const naturalTime = resData.naturalTime || 0 // 自然时间（秒）
              const naturalTimeHour = naturalTime / 3600 || 0 // 自然时间（小时）             
              const elcPower = resData.elcPower || 0 // 总耗电量

              const startUpHour = parseFloat(((idleTime + runTime)/3600).toFixed(2))||0 // 开机小时数（开机时间）
              const workHour = parseFloat((runTime/3600).toFixed(2))||0 // 作业小时数（作业时间）
              const bootRate = (startUpHour/naturalTimeHour)*100 > 100 ? 100 : (startUpHour/naturalTimeHour*100).toFixed(2) // 开机率
              const workRate = (workHour/startUpHour*100) > 100 ? 100: (workHour/startUpHour*100).toFixed(2) // 作业率
              const alarmRate = (alarmNum/totalNum)*100 > 100 ? 100 :(alarmNum/totalNum*100).toFixed(2) // 故障率

              const finishNum = 1000; // 完成工件数==========
              const planFinishRate = 10; // 计划完成率==========

              let deviceDataObj = {
                totalNum: totalNum, // 设备总数
                outlineNum: outlineNum, // 离线台数
                onlineNum: onlineNum, // 在线台数
                runNum: runNum, // 作业台数
                idleNum: idleNum, // 待机台数
                alarmNum: alarmNum, // 故障数
                shutDownNum: shutDownNum, // 关机
                elcPower: elcPower || 0, // 总耗电量
                startUpHour: startUpHour, // 开机小时数
                workHour: workHour, // 作业小时数
                bootRate: bootRate, // 开机率
                workRate: workRate, // 作业率
                alarmRate: alarmRate, // 故障率
                finishNum: finishNum, // 完成工件数
                planFinishRate: planFinishRate, // 计划完成率
              }
              this.deviceData = {
                ...deviceDataObj
              }
              
            } else {
              this.deviceData = {
                totalNum: 0, // 设备总数
                outlineNum: 0, // 离线台数
                onlineNum: 0, // 在线台数
                runNum: 0, // 作业台数
                idleNum: 0, // 待机台数
                alarmNum: alarmNum, // 故障数
                shutDownNum: 0, // 关机
                elcPower: 0, // 总耗电量
                startUpHour: 0, // 开机小时数
                workHour: 0, // 作业小时数
                bootRate: 0, // 开机率
                workRate: 0, // 作业率
                alarmRate: 0, // 故障率
                finishNum: 0, // 完成工件数
                planFinishRate: 0, // 计划完成率
              }
            }
            this.renderEchartsCircleHLGTree(this.deviceData) //4个率echarts(开机率\作业率\故障率\计划完成率)
            break;
          case '10' : //右侧本日
            const res10 = await reqCountDeviceMain(companyCode, orgCode, requestType,currentDateStr)
            if(res10&&res10.code===200){
              const myThisDay = echarts.init(document.getElementById('sbhl-day-echarts'));
              this.chartsCData.xData = res10.data.xAxis; // X轴
              this.chartsCData.startUpRateArr = res10.data.startUpRateArr; // 开机率
              this.chartsCData.runRateArr = res10.data.runRateArr; // 作业率
              var newArr10 = []
              res10.data.powerUseArr.forEach(item=>{
                item<0 ? item = 0 : item
                newArr10.push(item)
              })
              this.chartsCData.powerUseArr = newArr10; // 能耗
              this.renderEchartsC(myThisDay, this.chartsCData)
            }
            break;
          case '11' : //右侧本月
            const res11 = await reqCountDeviceMain(companyCode, orgCode, requestType,currentDateStr)
            if(res11&&res11.code===200){
              const myThisMonth = echarts.init(document.getElementById('sbhl-mouth-echarts'));
              this.chartsBData.xData = res11.data.xAxis; // X轴
              this.chartsBData.startUpRateArr = res11.data.startUpRateArr; // 开机率
              this.chartsBData.runRateArr = res11.data.runRateArr; // 作业率
              var newArr11 = []
              res11.data.powerUseArr.forEach(item=>{
                item<0 ? item = 0 : item
                newArr11.push(item)
              })
              this.chartsBData.powerUseArr = newArr11; // 能耗
              // console.log('newArr11:',newArr11)
              this.renderEchartsB(myThisMonth, this.chartsBData)
            }
            break;
          case '12' : //右侧本年
            const res12 = await reqCountDeviceMain(companyCode, orgCode, requestType, currentDateStr)
            if(res12&&res12.code===200){
              const myThisYear = echarts.init(document.getElementById('sbhl-year-echarts'));
              this.chartsAData.xData = res12.data.xAxis; // X轴
              this.chartsAData.startUpRateArr = res12.data.startUpRateArr; // 开机率
              this.chartsAData.runRateArr = res12.data.runRateArr; // 作业率
              var newArr12 = []
                res12.data.powerUseArr.forEach(item=>{
                item<0 ? item = 0 : item
                  newArr12.push(item)
              })
              // console.log('newArr12:',newArr12)
              this.chartsAData.powerUseArr = newArr12; // 能耗
              this.renderEchartsA(myThisYear, this.chartsAData)
            }
            break;
        }
      },
      //表头下拉框确定
      confirmFun (sbhlSelectedCompanyStr) {
        // console.log('选中的公司是：',code)
        const sbhlSelectedCompanyObj = JSON.parse(sbhlSelectedCompanyStr)
        this.companyCode = sbhlSelectedCompanyObj.value; // 公司编码
        this.companyName = sbhlSelectedCompanyObj.label // 公司名字
        this.showCompanyDialog = false // 关闭弹窗
        this.$store.commit('changeOverViewSelectedCompanyMut',sbhlSelectedCompanyStr)
        localStorage.setItem('sbhl-OverView-SelectedCompany',sbhlSelectedCompanyStr)
      },
      // 监听组件内弹窗状态
      showdialogFun (flag) {
        this.showCompanyDialog = flag
      },
      renderEchartsA(myChart, data){  //本年
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
                // showMaxLabel: true, //是否显示最大 tick 的 label
                // rotate: 75
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
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#FCE300'},
                      {offset: 0.5, color: '#F9B009'},
                      {offset: 1, color: '#F88F0F'}
                    ]
                  ),
                  // barBorderRadius: 10
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
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#2cd3ec'},
                      {offset: 0.5, color: '#31aee9'},
                      {offset: 1, color: '#387de6'}
                    ]
                  ),
                  // barBorderRadius: 10
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
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#ff5a86'},
                      {offset: 1, color: '#b40147'}
                    ]
                  ),
                  // barBorderRadius: 10
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
      renderEchartsB(myChart, data){
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
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#FCE300'},
                      {offset: 0.5, color: '#F9B009'},
                      {offset: 1, color: '#F88F0F'}
                    ]
                  ),
                  // barBorderRadius: 10
                }
              },
              barWidth: 4,  // 控制柱子的宽度
              barGap: '1%' // 控制柱子的间隔
            },
            {
              name: '作业率(%)',
              type: 'bar',
              data: data.runRateArr,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#2cd3ec'},
                      {offset: 0.5, color: '#31aee9'},
                      {offset: 1, color: '#387de6'}
                    ]
                  ),
                  // barBorderRadius: 10
                }
              },
              barWidth: 4,  // 控制柱子的宽度
              barGap: '1%' // 控制柱子的间隔
            },
            {
              name: '能耗(kw•h)',
              type: 'bar',
              data: data.powerUseArr,
              yAxisIndex: 1,//双轴，出现多个轴的时候通过设置这个展示
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#ff5a86'},
                      {offset: 1, color: '#b40147'}
                    ]
                  ),
                  // barBorderRadius: 10
                }
              },
              barWidth: 4,  // 控制柱子的宽度
              barGap: '1%' // 控制柱子的间隔
            },
          ]
        }
        myChart.setOption(option)
      },
      renderEchartsC(myChart, data){  //本日
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
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#FCE300'},
                      {offset: 0.5, color: '#F9B009'},
                      {offset: 1, color: '#F88F0F'}
                    ]
                  ),
                  // barBorderRadius: 10
                }
              },
              barWidth: 6,  // 控制柱子的宽度
              barGap: '10%' // 控制柱子的间隔
            },
            {
              name: '作业率(%)',
              type: 'bar',
              data: data.runRateArr,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#2cd3ec'},
                      {offset: 0.5, color: '#31aee9'},
                      {offset: 1, color: '#387de6'}
                    ]
                  ),
                  // barBorderRadius: 10
                }
              },
              barWidth: 6,  // 控制柱子的宽度
              barGap: '10%' // 控制柱子的间隔
            },
            {
              name: '能耗(kw•h)',
              type: 'bar',
              data: data.powerUseArr,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#ff5a86'},
                      {offset: 1, color: '#b40147'}
                    ]
                  ),
                  // barBorderRadius: 10
                }
              },
              barWidth: 6,  // 控制柱子的宽度
              barGap: '10%', // 控制柱子的间隔
              yAxisIndex:1,//通过这个来设置多轴时的展示
            },
          ]
        }
        myChart.setOption(option)
      },
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

        // 计划完成率
        var planFinishEcharts = document.getElementById('planFinishLv')
        let planFinishRateObj = {
          name: '计划完成率',
          color: {
            startColor: '#33dcb5',
            endColor: '#30c759'
          },
          value: carEchartsData.planFinishRate
        }
        this.renderClock(planFinishEcharts, planFinishRateObj)
        
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
      /*跳转路径函数*/
      enterIndexPage(path) {
        // 路径从state中获取
        this.$router.replace(path);
      },
      // 时间格式化
      getCurrentDateTime() {
        return moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      },
      //根据窗口变化echarts变化（中间背景图，右侧3 个echarts图）
      handleResize() {
        this.CarsVThreeAllEchartsArr.forEach((ele, index) => {
          ele.resize()
        })
        this.screenHeight = window.innerHeight
      },
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize);
    },
    destroyed () {
      clearInterval(this.refreshDataIdTime);
      clearInterval(this.refreshDataIdAll);
    }

  }
</script>
<style lang="scss" scoped>
  .sbhl {
    height: 100%;
    display: flex;
    flex-direction: column;
    background-image: url(../../assets/images/index_bg.png) ;
    background-size: cover;
    color: rgb(255, 255, 255);
    background-repeat: no-repeat;
    overflow: hidden;

    .sbhl_imgText {
      font-size: 0.42rem;
      color: #fff;
      font-weight: bold;
      text-align: center;
    }
    .time {
      width: 270px;
      text-align: left;
    }
    .button {
      width: 90px;
      height: 40px;
      background: url(../../assets/images/common_back.png) no-repeat;
      position: fixed;
      top: 60px;
      left: 15px;
      cursor: pointer;
    }
    .title {
      margin: 0px auto;
    }
    .sbhl_top {
      text-align: center;
      height: 125px;
      padding-top: 20px;
      box-sizing: border-box;
      background-size: 100% 90%;
      background-repeat: no-repeat;
      padding-bottom: 20px;
      .sbhl_imgText {
        display: inline-block;
        cursor: pointer;
      }

      .time {
        font-size: 35px;
        color: #ababab;
        display: inline-block;
        vertical-align: middle;
        position: fixed;
        top: 60px;
        right: 70px;
        z-index: 10;
        font-family: fontnameUnidreamLED;
      }
    }
    .sbhl_main {
      height: calc(100% - 125px);
      .sbhl_left_top {
      }
    }
    /*左侧*/
    .sbhl_left {
      width: 73%;
      float: left;
      height: calc(100% - 20px);
      margin-right: 20px;
      box-sizing: border-box;
      display: flex;flex-direction: column;
      background: rgba(39, 69, 111, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 20px;
      margin-bottom: 20px;
      margin-left: 20px;
      /*左侧上部*/
      &_top {
        /*flex:2;*/
        width: 100%;
        height: 305px;
        /*border: 1px solid rgba(255, 255, 255, 0.1);*/
        .sbhltitle{
          color: #30adff;font-size: 0.18rem;
          margin-top: -10px;
        }
        .statusList{
          /*height: calc(100% - 0.35rem);*/
          height: 273px;
          display: flex;flex-direction: column;
          .statusListTop{
            flex: 1;display: flex;align-items: center;
            background: url("../../assets/images/title-bg.png") no-repeat;
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
            display: flex;flex: 1.8;
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
                background: url("../../assets/images/echarts_circle-blue.png") no-repeat center;
                background-size: 100% 100%;
              }
              .runHourNum{
                background: url("../../assets/images/echarts_circle-green.png") no-repeat center;
                background-size: 100% 100%;
              }
              .start{
                background: url("../../assets/images/echarts_clock-yellow.png") no-repeat center;
                background-size: 100% 100%;
              }
              .runLV{
                background: url("../../assets/images/echarts_clock-blue.png") no-repeat center;
                background-size: 100% 100%;
              }
              .problem{
                background: url("../../assets/images/echarts_clock-red.png") no-repeat center;
                background-size: 100% 100%;
              }
              .planFinishLv{
                background: url("../../assets/images/echarts_clock-green.png") no-repeat center;
                background-size: 100% 100%;
              }
              .totalE{
                background: url("../../assets/images/echarts_circle-blue.png") no-repeat center;
                background-size: 100% 100%;
              }
            }
            li:nth-last-child(1){
              margin-right: 0;
            }
          }
        }
      }

      &_echarts {
        width: 100%;
        height: calc(100% - 24px);
      }

      /*页面左侧下部*/
      &_bottom {
        /*flex: 3;*/
        height: calc(100% - 305px);
        /*background: rgba(39, 69, 111, 0.3);*/
        // border: 1px solid rgba(255, 255, 255, 0.1);
        width: 100%;overflow:hidden;
      }
    }

    /*右侧部分开始*/
    &_right {
      width: 24%;
      float: left;
      height: 100%;
      padding: 0px 0px 20px 0px;
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
    }

    /*右侧三个eharts结束*/
  /**/
  .sbhl_overview_navBtn{
    width: 150px;
    position: fixed;
    left: 24px;
    top: 60px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background: linear-gradient(0deg,#4cdded,#0088fe);
    background: -ms-linear-gradient(to top,#4cdded,#0088fe);
    color: #fff;
    font-size: 22px;
    border-radius: 5px;
    cursor: pointer;
  }
  .triangle_top{
    width: 0;
    height: 0;
    border: 7.5px solid transparent;
    border-top: 9px solid #fff;
    position: absolute;
    top: 16px;
    right: 7px;
  }
  .triangle_bottom{
    width: 0;
    height: 0;
    border: 7.5px solid transparent;
    border-bottom: 9px solid #fff;
    position: absolute;
    top: 8px;
    right: 7px;
  }
  .sbhl_pageNav_box{
    width: 360px;padding:0;
    background-color: #0e2154;
    opacity: .9;
    position: absolute;
    top: 124px;
    bottom: 22px;
    left: 15px;
    z-index: 100;
    text-align: center;
  }
  .sbhl_pageNav{
    padding: 0 20px;
    li{
      background: rgba(12,51,103,.1);
      height: 40px;
      line-height: 40px;
      border: 1px solid rgba(0,136,255,.6);
      margin-top: 20px;
      color: #50b4ff;
      font-size: 16px;
      border-radius: 5px;
    }
  }
  }


</style>
