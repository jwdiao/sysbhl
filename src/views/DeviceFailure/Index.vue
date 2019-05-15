<template>
<div class="common_bg common_bg02">
  <CommonHead
    :isShowBackBtn="true"
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
        <el-select v-model="centerNameValue" placeholder="请选择">
          <el-option
            v-for="item in centerOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="craftValue" placeholder="请选择" class="marginLeft15">
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
        <el-select v-model="centerNameValue" placeholder="请选择">
          <el-option
            v-for="item in centerOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="craftValue" placeholder="请选择" class="marginLeft15">
          <el-option
            v-for="item in craftOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="machineTypeValue" placeholder="请选择" class="marginLeft15">
          <el-option
            v-for="item in machineTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="FailureValue" placeholder="请选择" class="marginLeft15">
          <el-option
            v-for="item in FailureOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div class="marginLeft15 search_input">
          <el-input v-model="machineNo" placeholder="手动输入设备编号"></el-input>
        </div>
        <div class="marginLeft15 search_input">
          <el-input v-model="machineName" placeholder="手动输入设备名称"></el-input>
        </div>
        <div class="marginLeft15 inlineBlock common-btn">查询</div>
        <div class="marginLeft15 inlineBlock common-btn2">导出</div>
      </el-col>
    </el-row>
    <!-- 88 -->
			<div class="device_main">
				<div class="common_table device_table">
          <div class="table_thead">
            <span class="table_td">序号</span>
            <span class="table_td">设备编号</span>
            <span class="table_td">设备名称</span>
            <span class="table_td">故障时间</span>
            <span class="table_td">故障类别</span>
            <span class="table_td">故障号</span>
            <span class="table_td">故障信息</span>
          </div>
          <div class="table_tbody">
            <el-scrollbar class="table_tbodyInner">
              <div class="table_tr" v-for="item in 20">
                <span class="table_td">1</span>
                <span class="table_td">sany00123456</span>
                <span class="table_td">机加加工中心</span>
                <span class="table_td">2019-05-28 15:34:00</span>
                <span class="table_td">3</span>
                <span class="table_td">125</span>
                <span class="table_td">ADDRESS NOT FOUND</span>
              </div>
            </el-scrollbar>
          </div>
				    <!-- <div class="table-thead">
							<span class="table-td table-td01">序号</span>
							<span class="table-td table-td02">设备编号</span>
							<span class="table-td table-td03">设备名称</span>
							<span class="table-td table-td04">故障时间</span>
							<span class="table-td table-td05">故障类别</span>
							<span class="table-td table-td06">故障号</span>
							<span class="table-td table-td07">故障信息</span>
						</div>
						<el-scrollbar class="table-tbodyBox" v-if="deviceList.length>0">
							<div class="table-tbody">
								<div
									v-for="(item, index) in 30"
                  :key="index"
									class="table-tr"
								>
									<span class="table-td table-td01">1</span>
									<span class="table-td table-td02">sany00123456</span>
									<span class="table-td table-td03 ellipsis" style="color:#ff0014">机加加工中心</span>

									<span class="table-td table-td04">2019-05-28 15:34:00</span>
									<span class="table-td table-td05">3</span>
									<span class="table-td table-td06">125</span>
									<span class="table-td table-td07">ADDRESS NOT FOUND</span>
								</div>
							</div>
						</el-scrollbar> -->
						<!-- <div class="device_empty"  v-if="deviceList.length<=0">暂无数据</div> -->

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
    <!-- 88 end -->
  </div>
</div>
</template>
<script>
import CommonHead from '@/components/Head'
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
      centerOptions: [{ // 加工中心下拉值
        value: '全部',
        label: '全部'
      },{
        value: '机加加工中心',
        label: '机加加工中心'
      },{
        value: '调试加工中心',
        label: '调试加工中心'
      }],
      craftValue: '', // 工艺值
      craftOptions: [{ // 工艺下拉值
        value: '全部',
        label: '全部'
      },{
        value: '下料',
        label: '下料'
      }],
      machineTypeValue: '', // 机床类型
      machineTypeOptions: [{ // 机床类型下拉值
        value: '全部',
        label: '全部'
      },{
        value: '下料',
        label: '下料'
      }],
      FailureValue: '', // 故障值
      FailureOptions: [{ // 故障下拉值
        value: '全部',
        label: '全部'
      },{
        value: '下料',
        label: '下料'
      }],
      machineNo: '', // 设备编号
      machineName: '', // 设备名称
      deviceList: [], // 故障列表
      pageNum: 1, // 当前页
      pageSize: 20, // 每页多少条
      total: 0 // 总页数
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
  },
  methods: {
    // 返回按钮回调
    handleBackBtn() {
      console.log('back btn clicked!')
      this.$router.push('/OverView');
    },
    // tab点击
    handleClickTab(item) {
      console.log('current tab is:', item.value)
      this.currentTab = item;
    },
    // 搜索
    searchFun() {

    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val
      // this.getDeviceListFun()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNum = val
      // this.getDeviceListFun()
    },
    getFailureList() {
      const params = {
        centerNameValue: this.centerNameValue, // 加工中心
        craftValue: this.craftValue, // 工艺
        machineTypeValue: this.machineTypeValue, // 机床类型
        FailureValue: this.FailureValue, // 故障值
        machineNo: this.machineNo, // 设备编号
        machineName: this.machineName, // 设备名称

      }
    }
  }
}
</script>
<style lang="scss" scoped>
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
    display:inline-block;width: 150px;
  }
}
.device_main{
  height: calc(100% - 42px);
  // overflow: hidden;
}
.device_table{
  width: 100%;
  height:100%;
  padding-top: 20px;
}
.table_tbodyInner{
  // height:500px;
  height: calc(100% - 40px)

}
// .table-thead{
//   background-color:#2a4b85;
//   font-size: 18px;color:#53e3fd;
//   padding: 8px 0;
//   font-weight: bold;
// }
.table-tbodyBox{
  height: calc(100% - 40px - 55px);
  /deep/ .el-scrollbar__wrap{
    overflow-x: hidden;
    overflow-y: scroll
  }
}
// .table-tbody{
//   padding-top:23px;
//   font-size:16px;
//   color:#02c9fc;
// }
// .table-tr{
//   margin-bottom:15px;
//   background-color:rgba(42,75,133,0.3);
//   padding:5px 0;
//   cursor: pointer;
// }
// .table-td{
//   display: inline-block;text-align: center;
// }
.table-td01{width: 10%;}
.table-td02{width: 15%;}
.table-td03{width: 20%;}
.table-td04{width: 15%;}
.table-td05{width: 10%;}
.table-td06{width: 15%;}
.table-td07{width: 15%;}

</style>

