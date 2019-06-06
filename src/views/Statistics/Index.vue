<template>
<div class="common_bg common_bg02">
  <CommonHead
    :isShowBackBtn="true"
    :isClickedTitle="true"
    :titleText="`${companyName}设备统计分析`"
    :isShowCurrentTime="false"
    @backBtnClick="handleBackBtn"
    @titleClick="handleTitleClick"
  />
  <div class="common_main common_blockColor ">
    <div class="statistics_main">
      <div class="statistics_sort">
        <div class="statistics_title-box clear">
            <div class="statistics_titleBox left">
              <span class="statistics_circle">•</span>
              <span class="statistics_title">排序统计</span>
              <img class="statistics_img" src="../../assets/images/DeviceConnect_title.png" />
            </div>
            <div class="right statistics_search">
              <div class="daytimeBox">
                <el-date-picker
                  v-model="dateValueStart"
                  :clearable="false"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="开始日期">
                </el-date-picker>
                <el-select v-model="startHour" placeholder="小时">
                  <el-option label="00时" value="00"></el-option>
                  <el-option label="01时" value="01"></el-option>
                  <el-option label="02时" value="02"></el-option>
                  <el-option label="03时" value="03"></el-option>
                  <el-option label="04时" value="04"></el-option>
                  <el-option label="05时" value="05"></el-option>
                  <el-option label="06时" value="06"></el-option>
                  <el-option label="07时" value="07"></el-option>
                  <el-option label="08时" value="08"></el-option>
                  <el-option label="09时" value="09"></el-option>
                  <el-option label="10时" value="10"></el-option>
                  <el-option label="11时" value="11"></el-option>
                  <el-option label="12时" value="12"></el-option>
                  <el-option label="13时" value="13"></el-option>
                  <el-option label="14时" value="14"></el-option>
                  <el-option label="15时" value="15"></el-option>
                  <el-option label="16时" value="16"></el-option>
                  <el-option label="17时" value="17"></el-option>
                  <el-option label="18时" value="18"></el-option>
                  <el-option label="19时" value="19"></el-option>
                  <el-option label="20时" value="20"></el-option>
                  <el-option label="21时" value="21"></el-option>
                  <el-option label="22时" value="22"></el-option>
                  <el-option label="23时" value="23"></el-option>
                </el-select>
              </div>
              <span style="color:#fff;padding:0 5px;">-</span>
              <div class="daytimeBox">
                <el-date-picker
                  v-model="dateValueEnd"
                  :clearable="false"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="结束日期">
                </el-date-picker>
                <el-select v-model="endHour" placeholder="小时">
                  <el-option label="00时" value="00"></el-option>
                  <el-option label="01时" value="01"></el-option>
                  <el-option label="02时" value="02"></el-option>
                  <el-option label="03时" value="03"></el-option>
                  <el-option label="04时" value="04"></el-option>
                  <el-option label="05时" value="05"></el-option>
                  <el-option label="06时" value="06"></el-option>
                  <el-option label="07时" value="07"></el-option>
                  <el-option label="08时" value="08"></el-option>
                  <el-option label="09时" value="09"></el-option>
                  <el-option label="10时" value="10"></el-option>
                  <el-option label="11时" value="11"></el-option>
                  <el-option label="12时" value="12"></el-option>
                  <el-option label="13时" value="13"></el-option>
                  <el-option label="14时" value="14"></el-option>
                  <el-option label="15时" value="15"></el-option>
                  <el-option label="16时" value="16"></el-option>
                  <el-option label="17时" value="17"></el-option>
                  <el-option label="18时" value="18"></el-option>
                  <el-option label="19时" value="19"></el-option>
                  <el-option label="20时" value="20"></el-option>
                  <el-option label="21时" value="21"></el-option>
                  <el-option label="22时" value="22"></el-option>
                  <el-option label="23时" value="23"></el-option>
                </el-select>
              </div>
              <el-select v-model="craftValue" placeholder="请选择工艺类型" class="common_select marginLeft10">
                <el-option
                  v-for="item in craftOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="centerValue" placeholder="请选择工作中心" class="common_select marginLeft10">
                <el-option
                  v-for="item in centerOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="machineTypeValue" placeholder="机床类型" class="common_select marginLeft10">
                <el-option
                  v-for="item in machineTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="bootRateValue" placeholder="开机率" class="common_select marginLeft10">
                <el-option
                  v-for="item in bootRateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <div class="marginLeft15 inlineBlock common-btn" @click="searchFun">检索排名</div>
              <!-- <div class="marginLeft15 inlineBlock common-btn2">导出</div> -->
            </div>
        </div>

        <div id="BarEchartsSort" class="statistics_echarts"></div>
        <div class="statistics_total">
<!--           <div class="statistics_totalItem">
            <p class="statistics_percent green">{{barEchartsData.maxValueObj.yData}}%</p>
            <p class="statistics_label">最大  {{barEchartsData.maxValueObj.xAxis}}</p>
          </div>
          <div class="statistics_totalItem">
            <p class="statistics_percent orange">{{barEchartsData.averageValue}}%</p>
            <p class="statistics_label">平均效率</p>
          </div>
          <div class="statistics_totalItem">
            <p class="statistics_percent red">{{(barEchartsData.minValueObj.yData==='0.00')?0:barEchartsData.minValueObj.yData}}%</p>
            <p class="statistics_label">最小</p>
          </div> -->
          <div class="statistics_totalItem">
            <p class="statistics_percent green">{{barEchartsData.maxValueObj.yData.value}}%</p>
            <p class="statistics_label">最大  {{barEchartsData.maxValueObj.xAxis}}</p>
          </div>
          <div class="statistics_totalItem">
            <p class="statistics_percent orange">{{barEchartsData.averageValue}}%</p>
            <p class="statistics_label">平均效率</p>
          </div>
          <div class="statistics_totalItem">
            <p class="statistics_percent red">{{(barEchartsData.minValueObj.yData.value==='0.00')?0:barEchartsData.minValueObj.yData.value}}%</p>
            <p class="statistics_label">最小</p>
          </div>
        </div>
      </div>

      <div class="statistics_detail">
        <div class="statistics_title-box">
            <div class="statistics_titleBox">
              <span class="statistics_circle">•</span>
              <span class="statistics_title">详细信息</span>
              <img class="statistics_img" src="../../assets/images/DeviceConnect_title.png" />
            </div>
        </div>
        <div class="table statistics_table">
          <div class="table-thead">
            <span class="table-td table-td01">序号</span>
            <span class="table-td table-td02">设备编号</span>
            <span class="table-td table-td03">设备名称</span>
            <span class="table-td table-td04">工艺类型</span>
            <span class="table-td table-td05">工作中心</span>
            <span class="table-td table-td06">{{getLabelByValue(bootRateValue)}}</span>
          </div>
          <div class="table-tbody" v-if="total>0">
            <el-scrollbar class="table-tbodyInner">
              <div class="table-tr" v-for="item in deviceList" @click="handleClickDeviceItem(item.machineNo)">
                <span class="table-td table-td01">{{item.num}}</span>
                <span class="table-td table-td02">{{item.machineNo}}</span>
                <span class="table-td table-td03">{{item.machineName}}</span>
                <span class="table-td table-td04">{{item.firstGroupName}}</span>
                <span class="table-td table-td05">{{item.workCenterName}}</span>
                <span class="table-td table-td06">{{item.bootRate}}%</span>
              </div>
            </el-scrollbar>
          </div>
          <div class="statistics_empty" v-else>暂无数据</div>

        </div>
        <div class="marginTop20 common-pagination" v-if="total>0">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>

  <!-- 弹窗 -->

  

  <div class="statistics_echartsDialog" v-show="dialogShow">

    <div class="statistics_echartsDialogInner">
      <div class="statistics_echartsDialog_closeBtn" @click="dialogShow=false">
        <img src="../../assets/images/common_close.png" />
      </div>
      <div class="lineEcharts">
        <div class="statistics_echartsLine_title">{{currentDeviceMachineNo}}运行效率{{startDateStr}} 到 {{endDateStr}}</div>
        <div id="lineEcharts" class="statistics_echartsLine"></div>
      </div>
      <div class="marginTop20">
        <div class="table statistics_echartsDialog_table">
          <div class="table-thead">
            <span class="table-td table-td01">时间段</span>
            <span class="table-td table-td02">运行时间</span>
            <span class="table-td table-td03">开机时间</span>
            <span class="table-td table-td04">{{getLabelByValue(bootRateValue)}}</span>
          </div>
          <div class="table-tbody" v-if="singleDeviceList.length>0">
            <el-scrollbar class="table-tbodyInner" >
              <div class="table-tr" v-for="(item, index) in singleDeviceList" :key="index">
                <span class="table-td table-td01">{{item.dateTime}}</span>
                <span class="table-td table-td02">{{item.runTime}}小时 </span>
                <span class="table-td table-td03">{{item.startUpHour}}小时 </span>
                <span class="table-td table-td04">{{item.rateValue}}%</span>
              </div>
            </el-scrollbar>
          </div>
          <div class="statistics_empty" v-else>暂无数据</div>

        </div>
      </div>
    </div>
  </div>
  
  <!-- 弹窗end -->
</div>
</template>
<script>
import _ from 'lodash'
import echarts from 'echarts'
import moment from 'moment'
import CommonHead from '@/components/Head'
import {
  reqTypecode,
  reqMachineSortCount,
  reqMachineSortList,
  reqMachineHourSortCount,
  reqMachineHourSortList
} from '../../api'
export default {
  name: 'Statistics',
  components: {
    CommonHead,
  },
  data() {
    return {
      companyCode: '0701', // 选中的公司code
      companyName: '三一德力佳', // 选中的公司name
      currentDay: '', // 今天的日期
      dateValueStart: '', // 日期选择
      startHour: '00', // 开始小时
      dateValueEnd: '', // 结束日期
      endHour: '', // 结束小时
      craftOptions: [], // 工艺option
      craftValue: '', // 工艺值
      centerOptions: [], // 加工中心
      centerValue: '', // 加工中心value
      machineTypeOptions: [], // 机床类型opt
      machineTypeValue: '', // 机床类型value
      bootRateOptions: [
        {label: '开机率', value: '01'},
        {label: '作业率', value: '02'},
        {label: '利用率', value: '03'},
        // {label: '计划完成率', value: '04'}
      ], // 开机率下拉
      bootRateValue: '01', // 开机率下拉值
      barEchartsDom: '', // 柱状图dom
      barEchartsData: { // 柱状图data
        xAxis : [],
        yData : [],
        maxValueObj: {
          xAxis: '',
          yData: 0
        },
        minValueObj: {
          xAxis: '',
          yData: 0
        },
        averageValue: 0
      },
      deviceList: [], // 设备列表
      pageSize: 10,
      pageNum: 1,
      total: 1,
      dialogShow: false, // 弹窗是否显示
      currentDeviceMachineNo: '', // 当前设备号
      lineEchartsData: {}, // 折线图数据
      singleDeviceList: [] // 单台设备列表
    }
  },
  computed: {
    // 开始时间
    startDateStr() {
      return this.dateValueStart+' '+this.startHour
    },
    // 结束时间
    endDateStr() {
      return this.dateValueEnd+' '+ this.endHour
    },
    // 选中的公司
    companyCodeStr() {
      return this.$store.state.sbhlOverViewSelectedCompany;
    }
  },
  watch: {
    // 公司code和名字
    companyCodeStr(newvalue) {
      // this.getEchartsData() // 获取数据
    },
    // 柱状图数据改变
    barEchartsData(val) {
      this.renderEchartsOnlineCount(val)
    }
  },
  mounted() {
    // 从localStory里面取选中的公司
    const sbhlSelectedCompanyStr = localStorage.getItem('sbhl-OverView-SelectedCompany')
    if(sbhlSelectedCompanyStr && sbhlSelectedCompanyStr!==undefined){
      const sbhlSelectedCompanyObj = JSON.parse(sbhlSelectedCompanyStr)
      this.companyCode = sbhlSelectedCompanyObj.value; // 公司编码
      this.companyName = sbhlSelectedCompanyObj.label // 公司名字
    } else {
      // localStorage.setItem('sbhl-OverView-SelectedCompany',JSON.stringify({label:this.companyName,value:this.companyCode}))
    }

    this.currentDay = moment(new Date()).format('YYYY-MM-DD')
    this.dateValueStart = this.currentDay
    this.dateValueEnd = this.currentDay
    this.endHour = moment(new Date()).format('HH')

    // 获取工艺类型
    this.getCraftOption();
    // 获取机床类型
    this.getMachineOption();
    // 获取加工中心类型
    this.getCenterOption();

    // 首次渲染整个页面
    this.searchFun()

    // 柱状图 start
    this.barEchartsDom = echarts.init(document.getElementById('BarEchartsSort'))
    var optionEcharts = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '0%',
        top: '15%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: [],
        axisTick: {
          show: false,
          alignWithLabel: true
        },
        axisLine: { // 控制x轴线的样式
          lineStyle: {
            type: 'solid',
            color: '#56aefb',
            width: '1'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#2fdaeb'
          },
          interval: 0,
          rotate: 40
        },

      }],
      yAxis: [{
        name: '%',
        nameTextStyle: {
          color: '#fff',
          padding: [0,20,0,0]
        },
        type: 'value',
        min: 0,
        axisLine: { // 控制y轴线的样式
          lineStyle: {
            type: 'solid',
            color: '#55aefb',
            width: '1'
          }
        },
        axisLabel: {
          formatter: '{value}',
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
            color: ['#146384'],
            width: 1,
            type: 'dotted'
          }
        },

      }],
      series: [{
        // name: '开机率',
        type: 'bar',
        // barWidth: '60%', // 控制柱子的宽度
        data: [],
        barMaxWidth:100,//最大宽度
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [{
                  offset: 0,
                  color: '#05b7d4'
                },
                {
                  offset: 0.5,
                  color: '#2083d7'
                },
                {
                  offset: 1,
                  color: '#3758da'
                }
              ]
            ),
            label: {
              show: true,
              position: 'top',
              formatter: '{c}',
              color: '#139cd6' //这是关键，在需要的地方加上就行了
            },
            barBorderRadius: 5
          },
        },
        barGap: '20%' // 控制柱子的间隔
      }]
    };
    this.barEchartsDom.setOption(optionEcharts)
    this.barEchartsDom.on('click', (params) => {
        // 柱子点击事件
        // console.log('click:', params)
        this.dialogShow = true
        this.$nextTick(()=> {
          if(document.getElementById('lineEcharts')){
            // this.renderEchartsLine(echarts.init(document.getElementById('lineEcharts')))
            this.currentDeviceMachineNo = params.name
            // 渲染折线图
            this.getLineDataFun(params.name) // 设备编号
            // 渲染列表
            this.getListSingleDataFun(params.name)
          }
        })
    });
    // 柱状图 end


    

  },
  methods: {
    // 返回按钮回调
    handleBackBtn() {
      console.log('back btn clicked!')
      this.$router.push('/OverView');
    },
    // 标题按钮回调
    handleTitleClick() {
      // console.log('title clicked!')
      this.showCompanyDialog = true // 关闭弹窗
    },
    // 获取工艺类型
    async getCraftOption() {
      const res = await reqTypecode(this.companyCode, '01')
      if (res && res.code === 200) {
        this.craftOptions = [
          { 
            value: '',
            label: '全部工艺类型'
          }
        ]
        const dataArr = res.data
        dataArr.map((item) => {
          const obj = {
            label: item.codeName,
            value: item.codeCode
          }
          this.craftOptions.push(obj)
        })
      }
    },
    // 获取加工中心下拉
    async getCenterOption() {
      const res = await reqTypecode(this.companyCode, '03')
      if (res && res.code === 200) {
        this.centerOptions = [
          { 
            value: '',
            label: '全部加工中心'
          }
        ]
        const dataArr = res.data
        dataArr.map((item) => {
          const obj = {
            label: item.codeName,
            value: item.codeCode
          }
          this.centerOptions.push(obj)
        })
      }
    },
    // 获取机床类型下拉
    async getMachineOption() {
      const res = await reqTypecode(this.companyCode, '02')
      if (res && res.code === 200) {
        this.machineTypeOptions = [
          { 
            value: '',
            label: '全部机床类型'
          }
        ]
        const dataArr = res.data
        dataArr.map((item) => {
          const obj = {
            label: item.codeName,
            value: item.codeCode
          }
          this.machineTypeOptions.push(obj)
        })
      }
    },
    // 检索排名搜索
    searchFun() {
      console.log('开始时间：',this.startDateStr,'结束日期:',this.endDateStr,'工艺值:',this.craftValue)     
      console.log('加工中心：',this.centerValue,'机床类型:',this.machineTypeValue,'开机率:',this.bootRateValue)
      // 获取柱状图数据
      this.getBarDataFun();

      // 获取列表数据
      this.pageNum = 1;
      this.pageSize = 10;
      this.getListDataFun();
    },
    // 获取柱状图数据
    async getBarDataFun() {
      const paramsBar = {
        "beginDate": this.startDateStr,
        "companyCode": this.companyCode,
        "endDate": this.endDateStr,
        "firstGroupCode": this.craftValue,
        "machineTypeCode": this.machineTypeValue,
        "workCenterCode": this.centerValue
      }
      const res = await reqMachineSortCount(paramsBar)

      if(res && res.code === 200) {
        this.barEchartsData = {
          xAxis : [],
          yData : [],
          maxValueObj: {
            xAxis: '',
            yData: 0
          },
          minValueObj: {
            xAxis: '',
            yData: 0
          },
          averageValue: 0
        }

        const listArr = res.data;
        if (listArr.length<=0) return;
        const lvArr = listArr.map(item => {
          return {
            // xAxis: item.xAxis,
            xAxis: item.machineName,
            // yData: this.handleLvDataBar(item)
            yData: this.handleLvDataBar2(item)
          }
        })
        // console.log('lvArr:',lvArr)
        

        // 排序后的数组
        const sortList = _.sortBy(lvArr, function(item) {
          return -item.yData.value
        })
        // console.log('sortList:',sortList)
        // return;
        this.barEchartsData.maxValueObj = sortList[0] // 最大值
        this.barEchartsData.minValueObj = sortList[sortList.length-1] // 最小值
        // console.log('sortList:',sortList)

        // 求平均值
        let sum = 0;
        sortList.map(item => {
          sum += parseFloat(item.yData.value)
        })
        this.barEchartsData.averageValue = (sum / sortList.length).toFixed(2)

        sortList.map(item => {
          this.barEchartsData.xAxis.push(item.xAxis)
          this.barEchartsData.yData.push(item.yData)
        })
      }
    },
    // 柱状图渲染
    renderEchartsOnlineCount(data) { //在线统计echarts
      this.barEchartsDom.setOption({
        xAxis: [
          {
            data: data.xAxis,
          }
        ],
        series: [
          {
            data: data.yData
          }
        ]
      })
    },
    // 点击表格出现弹窗
    handleClickDeviceItem(machineNo) {
      this.dialogShow = true
      this.currentDeviceMachineNo = machineNo
      // 渲染折线图
      this.getLineDataFun(machineNo) // 设备编号
      // 渲染列表
      this.getListSingleDataFun(machineNo)      
    },
    // 获取弹窗折线图数据
    async getLineDataFun(machineNo) {
      const reqParams = {
        "beginDate": this.startDateStr,
        // "beginDate": '2019-05-01 00',
        "companyCode": this.companyCode,
        "endDate": this.endDateStr,
        // endDate: '2019-05-01 23',
        "firstGroupCode": this.craftValue,
        "machineNo": machineNo,
        "machineTypeCode": this.machineTypeValue,
        // "orgCode": "03",
        // "requestType": "01",
        "workCenterCode": this.centerValue
      }
      const res = await reqMachineHourSortCount(reqParams)
      let newRateArr = []
      if (res && res.code === 200) {
        const rateArr = res.data.machineTime;
        newRateArr = rateArr.map(item => {
          return this.handleLvDataBar(item)
        })
      }
      this.lineEchartsData = {
        xAxis: res.data.xAxis,
        yAxis: newRateArr
      }

      const lineEchartsDom = echarts.init(document.getElementById('lineEcharts'))
      this.renderEchartsLine(lineEchartsDom, this.lineEchartsData)
    },
    // 渲染弹窗折线图
    renderEchartsLine(myChart, data) {
      var option = {
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            // console.log('params:',params)
            return params[0].name+'<br />'+params[0].value+'%'
          }
        },
        grid: {
          top:50,
          left:'5%',
          right: '5%',
          bottom:80
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#25395b' // 坐标轴线线的颜色
              }
            },
            axisLabel: { // 坐标轴刻度标签的相关设置
              color: '#53e3fd',
              rotate: 45
            },
            axisTick: { // 坐标轴刻度相关设置
              show: false,
            },
            splitLine: { // 坐标轴在grid区域中的分割线
              show: true,
              lineStyle: {
                color: '#25395b'
              }
            },
            data: data.xAxis
        },
        yAxis: {
            type: 'value',
            name: '效率和时间', // 坐标轴名称
            max: 100,
            nameTextStyle: { // 坐标轴名称的文字样式
              color: '#fff',
              align: 'left',
              padding:[0,0,0,-50]
            },
            axisLine: {
              lineStyle: {
                color: '#25395b' // 坐标轴线线的颜色
              }
            },
            axisLabel: { // 坐标轴刻度标签的相关设置
              color: '#ffffff',
              formatter: '{value}%'
            },
            axisTick: { // 坐标轴刻度相关设置
              show: false,
            },
            splitLine: { // 坐标轴在grid区域中的分割线
              lineStyle: {
                color: '#25395b'
              }
            },
        },
        series: [{
            data: data.yAxis,
            type: 'line',
            lineStyle: {
              color:'#ffd200'
            },
            symbol: 'circle', // 标记的图形
            symbolSize: 10, // 标记的大小
            itemStyle: {
              color:'#ffd200'
            },
            label: { // 图形上的文本标签
              show: false,
              color: '#ffffff',
              formatter: '{c}%' // 标签内容格式器
            }
        }]
      }
      myChart.setOption(option)
    },
    // 获取弹窗列表数据
    async getListSingleDataFun(machineNo) {
      const params = {
        "pageNum": 1,
        "pageSize": 2000,
        "query": {
          "beginDate": this.startDateStr,
          "companyCode": this.companyCode,
          "endDate": this.endDateStr,
          "firstGroupCode": this.craftValue,
          "machineNo": machineNo,
          "machineTypeCode": this.machineTypeValue,
          // "orgCode": "03",
          // "requestType": "01",
          "workCenterCode": this.centerValue
        }
      }
      const res = await reqMachineHourSortList(params)
      if(res && res.code === 200) {
        const listArr = res.data.list;
        this.singleDeviceList = listArr.map(item => {
          const itemData = this.handleSingleDeviceListData(item)
          return itemData
        })
        // console.log('single:', this.singleDeviceList)
      }
      
    },
    // 获取列表数据
    async getListDataFun() {
      const listParams = {
          "pageNum": this.pageNum,
          "pageSize": this.pageSize,
          "query": {
            "beginDate": this.startDateStr,
            "companyCode": this.companyCode,
            "endDate": this.endDateStr,
            "firstGroupCode": this.craftValue,
            "machineTypeCode": this.machineTypeValue,
            "workCenterCode": this.centerValue
          }
      }
      const res = await reqMachineSortList(listParams)
      if(res && res.code === 200) {
        if(res.data.list.length>0) {
          this.deviceList = res.data.list.map((item, index) => {
            return {
              ...item,
              bootRate:this.handleLvData(item),
              num: ((this.pageNum - 1) * this.pageSize) + (index + 1)
            }
          })
        }
        this.total = res.data.total;
        this.pageNum = res.data.pageNum
        this.pageSize = res.data.pageSize
      }
    },
    // 每页条数改变
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.getListDataFun()
    },
    // 页码改变
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNum = val
      this.getListDataFun()
    },
    // 根据value得到率的label(开机率/作业率/利用率/计划完成率)
    getLabelByValue(value) {
      for(var i=0;i<this.bootRateOptions.length;i++){
        const item = this.bootRateOptions[i];
        if (item.value === value) {
          return item.label;
        }
      }
    },
    // 处理数据
    handleLvData(data) {
    /**
     * 逻辑规则：
     * 开机时间 = 作业时间 + 待机时间
     * 开机率 = 开机时间 / 自然时间
     * 作业率 = 作业时间 / 开机时间
     * 故障率 = 故障数 / 总数
     * 利用率 = 开机率 * 作业率
     * 总耗电量 = 消耗电能 / 总数 
     * 计划完成率 = 完成工件数 / 计划工件数
     */
      const idleTime = data.idleTime || 0 // 待机时间（秒）
      const runTime = data.runTime || 0 // 作业时间（秒）
      const naturalTime = data.naturalTime || 0 // 自然时间（秒）
      const naturalTimeHour = naturalTime / 3600 || 0 // 自然时间（小时）

      const startUpHour = parseFloat(((idleTime + runTime)/3600).toFixed(2))||0 // 开机小时数（开机时间）
      const workHour = parseFloat((runTime/3600).toFixed(2))||0 // 作业小时数（作业时间）

      // const planProcedureNum = data.planProcedureNum || 0 // 计划工件数
      // const overProcedureNum = data.overProcedureNum || 0 // 完成工件数

      // 开机率（开机时间/自然时间）
      let bootRate = 0
      if (startUpHour) {
        bootRate = (startUpHour/naturalTimeHour)*100 > 100 ? 100 : (startUpHour/naturalTimeHour*100).toFixed(2) // 开机率
      }

      // 作业率（作业时间/开机时间）
      let workRate = 0
      if (workHour) {
        workRate = (workHour/startUpHour*100) > 100 ? 100: (workHour/startUpHour*100).toFixed(2) // 作业率
      }

      // 利用率
      let liyongLv = ((bootRate/100 * workRate/100)*100).toFixed(2) // 利用率（开机率/作业率）

      // 计划完成率
      /* let planFinishRate = 0
      if (overProcedureNum) {
        planFinishRate = (overProcedureNum/planProcedureNum)*100 > 100 ? 100 : (overProcedureNum/planProcedureNum*100).toFixed(2) // 计划完成率
      } */

      if (this.bootRateValue === '02') { // 作业率
        return workRate
      } else if (this.bootRateValue === '03') { // 利用率
        return liyongLv
      } else if (this.bootRateValue === '04') { // 计划完成率
        // return planFinishRate
      } else { // 开机率
        return bootRate
      }
    },
    // 处理柱状图数据（数据为字符串）
    handleLvDataBar(data) {
    /**
     * 逻辑规则：
     * 开机时间 = 作业时间 + 待机时间
     * 开机率 = 开机时间 / 自然时间
     * 作业率 = 作业时间 / 开机时间
     * 故障率 = 故障数 / 总数
     * 利用率 = 开机率 * 作业率
     * 总耗电量 = 消耗电能 / 总数 
     * 计划完成率 = 完成工件数 / 计划工件数
     */
      const idleTime = parseFloat(data.idleTime) || 0 // 待机时间（秒）
      const runTime = parseFloat(data.runTime) || 0 // 作业时间（秒）
      const naturalTime = parseFloat(data.natraulTime) || 0 // 自然时间（秒）
      const naturalTimeHour = naturalTime / 3600 || 0 // 自然时间（小时）

      const startUpHour = parseFloat(((idleTime + runTime)/3600).toFixed(2))||0 // 开机小时数（开机时间）
      const workHour = parseFloat((runTime/3600).toFixed(2))||0 // 作业小时数（作业时间）

      // const planProcedureNum = data.planProcedureNum || 0 // 计划工件数
      // const overProcedureNum = data.overProcedureNum || 0 // 完成工件数

      // 开机率（开机时间/自然时间）
      let bootRate = 0
      if (startUpHour) {
        bootRate = (startUpHour/naturalTimeHour)*100 > 100 ? 100 : (startUpHour/naturalTimeHour*100).toFixed(2) // 开机率
      }

      // 作业率（作业时间/开机时间）
      let workRate = 0
      if (workHour) {
        workRate = (workHour/startUpHour*100) > 100 ? 100: (workHour/startUpHour*100).toFixed(2) // 作业率
      }

      // 利用率
      let liyongLv = ((bootRate/100 * workRate/100)*100).toFixed(2) // 利用率（开机率/作业率）

      // 计划完成率
      /* let planFinishRate = 0
      if (overProcedureNum) {
        planFinishRate = (overProcedureNum/planProcedureNum)*100 > 100 ? 100 : (overProcedureNum/planProcedureNum*100).toFixed(2) // 计划完成率
      } */

      if (this.bootRateValue === '02') { // 作业率
        return workRate
      } else if (this.bootRateValue === '03') { // 利用率
        return liyongLv
      } else if (this.bootRateValue === '04') { // 计划完成率
        // return planFinishRate
      } else { // 开机率
        return bootRate
      }
    },
    // 处理数据弹窗列表
    handleSingleDeviceListData(data) {
    /**
     * 逻辑规则：
     * 开机时间 = 作业时间 + 待机时间
     * 开机率 = 开机时间 / 自然时间
     * 作业率 = 作业时间 / 开机时间
     * 故障率 = 故障数 / 总数
     * 利用率 = 开机率 * 作业率
     * 总耗电量 = 消耗电能 / 总数 
     * 计划完成率 = 完成工件数 / 计划工件数
     */
      const idleTime = data.idleTime || 0 // 待机时间（秒）
      const runTime = data.runTime || 0 // 作业时间（秒）
      const naturalTime = data.naturalTime || 0 // 自然时间（秒）
      const naturalTimeHour = naturalTime / 3600 || 0 // 自然时间（小时）

      const startUpHour = parseFloat(((idleTime + runTime)/3600).toFixed(2))||0 // 开机小时数（开机时间）
      const workHour = parseFloat((runTime/3600).toFixed(2))||0 // 作业小时数（作业时间）

      // const planProcedureNum = data.planProcedureNum || 0 // 计划工件数
      // const overProcedureNum = data.overProcedureNum || 0 // 完成工件数

      // 开机率（开机时间/自然时间）
      let bootRate = 0
      if (startUpHour) {
        bootRate = (startUpHour/naturalTimeHour)*100 > 100 ? 100 : (startUpHour/naturalTimeHour*100).toFixed(2) // 开机率
      }

      // 作业率（作业时间/开机时间）
      let workRate = 0
      if (workHour) {
        workRate = (workHour/startUpHour*100) > 100 ? 100: (workHour/startUpHour*100).toFixed(2) // 作业率
      }

      // 利用率
      let liyongLv = ((bootRate/100 * workRate/100)*100).toFixed(2) // 利用率（开机率/作业率）

      // 计划完成率
      /* let planFinishRate = 0
      if (overProcedureNum) {
        planFinishRate = (overProcedureNum/planProcedureNum)*100 > 100 ? 100 : (overProcedureNum/planProcedureNum*100).toFixed(2) // 计划完成率
      } */

      if (this.bootRateValue === '02') { // 作业率
        return {
          dateTime: data.datetime,
          runTime: workHour,
          startUpHour: startUpHour,
          rateValue: workRate
        }
      } else if (this.bootRateValue === '03') { // 利用率
        return {
          dateTime: data.datetime,
          runTime: workHour,
          startUpHour: startUpHour,
          rateValue: liyongLv
        }
      } else if (this.bootRateValue === '04') { // 计划完成率
        // return planFinishRate
      } else { // 开机率
        return {
          dateTime: data.datetime,
          runTime: workHour,
          startUpHour: startUpHour,
          rateValue: bootRate
        }
      }
    },


    // 处理柱状图数据22222（数据为字符串）
    handleLvDataBar2(data) {
    /**
     * 逻辑规则：
     * 开机时间 = 作业时间 + 待机时间
     * 开机率 = 开机时间 / 自然时间
     * 作业率 = 作业时间 / 开机时间
     * 故障率 = 故障数 / 总数
     * 利用率 = 开机率 * 作业率
     * 总耗电量 = 消耗电能 / 总数 
     * 计划完成率 = 完成工件数 / 计划工件数
     */
      const idleTime = parseFloat(data.idleTime) || 0 // 待机时间（秒）
      const runTime = parseFloat(data.runTime) || 0 // 作业时间（秒）
      const naturalTime = parseFloat(data.natraulTime) || 0 // 自然时间（秒）
      const naturalTimeHour = naturalTime / 3600 || 0 // 自然时间（小时）

      const startUpHour = parseFloat(((idleTime + runTime)/3600).toFixed(2))||0 // 开机小时数（开机时间）
      const workHour = parseFloat((runTime/3600).toFixed(2))||0 // 作业小时数（作业时间）

      // const planProcedureNum = data.planProcedureNum || 0 // 计划工件数
      // const overProcedureNum = data.overProcedureNum || 0 // 完成工件数

      // 开机率（开机时间/自然时间）
      let bootRate = 0
      if (startUpHour) {
        bootRate = (startUpHour/naturalTimeHour)*100 > 100 ? 100 : (startUpHour/naturalTimeHour*100).toFixed(2) // 开机率
      }

      // 作业率（作业时间/开机时间）
      let workRate = 0
      if (workHour) {
        workRate = (workHour/startUpHour*100) > 100 ? 100: (workHour/startUpHour*100).toFixed(2) // 作业率
      }

      // 利用率
      let liyongLv = ((bootRate/100 * workRate/100)*100).toFixed(2) // 利用率（开机率/作业率）

      // 计划完成率
      /* let planFinishRate = 0
      if (overProcedureNum) {
        planFinishRate = (overProcedureNum/planProcedureNum)*100 > 100 ? 100 : (overProcedureNum/planProcedureNum*100).toFixed(2) // 计划完成率
      } */

      if (this.bootRateValue === '02') { // 作业率
        // return workRate
        return {
          name: data.machineNo,
          value: workRate
        }
      } else if (this.bootRateValue === '03') { // 利用率
        // return liyongLv
        return {
          name: data.machineNo,
          value: liyongLv
        }
      } else if (this.bootRateValue === '04') { // 计划完成率
        /* return {
          name: data.machineNo,
          value: planFinishRate
        } */
        // return planFinishRate
      } else { // 开机率
        // return bootRate
        return {
          name: data.machineNo,
          value: bootRate
        }
      }
    },
  }
}
</script>
<style lang="scss" scoped>
// 标题
	.statistics_titleBox {
		padding-left: 15px;
		height: 50px;

		.statistics_circle {
			margin-left: 5px;
			font-size: 32px;
			color: rgb(2, 201, 252);
			display: inline-block;
			vertical-align: middle;
		}

		.statistics_title {
			display: inline-block;
			vertical-align: middle;
			font-size: 28px;
			color: #fff;
			margin-left: 10px;
			font-weight: bold;
		}

		.statistics_img {
			display: inline-block;
			vertical-align: middle;
			margin-left: 5px;
		}
  }
  .statistics_search{
    padding-top:8px;
    .daytimeBox{
      display: inline-block;
      /deep/ .el-date-editor{
        width: 150px;
      }
      /deep/ .el-select{
        width: 100px;margin-left:1px;
      }
    }
  }
// nei rong
.statistics_main{
  width: 100%;height:100%;overflow: hidden;
  padding: 15px;
  .common-pagination{
    padding:0 40px;
  }
}



.statistics_sort{
  height: 375px;
  .statistics_echarts{
    height:270px;
    width: 100%;
  }
  .statistics_total{
    display: flex;
    padding: 0 50px;
  }
  .statistics_totalItem{
    flex: 1;
    text-align: center;
  }
  .statistics_percent{
    font-size: 27px;color:#139cd6;
    &.green{color: #00ff3c;}
    &.orange{color: #ffd800;}
    &.red{color: #ff0000;}
  }
  .statistics_label{
    font-size: 14px;color:#139cd6;
  }
}
.statistics_detail{
  height: calc(100% - 375px);
  overflow: hidden;
  .statistics_table{
    height: calc(100% - 50px - 60px);
    padding:0 40px;
    overflow: hidden;
    .table-tr{ cursor: pointer; }
    .table-td01{ width: 10%; }
    .table-td02{ width: 20%; }
    .table-td03{ width: 15%; }
    .table-td04{ width: 15%; }
    .table-td05{ width: 20%; }
    .table-td06{ width: 20%; }
  }
  .statistics-pagination{

  }
}
.table{
    .table-thead{
      background-color:#2a4b85;
      font-size: 18px;color:#53e3fd;
      padding: 8px 0;
      font-weight: bold;
    }
    .table-tbody{
      padding-top:23px;
      font-size:16px;
      color:#02c9fc;
      height: calc(100% - 40px);
    }
    .table-tbodyInner{
      height: 100%;
      /deep/ .el-scrollbar__wrap{ overflow-x: hidden }
    }
    .table-tr{
      margin-bottom:15px;
      background-color:rgba(42,75,133,0.3);
      padding:5px 0;
    }
    .table-td{
      display: inline-block;text-align: center;
    }
}

//---------------------echarts弹窗 start--------------------
.statistics_echartsDialog{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color:rgba(14,25,43,0.9);
}
.statistics_echartsDialog_closeBtn{
  position: absolute;
  right: -120px;
  top: -80px;
  cursor: pointer;
}
.statistics_echartsDialogInner{
  border:1px solid #435887;
  width: 1550px;
  // height: 780px;
  padding: 0 100px;
  margin:0 auto;
  transform: translate(-50%,-48%);
  left: 50%;
  top: 50%;
  position: absolute;
  background-color:#102446;
}
.lineEcharts{
  height: 300px;
  .statistics_echartsLine{
    width: 100%;
    height: 270px;
  }
  .statistics_echartsLine_title{
    font-size: 25px;
    color:#fff;
    text-align: center;
    margin-top:20px;
    background:#102344
  }
}
.statistics_echartsDialog_table{
  height: 480px;
  margin-bottom: 20px;
  overflow: hidden;
    .table-td01{ width: 35%; }
    .table-td02{ width: 20%; }
    .table-td03{ width: 25%; }
    .table-td04{ width: 20%; }
}
//---------------------echarts弹窗 end--------------------

.statistics_empty{
  color: #02c9fc;
  font-size: 16px;
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-time-spinner__wrapper{
  display: none !important;
}
</style>

