<template>
    <div class="common_bg common_bg02">
        <CommonHead
                :isShowBackBtn="true"
                :isShowCurrentTime="true"
                :titleText="`${companyName}历史记录`"
                @backBtnClick="handleBackBtn"
        />
        <div class="common_main common_blockColor padding20">
            <el-row class="deviceFailure_headBox">
                <el-col :span="4" class="device_titleBox"></el-col>
                <el-col :span="20" class="common_select deviceInfo_condition">
                    <el-date-picker
                            v-model="dateValueStart"
                            :clearable="false"
                            :editable="false"
                            type="date"
                            :picker-options="pickerOptionsStart"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="开始日期">
                    </el-date-picker>
                    <span style="color:#fff;padding:0 5px;">-</span>
                    <el-date-picker
                            v-model="dateValueEnd"
                            :clearable="false"
                            :editable="false"
                            type="date"
                            :picker-options="pickerOptionsStart"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="结束日期">
                    </el-date-picker>
                    <el-select v-model="selectedShiftType" placeholder="请选择白/夜班" class="marginLeft15">
                        <el-option
                                v-for="item in shiftTypeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        ></el-option>
                    </el-select>
                    <div class="marginLeft15 inlineBlock common-btn" @click="searchFun">确定</div>
                </el-col>
            </el-row>
            <div class="device_main">
                <div class="device_table">
                    <div class="table-thead">
                        <span class="table-td table-td01">编号</span>
                        <span class="table-td table-td02">日期</span>
                        <span class="table-td table-td03">开机小时数<span style="color: #CEB802">(h)</span></span>
                        <span class="table-td table-td04">作业小时数<span style="color: #CEB802">(h)</span></span>
                        <span class="table-td table-td05">开机率<span style="color: #CEB802">(%)</span></span>
                        <span class="table-td table-td06">作业率<span style="color: #CEB802">(%)</span></span>
                        <span class="table-td table-td07">利用率<span style="color: #CEB802">(%)</span></span>
                        <span class="table-td table-td08">故障率<span style="color: #CEB802">(%)</span></span>
                        <span class="table-td table-td9">总耗电量<span style="color: #CEB802">(kw.h)</span></span>
                    </div>
                    <el-scrollbar class="table-tbodyBox" v-if="dataList.length>0">
                        <div class="table-tbody">
                            <div
                                    v-for="item in dataList"
                                    @click="handleClickItem(item)"
                                    :key="item.key"
                                    class="table-tr"
                            >
                                <span class="table-td table-td01">{{item.id}}</span>
                                <span class="table-td table-td02">{{item.date}}</span>
                                <span class="table-td table-td03">{{item.startUpHour}}</span>
                                <span class="table-td table-td04">{{item.workTimeHour}}</span>
                                <span class="table-td table-td05">{{item.startUpRate}}</span>
                                <span class="table-td table-td06">{{item.workRate}}</span>
                                <span class="table-td table-td07">{{item.utilizationRate}}</span>
                                <span class="table-td table-td08">{{item.alarmRate}}</span>
                                <span class="table-td table-td9">{{item.elcPower}}</span>
                            </div>
                        </div>
                    </el-scrollbar>
                    <div class="device_empty" v-if="dataList.length<=0">暂无数据</div>
                    <div class="marginTop20 common-pagination" v-if="total>=1">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="pageNum"
                                :page-sizes="[20, 30, 40, 50]"
                                :page-size="pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import CommonHead from '@/components/Head'
    import {reqEnergyHistoryList} from "@/api";
    import { _SessionStorageObj } from '@/utils'

    export default {
        name: 'EnergyHistory',
        components: {
            CommonHead,
        },
        data() {
            return {
                companyCode: '0701', // 选中的公司code
                companyName: '三一德力佳', // 选中的公司name

                dateValueStart: moment().subtract(15,'day').format('YYYY-MM-DD'), // 当前日期向前推算十五天
                dateValueEnd: moment().subtract(1,'day').format('YYYY-MM-DD'), // 当前日期

                pickerOptionsStart: {
                    disabledDate(time) {
                        // return time.getTime() > Date.now();
                        return time.getTime() > moment().subtract(1,'day');
                    }
                },
                pickerOptionsEnd: {
                    disabledDate(time) {
                        return time.getTime() > moment().subtract(1,'day');
                        // return time.getTime() > Date.now();
                    }
                },

                shiftTypeOptions: [
                    {
                        label: '全天',
                        value: '0'
                    },
                    {
                        label: '白班',
                        value: '1'
                    },
                    {
                        label: '夜班',
                        value: '2'
                    }
                ],
                selectedShiftType: '0',

                dataList: [], // 数据列表

                //分页相关
                pageNum: 1, // 当前页
                pageSize: 20, // 每页多少条
                total: 0 // 总条数
            }
        },
        mounted(){
            // 从localStory里面取选中的公司
            const sbhlSelectedCompanyObj = _SessionStorageObj.get('sbhl-OverView-SelectedCompany')
            if (sbhlSelectedCompanyObj) {
                this.companyCode = sbhlSelectedCompanyObj.value; // 公司编码
                this.companyName = sbhlSelectedCompanyObj.label // 公司名字
            } else {
                _SessionStorageObj.set('sbhl-OverView-SelectedCompany',{label:this.companyName,value:this.companyCode})
            }

            this.getDataListFun()
        },
        methods: {
            // 返回按钮回调
            handleBackBtn() {
                // console.log('back btn clicked!')
                this.$router.push('/OverView');
            },

            // 监听点击行事件
            handleClickItem(item) {
                // console.log('handleClickItem clicked!'+item)
                // this.$router.push('/OverviewHistory');
                // this.$router.replace({name:'OverviewHistory',params:{OverviewHistoryDate: item.date}})
            },

            // 搜索
            async searchFun() {
                console.log('searchFun called')
                // this.pageNum = 1;
                // this.pageSize = 20;
                await this.getDataListFun()
            },

            async getDataListFun() {
                // this.companyCode = JSON.parse(this.companyCodeStr).value;
                this.dataList = []

                const params = {
                    companyCode: this.companyCode,
                    date: `${this.dateValueStart}_${this.dateValueEnd}`,
                    dayType: this.selectedShiftType,
                }
                const res = await reqEnergyHistoryList(params)
                if(res && res.code === 200 && res.data && res.data.length){
                    /**
                     * 逻辑规则：
                     * 开机时间 = 作业时间 + 待机时间
                     * 开机率 = 开机时间 / 自然时间
                     * 作业率 = 作业时间 / 开机时间
                     * 故障率 = 故障数 / 总数(修改为：故障时间/总时间)
                     * 利用率 = 开机率 * 作业率
                     * 总耗电量 = 消耗电能 / 总数
                     * 在线 = 作业 + 待机 + 故障 + 停机
                     * 离线 = 设备总数 - 在线
                     * 计划完成率 = 完成工件数/计划工件数
                     */

                    const originalDataList = res.data.reverse()
                    originalDataList.map((item, index) => {

                        // 作业小时数(小时)
                        const workTimeHour = item.runTime === null ? 0 : parseFloat((item.runTime/3600).toFixed(2))
                        // 空闲(待机)小时数(小时) - 不显示，计算之用
                        const idleTimeHour = item.idleTime === null ? 0 : parseFloat((item.idleTime/3600).toFixed(2))
                        // 开机小时数(小时) = 作业时间 + 空闲时间
                        let startUpHour = (workTimeHour + idleTimeHour)? (workTimeHour + idleTimeHour).toFixed(2): 0;

                        // 自然时间(秒) - 不显示，计算之用
                        const naturalTime = item.naturalTime || 0
                        const naturalTimeHour = item.naturalTime === null ? 0 : parseFloat(item.naturalTime/3600) // 自然时间（小时）

                        // 故障(报警)时间 - 不显示，计算之用
                        const failureTime = item.alermTime || 0

                        // 完成工件数(件)
                        const overProcedureNum = parseFloat(item.overProcedureNum) || 0

                        // 总耗电量(kw.h)
                        const elcPower = item.elcPower ? item.elcPower.toFixed(2):0

                        // 开机率 = 开机时间/自然时间
                        let startUpRate = 0;
                        if (startUpHour === 0) {
                            startUpRate = 0;
                        } else {
                            const startUpRateTrue = (startUpHour / naturalTimeHour*100)
                            startUpRate = startUpRateTrue > 100 ? 100 : startUpRateTrue.toFixed(2)
                        }

                        // 作业率 = 作业时间/开机时间
                        let workRate = 0;
                        if (workTimeHour === 0) {
                            workRate = 0;
                        } else {
                            const workRateTrue = (workTimeHour / startUpHour*100)
                            workRate = workRateTrue > 100 ? 100 : workRateTrue.toFixed(2)
                        }

                        // 利用率 = 开机率 * 作业率
                        let utilizationRate = 0
                        if (startUpRate === 0) {
                            utilizationRate = 0
                        } else {
                            const utilizationRateTrue = ((startUpRate/100 * workRate/100)*100)
                            utilizationRate = utilizationRateTrue > 100 ? 100 : utilizationRateTrue.toFixed(2)
                        }

                        // 故障率（故障时间/自然时间）
                        let alarmRate = 0
                        if (failureTime) {
                            const alarmRateTrue = (failureTime/naturalTime)*100
                            alarmRate = alarmRateTrue > 100 ? 100 : alarmRateTrue.toFixed(2)
                        }

                        let obj = {
                            key: `${moment().format('x')}${index}`,// 数据唯一Key
                            id: index+1, // 编号
                            date: item.date, // 日期
                            startUpHour, // 开机小时数(h)
                            workTimeHour, // 作业小时数(h)
                            startUpRate, // 开机率(%)
                            workRate,// 作业率(%)
                            utilizationRate,// 利用率(%)
                            alarmRate, // 故障率(%)
                            overProcedureNum, // 完成工件数(件)
                            elcPower // 总耗电量(kw.h)
                        }
                        this.dataList.push(obj)
                    })

                    // 测试多条数据
                    // this.dataList = this.dataList.concat(this.dataList).concat(this.dataList).concat(this.dataList)

                    // 暂不考虑分页
                    // this.pageNum = res.data.pageNum
                    // this.pageSize = res.data.pageSize
                    // this.total = res.data.total
                }

            },
        }
    }
</script>

<style lang="scss" scoped>
    .device_main {
        height: calc(100% - 30px);
        // display: flex;
        overflow: hidden;
        padding: 0px 20px 20px 20px;
    }

    .device_table{
        width: 100%;height:100%;
        padding-top: 10px;
        // border: white 2px solid;
    }
    .table-thead{
        background-color:#2a4b85;
        font-size: 18px;color:#fff;
        padding:8px 0;
        font-weight: bold;
    }
    .table-tbodyBox{
        height: calc(100% - 60px);
        /deep/ .el-scrollbar__wrap{
            overflow-x: hidden;
            overflow-y: scroll
        }
        // border: red 2px solid;
    }
    .table-tbody{
        // padding-top:6px;
        font-size:16px;
        color:#02c9fc;
    }
    .table-tr{
        background-color:#1b3461;
        margin: 14px 0;
        padding: 8px 0;
        cursor: pointer;
    }
    .table-td{
        display: inline-block;text-align: center;color: #53E3FD;
    }
    .table-td{
        width: 10%;
    }
    .table-td03{width: 13%;}
    .table-td04{width: 13%;}
    .table-td09{width: 14%;}

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
    .device_empty{
        text-align: center;color: #02c9fc;font-size: 16px;width: 100%;height: 90%;padding-top:16%;
    }
</style>