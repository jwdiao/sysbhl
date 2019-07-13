<template>
    <div class="common_bg common_bg02">
        <CommonHead
                :isShowBackBtn="false"
                :isShowCurrentTime="false"
                :titleText="`${companyName}设备状态图谱`"
                @backBtnClick="handleBackBtn"
        />
        <CommonNav current="DeviceInfo" />
        <div class="common_main common_blockColor padding20">
            <el-row class="deviceFailure_headBox">
                <el-col :span="4" class="device_titleBox">
                    <span class="device_circle">•</span>
                    <span class="device_title">设备状态</span>
                    <img class="device_img" src="../../assets/images/DeviceConnect_title.png"/>
                </el-col>
                <el-col :span="20" class="common_select deviceInfo_condition" >
                    <el-date-picker
                            v-model="selectedDate"
                            type="date"
                            :picker-options="pickerOptionsStart"
                            value-format="yyyy-MM-dd"
                            :clearable="false"
                            placeholder="选择日期">
                    </el-date-picker>
                    <el-select v-model="selectedShiftType" placeholder="请选择白/夜班" class="marginLeft15">
                        <el-option
                                v-for="item in shiftTypeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-select v-model="selectedCraft" placeholder="请选择工艺类型" class="marginLeft15">
                        <el-option
                                v-for="item in craftOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        ></el-option>
                    </el-select>                    
                    <el-select v-model="selectedCenter" placeholder="请选择加工中心" class="marginLeft15">
                        <el-option
                                v-for="item in centerOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        ></el-option>
                    </el-select>
                    <div class="marginLeft15 search_input">
                        <el-input v-model="machineModel" placeholder="请输入设备型号" clearable></el-input>
                    </div>
                    <div class="marginLeft15 search_input">
                        <el-input v-model="machineNo" placeholder="请输入设备编号" clearable></el-input>
                    </div>
                    <div class="marginLeft15 search_input">
                        <el-input v-model="machineName" placeholder="请输入设备名称" clearable></el-input>
                    </div>
                    <div class="marginLeft15 inlineBlock common-btn" @click="searchFun">查询</div>
                    <div class="marginLeft15 inlineBlock common-btn2" @click="exportFun">导出</div>
                </el-col>
            </el-row>
            <div class="device_main">
                <div class="device_info">
                    <DeviceInfoGanttChart
                            :deviceInfoData = "deviceInfoData"
                            :selectedDate="selectedDate"
                            :shiftType="selectedShiftType"
                            :companyCode="companyCode"
                    />
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
    import moment from 'moment'
    import CommonHead from "../../components/Head";
    import CommonNav from '@/components/Nav'
    import DeviceInfoGanttChart from "./DeviceInfoGanttChart";
    import {
        reqGroupList,reqCenterList,reqMachineTypeList,
        reqDeviceInfoList, reqDeviceStatusMapDownload
    } from "../../api";
    import { _SessionStorageObj } from '@/utils'
    export default {
        name:'DeviceInfo',
        components: {
            CommonHead,
            CommonNav,
            DeviceInfoGanttChart
        },
        data(){
            return {
                deviceInfoData: {},

                companyCode: '0701', // 选中的公司code
                companyName: '三一德力佳', // 选中的公司name

                selectedDate: moment().format('YYYY-MM-DD'), //条件查询-日期

                shiftTypeOptions: [
                    {
                        label:'全部',
                        value:'0'
                    },
                    {
                        label:'白班',
                        value:'1'
                    },
                    {
                        label:'夜班',
                        value:'2'
                    }
                ], // 白/夜班下拉值,
                selectedShiftType: '0', // 条件查询-白夜班,

                centerOptions: [], // 加工中心下拉值
                selectedCenter: '', // 条件查询-加工中心,

                craftOptions: [], // 工艺下拉值,
                selectedCraft: '', // 条件查询-工艺,

                machineModel: '', // 条件查询-设备型号
                machineNo: '', // 条件查询-设备编号
                machineName: '', // 条件查询-设备名称

                pickerOptionsStart: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                pickerOptionsEnd: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
            }
        },
        mounted() {
            // 从localStory里面取选中的公司
            const sbhlSelectedCompanyObj = _SessionStorageObj.get('sbhl-OverView-SelectedCompany')
            if (sbhlSelectedCompanyObj) {
                this.companyCode = sbhlSelectedCompanyObj.value; // 公司编码
                this.companyName = sbhlSelectedCompanyObj.label // 公司名字
            }

            // 获取设备运行状态信息
            this.getDeviceInfoData()
            // 获取白夜班类型
            this.constructShiftType()
            // 获取工艺类型
            this.getCraftOption();
            // 获取加工中心类型
            this.getCenterOption();
        },
        methods:{
            handleBackBtn: function () {
                this.$router.push('/OverView')
            },

            // 搜索
            async searchFun() {
                console.log('searchFun called')
                // this.pageNum = 1;
                // this.pageSize = 20;
                await this.getDeviceInfoData()
            },

            async getDeviceInfoData() {
                console.log('getDeviceInfoData called', this.companyCode,this.selectedDate,this.selectedShiftType)
                const res = await reqDeviceInfoList({
                    companyCode: this.companyCode,
                    date: this.selectedDate,
                    dayType: this.selectedShiftType,
                    workCenterCode: this.selectedCenter,
                    firstGroupCode: this.selectedCraft,
                    machineNo: this.machineNo,
                    machineName: this.machineName,
                    machineModel: this.machineModel,
                })
                if(res&&res.code===200){
                    if(res.data!==null){
                        console.log('getDeviceInfoData called result', res.data)
                        this.deviceInfoData = res.data
                        // const rrr = this.deviceInfoData.list[0].dataList.map(item => {
                        //     return {
                        //         begin: moment(item.beginDate).format('YYYY-MM-DD HH:mm:ss'),
                        //         end: moment(item.endDate).format('YYYY-MM-DD HH:mm:ss')
                        //     }
                        // })
                        // console.log('rrr:',rrr)
                    }
                }
            },

            constructShiftType() {
                if (moment().isBefore(moment().startOf('day').add(20, 'hour'))) {
                    this.shiftTypeOptions = [
                        {
                            label:'全部',
                            value:'0'
                        },
                        {
                            label:'白班',
                            value:'1'
                        },
                        {
                            label:'夜班',
                            value:'2'
                        }
                    ]
                } else {
                    this.shiftTypeOptions = [
                        {
                            label:'全部',
                            value:'0'
                        },
                        {
                            label:'白班',
                            value:'1'
                        },
                        {
                            label:'夜班',
                            value:'2'
                        }
                    ]
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
            // 导出
            async exportFun() {
                const params = {
                    "companyCode": this.companyCode,
                    "date": this.selectedDate,
                    "dayType": this.selectedShiftType,
                    "machineModel": this.machineModel,
                    "machineNo": this.machineNo,
                    "machineName":  this.machineName,
                    "firstGroupCode":  this.selectedCraft,
                    "workCenterCode":  this.selectedCenter,                  
                }
                reqDeviceStatusMapDownload(params).then(res => {
                    const blob = new Blob([res.data],{type: "application/vnd.ms-excel"}); // type不写也行
                    const fileText = this.shiftTypeOptions.filter(item => item.value === this.selectedShiftType)[0].label
                    const fileName = this.companyName + this.selectedDate +'日'+ fileText+'设备状态' + '.xlsx'; // 文件名称
                    if ('download' in document.createElement('a')) { // 非IE下载          
                        const elink = document.createElement('a');
                        elink.download = fileName; //下载后文件名
                        elink.style.display = 'none';
                        elink.href = URL.createObjectURL(blob); //创建下载的链接
                        document.body.appendChild(elink);
                        elink.click(); //点击下载
                        URL.revokeObjectURL(elink.href); // 释放URL 对象
                        document.body.removeChild(elink); //下载完成移除元素
                    } else { // IE10+下载
                        navigator.msSaveBlob(blob, fileName)
                    }
                })
            },
        }

    }
</script>
<style lang="scss" scoped>
    .device_main {
        height: calc(100% - 50px);
        display: flex;
        overflow: hidden;
        padding: 0px 20px 20px 20px;
    }
    .device_titleBox{
        padding-left: 15px;
        height: 50px;
        .device_circle{
            margin-left: 5px;
            font-size: 32px;
            color: rgb(2,201,252);
            display:inline-block;
            vertical-align: middle;
        }

        .device_title{
            display: inline-block;
            vertical-align: middle;
            font-size: 28px;
            color: #fff;
            margin-left: 10px;
            font-weight: bold;
        }

        .device_img{
            display: inline-block;
            vertical-align: middle;
            margin-left: 5px;
        }
    }

    .deviceInfo_condition {
        text-align: right;
        padding-top: 10px;

        .search_input {
            display: inline-block;
            width: 160px;
        }
    }

    .device_info {
        display: flex;
        margin-top: 15px;
        flex: 1;
    }
</style>
