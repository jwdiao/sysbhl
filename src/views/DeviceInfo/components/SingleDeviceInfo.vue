<template>
  <div class="singleDevice_box" >

    <div class="singleDevice">
      <div class="singleDevice_closeBtn" @click="closeFun">
        <img src="../../../assets/images/common_close.png" />
      </div>
      <div class="singleDevice_title">{{baseInfo.machineModel}} {{baseInfo.machineName}}</div>
      <div class="singleDevice_info">
        <div class="singleDevice_info-left">  
        <ul>
            <li>
                <label>设备名称</label>
                <span>{{baseInfo.machineName}}</span>
            </li>
            <li>
                <label>设备型号</label>
                <span>{{baseInfo.machineModel}}</span>
            </li>
            <li>
                <label>设备编号</label>
                <span>{{baseInfo.machineNo}}</span>
            </li>
        </ul>
        </div>
        <div class="singleDevice_info-right">
            <ul>
                <li>
                    <label>作业总时长</label>
                    <span>{{baseInfo.runTimeTotal}}</span>
                </li>                
                <li class="paddingLeft15">
                    <label>关机总时长</label>
                    <span>{{baseInfo.offTimeTotal}}</span>
                </li>                
                <li>
                    <label>待机总时长</label>
                    <span>{{baseInfo.idleTimeTotal}}</span>
                </li>                
                <li class="paddingLeft15">
                    <label>离线总时长</label>
                    <span>{{baseInfo.unLineTimeTotal}}</span>
                </li>                
                <li>
                    <label>故障总时长</label>
                    <span>{{baseInfo.failureTimeTotal}}</span>
                </li>              
            </ul>
        </div>
      </div>
      <div class="marginTop20 singleDevice_table">
        <div class="common-table">
          <div class="table-thead">
            <span class="table-td table-td01">序号</span>
            <span class="table-td table-td02">开始时间</span>
            <span class="table-td table-td03">结束时间</span>
            <span class="table-td table-td04">作业状态</span>
            <span class="table-td table-td05">时长</span>
          </div>
          <div class="table-tbody">
            <el-scrollbar class="table-tbodyInner" >
              <div class="table-tr" v-for="(item, index) in listArr" :key="index">
                <span class="table-td table-td01">{{item.num}}</span>
                <span class="table-td table-td02">{{item.beginDate}}</span>
                <span class="table-td table-td03">{{item.endDate}}</span>
                <span class="table-td table-td04">{{item.machineStatusText}}</span>
                <span class="table-td table-td05">{{item.time}}</span>
              </div>
            </el-scrollbar>
          </div>
          <!-- <div class="singleDevice_empty">暂无数据</div> -->
        </div>
      </div>
      <div class="marginTop20 common-pagination" v-if="originArr.length>0">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"  
                :total="originArr.length">
            </el-pagination>
        </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import {
    formatDurationTime
} from '../../../utils/commonFun'
export default {
    name: 'SingleDeviceInfo',
    props: ['show','singledevicedata'],
    watch: {
     show(val){
         this.dialogShow = val
     },  
    },
    data() {
        return {
            dialogShow: this.show,
            pageNum: 1,
            pageSize: 10,
            total: 0,
            originArr: [],
            listArr: [],
            baseInfo: {
                machineModel:'',
                machineName:'',
                machineNo:'',
                runTimeTotal: 0, // 作业总时长
                idleTimeTotal: 0, // 待机总时长
                offTimeTotal: 0, // 关机总时长
                failureTimeTotal: 0, // 故障总时长
                unLineTimeTotal: 0, // 离线总时长                     
            }
        }
    },
    watch: {
        singledevicedata: function (newValue, oldValue) {
            console.log('watch deviceInfoData changed', newValue, oldValue)
            this.getListData(newValue)
        }
    },    
    mounted() {
        // 本页面为前端分页
    },
    methods: {
        getMachineStatusText(num) {
            // 1 作业， 2 待机，3 关机，4 故障, 5 离线
            let text = ''
            if (num === '1') {
                text = '作业'
            } else if (num === '2') {
                text = '待机'
            } else if (num === '3') {
                text = '关机'
            } else if (num === '4') {
                text = '故障'
            } else if (num === '5') {
                text = '离线'
            }
            return text
        },
        getListData(newValue) {
            const arrList = newValue.dataList
            const { machineModel, machineName, machineNo } = newValue
            let runTimeTotal = 0 // 作业总时长
            let idleTimeTotal = 0 // 待机总时长
            let offTimeTotal = 0 // 关机总时长
            let failureTimeTotal = 0 // 故障总时长
            let unLineTimeTotal = 0 // 离线总时长

            this.originArr = arrList.map((item, index) => {
                const num = index+1
                const beginDate = moment(item.beginDate).format('YYYY-MM-DD HH:mm:ss')
                const endDate = moment(item.endDate).format('YYYY-MM-DD HH:mm:ss')
                const machineStatus = item.machineStatus
                const machineStatusText = this.getMachineStatusText(item.machineStatus)
                const time = item.runTime
                if (machineStatus === '1') {
                    runTimeTotal+=time // '作业'
                } else if (machineStatus === '2') {
                    idleTimeTotal += time // '待机'
                } else if (machineStatus === '3') {
                    offTimeTotal += time // '关机'
                } else if (machineStatus === '4') {
                    failureTimeTotal += time // '故障'
                } else if (machineStatus === '5') {
                    unLineTimeTotal += time // '离线'
                }
                return {
                    num,
                    beginDate,
                    endDate,
                    machineStatusText,
                    time: formatDurationTime(item.runTime)
                }
            })
            console.log('runTimeTotal:',runTimeTotal)
            this.baseInfo = {
                machineModel,
                machineName,
                machineNo,
                runTimeTotal: formatDurationTime(runTimeTotal), // 作业总时长
                idleTimeTotal: formatDurationTime(idleTimeTotal), // 待机总时长
                offTimeTotal: formatDurationTime(offTimeTotal), // 关机总时长
                failureTimeTotal: formatDurationTime(failureTimeTotal), // 故障总时长
                unLineTimeTotal: formatDurationTime(unLineTimeTotal), // 离线总时长                     
            }

            var start = 0
            var end = 10
            this.pageSize = 10
            this.pageNum = 0
            this.listArr = this.originArr.slice(start,end)
        },
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.pageSize = val
            this.pageNum = 1
            var start = 0
            var end = 1*val
            this.listArr = this.originArr.slice(start,end)
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.pageNum = val
            var start = (val - 1)*(this.pageSize)
            var end = val*(this.pageSize)
            this.listArr = this.originArr.slice(start,end)
        },
        closeFun() {
            this.dialogShow=false
            this.$emit('closefun',this.dialogShow)
        }        
    }
}
</script>
<style lang="scss" scoped>
//---------------------echarts弹窗 start--------------------
.singleDevice_box{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color:rgba(14,25,43,0.9);
}
.singleDevice_closeBtn{
  position: absolute;
  right: -120px;
  top: -80px;
  cursor: pointer;
}
.singleDevice{
  border:1px solid #435887;
  width: 1550px;
  // height: 780px;
  padding: 0 100px 20px 100px;
  margin:0 auto;
  transform: translate(-50%,-48%);
  left: 50%;
  top: 50%;
  position: absolute;
  background-color:#102446;
  &_title{
    font-size: 25px;
    color:#fff;
    text-align: center;
    margin-top:20px;
    background:#102344;
    height: 33px;
  }
  &_info{
      display: flex;padding-top:20px;height:153px;
      justify-content: space-around;
      label{ font-size: 16px; color:#ffffff; }
      span{ font-size: 24px; color: #00c7fa;padding-left:15px;}
        &-left{
            background-color: #0f2b4e;
            flex: 1;padding-bottom:10px;
            display: flex;justify-content: center;align-items:center;
            ul {
                li {
                    display: flex;align-items:center;padding-top: 10px;

                }
            }            
        }
        &-right{
            background-color: #0f2b4e;
            flex: 2;padding-bottom:10px;
            margin-left: 20px;
            display: flex;justify-content: center;align-items:center;
            ul {
                width: 650px;margin: 0 auto;
                display: flex;flex-wrap:wrap;
                li {
                    width: 50%;display: flex;justify-content: flex-start;align-items:center;padding-top: 10px;
                    span{font-size:20px;}
                }
            }
        }
  }
  &_empty{
    color: #02c9fc;
    font-size: 16px;
    width: 100%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;      
  }
}

.singleDevice_table{
  height: 440px;
  overflow: hidden;
    .common-table{ height: 100%; }
    .table-tbody{ height: calc(100% - 42px); }
    .table-tbodyInner{ height: 100%; }
    .table-td01{ width: 20%; }
    .table-td02{ width: 20%; }
    .table-td03{ width: 20%; }
    .table-td04{ width: 20%; }
    .table-td05{ width: 20%; }
    /deep/ .el-scrollbar__wrap{ overflow-x: hidden }
    .common-table .table-tr{ cursor: default; }
}

//---------------------echarts弹窗 end--------------------
</style>

