<template>
<div class="device-list" >
  <img src="../../../assets/images/icon_allScreen.png"
  @click="handleEnterFullScreen"
  style="position:absolute;right:-8px;top:0;z-index:2;cursor:pointer" />  
  <el-scrollbar  style="height:90%">
    <div style="width:1520px;height:100%">
      <div class="table-thead">
        <span class="table-td table-td01">序号</span>
        <span class="table-td table-td02">设备编号</span>
        <span class="table-td table-td03">设备名称</span>
        <span class="table-td table-td04">状态</span>
        <!-- <span class="table-td table-td05">操作模式</span> -->
        <span class="table-td table-td06">主轴转速(rpm)</span>
        <span class="table-td table-td07">进给倍率(%)</span>
        <span class="table-td table-td08">日开机时间(h)</span>
        <span class="table-td table-td09">日作业时间(h)</span>
        <span class="table-td table-td10">利用率</span>
      </div>
      <el-scrollbar class="table-tbodyBox">
        <div class="table-tbody">
          <div
            v-for="(item, index) in deviceList"
            :key="index"
            class="table-tr"
            @click="handleClickItem(item)"
          >
            <span class="table-td table-td01" style="color:rgb(255, 240, 62)">{{item.num}}</span>
            <span class="table-td table-td02">{{item.machineNo}}</span>
            <span class="table-td table-td03 ellipsis">{{item.machineName}}</span>

            <span class="table-td table-td04" v-if="item.machineStatus=='01'" style="color:#42cb84;"><i>运行</i></span>
            <span class="table-td table-td04" v-if="item.machineStatus=='02'" style="color:#ffc31f;"><i>待机</i></span>
            <span class="table-td table-td04" v-if="item.machineStatus=='03'" style="color:#929393;"><i>关机</i></span>
            <span class="table-td table-td04" v-if="item.machineStatus=='04'" style="color:#ff0014;"><i>故障</i></span>
            <!-- 01:运行；02：待机；03：关机；04：故障 -->


            <!-- <span class="table-td table-td05">{{item.operMode}}</span> -->
            <span class="table-td table-td06">{{item.actSpin==='-100000.0F'?0:item.actSpin}}</span>
            <span class="table-td table-td07">{{item.actFeed==='-100000.0F'?0:item.actFeed}}</span>
            <span class="table-td table-td08">{{item.standbyTime}}</span>
            <span class="table-td table-td09">{{item.startupTime}}</span>
            <span class="table-td table-td10">{{item.liyongLv}}</span>
          </div>
        </div>
      </el-scrollbar>

    </div>
  </el-scrollbar>

  <div class="marginTop20 common-pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[15, 20, 25, 30]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>

  <!-- 查看全屏 -->
  <DeviceListScreen :isshowallscreen="showFullScreen" @isshowcallback="handleisshowCallback" />
  <!-- 查看全屏 -->
</div>
</template>
<script>
import moment from 'moment'
import {
  reqSelectMachineByMachineStatus
} from '@/api'
import DeviceListScreen from '../DeviceListScreen.vue'
export default {
  name: 'DeviceList',
  components: {
    DeviceListScreen
  },
  data() {
    return {
      currentDate: '', // 当前日期
      showFullScreen: false, // 是否全屏显示
      companyCode: '', // 子公司码
      statusValue: '', // 设备状态
      deviceList: [], // 设备列表
      pageNum: 1, // 当前页
      pageSize: 15, // 每页多少条
      total: 0 // 总条数
    }
  },
  computed: {
    companyCodeStr() {
      return this.$store.state.sbhlOverViewSelectedCompany;
    }
  },
  watch: {
    companyCodeStr(val) {
      this.getSelectMachineByMachineStatus()
    }
  },
  mounted() {
    this.currentDate = moment(new Date()).format('YYYY-MM-DD');
    this.getSelectMachineByMachineStatus()
  },
  methods: {
    handleEnterFullScreen() {
      // $router.push('/DeviceListScreen')
      this.showFullScreen = true
    },
    handleisshowCallback(val) {
      this.showFullScreen = val
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getSelectMachineByMachineStatus()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getSelectMachineByMachineStatus()
    },
    async getSelectMachineByMachineStatus() {
      this.companyCode = JSON.parse(this.companyCodeStr).value;
      this.deviceList = []
      const res = await reqSelectMachineByMachineStatus(this.statusValue,this.pageNum,this.pageSize,this.companyCode, this.currentDate)
      if(res && res.code === 200 && res.data && res.data.list.length){
          const deviceList = res.data.list
          deviceList.map((item, index) => {
            const startupTime = item.startupTime == null ? 0 : parseFloat((item.startupTime/3600).toFixed(2)) // 作业时间
            const standbyTime = item.standbyTime == null ? 0 : parseFloat((item.standbyTime/3600).toFixed(2)) // 空闲时间（待机时间）
            const naturalTime = item.naturalTime == null ? 0 : parseFloat(item.naturalTime/3600) // 自然时间

            let kaijiTime = startupTime + standbyTime; // 开机时间（作业时间+空闲时间）
            // let kaijiLv = kaijiTime / naturalTime; // 开机率（开机时间/自然时间）
            // let zuoyeLv = startupTime / kaijiTime; // 作业率（作业时间/开机时间）
            // let liyongLv = kaijiLv / zuoyeLv; // 利用率（开机率/作业率）

            let kaijiLv = 0; // 开机率（开机时间/自然时间）
            if (kaijiTime == 0) {
              kaijiLv = 0;
            } else {
              kaijiLv = (kaijiTime / naturalTime*100).toFixed(2); // 开机率（开机时间/自然时间）
            }

            let zuoyeLv = 0; // 作业率（作业时间/开机时间）
            if (startupTime == 0) {
              zuoyeLv = 0;  
            } else {
              zuoyeLv = (startupTime / kaijiTime*100).toFixed(2) // 作业率（作业时间/开机时间）
            }   

            // 利用率
            let liyongLv = 0
            if (kaijiLv == 0) {
              liyongLv = 0
            } else {
              // debugger;
              liyongLv = ((kaijiLv/100 * zuoyeLv/100)*100).toFixed(2) // 利用率（开机率/作业率）
            }
            let obj = {
              ...item,
              startupTime, // 日作业时间
              standbyTime, // 日开机时间
              liyongLv,              
              num: ((this.pageNum - 1) * this.pageSize) + (index + 1)
            }
            this.deviceList.push(obj)
          })
          
					this.pageNum = res.data.pageNum
					this.pageSize = res.data.pageSize
					this.total = res.data.total
			}
    },
    handleClickItem(item) {
      localStorage.setItem('deviceID',JSON.stringify(item))
      this.$router.push('/DeviceConnect');
    }
  }
}
</script>
<style lang="scss" scoped>
.device-list{
  width:100%;
  height:100%;
  padding:0 20px;
  position: relative;
  /deep/ .el-scrollbar__bar{
    height:15px;
  }
}
/deep/ .el-scrollbar__wrap{
  height:100%;
  overflow:hidden
}
/deep/ .el-scrollbar__view{height:100%}
.table-thead{
  background-color:#2a4b85;
  font-size: 18px;color:#fff;
  padding:8px 0;
  font-weight: bold;
}
.table-tbodyBox{
  height: calc(100% - 40px);
  /deep/ .el-scrollbar__wrap{
    overflow-x: hidden;
    overflow-y: scroll
  }
}
.table-tbody{
  padding-top:20px;
  font-size:16px;
  color:#02c9fc;
}
.table-tr{
  margin-bottom:2px;
  background-color:#1b3461;
  padding:5px 0;
  cursor: pointer;
}
.table-td{
  display: inline-block;text-align: center;
}
.table-td01{width: 100px;}
.table-td02{width: 150px;}
.table-td03{width: 200px;}
.table-td04{width: 100px;}
.table-td05{width: 180px;}
.table-td06{width: 180px;}
.table-td07{width: 180px;}
.table-td08{width: 180px;}
.table-td09{width: 170px;}
.table-td10{width: 160px;}
</style>

