<template>
<div class="common_bg common_bg02">
  <CommonHead
    :isShowCurrentTime="false"
    :isShowBackBtn="false"
    :titleText="`${companyName}日报表统计`"
    @backBtnClick="handleBackBtn"
  />
  <CommonNav current="DayStatistics" />
  <div class="common_main common_blockColor padding20">
    <div class="week_container">
      <div class="week_top">
        <div class="week_titleBox">
          <span class="circle">•</span>
          <span class="title">
            日报表
          </span>
          <img class="img" src="../../assets/images/DeviceConnect_title.png" />
        </div>
        <div class="week_conditionBox">
          <el-date-picker
            v-model="startDateValue"
            type="date"
            :picker-options="pickerOptionsStart"
            value-format="yyyy-MM-dd"
            :clearable="false"
            placeholder="选择开始日期">
          </el-date-picker>
          <el-select v-model="dayType" placeholder="请选择班次" class="marginLeft15">
            <el-option label="全部" value="0"></el-option>
            <el-option label="白班" value="1"></el-option>
            <el-option label="夜班" value="2"></el-option>
          </el-select>
          <el-select v-model="craftValue" placeholder="请选择工艺类型" class="marginLeft15">
            <el-option
              v-for="item in craftOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>          
          <el-select v-model="centerNameValue" placeholder="请选择加工中心" class="marginLeft15">
            <el-option
              v-for="item in centerOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="marginLeft15 search_input">
            <el-input v-model="machineModel" placeholder="手动输入设备型号" clearable></el-input>
          </div>
          <div class="marginLeft15 search_input">
            <el-input v-model="machineNo" placeholder="手动输入设备编号" clearable></el-input>
          </div>
          <div class="marginLeft15 search_input">
            <el-input v-model="machineName" placeholder="手动输入设备名称" clearable></el-input>
          </div>
          <div class="marginLeft15 common-btn" @click="searchFun">查询</div>
          <div class="marginLeft15 common-btn2" @click="exportExcelFun" style="position:relative;padding-left:25px;">
            导出<img src="../../assets/images/common_iconExcel.png" style="position:absolute;top:8px;left:8px;width:16px;" />
          </div>
        </div>
      </div>
      <div class="week_bottom">
        <div class="common-table">
          	<div class="table-thead">
							<span class="table-td table-td01">序号</span>
							<span class="table-td">设备型号</span>
							<span class="table-td table-td02">设备编号</span>
							<span class="table-td table-td03">设备名称</span>
              <span class="table-td table-td04">在线时间(h)</span>
              <span class="table-td table-td05">在线率</span>
							<span class="table-td table-td06">开机时间(h)</span>
              <span class="table-td table-td07">开机率</span>
							<span class="table-td table-td08">作业时间(h)</span>
							<span class="table-td table-td09">作业率</span>
							<span class="table-td table-td10">利用率</span>
							<span class="table-td table-td11">故障率</span>
							<span class="table-td table-td12">总耗电量(kw•h)</span>
						</div>
            <el-scrollbar class="table-tbodyBox">
							<div class="table-tbody">
								<div
									v-for="(item, index) in deviceList"
                  :key="index"
									class="table-tr"
								>
									<span class="table-td table-td01">{{item.num}}</span>
                  <span class="table-td">{{item.machineModel}}</span>
                  <span class="table-td table-td02">{{item.machineNo}}</span>
                  <span class="table-td table-td03">{{item.machineName}}</span>
                  <span class="table-td table-td04">{{item.onLineTime}}</span>
                  <span class="table-td table-td05">{{item.onLineRate}}</span>
                  <span class="table-td table-td06">{{item.bootTime}}</span>
                  <span class="table-td table-td07">{{item.bootRate}}</span>
                  <span class="table-td table-td08">{{item.startupTime}}</span>
                  <span class="table-td table-td09">{{item.startupRate}}</span>
                  <span class="table-td table-td10">{{item.utilizationRate}}</span>
                  <span class="table-td table-td11">{{item.alarmRate}}</span>
                  <span class="table-td table-td12">{{item.elcPower}}</span>                  
								</div>
							</div>
            </el-scrollbar>
        </div>
        <div class="marginTop20 common-pagination">
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
import CommonNav from '@/components/Nav'
import {
  reqGroupList, reqCenterList, reqMachineTypeList,
  reqDayReport, reqDayReportExport } from '@/api'
import { _SessionStorageObj, calculateRateFun2 } from '@/utils'
export default {
  name: 'Day',
  components: {
    CommonHead,
    CommonNav
  },
  data() {
    return {
      companyCode: '0701', // 选中的公司code
      companyName: '三一德力佳', // 选中的公司name

      startDateValue: moment(new Date()).format('YYYY-MM-DD'), // 开始日期
      pickerOptionsStart:{
        disabledDate(time) {
            return time.getTime() > Date.now();
        }
      },

      dayType: '0', // 1白班 2夜班

      centerNameValue: '', // 加工中心值
      centerOptions: [], // 加工中心下拉值,

      craftValue: '', // 工艺值
      craftOptions: [], // 工艺下拉值,

      machineModel: '', // 设备型号
      machineNo: '', // 设备编号
      machineName: '', // 设备名称

      pageNum: 1, // 当前页
      pageSize: 20, // 每页多少条
      total: 0, // 总页数

      deviceList: [], // 设备列表
    }
  },
  filters: {
    // 小数转百分比
    toPercent: function(value) {
      if (!value || value=="null"){
        return 0
      } else {
        return (value*100).toFixed(2)
      }
    },
    // 秒转小时
    secondsToHour: function(value) {
      if (value) {
        return (value / 3600).toFixed(2)
      } else {
        return 0
      }
    }
  },
  mounted() {
    // 从localStory里面取选中的公司
    const sbhlSelectedCompanyObj = _SessionStorageObj.get('sbhl-OverView-SelectedCompany')
    if (sbhlSelectedCompanyObj) {
      this.companyCode = sbhlSelectedCompanyObj.value; // 公司编码
      this.companyName = sbhlSelectedCompanyObj.label // 公司名字
    }

    // 获取工艺类型
    this.getCraftOption();
    // 获取加工中心类型
    this.getCenterOption();

    // 获取列表数据
    this.getListFun()



    
  },
  methods: {
    // 返回按钮回调
    handleBackBtn() {
      this.$router.push('/OverView');
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
    // 获取列表数据
    async getListFun() {
      const params = {
        "pageNum": this.pageNum,
        "pageSize": this.pageSize,
        "query": {
          "companyCode": this.companyCode,
          "date": this.startDateValue,
          "dayType": this.dayType, // 白夜类型
          "firstGroupCode": this.craftValue, // 工艺
          "workCenterCode": this.centerNameValue, // 加工中心code
          "machineModel": this.machineModel, // 设备型号
          "machineNo": this.machineNo, // 设备编号
          "machineName": this.machineName, // 设备名称
        }
      }
      const res = await reqDayReport(params);
      if (res && res.code === 200) {
        this.deviceList = res.data.list.map((item, index) => {
          const data = calculateRateFun2(item)
          return {
            ...data,
            num: ((this.pageNum - 1) * this.pageSize) + (index + 1)
          }
        })
        // console.log('this.deviceList:',this.deviceList)
        this.total = res.data.total;
        this.pageNum = res.data.pageNum
				this.pageSize = res.data.pageSize
      }
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.getListFun()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNum = val
      this.getListFun()
    },
    searchFun() {
      this.pageNum = 1;
      this.getListFun()
    },
    // 导出excel
    async exportExcelFun() {
        const params = {
          "pageNum": 0,
          "pageSize": 0,
          "query": {
            "companyCode": this.companyCode,
            "date": this.startDateValue,
            "dayType": this.dayType, // 白夜类型
            "firstGroupCode": this.craftValue, // 工艺
            "workCenterCode": this.centerNameValue, // 加工中心code
            "machineNo": this.machineNo, // 设备编号
            "machineName": this.machineName, // 设备名称
          }
        }
        reqDayReportExport(params).then(res => {
          // 
          const blob = new Blob([res.data],{type: "application/vnd.ms-excel"}); // type不写也行
          let dayTypeLabel = '';
          if (this.dayType == 0){
            dayTypeLabel = ''
          } else if (this.dayType == 1){
            dayTypeLabel = '白班'
          } else if (this.dayType == 2){
            dayTypeLabel = '夜班'
          }
          const fileName = this.companyName +this.startDateValue+'日' +dayTypeLabel + '.xlsx'; // 文件名称
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
.week_container{
height: 100%;
}
.week_top{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.week_titleBox{
  .circle {
    margin-left: 5px;
    font-size: 32px;
    color: rgb(2, 201, 252);
    display: inline-block;
    vertical-align: middle;
  }

  .title {
    display: inline-block;
    vertical-align: middle;
    font-size: 28px;
    color: #fff;
    margin-left: 10px;
    font-weight: bold;
  }

  .img {
    display: inline-block;
    vertical-align: middle;
    margin-left: 5px;
    padding-top: 8px;
  }
}
.week_conditionBox{
  .search_input{
    display:inline-block;width: 160px;
  }
}
.week_bottom{
  height: calc(100% - 42px);padding-top:20px;
  .common-table{ height: calc(100% - 52px); }
  .table-tbodyBox{
    height: calc(100% - 40px);
  }
  .table-td{width:8%}
  .table-td01{width:4%}
  /deep/ .el-scrollbar__wrap{
    overflow-x: hidden;
  }
  .common-table .table-tr{ cursor: default; }
  .common-pagination{margin-top:20px;}
}
</style>

