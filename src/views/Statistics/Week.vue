<template>
<div class="common_bg common_bg02">
  <CommonHead
    :isShowCurrentTime="false"
    :isShowBackBtn="true"
    :titleText="`${companyName}统计报表`"
    @backBtnClick="handleBackBtn"
  />
  <div class="common_main common_blockColor padding20">
    <div class="week_container">
      <div class="week_top">
        <div class="week_titleBox">
          <span class="circle">•</span>
          <span class="title">
            周报表统计
            <i style="color:#00e7ff">({{weekType==1?'本周':'上周'}})</i>
            </span>
          <img class="img" src="../../assets/images/DeviceConnect_title.png" />
        </div>
        <div class="week_conditionBox">
          <el-select v-model="weekType" placeholder="请选择">
            <el-option
              v-for="item in weekOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="centerNameValue" placeholder="请选择" class="marginLeft15">
            <el-option
              v-for="item in centerOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="craftValue" placeholder="请选择" class="marginLeft15">
            <el-option
              v-for="item in craftOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="marginLeft15 search_input">
            <el-input v-model="machineNo" placeholder="手动输入设备编号" clearable></el-input>
          </div>
          <div class="marginLeft15 search_input">
            <el-input v-model="machineName" placeholder="手动输入设备名称" clearable></el-input>
          </div>
          <div class="marginLeft15 common-btn" @click="searchFun">查询</div>
          <div class="marginLeft15 common-btn2" @click="openExportDialogFun" style="position:relative;padding-left:25px;">
            导出<img src="../../assets/images/common_iconExcel.png" style="position:absolute;top:8px;left:8px;width:16px;" />
          </div>
        </div>
      </div>
      <div class="week_bottom">
        <div class="common-table week_table">
          <el-scrollbar class="xscrollbar">
          <div style="width:3900px;height:100%">
            <div class="table-thead">
              <span class="table-td">序号</span>
              <span class="table-td">设备编号</span>
              <span class="table-td table-td03">设备名称</span>
              <span class="table-td">在线时间</span>
              <span class="table-td">上周在线时间</span>
              <span class="table-td">在线率</span>
              <span class="table-td">上周在线率</span>
              <span class="table-td">在线率上升/下降</span>
              <span class="table-td">开机时间</span>
              <span class="table-td">上周开机时间</span>
              <span class="table-td">开机率</span>
              <span class="table-td">上周开机率</span>
              <span class="table-td">开机率上升/下降</span>
              <span class="table-td">作业时间</span>
              <span class="table-td">上周作业时间</span>
              <span class="table-td">作业率</span>
              <span class="table-td">上周作业率</span>
              <span class="table-td">作业率上升/下降</span>
              <span class="table-td">利用率</span>
              <span class="table-td">上周利用率</span>
              <span class="table-td">利用率上升/下降</span>
              <span class="table-td">故障率</span>
              <span class="table-td">上周故障率</span>
              <span class="table-td">故障率上升/下降</span>
              <span class="table-td">计划完成率</span>
              <span class="table-td table-td20">上周计划完成率</span>
              <span class="table-td table-td20">计划完成率上升/下降</span>
            </div>
            <div class="table-tbodyBox">
              <el-scrollbar class="table-tbody">
              <div class="table-tr" v-for="(item,index) in deviceList" :key="index">
                <span class="table-td">{{item.num}}</span>
                <span class="table-td">{{item.machineNo}}</span>
                <span class="table-td">{{item.machineName}}</span>
                <span class="table-td">{{item.onLineTime | secondsToHour}}h</span> <!-- 在线时间 -->
                <span class="table-td">{{item.prevOnLineTime | secondsToHour}}h</span> <!-- 上周在线时间 -->
                <span class="table-td">{{item.onLineRate | toPercent}}%</span> <!-- 在线率 -->
                <span class="table-td">{{item.prevOnLineRate | toPercent}}%</span> <!-- 上周在线率 -->
                <span class="table-td">
                  {{item.ringRatioOnLineRate | toPercent}}%
                  <img v-if="parseFloat(item.ringRatioOnLineRate)>=0" src="../../assets/images/common_upArrow.png" style="height: 14px;" />
                  <img v-else src="../../assets/images/common_downArrow.png" style="height: 14px;" />
                </span> <!-- 同比在线率 -->
                <span class="table-td">{{item.bootTime | secondsToHour}}h</span><!-- 开机时间 -->
                <span class="table-td">{{item.prevBootTime | secondsToHour}}h</span><!-- 上周开机时间 -->
                <span class="table-td">{{item.bootRate | toPercent}}%</span><!-- 开机率 -->
                <span class="table-td">{{item.prevBootRate | toPercent}}%</span><!-- 上周开机率 -->
                <span class="table-td">
                  {{item.ringRatioBootRate | toPercent}}%
                  <img v-if="parseFloat(item.ringRatioBootRate)>=0" src="../../assets/images/common_upArrow.png" style="height: 14px;" />
                  <img v-else src="../../assets/images/common_downArrow.png" style="height: 14px;" />
                </span><!-- 同比开机率 -->
                <span class="table-td">{{item.startupTime | secondsToHour}}h</span><!-- 作业时间 -->
                <span class="table-td">{{item.prevStartupTime | secondsToHour}}s</span><!-- 上周作业时间 -->
                <span class="table-td">{{item.startupRate | toPercent}}%</span><!-- 作业率 -->
                <span class="table-td">{{item.prevStartupRate | toPercent}}%</span><!-- 上周作业率 -->
                <span class="table-td">
                  {{item.ringRatioStartupRate | toPercent}}%
                  <img v-if="parseFloat(item.ringRatioStartupRate)>=0" src="../../assets/images/common_upArrow.png" style="height: 14px;" />
                  <img v-else src="../../assets/images/common_downArrow.png" style="height: 14px;" />
                </span><!-- 同比作业率 -->
                <span class="table-td">{{item.utilizationRate | toPercent}}%</span><!-- 利用率 -->
                <span class="table-td">{{item.prevUtilizationRate | toPercent}}%</span><!-- 上周利用率 -->
                <span class="table-td">
                  {{item.ringRatioUtilizationRate | toPercent}}%
                  <img v-if="parseFloat(item.ringRatioUtilizationRate)>=0" src="../../assets/images/common_upArrow.png" style="height: 14px;" />
                  <img v-else src="../../assets/images/common_downArrow.png" style="height: 14px;" />
                </span><!-- 同比利用率 -->
                <span class="table-td">{{item.failureRate | toPercent}}%</span><!-- 故障率 -->
                <span class="table-td">{{item.prevFailureRate | toPercent}}%</span><!-- 上周故障率 -->
                <span class="table-td">
                  {{item.ringRatioFailureRate | toPercent}}%
                  <img v-if="parseFloat(item.ringRatioFailureRate)>=0" src="../../assets/images/common_upArrow.png" style="height: 14px;" />
                  <img v-else src="../../assets/images/common_downArrow.png" style="height: 14px;" />
                </span><!-- 同比故障率 -->
                <span class="table-td">{{item.planCompletionRate | toPercent}}%</span><!-- 计划完成率 -->
                <span class="table-td table-td20">{{item.prevPlanCompletionRate | toPercent}}%</span><!-- 上周计划完成率 -->
                <span class="table-td table-td20">
                  {{item.ringRatioPlanCompletionRate | toPercent}}%
                  <img v-if="parseFloat(item.ringRatioPlanCompletionRate)>=0" src="../../assets/images/common_upArrow.png" style="height: 14px;" />
                  <img v-else src="../../assets/images/common_downArrow.png" style="height: 14px;" />
                </span><!-- 同比计划完成率 -->
              </div>
              </el-scrollbar> 
            </div>
          </div>
          </el-scrollbar>
        </div>
        <div class="common-pagination">
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

  <div class="week_exportBox" v-if="showExportDialog==true">
    <div class="week_export">
      <div class="titleBox">
        <div class="title">选择导出项目</div>
        <img class="closeImg" src="../../assets/images/common_close.png" @click="showExportDialog = false" />
      </div>
      <div class="content">
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox :indeterminate="false" v-for="city in cities" :label="city.value" :key="city.value">{{city.label}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="btnBox">
        <span class="common-btn" @click="exportExcelFun">导出</span>
        <span class="common-btn marginLeft15 plain" @click="cancleCheckedFun">取消</span>
        <span class="common-btn marginLeft15 plain" @click="reverseCheckedFun">反选</span>
        <span class="common-btn marginLeft15 plain" @click="handleCheckAllChange">全选</span>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import _ from 'lodash'
import CommonHead from '@/components/Head'
import { reqTypecode, reqReportRateFind, reqReportRateExportExcel } from '@/api'
export default {
  name: 'Week',
  components: {
    CommonHead,
  },
  data() {
    return {
      companyCode: '0701', // 选中的公司code
      companyName: '三一德力佳', // 选中的公司name
      weekOptions: [ // 周值option
        {
          value: 2,
          label: '上周'
        },
        {
          value: 1,
          label: '本周'
        },
      ],
      weekType: 2, // 周值
      centerNameValue: '', // 加工中心值
      centerOptions: [], // 加工中心下拉值,
      craftValue: '', // 工艺值
      craftOptions: [], // 工艺下拉值,
      machineNo: '', // 设备编号
      machineName: '', // 设备名称
      pageNum: 1, // 当前页
      pageSize: 20, // 每页多少条
      total: 0, // 总页数
      deviceList: [], // 设备列表
      cities: [
        /* {label: '在线时间', value: 'onLineTime'},
        {label: '上周在线时间', value: 'prevOnLineTime'},

        {label: '在线率', value: 'onLineRate'},
        {label: '上周在线率', value: 'prevOnLineRate'},
        {label: '同比在线率', value: 'ringRatioOnLineRate'},

        {label: '开机时间', value: 'bootTime'},
        {label: '上周开机时间', value: 'prevBootTime'},

        {label: '开机率', value: 'bootRate'},
        {label: '上周开机率', value: 'prevBootRate'},
        {label: '同比开机率', value: 'ringRatioBootRate'},

        {label: '作业时间', value: 'startupTime'},
        {label: '上周作业时间', value: 'prevStartupTime'},
        {label: '作业率', value: 'startupRate'},
        {label: '上周作业率', value: 'prevStartupRate'},
        {label: '同比作业率', value: 'ringRatioStartupRate'},

        {label: '利用率', value: 'utilizationRate'},
        {label: '上周利用率', value: 'prevUtilizationRate'},
        {label: '同比利用率', value: 'ringRatioUtilizationRate'},

        {label: '故障率', value: 'failureRate'},
        {label: '上周故障率', value: 'prevFailureRate'},
        {label: '同比故障率', value: 'ringRatioFailureRate'},

        {label: '计划完成率', value: 'planCompletionRate'},
        {label: '上周计划完成率', value: 'prevPlanCompletionRate'},
        {label: '同比计划完成率', value: 'ringRatioPlanCompletionRate'}, */
      ],
      checkedCities: [], // 选中的选项
      showExportDialog: false
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
    const sbhlSelectedCompanyStr = localStorage.getItem('sbhl-OverView-SelectedCompany')
    if(sbhlSelectedCompanyStr && sbhlSelectedCompanyStr!==undefined){
      const sbhlSelectedCompanyObj = JSON.parse(sbhlSelectedCompanyStr)
      this.companyCode = sbhlSelectedCompanyObj.value; // 公司编码
      this.companyName = sbhlSelectedCompanyObj.label // 公司名字
    } else {
      // localStorage.setItem('sbhl-OverView-SelectedCompany',JSON.stringify({label:this.companyName,value:this.companyCode}))
    }

    // 获取工艺类型
    this.getCraftOption();
    // 获取加工中心类型
    this.getCenterOption();
    // 获取checkbox
    this.getCheckboxFun()

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
   // 获取checkbox下拉
    async getCheckboxFun() {
      const res = await reqTypecode(this.companyCode, '04')
      if (res && res.code === 200) {
        const resList = res.data
        this.cities = resList.map(item => {
          return {
            label: item.codeName,
            value: item.codeCode
          }
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
          "excelShettArr": [],
          "firstGroupCode": this.craftValue, // 工艺
          // "firstGroupName": "",
          "machineName": this.machineName, // 设备名称
          "machineNo": this.machineNo, // 设备编号
          "weekType": this.weekType, // 周类型
          "workCenterCode": this.centerNameValue, // 加工中心code
          // "workCenterName": ""
        }
      }
      const res = await reqReportRateFind(params);
      if (res && res.code === 200) {
        // this.deviceList = res.data.list;
        this.deviceList = res.data.list.map((item, index) => {
          return {
            ...item,
            num: ((this.pageNum - 1) * this.pageSize) + (index + 1)
          }
        })
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
      this.pageSize = 20;
      this.getListFun()
    },
    openExportDialogFun() {
      this.checkedCities = this.cities.map(item => {
        return item.value
      })
      this.showExportDialog=true
    },
    // 全选
    handleCheckAllChange() {
      this.checkedCities = this.cities.map(item => {
        return item.value
      })
      console.log('全选：',this.checkedCities)
    },
    // 反选
    reverseCheckedFun() {
      // 如果所有都选中（将取消选中所有）
      if (this.checkedCities.length === this.cities.length) {
        this.checkedCities = []
      } else if (this.checkedCities.length==0) { // 没有一个选中的，将所有选项都选中
        this.checkedCities = this.cities.map(item => {
          return item.value
        })
      } else { // 如果有选中的（选中相反的）
        const citiesValArr = this.cities.map(item => {
          return item.value
        })
        const selectedArr = this.checkedCities;
        // console.log(_.pullAll(citiesValArr, selectedArr));
        this.checkedCities = _.pullAll(citiesValArr, selectedArr)
      }
    },
    // 取消
    cancleCheckedFun() {
      if (this.checkedCities.length) {
        this.checkedCities = []
      }
    },
    // checkbox选择回调(暂时没用)
    handleCheckedCitiesChange(value) {
      // console.log('选中：',this.checkedCities)
    },
    // 导出excel
    async exportExcelFun() {
      if (this.checkedCities.length) {
        // 导出
        const params = {
          "pageNum": 0,
          "pageSize": 0,
          "query": {
            "companyCode": this.companyCode,
            "excelShettArr": this.checkedCities,
            "firstGroupCode": this.craftValue, // 工艺
            // "firstGroupName": "",
            "machineName": this.machineName, // 设备名称
            "machineNo": this.machineNo, // 设备编号
            "weekType": this.weekType, // 周类型
            "workCenterCode": this.centerNameValue, // 加工中心code
            // "workCenterName": ""
          }
        }
        reqReportRateExportExcel(params).then(res => {
          const blob = new Blob([res.data],{type: "application/vnd.ms-excel"}); // type不写也行
          const fileText = this.weekType == 2 ? '上周统计报表': '本周统计报表';
          const fileName = this.companyName + fileText + '.xlsx'; // 文件名称
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
        // console.log(this.checkedCities)
      } else {
        this.$message.error('至少选择一个选项！');
      }
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
  height: calc(100% - 42px);
  .common-pagination{margin-top:20px;}
}
.week_table{
  margin-top:20px;
  width: 100%;
  height: calc(100% - 32px - 40px);
  overflow-y: hidden;
  .week_tableInner{
    height: 100%;
  }
  .table-tr{
    cursor: default;
  }
  .table-td{
    width: 140px;
  }
  .table-td20{
    width: 180px;
  }
  .xscrollbar{
    height: 100%;
    /deep/ .el-scrollbar__wrap{
      overflow-x: hidden;
      overflow-y: hidden;
      height: 100%;
    }
    /deep/ .el-scrollbar__view{
      height: 100%;
    }
    /deep/ .el-scrollbar__bar.is-horizontal{
      height: 14px;
      background: #234176;
    }
    /deep/ .el-scrollbar__bar.is-horizontal>div {
        background: #2069ea;
    }
    /deep/ .el-scrollbar__bar{
      opacity: 1;
      bottom: 0;
    }
    .table-tbody /deep/ .el-scrollbar__bar.is-horizontal{
      // overflow-x: hidden;
      opacity: 0;
    }

  }
  .table-tbodyBox{
    height: calc(100% - 40px);
    overflow-y:scroll;
  }
  .table-tbody{
    padding-top:20px;
    padding-bottom: 30px;
    font-size:16px;
    color:#02c9fc;
    /deep/ .el-scrollbar__wrap{
      overflow-x: hidden;
      overflow-y: scroll
    }
  }
}
/* 
.week_table .xscrollbar .el-scrollbar__bar.is-horizontal>div .el-scrollbar__thumb{
  opacity: 1;
} */

.week_exportBox{
  position: fixed;
  top: 185px;
  right: 35px;
  width: 560px;
  background-color: rgba(9, 20, 40, 0.8);
  border:1px solid #69b7d2;
}
.week_export{
  .titleBox{
    position: relative;border-bottom:1px solid #112e64;padding-top:20px;padding-bottom:20px;
    .title{ color:#52dff9;font-size: 24px;text-align: center; }
    .closeImg{
      width: 50px;cursor: pointer;
      position: absolute;right: 10px;top: 10px;
    }
  }
  .content{
    height: 420px;padding-top:35px;
    padding-left: 20px;
    padding-right: 20px;
    // border:1px solid red;
  }
  .btnBox{
    text-align: center;
    padding-top:20px;
    padding-bottom: 20px;
  }
  /deep/ .el-checkbox{
    width: 33.33%;
    box-sizing: border-box;
    margin-bottom: 30px;
    margin-right: 0;
    color: #fff;
    // padding-left:20px;
  }
  /deep/ .el-checkbox__label{
    font-size: 16px;
  }
  /deep/ .el-checkbox__inner{
    background-color: transparent;
  }
  /deep/ .el-checkbox__inner::after{
    border-color: #409EFF
  }
  /deep/ .el-checkbox__input.is-checked+.el-checkbox__label{
    color: #fff;
  }
  /deep/ .el-checkbox__input.is-focus .el-checkbox__inner{
    border-color:#fff;
  }
  /deep/ .el-checkbox__input.is-checked .el-checkbox__inner{
    border-color: #409EFF !important;
  }
}
</style>

