<template>
<div class="kpi_box">
    <el-row class="deviceFailure_headBox">
      <el-col :span="10" class="deviceFailure_titleBox">
            <span class="device_circle">•</span>
			<span class="device_title">设备KPI指标</span>
			<img class="device_img" src="../../../assets/images/DeviceConnect_title.png" />
      </el-col>
      <el-col :span="14" class="common_select deviceFailure_condition">
        <el-select v-model="craftValue" placeholder="请选择工艺类型">
          <el-option
            v-for="item in craftOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>        
        <el-select v-model="centerNameValue" placeholder="请选择加工中心" class="marginLeft15">
          <el-option
            v-for="item in centerOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div class="marginLeft10 search_input">
          <el-input v-model="machineModel" placeholder="手动输入设备型号" clearable></el-input>
        </div>        
        <div class="marginLeft10 search_input">
          <el-input v-model="machineNo" placeholder="手动输入设备编号" clearable></el-input>
        </div>
        <div class="marginLeft10 search_input">
          <el-input v-model="machineName" placeholder="手动输入设备名称" clearable></el-input>
        </div>        

        <div class="marginLeft15 inlineBlock common-btn" @click="searchFun">搜索</div>
    </el-col>    
    </el-row>
    <div class="kpi">
        <div class="kpi_info">
            <ul>
                <li>
                    <label>T内设备总数</label>
                    <span>{{baseInfo.machineNum}}</span>
                    <em>台</em>
                </li>
                <li>
                    <label>当前故障设备台数</label>
                    <span>{{baseInfo.failureNum}}</span>
                    <em>台</em>
                </li>
                <li>
                    <label>当日设备故障时间</label>
                    <span>{{baseInfo.dayFailureTime}}</span>
                    <em>小时</em>
                </li>
                <li>
                    <label>近10日设备故障时间</label>
                    <span>{{baseInfo.tenFailureTime}}</span>
                    <em>小时</em>
                </li>
                <li>
                    <label>当月设备故障时间</label>
                    <span>{{baseInfo.monthFailureTime}}</span>
                    <em>小时</em>
                </li>
            </ul>
        </div>
        <ul class="kpi_echarts">
            <li>
                <div class="title">本日</div>
                <div class="con" id="DeviceFailureKpi_day"></div>
            </li>
            <li>
                <div class="title">本月</div>
                <div class="con" id="DeviceFailureKpi_month"></div>
            </li>
            <li>
                <div class="title">本年</div>
                <div class="con" id="DeviceFailureKpi_year"></div>
            </li>
        </ul>
    </div>
</div>
</template>
<script>
import echarts from 'echarts'
import moment from 'moment'
import {
  reqGroupList,reqCenterList,reqKpiFind } from '@/api'
import { _SessionStorageObj, getDayStrFun } from '@/utils'
export default {
    name: 'DeviceFailureKpi',
    data() {
        return {
            companyCode: '0701', // 选中的公司code
            companyName: '三一德力佳', // 选中的公司name

            centerNameValue: '', // 加工中心值
            centerOptions: [], // 加工中心下拉值,
            craftValue: '', // 工艺值
            craftOptions: [], // 工艺下拉值,
            machineModel: '', // 设备型号
            machineNo: '', // 设备编号
            machineName: '', // 设备名称

            baseInfo: {
                machineNum: 0,
                failureNum: 0,
                dayFailureTime: 0,
                monthFailureTime: 0,
                tenFailureTime: 0
            },

            dayEchartsDom: '',
            dayEchartsData: '',
            monthEchartsDom: '',
            monthEchartsData: '',
            yearEchartsDom: '',
            yearEchartsData: '',

            allEchartsArr: []
        }
    },
    watch: {

    },
    mounted() {
        // 从localStory里面取选中的公司
        const sbhlSelectedCompanyObj = _SessionStorageObj.get('sbhl-OverView-SelectedCompany')
        if (sbhlSelectedCompanyObj) {
          this.companyCode = sbhlSelectedCompanyObj.value; // 公司编码
          this.companyName = sbhlSelectedCompanyObj.label // 公司名字
        }

        // 获取实时日期
        this.dateStr = moment(new Date()).format('YYYY-MM-DD')

        // 获取工艺类型
        this.getCraftOption();
        // 获取加工中心类型
        this.getCenterOption();




        // 本日
        this.dayEchartsDom = echarts.init(document.getElementById('DeviceFailureKpi_day'));
        this.allEchartsArr.push(this.dayEchartsDom)

        // 本月
        this.monthEchartsDom = echarts.init(document.getElementById('DeviceFailureKpi_month'));
        this.allEchartsArr.push(this.monthEchartsDom)


        // 本年
        this.yearEchartsDom = echarts.init(document.getElementById('DeviceFailureKpi_year'));
        this.allEchartsArr.push(this.yearEchartsDom)

        // 获取数据
        this.getDataFun()

        //给window对象绑定resize事件
        window.addEventListener('resize', this.handleResize);
    },
    methods: {
        searchFun() {
            this.getDataFun()
        },
        handleData(data) {
            let arr = []
            let echartsObj = {
                xAxis: [],
                failureRate: []
            }
            if (data && data.length) {
                arr = data.map(item => {
                    const failureRate = item.failureTime ? (item.failureTime/item.naturalTime)*100:0
                    const trueFailureRate = failureRate > 100 ? 100 : failureRate.toFixed(2)
                    return {
                        xAxis: item.xAxis,
                        failureRate: trueFailureRate<0?0:trueFailureRate
                    }
                })
            }
            arr.map(item => {
                echartsObj.xAxis.push(item.xAxis)
                echartsObj.failureRate.push(item.failureRate)
            })
            return echartsObj
        },
        async getDataFun() {
            const currentDate = getDayStrFun();
            const params = {
                "companyCode": this.companyCode,
                "date": currentDate,
                "firstGroupCode": this.craftValue,
                "workCenterCode": this.centerNameValue,
                "machineModel": this.machineModel,
                "machineName": this.machineName,
                "machineNo": this.machineNo,
            }
            const res = await reqKpiFind(params)
            if (res && res.code === 200) {
                const { machineNum, failureNum, dayFailureTime, monthFailureTime, tenFailureTime } = res.data
                const realDayFailureTime = (dayFailureTime/3600).toFixed(2)
                const realMonthFailureTime = (monthFailureTime/3600).toFixed(2)
                const realTenFailureTime = (tenFailureTime/3600).toFixed(2)
                this.baseInfo = {
                    machineNum,
                    failureNum,
                    dayFailureTime: dayFailureTime?(realDayFailureTime>0?realDayFailureTime:0):0,
                    monthFailureTime: monthFailureTime?(realMonthFailureTime>0?realMonthFailureTime:0):0,
                    tenFailureTime: tenFailureTime?(realTenFailureTime>0?realTenFailureTime:0):0
                }
                const echartsData = res.data.echartsData
                // 本日
                const dayEchartsData = echartsData.day
                this.dayEchartsData = this.handleData(dayEchartsData)
                this.renderEcharts(this.dayEchartsDom, this.dayEchartsData)

                // 本月
                const monthEchartsData = echartsData.month
                this.monthEchartsData = this.handleData(monthEchartsData)
                this.renderEcharts(this.monthEchartsDom, this.dayEchartsData)

                // 本年
                const yearEchartsData = echartsData.year
                this.yearEchartsData = this.handleData(yearEchartsData)
                this.renderEcharts(this.yearEchartsDom, this.yearEchartsData)

                console.log('this.dayEchartsData:',this.dayEchartsData,'this.monthEchartsData:',this.monthEchartsData,'this.yearEchartsData:',this.yearEchartsData)
            }
        },
        renderEcharts(dom, data) {
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    },
                    // formatter: function(params) {
                    //     // console.log('params:',params)
                    //     return '故障率：'+'<br />'+params.name+': '+params.value+'%'
                    // }                    
                },
                legend: {
                    data:['故障率(%)'],
                    x: 'right',
                    padding: [0, 100, 15, 0],
                    textStyle: {
                        color: '#fff',
                        width: 20,
                        height: 10
                    }
                },
                grid: {
                    top: 20,
                    left: 50,
                    right: 60,
                    bottom: 30
                },
                xAxis: {
                    data: data.xAxis,
                    axisLabel: {
                        color: '#fff'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#293e60',
                        }
                    },
                    axisTick: { // 坐标轴刻度
                        show: false
                    },
                    
                },
                yAxis: {
                    axisLabel: {                    
                        color: '#fff',
                        formatter: function(val) {
                            return val+'%'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#293e60',
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#375484',
                            type: 'dotted'
                        }
                    },
                    // max: 100,
                    min: 0
                },
                series: [{
                    name: '故障率(%)',
                    type: 'bar',
                    data: data.failureRate,
                    barWidth: 8,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#04b7d4'},
                                    {offset: 0.5, color: '#1d89d7'},
                                    {offset: 1, color: '#3759da'}
                                ]
                            )
                        }
                    },                    
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            dom.setOption(option);    
        },
        // 获取工艺类型
        async getCraftOption() {
            const res = await reqGroupList(this.companyCode)
            if (res && res.code === 200) {
                this.craftOptions = [
                { 
                    value: '',
                    label: '全部工艺类型'
                }
                ]
                const dataArr = res.data
                if(!dataArr.length) return;
                dataArr.map((item) => {
                const obj = {
                    label: item.firstGroupName,
                    value: item.firstGroupCode
                }
                this.craftOptions.push(obj)
                })
            }
        },
        // 获取加工中心下拉
        async getCenterOption() {
            const res = await reqCenterList(this.companyCode)
            if (res && res.code === 200) {
                this.centerOptions = [
                { 
                    value: '',
                    label: '全部加工中心'
                }
                ]
                const dataArr = res.data
                if(!dataArr.length) return;
                dataArr.map((item) => {
                const obj = {
                    label: item.workCenterName,
                    value: item.workCenterCode
                }
                this.centerOptions.push(obj)
                })
            }
        },
        handleResize() {
            this.allEchartsArr.forEach((ele, index) => {
                ele.resize()
            })
        },    
    }
}
</script>

<style lang="scss" scoped>
.kpi_box{ height: 100%; }
.deviceFailure_titleBox{
  .device_circle {
    margin-left: 5px;
    font-size: 32px;
    color: rgb(2, 201, 252);
    display: inline-block;
    vertical-align: middle;
  }

  .device_title {
    display: inline-block;
    vertical-align: middle;
    font-size: 28px;
    color: #fff;
    margin-left: 10px;
    font-weight: bold;
  }

  .device_img {
    display: inline-block;
    vertical-align: middle;
    margin-left: 5px;
    padding-top: 8px;
  }
}
.deviceFailure_condition{
  text-align: right;
  padding-top: 10px;
  .search_input{
    display:inline-block;width: 160px;
  }
}
.kpi{
    height: 100%;padding-top:20px;height: calc(100% - 42px);
    display: flex;
    &_info{
        width: 400px;
        background-color: rgba(0, 186, 255, 0.1);
        text-align: center;
        display: flex;justify-content: center;align-items: center;
        ul{ display: inline-block; }
        li{ display: flex;align-items: center; margin-bottom: 30px; }
        label{
            color: #6b92d1; font-size: 20px;width: 190px;text-align: right;
        }
        span{
            color: #00c7fa; font-size:36px;margin-left: 10px;
        }
        em{ color: #00c7fa; font-size:22px;}
    }
    &_echarts{
        margin-left: 20px;
        flex: 1;
        display: flex;flex-direction: column;
        li{
            flex: 1;padding: 15px;
            background-color: rgba(0, 186, 255, 0.1);
            margin-top: 20px;
            &:first-child{ margin-top:0 } 
            .title{
                font-size: 22px; color: #fff;
                &::before{
                    content: '';display: inline-block;
                    width: 12px;height:12px;background-color: #2be0fe;border-radius: 6px;margin-right: 6px;
                }
            }
            .con{
                height: calc(100% - 30px);
            }
        }
    }
}
</style>

