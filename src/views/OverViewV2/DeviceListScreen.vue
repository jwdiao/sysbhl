<template>
	<div class="device" v-if="showFlag">
		<div class="device_head">
			<div class="leftInfo" @click="handleCloseAllScreen" style="cursor:pointer"><img src="../../assets/images/common_back.png"></div>
			<div class="title">{{getCompanyCodeObjByStr($store.state.sbhlOverViewSelectedCompany).label}}设备数据系统</div>
			<div class="rightInfo"></div>
		</div>
		<div class="device_mainWrap">
			<div class="device_titleBox">
				<span class="device_circle">•</span>
				<span class="device_title">设备列表</span>
				<img class="device_img" src="../../assets/images/DeviceConnect_title.png" />

				<div class="deviceCondition">
					<el-select
						v-model="statusValue"
						placeholder="请选择"
						size="small"
						class="common_select"
						@change="deviceStatusChangeFun"
						>
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
					<el-button type="primary" size="small" class="marginLeft15" @click="searchFun">搜索</el-button>
				</div>
			</div>

			<div class="device_main">
				<div class="device_table">
				    <div class="table-thead">
							<span class="table-td table-td01">序号</span>
							<span class="table-td table-td02">设备编号</span>
							<span class="table-td table-td03">设备名称</span>
							<span class="table-td table-td04">状态</span>
							<span class="table-td table-td05">开机小时数</span>
							<span class="table-td table-td06">作业小时数</span>
							<span class="table-td table-td07">待机小时数</span>
							<span class="table-td table-td08">开机率</span>
							<span class="table-td table-td09">作业率</span>
							<span class="table-td table-td10">利用率</span>
							<span class="table-td table-td11">故障率</span>
							<span class="table-td table-td12">完成工件数</span>
							<span class="table-td table-td13">计划完成率</span>
							<span class="table-td table-td14">总耗电量(kw.h)</span>
							<!-- <span class="table-td table-td06">主轴转速(rpm)</span> -->
							<!-- <span class="table-td table-td07">进给倍率(%)</span> -->
							<!-- <span class="table-td table-td08">日待机时间(h)</span> -->
							<!-- <span class="table-td table-td09">日作业时间(h)</span> -->
							<!-- <span class="table-td table-td10">利用率</span> -->
						</div>
						<el-scrollbar class="table-tbodyBox" v-if="deviceList.length>0">
							<div class="table-tbody">
								<div
									v-for="(item) in deviceList"
									@click="handleClickItem(item)"
									:key="item.id"
									class="table-tr"
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
									<!-- <span class="table-td table-td06">{{item.actSpin==='-100000.0F'?0:item.actSpin}}</span> -->
									<!-- <span class="table-td table-td07">{{item.actFeed==='-100000.0F'?0:item.actFeed}}</span> -->
									<!-- <span class="table-td table-td08">{{item.standbyTime}}</span> -->
									<!-- <span class="table-td table-td09">{{item.startupTime}}</span> -->
									<!-- <span class="table-td table-td10">{{item.liyongLv}}</span> -->
									<span class="table-td table-td05">{{item.startUpHour}}</span>
									<span class="table-td table-td06">{{item.runTimeHour}}</span>
									<span class="table-td table-td07">{{item.idleTimeHour}}</span>
									<span class="table-td table-td08">{{item.bootRate}}%</span>
									<span class="table-td table-td09">{{item.workRate}}%</span>
									<span class="table-td table-td10">{{item.liyongLv}}%</span>
									<span class="table-td table-td11">{{item.alarmRate}}%</span>
									<span class="table-td table-td12">{{item.overProcedureNum}}</span>
									<span class="table-td table-td13">{{item.planFinishRate}}%</span>
									<span class="table-td table-td14">{{item.elcPower}}</span>
								</div>
							</div>
						</el-scrollbar>
						<div class="device_empty"  v-if="deviceList.length<=0">暂无数据</div>

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
import {
  reqSelectMachineByMachineStatus
} from '@/api'

	export default {
		name: 'DeviceListScreen',
		components: {
		},
		props: ['isshowallscreen'],
		watch: {
			isshowallscreen(val) {
				this.showFlag = val
			},
			companyCodeStr(val) {
				this.getDeviceListFun()
			}
		},
		data() {
			return {
				currentDate: '', // 当前日期
				showFlag: this.isshowallscreen,
				options: [{
          value: '',
          label: '全部'
        }, {
          value: '01',
          label: '运行'
        }, {
          value: '02',
          label: '待机'
        }, {
          value: '03',
          label: '关机'
        }, {
          value: '04',
          label: '故障'
        }],
				statusValue: '', // 设备状态值
				statusValueSelect: '', // 下拉设备状态值，并未搜索
				deviceList: [], // 设备列表
				pageNum: 1, // 当前页
				pageSize: 20, // 每页多少条
				total: 0 // 总条数
			}
		},
		computed: {
			companyCodeStr() {
				return this.$store.state.sbhlOverViewSelectedCompany;
			}
		},
		mounted() {
			this.currentDate = moment(new Date()).format('YYYY-MM-DD');
			this.getDeviceListFun()

		},
		methods: {
			getCompanyCodeObjByStr(str) {
				if(str){
					return JSON.parse(str)
				} else {
					return ''
				}
      },
			handleCloseAllScreen() {
				this.showFlag = false
				this.$emit('isshowcallback',this.showFlag)
			},
			async getDeviceListFun() {
				this.companyCode = JSON.parse(this.companyCodeStr).value;
				this.deviceList = []
				const res = await reqSelectMachineByMachineStatus(this.statusValue,this.pageNum,this.pageSize,	this.companyCode, this.currentDate)
				if(res && res.code === 200 && res.data && res.data.list.length){
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

						const deviceList = res.data.list
						deviceList.map((item, index) => {
							
							const runTimeHour = item.startupTime == null ? 0 : parseFloat((item.startupTime/3600).toFixed(2)) // 作业时间(小时)
							const idleTimeHour = item.standbyTime == null ? 0 : parseFloat((item.standbyTime/3600).toFixed(2)) // 空闲时间（待机时间）小时
							const naturalTime = item.naturalTime || 0 // 自然时间（秒）
							const naturalTimeHour = item.naturalTime == null ? 0 : parseFloat(item.naturalTime/3600) // 自然时间（小时）

							let startUpHour = (runTimeHour + idleTimeHour)? (runTimeHour + idleTimeHour).toFixed(2): 0; // 开机时间（作业时间+空闲时间）

							const failureTime = item.failureTime || 0 // 故障时间
							const planProcedureNum = parseFloat(item.orgCode) || 0 // 计划工件数
							const overProcedureNum = parseFloat(item.orgName) || 0 // 完成工件数
							const elcPower = item.totalPower ? item.totalPower.toFixed(2):0 // 总耗电量

							let bootRate = 0; // 开机率（开机时间/自然时间）
							if (startUpHour == 0) {
								bootRate = 0;
							} else {
								bootRate = (startUpHour / naturalTimeHour*100).toFixed(2); // 开机率（开机时间/自然时间）
							}

							let workRate = 0; // 作业率（作业时间/开机时间）
							if (runTimeHour == 0) {
								workRate = 0;  
							} else {
								workRate = (runTimeHour / startUpHour*100).toFixed(2) // 作业率（作业时间/开机时间）
							}   

							// 利用率
							let liyongLv = 0
							if (bootRate == 0) {
								liyongLv = 0
							} else {
								liyongLv = ((bootRate/100 * workRate/100)*100).toFixed(2) // 利用率（开机率*作业率）
							}

							// 故障率（故障时间/自然时间）
							let alarmRate = 0
							if (failureTime) {
								alarmRate = (failureTime/naturalTime)*100 > 100 ? 100 : (failureTime/naturalTime*100).toFixed(2) // 故障率
							}

							let planFinishRate = 0 // 计划完成率
              if (overProcedureNum) {
                planFinishRate = (overProcedureNum/planProcedureNum)*100 > 100 ? 100 : (overProcedureNum/planProcedureNum*100).toFixed(2) // 计划完成率
              }

							let obj = {
								num: ((this.pageNum - 1) * this.pageSize) + (index + 1),
								id: item.id,
								machineNo: item.machineNo, // 设备编号
								machineName: item.machineName, // 设备名称
								machineStatus: item.machineStatus, // 状态
								startUpHour: startUpHour, // 开机小时数
								runTimeHour: runTimeHour, // 作业小时数
								idleTimeHour: idleTimeHour, // 待机时间(空闲时间（待机时间）)
								bootRate: bootRate,// 开机率
								workRate: workRate,// 作业率
								liyongLv: liyongLv,// 利用率
								alarmRate: alarmRate, // 故障率
								overProcedureNum: overProcedureNum, // 完成工件数
								planFinishRate: planFinishRate, // 计划完成率
								elcPower: elcPower // 总耗电量
							}
							this.deviceList.push(obj)
						})
						
						this.pageNum = res.data.pageNum
						this.pageSize = res.data.pageSize
						this.total = res.data.total
				}

			},			
			async getDeviceListFun2() {
				this.companyCode = JSON.parse(this.companyCodeStr).value;
				this.deviceList = []
				const res = await reqSelectMachineByMachineStatus(this.statusValue,this.pageNum,this.pageSize,	this.companyCode, this.currentDate)
				if(res && res.code === 200 && res.data && res.data.list.length){
					/**
					 * 逻辑规则：
					 * 开机时间 = 作业时间 + 待机时间
					 * 开机率 = 开机时间 / 自然时间
					 * 作业率 = 作业时间 / 开机时间
					 * 故障率 = 故障数 / 总数
					 * 利用率 = 开机率 * 作业率
					 * 总耗电量 = 消耗电能 / 总数 
					 * 在线 = 作业 + 待机 + 故障 + 停机
					 * 离线 = 设备总数 - 在线
					 * 计划完成率 = 完成工件数/计划工件数
					 */

						const deviceList = res.data.list
						deviceList.map((item, index) => {
							const startupTime = item.startupTime == null ? 0 : parseFloat((item.startupTime/3600).toFixed(2)) // 作业时间
            	const standbyTime = item.standbyTime == null ? 0 : parseFloat((item.standbyTime/3600).toFixed(2)) // 空闲时间（待机时间）
            	const naturalTime = item.naturalTime == null ? 0 : parseFloat(item.naturalTime/3600) // 自然时间

							let kaijiTime = startupTime + standbyTime; // 开机时间（作业时间+空闲时间）

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
								liyongLv = ((kaijiLv/100 * zuoyeLv/100)*100).toFixed(2) // 利用率（开机率/作业率）
							}
/* 							let obj = {
								...item,
								startupTime, // 日作业时间
              	standbyTime, // 日开机时间
								liyongLv,
								num: ((this.pageNum - 1) * this.pageSize) + (index + 1)
							} */
							let obj = {
								num: ((this.pageNum - 1) * this.pageSize) + (index + 1),
								id: item.id,
								machineNo: item.machineNo, // 设备编号
								machineName: item.machineName, // 设备名称
								machineStatus: item.machineStatus, // 状态

								kaijiTime: kaijiTime, // 开机小时数
								startupTime: startupTime, // 作业小时数
								kaijiLv: kaijiLv,// 开机率
								zuoyeLv: zuoyeLv,// 作业率

								liyongLv: liyongLv,// 利用率
								standbyTime: standbyTime, // 待机时间(空闲时间（待机时间）)standbyTime


								// 故障率
								// 完成工件数
								// 计划完成率
								// 总耗电量
							}
							this.deviceList.push(obj)
						})
						
						this.pageNum = res.data.pageNum
						this.pageSize = res.data.pageSize
						this.total = res.data.total
				}

			},
      handleSizeChange(val) {
				// console.log(`每页 ${val} 条`);
				this.pageSize = val
				this.getDeviceListFun()
      },
      handleCurrentChange(val) {
				// console.log(`当前页: ${val}`);
				this.pageNum = val
				this.getDeviceListFun()
			},
			deviceStatusChangeFun(val) {
				// console.log('ppp:', val)
				this.statusValueSelect = val;
			},
			searchFun() {
				this.statusValue = this.statusValueSelect;
				this.getDeviceListFun()
			},
			handleClickItem(item) {
				localStorage.setItem('deviceID',JSON.stringify(item))
				this.$router.push('/DeviceDetail');
			}
    },
    destroyed() {
    }
	}
</script>
<style lang="scss" scoped>
.device{
	position: fixed;
	top:0;bottom:0;left:0;right:0;z-index: 10;
	&_empty{
		text-align: center;color: #02c9fc;font-size: 16px;width: 100%;height: 90%;padding-top:16%;
	}
}

/deep/ .el-select-dropdown{
	border: 1px solid #7ed9f1 !important;
	background-color:rgba(9, 20, 40, 0.7)  !important;
}
.deviceCondition{
	position: absolute;right:20px;top:10px;
	/deep/ .el-input__inner{
		background:transparent;
		border:1px solid #255985;
	}
}

	// 标题
	.device_titleBox {
		padding-left: 15px;padding-top:10px;
		height: 50px;
		position: relative;

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
		}
	}

	.device {
		font-size: 12px;
		height: 100%;
		background-image: url(../../assets/images/common_bj.png);
		background-size: 100% 100%;
	}

	.device_head {
		background-image: url(../../assets/images/common_nav.png);
		background-size: 100% auto;
		background-repeat: no-repeat;
		height: 110px;
		display: flex;

		.leftInfo {
			flex: 1;
			// border:1px solid red;
			padding-top: 70px;
			padding-left: 20px;
		}

		.title {
			flex: 2;
			font-size: 0.42rem;
			color: #fff;
			text-align: center;
			line-height: 1.3rem;
			font-weight: bold;
		}

		.rightInfo {
			flex: 1;
			// border:1px solid blue;
			text-align: right;
			padding-top: 50px;
		}
	}

	.device_mainWrap {
		height: calc(100% - 110px - 30px);
		margin: 15px;
		background: rgba(39, 69, 111, 0.2);
		border: 1px solid #192948;
	}

	.device_main {
		height: calc(100% - 50px);
		// display: flex;
		overflow: hidden;
		padding: 0px 20px 20px 20px;
	}

	.device_table{
		width: 100%;height:100%;
		padding-top: 20px;
	}
	.table-thead{
		background-color:#2a4b85;
		font-size: 18px;color:#fff;
		padding:8px 0;
		font-weight: bold;
	}
	.table-tbodyBox{
		height: calc(100% - 40px - 60px);
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
/* 	.table-td01{width: 5%;}
	.table-td02{width: 10%;}
	// .table-td03{width: 15%;}
	.table-td03{width: 15%;}
	.table-td04{width: 6%;}
	// .table-td05{width: 10%;}
	.table-td06{width: 15%;}
	.table-td07{width: 10%;}
	.table-td08{width: 12%;}
	.table-td09{width: 12%;}
	.table-td10{width: 10%;} */
	.table-td{
		width: 7%;
	}
	.table-td01{width: 5%;}
	.table-td02{width: 9%;}
	.table-td03{width: 10%;}
	.table-td04{width: 5%;}
	.table-td14{width: 8%;}
/* 	.table-td05{width: 5%;}
	.table-td06{width: 5%;}
	.table-td07{width: 5%;}
	.table-td08{width: 5%;}
	.table-td09{width: 5%;}
	.table-td10{width: 5%;}
	.table-td11{width: 5%;}
	.table-td12{width: 5%;}
	.table-td13{width: 5%;}
	.table-td14{width: 5%;} */

</style>
