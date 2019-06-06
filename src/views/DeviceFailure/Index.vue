<template>
<div class="common_bg common_bg02">
  <CommonHead
    :isShowBackBtn="true"
    :isShowCurrentTime="false"
    :titleText="`${companyName}设备故障信息`"
    @backBtnClick="handleBackBtn"
  />
  <ul class="tab">
    <li
      v-for="item in tabList" :key="item.value"
      :class="{'tab_item': true,'active':item.value==currentTab.value}"
      @click="handleClickTab(item)">
      {{item.label}}
    </li>
  </ul>
  <div class="common_main common_blockColor padding20">
    <!-- common_blockColor根据实际需要添加 -->
    <el-row class="deviceFailure_headBox">
      <el-col :span="4" class="deviceFailure_titleBox">
        <span class="device_circle">•</span>
				<span class="device_title">{{currentTab.label}}</span>
				<img class="device_img" src="../../assets/images/DeviceConnect_title.png" />
      </el-col>
      <el-col :span="20" class="common_select deviceFailure_condition" v-if="currentTab.value=='current'">
        <el-select v-model="centerNameValue" placeholder="请选择加工中心">
          <el-option
            v-for="item in centerOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="craftValue" placeholder="请选择工艺类型" class="marginLeft15">
          <el-option
            v-for="item in craftOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div class="marginLeft15 inlineBlock common-btn" @click="searchFun">搜索</div>
      </el-col>
      <el-col :span="20" class="common_select deviceFailure_condition" v-if="currentTab.value=='history'">
        <el-date-picker
          v-model="startDateValue"
          type="date"
          :picker-options="pickerOptionsStart"
          value-format="yyyy-MM-dd"
          :clearable="false"
          placeholder="选择开始日期">
        </el-date-picker>
        <el-date-picker
          class="marginLeft15"
          v-model="endDateValue"
          type="date"
          :picker-options="pickerOptionsEnd"
          value-format="yyyy-MM-dd"
          :clearable="false"
          placeholder="选择结束日期">
        </el-date-picker>
        <el-select v-model="centerNameValue" placeholder="请选择加工中心" class="marginLeft15">
          <el-option
            v-for="item in centerOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="craftValue" placeholder="请选择工艺类型" class="marginLeft15">
          <el-option
            v-for="item in craftOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="machineTypeValue" placeholder="请选择机床类型" class="marginLeft15">
          <el-option
            v-for="item in machineTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
<!--         <el-select v-model="FailureValue" placeholder="请选择" class="marginLeft15">
          <el-option
            v-for="item in FailureOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select> -->
        <div class="marginLeft15 search_input">
          <el-input v-model="machineNo" placeholder="手动输入设备编号" clearable></el-input>
        </div>
        <div class="marginLeft15 search_input">
          <el-input v-model="machineName" placeholder="手动输入设备名称" clearable></el-input>
        </div>
        <div class="marginLeft15 inlineBlock common-btn" @click="searchFun">查询</div>
        <!-- <div class="marginLeft15 inlineBlock common-btn2">导出</div> -->
      </el-col>
    </el-row>
    <!-- 88 -->
			<div class="device_main">
				<div :class="{'common-table device_table': true, 'device_table-current':currentTab.value=='current'}">
				    <div class="table-thead">
							<span class="table-td table-td01">序号</span>
							<span class="table-td table-td02">设备编号</span>
							<span class="table-td table-td03">设备名称</span>
              <span class="table-td table-td04">开始时间</span>
              <span class="table-td table-td05" v-if="currentTab.value=='history'">结束时间</span>
							<!-- <span class="table-td table-td06">故障时间</span> -->
              <span class="table-td table-td07">故障时长</span>
							<span class="table-td table-td08">故障类别</span>
							<span class="table-td table-td09">故障号</span>
							<span class="table-td table-td10">故障信息</span>
						</div>
						<el-scrollbar class="table-tbodyBox" v-if="deviceList.length>0">
							<div class="table-tbody">
								<div
									v-for="(item, index) in deviceList"
                  :key="index"
									class="table-tr"
								>
									<span class="table-td table-td01">{{item.num}}</span>
									<span class="table-td table-td02">{{item.machineNo}}</span>
									<span class="table-td table-td03 ellipsis table-td-red">{{item.machineName}}</span>
                  <span class="table-td table-td04">{{item.beginDate}}</span>
                  <span class="table-td table-td05" v-if="currentTab.value=='history'">{{item.endDate}}</span>
                  <!-- <span class="table-td table-td06">{{item.updateTime}}</span> -->
									<span class="table-td table-td07">{{item.runTime}}</span>
									<span class="table-td table-td08">{{item.almClass}}</span>
									<span class="table-td table-td09">{{item.almCode}}</span>
									<span class="table-td table-td10">{{item.almMsg}}</span>
								</div>
							</div>
						</el-scrollbar>
						<div class="device_empty"  v-else>暂无数据</div>

						<div class="marginTop20 common-pagination" v-if="total>0">
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
    <!-- 88 end -->
  </div>
</div>
</template>
<script>
import moment from 'moment'
import CommonHead from '@/components/Head'
import { reqTypecode,reqCurrentFailureList,reqHistoryFailureList } from '@/api'
export default {
  name: 'DeviceFailure',
  components: {
    CommonHead,
  },
  data() {
    return {
      companyCode: '0301', // 选中的公司code
      companyName: '北京桩机', // 选中的公司name
      tabList: [{ // 顶部tab选项
        label: '实时故障',
        value: 'current'
      },{
        label: '历史故障',
        value: 'history'
      }],
      currentTab: { // 选中的tab
        label: '实时故障',
        value: 'current'
      },
      centerNameValue: '', // 加工中心值
      centerOptions: [], // 加工中心下拉值,
      craftValue: '', // 工艺值
      craftOptions: [], // 工艺下拉值,
      machineTypeValue: '', // 机床类型
      machineTypeOptions: [], // 机床类型下拉值,
/*       FailureValue: '', // 故障值
      FailureOptions: [{ // 故障下拉值
        value: '全部',
        label: '全部'
      },{
        value: '下料',
        label: '下料'
      }], */
      machineNo: '', // 设备编号
      machineName: '', // 设备名称
      deviceList: [], // 故障列表
      pageNum: 1, // 当前页
      pageSize: 20, // 每页多少条
      total: 0, // 总页数
      dateStr: '', // 日期
      startDateValue: moment(new Date()).format('YYYY-MM')+'-01', // 开始日期
      endDateValue: moment(new Date()).format('YYYY-MM-DD'), // 结束日期
      pickerOptionsStart:{
        disabledDate(time) {
            return time.getTime() > Date.now();
        }
      },
      pickerOptionsEnd:{
        disabledDate(time) {
            return time.getTime() > Date.now();
        }
      },
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
      localStorage.setItem('sbhl-OverView-SelectedCompany',JSON.stringify({label:this.companyName,value:this.companyCode}))
    }

    // 获取实时日期
    this.dateStr = moment(new Date()).format('YYYY-MM-DD')

    // 获取工艺类型
    this.getCraftOption();
    // 获取机床类型
    this.getMachineOption();
    // 获取加工中心类型
    this.getCenterOption();
    // 获取实时故障列表
    this.getFailureList()


  },
  methods: {
    // 返回按钮回调
    handleBackBtn() {
      // console.log('back btn clicked!')
      this.$router.push('/OverView');
    },
    // tab点击
    handleClickTab(item) {
      // console.log('current tab is:', item.value)
      this.currentTab = item;

      this.centerNameValue = ''; // 加工中心值
      this.craftValue = ''; // 工艺值
      this.machineTypeValue = ''; // 机床类型
      // this.FailureValue = ''; // 故障值

      this.pageNum = 1;
      this.pageSize = 20;
      this.getFailureList() // 获取数据
    },
    // 搜索
    searchFun() {
      this.pageNum = 1;
      this.pageSize = 20;
      this.getFailureList()
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.getFailureList()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNum = val
      this.getFailureList()
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
    async getFailureList() {
      const currentParamReq = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        query: {
          companyCode: this.companyCode, // 公司编码
          beginDate: this.dateStr, // 时间
          firstGroupCode: this.craftValue, // 工艺类型
          // firstGroupName: "", // 工艺类型name
          // machineName: this.machineName, // 设备名称
          // machineNo: this.machineNo, // 设备编码
          machineStatus: 4, // 设备状态
          // machineTypeCode: this.machineTypeValue, // 机床类型code
          // machineTypeName: "", // 机床类型name
          workCenterCode: this.centerNameValue, // 加工中心code
          // workCenterName: "" // 加工中心name
        }     
      }

      let endTimeValue = '' // 结束时间处理
      const currentDayStr = moment(new Date()).format('YYYY-MM-DD')
      if( new Date(this.endDateValue) < new Date(currentDayStr) ) {
        endTimeValue = this.endDateValue + ' 23:59:59'
      } else {
        endTimeValue = this.endDateValue + ' '+ moment(new Date()).format('HH:mm:ss')
      }


      const historyParamReq = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        query: {
          companyCode: this.companyCode, // 公司编码
          beginDate: this.startDateValue +' 00:00:00', // 开始日期
          endDate: endTimeValue, // 结束日期
          // endDate: this.endDateValue + ' '+ moment(new Date()).format('HH:mm:ss'), // 结束日期
          firstGroupCode: this.craftValue, // 工艺类型
          // firstGroupName: "", // 工艺类型name
          machineName: this.machineName, // 设备名称
          machineNo: this.machineNo, // 设备编码
          machineStatus: 4, // 设备状态
          machineTypeCode: this.machineTypeValue, // 机床类型code
          // machineTypeName: "", // 机床类型name
          workCenterCode: this.centerNameValue, // 加工中心code
          // workCenterName: "" // 加工中心name
        }     
      }
      
      let res = null;
      if(this.currentTab.value === 'history') { // 历史故障
        res = await reqHistoryFailureList(historyParamReq)

      } else {
        res = await reqCurrentFailureList(currentParamReq)
      }
      if(res && res.code === 200) {
        const dataArr = res.data.list;
        this.deviceList = dataArr.map((item, index) => {
          return {
            num: ((this.pageNum - 1) * this.pageSize) + (index + 1), // 序号
            machineNo: item.machineNo, // 设备编号
            machineName: item.machineName, // 设备名称
            beginDate: moment(item.beginDate).format("YYYY-MM-DD HH:mm:ss"), // 故障开始时间
            endDate: moment(item.endDate).format("YYYY-MM-DD HH:mm:ss"), // 故障结束时间
            updateTime: moment(item.updateTime).format("YYYY-MM-DD HH:mm:ss"), // 故障时间updateTime
            // runTime: this.formateSeconds(item.runTime), // 故障时长
            // runTime: this.formateSecondsTime(item.beginDate),
            // 实时故障（当前时间-开始时间）  历史故障（取数据库时间）
            runTime: (this.currentTab.value === 'current')?this.formateSecondsTime(item.beginDate):this.formateSeconds(item.runTime),
            // almClass: item.almClass, // 故障类别almClass
            // almCode: item.almCode, // 故障号almCode
            // almMsg: item.almMsg // 故障信息almMsg            
            almClass: (item.almClass==='-100000.0F')?'--':item.almClass, // 故障类别almClass
            almCode: (item.almCode==='-100000.0F')?'--':item.almCode, // 故障号almCode
            almMsg: (item.almMsg==='-100000.0F')?'--':item.almMsg // 故障信息almMsg
          }
        })
        const {pageNum, pageSize, total } = res.data
        this.pageNum = pageNum
        this.pageSize = pageSize
        this.total = total // 数据有问题
      }
    },
    formateSeconds(Time){ //秒转为时分秒
      // debugger;
      let secondTime = parseInt(Time)//将传入的秒的值转化为Number
      let min = 0// 初始化分
      let h =0// 初始化小时
      let result=''
      if(secondTime>60){//如果秒数大于60，将秒数转换成整数
        min=parseInt(secondTime/60)//获取分钟，除以60取整数，得到整数分钟
        secondTime=parseInt(secondTime%60)//获取秒数，秒数取佘，得到整数秒数
        if(min>60){//如果分钟大于60，将分钟转换成小时
          h=parseInt(min/60)//获取小时，获取分钟除以60，得到整数小时
          min=parseInt(min%60) //获取小时后取佘的分，获取分钟除以60取佘的分
        }
      }
      result=`${h.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}:${secondTime.toString().padStart(2,'0')}`
      return result
    },
    formateSecondsTime(beginDate) {
        let beginTime = moment(beginDate).format("YYYY/MM/DD HH:mm:ss") // 注意IE不识别YYYY-MM-DD形式
        let startTime = new Date(beginTime); // 开始时间
        let endTime = new Date(); // 结束时间
        const secondMi = endTime - startTime; // 毫秒数
        const second = Math.floor((endTime - startTime) / 1000) // 秒数
        // const minutes = Math.floor((endTime - startTime) / 1000 / 60) // 分钟
        // const hour = Math.floor((endTime - startTime) / 1000 / 60 / 60) // 小时
        // const day = Math.floor((endTime - startTime) / 1000 / 60 / 60 / 24) // 天数
        return this.formateSeconds(second)
    }
  }
}
</script>
<style lang="scss" scoped>
.device_empty{
  text-align: center;color: #02c9fc;font-size: 16px;width: 100%;height: 90%;padding-top:16%;
}
.tab {
  overflow: hidden;
  position: absolute;top:75px;left:120px;z-index: 10;
}
.tab_item {
  color: #fff;
  background: #02c9fc;
  float: left;
  width: 130px;height:40px;line-height: 40px;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  background: url(../../assets/images/tab_nav-primary.png);
  background-size: 100% 100%;
}
.tab_item.active {
  background: #4bd813;
  background: url(../../assets/images/tab_nav-selected.png);
  background-size: 100% 100%;
}
.deviceFailure_headBox{

}
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
.device_main{
  height: calc(100% - 42px);
  overflow: hidden;
}
.device_table{
  width: 100%;
  // height:710px;
  // height:calc(100% - 52px);
  height: 100%;
  padding-top: 20px;overflow: hidden;
  .table-tr{cursor: default}
  .table-td-red{ color: #ff0014; }

  .common_table{
    // height:calc(100% - 52px)
  }
}

.table-tbodyBox{
  height: calc(100% - 40px - 55px);
  /deep/ .el-scrollbar__wrap{
    overflow-x: hidden;
    overflow-y: scroll
  }
}
.table-td01{width: 5%;}
.table-td02{width: 10%;}
.table-td03{width: 15%;}
.table-td04{width: 10%;}
.table-td05{width: 15%;}
.table-td06{width: 10%;}
.table-td07{width: 10%;}
.table-td08{width: 10%;}
.table-td09{width: 10%;}
.table-td10{width: 15%;}

.device_table-current{
  .table-td01{width: 5%;}
  .table-td02{width: 10%;}
  .table-td03{width: 15%;}
  .table-td04{width: 10%;}
  .table-td07{width: 15%;}
  .table-td08{width: 15%;}
  .table-td09{width: 15%;}
  .table-td10{width: 15%;}
}
</style>

