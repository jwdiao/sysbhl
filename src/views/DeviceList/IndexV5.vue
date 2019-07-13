<template>
<div class="common_bg common_bg02 deviceList_index">
  <CommonHead
    :isShowBackBtn="true"
		:isShowCurrentTime="false"
    :titleText="`${companyName}设备数据系统`"
    @backBtnClick="handleBackBtn"
  />
  <div class="common_main common_blockColor">
			<div class="bottom_message">
				<div class="item">
					<div class="title">
            <ul>
              <li>作业</li>
              <li>待机</li>
              <li>离线</li>
              <li>故障</li>
              <li>关机</li>
            </ul>
					</div>
					<el-scrollbar class="message">
						<div class="lookBox">
							<div
								class="lookBox_item"
								v-for="(item,index) in boardList"
								:key="index"
								@click="companyClick(item)"
							>
								<div class="lookBox_bottom">
									<div class="deviceList_ImgAndStatus">
										<div class="deviceList_machineImg"><img :src="item.serialNo" /></div>
										<div class="deviceList_statusImg" v-if="item.machineStatus == 1"><img src="../../assets/images/deviceList_lamp_green.png" /></div>
										<div class="deviceList_statusImg" v-if="item.machineStatus == 2"><img src="../../assets/images/deviceList_lamp_orange.png" /></div>
										<div class="deviceList_statusImg" v-if="item.machineStatus == 4"><img src="../../assets/images/deviceList_lamp_red.png" /></div>
										<div class="deviceList_statusImg" v-if="item.machineStatus == 3"><img src="../../assets/images/deviceList_lamp_gray.png" /></div>
										<div class="deviceList_statusImg" v-if="item.machineStatus == 5"><img src="../../assets/images/deviceList_lamp_darkGray.png" /></div>
										<div :class="{
											'deviceList_statusText': true,
											'deviceList_statusText-green':item.machineStatus == 1,
											'deviceList_statusText-orange':item.machineStatus == 2,
											'deviceList_statusText-gray':item.machineStatus == 3,
											'deviceList_statusText-red':item.machineStatus == 4,
											'deviceList_statusText-darkGray':item.machineStatus == 5,
										}">
											{{machineStatusText(item.machineStatus)}}...
										</div>
									</div>
									<ul class="deviceList_info">
										<li><label>设备型号</label><span>{{item.machineModel}}</span></li>
										<li><label>设备名字</label><span>{{item.machineName}}</span></li>
										<li><label>设备编号</label><span>{{item.machineNo}}</span></li>
										<li><label>开机率</label><span>{{item.bootRate}}%</span></li>
										<li><label>作业率</label><span>{{item.workRate}}%</span></li>
										<li><label>故障率</label><span>{{item.alarmRate}}%</span></li>
										<li><label>利用率</label><span>{{item.liyongLv}}%</span></li>
										<!-- <li><label>计划完成率</label><span>{{item.planFinishRate}}%</span></li> -->
										<li><label>总耗电量</label><span>{{item.elcPower}}kw.h</span></li>
									</ul>
								</div>
							</div>
						</div>
					</el-scrollbar>
				</div>
			</div>
  </div>
</div>


</template>

<script>
	import echarts from 'echarts'
	import moment from 'moment'
	import CommonHead from '@/components/Head'
	import {
		reqGetMachineInterConnectionSta,
		reqGetMachineInterConnectionStaCenter,
		reqGetMachineInterConnectionStaDeviceType
	} from '../../api'
	import { getDayTypeFun, getDayStrFun, _SessionStorageObj } from '@/utils'
	export default {
		name: 'equipmentsafety',
		components: {
			CommonHead,
		},
		data() {
			return {
				companyCode: '0701', // 选中的公司code
				companyName: '三一德力佳', // 选中的公司name
				type: '', // 类型 01 工艺，02 加工中心 
				typeCode: '', // 类型 01 工艺，02 加工中心 (值) 03 设备类型
				boardList: [], //看板数组
			};
		},
		mounted() {
			// 选中的子公司
			const sbhlSelectedCompanyObj = _SessionStorageObj.get('sbhl-OverView-SelectedCompany')
			if (sbhlSelectedCompanyObj) {
				this.companyCode = sbhlSelectedCompanyObj.value; // 公司编码
				this.companyName = sbhlSelectedCompanyObj.label // 公司名字
			} else {
				_SessionStorageObj.set('sbhl-OverView-SelectedCompany',{label:this.companyName,value:this.companyCode})
			}

			// 选中的工艺或者加工中心
			const craftOrCenterObj = _SessionStorageObj.get('sbhl-OverView-CenterDevicetypeCode')
			this.type = craftOrCenterObj.type; // 工艺和加工中心区分类型：01工艺，02加工中心 03 设备类型
			this.typeCode = craftOrCenterObj.typeCode; // 值

			this.getOnlineboard();
		},
		methods: {
			// 返回按钮回调
			handleBackBtn() {
				this.$router.replace('/OverView');
			},			
			// 根据设备状态得到状态文字
			machineStatusText(machineStatus) {
					// 1 作业， 2 待机，3 关机，4 故障
					if (machineStatus == 1) {
						return '作业'
					} else if (machineStatus == 2) {
						return '待机'
					} else if (machineStatus == 3) {
						return '关机'
					} else if (machineStatus == 4) {
						return '故障'
					} else if (machineStatus == 5) {
						return '离线'
					}
			},
			/*看板信息*/
			async getOnlineboard() {
				const dayType  = getDayTypeFun() // dayType: 1 // 1 白班 2 夜班
				const currentDate = getDayStrFun();
				
				let res = ''
				if( this.type =='01') { // 工艺
					const paramsObjCraft = {
						companyCode: this.companyCode, // 子公司code
						requestType: this.type, // 01 工艺，02 加工中心 
						firstGroupCode: this.typeCode, // 值
						date: currentDate,
						dayType: dayType
					}
					res = await reqGetMachineInterConnectionSta(paramsObjCraft);
					// console.log('res:',res)
				} else if (this.type=='02') { // 加工中心
					const paramsObjCenter = {
						companyCode: this.companyCode, // 子公司code
						requestType: this.type, // 01 工艺，02 加工中心 
						workCenterCode: this.typeCode, // 值
						date: currentDate,
						dayType: dayType
					}
					res = await reqGetMachineInterConnectionStaCenter(paramsObjCenter);
				} else if (this.type=='03') { // 设备类型
					const paramsObjDeviceType = {
						companyCode: this.companyCode, // 子公司code
						requestType: this.type, // 01 工艺，02 加工中心 03 设备类型
						machineTypeCode: this.typeCode, // 值
						date: currentDate,
						dayType: dayType
					}
					res = await reqGetMachineInterConnectionStaDeviceType(paramsObjDeviceType);
				}
				/**
				 * 逻辑规则：
				 * 开机时间 = 作业时间 + 待机时间
				 * 开机率 = 开机时间 / 自然时间
				 * 作业率 = 作业时间 / 开机时间
				 * 故障率 = 故障时间/自然时间(老的的规则已经废弃：故障数 / 总数)
				 * 利用率 = 开机率 * 作业率
				 * 总耗电量 = 消耗电能 / 总数 
				 * 在线 = 作业 + 待机 + 故障 + 停机
				 * 离线 = 设备总数 - 在线
				 * 计划完成率 = 完成工件数/计划工件数
				 */
				if (res && res.code === 200) {
					// this.boardList = res.data
					const originList = res.data
					this.boardList = originList.map(item => {
						const runTime = item.startupTime || 0 // 作业时间(秒)
						const idleTime = item.standbyTime || 0 // 待机时间（秒）
						const naturalTime = item.naturalTime || 0 // 自然时间（秒）
						const bootTime = (runTime + idleTime)? (runTime + idleTime): 0; // 开机时间（作业时间+空闲时间）
						const elcPower = item.totalPower ? item.totalPower.toFixed(2):0 // 总耗电量
						const failureTime = item.failureTime || 0 // 故障时间
						const planProcedureNum = parseFloat(item.orgCode) || 0 // 计划工件数
            const overProcedureNum = parseFloat(item.orgName) || 0 // 完成工件数
						// 开机率（开机时间/自然时间）
						let bootRate = 0
						if (bootTime) {
							bootRate = (bootTime/naturalTime)*100 > 100 ? 100 : (bootTime/naturalTime*100).toFixed(2) // 开机率
						}
						// 作业率（作业时间/开机时间）
						let workRate = 0
						if (runTime) {
							workRate = (runTime/bootTime*100) > 100 ? 100: (runTime/bootTime*100).toFixed(2) // 作业率
						}
						// 故障率（故障时间/总时间）
						let alarmRate = 0
						if (failureTime) {
							alarmRate = (failureTime/naturalTime)*100 > 100 ? 100 : (failureTime/naturalTime*100).toFixed(2) // 故障率
						}
						// 利用率
						let liyongLv = ((bootRate/100 * workRate/100)*100).toFixed(2) // 利用率（开机率/作业率）

						// 计划完成率
						let planFinishRate = 0
						if (overProcedureNum) {
							planFinishRate = (overProcedureNum/planProcedureNum)*100 > 100 ? 100 : (overProcedureNum/planProcedureNum*100).toFixed(2) // 计划完成率
						}

						return {
							machineStatus: item.machineStatus, // 1 作业， 2 待机，3 关机，4 故障
							serialNo: item.serialNo, // 设备图片
							machineName: item.machineName, // 设备名字
							machineModel: item.machineModel, // 设备型号
							machineNo: item.machineNo, // 设备编号
							bootRate, // 开机率
							workRate, // 作业率
							alarmRate, // 故障率
							liyongLv, // 利用率
							planFinishRate, // 计划完成率
							elcPower: elcPower, // 总耗电量
							plcType: item.plcType // 类型（跳转页面使用）
						}
					})

					// console.log('boardList:',this.boardList)
				}
			},
			// 点击每一项进入DeviceConnect.vue页面
			companyClick(item) {
				// console.log('item:',item.plcType)
				const plcType = item.plcType;
				if (plcType === '1') {
					this.$router.replace({name:'DeviceDetail',params:{deviceInfoArr:item}})
				} else if (plcType === '2') {
					this.$router.replace({name:'DeviceDetailXmz',params:{deviceInfoArr:item}})
				} else if (plcType === '3') {
					this.$router.replace({name:'DeviceDetailRobot',params:{deviceInfoArr:item}})
				}
				_SessionStorageObj.set('deviceID',item)
				/*获取时*/
				// this.deviceInfoArrData = this.$route.params.deviceInfoArr
			}			
		}
	}
</script>

<style lang="scss" scoped>
	.bottom_message {
		height: 100%;overflow: hidden;
		display: flex;
		flex-direction: row;
		.item {
			background: rgba(39, 69, 111, 0.3);
			border: 1px solid rgba(255, 255, 255, 0.1);
			width: 10.86*2rem;
			padding: 10px 20px 15px 20px;
			.message {
				width: 100%;
				height: calc(100% - 44px);
				margin-top: 5px;
				padding-bottom: 15px;
				margin-top: 15px;
				overflow: hidden;
				/deep/ .el-scrollbar__wrap {
					overflow-x: hidden;
				}
				.lookBox {
					width: 100%;
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;

					.lookBox_item {
						// width: 440px;
						// height: 340px;
						margin-right: 20px;
						margin-bottom: 25px;
						cursor: pointer;
						background:url("./images/fourslg2.png") no-repeat;
						background-size:100% 100%;
						/*设备在线看板开始*/
						.lookBox_bottom {
							background: rgba(0, 186, 255, 0.1);
							width: 100%;
							height: 100%;
							padding: 10px 15px 0;
							padding: 50px 15px;
							border: 1px solid rgba(39, 69, 111, 0.3);

							display: flex;
							align-items: center;
							.deviceList_ImgAndStatus{
								width: 170px;margin-left: 15px;
								display: flex;flex-direction:column;
								.deviceList_machineImg{
									width: 136px;max-height:110px;overflow: hidden;margin: 0 auto;vertical-align:bottom;
									img{width: 100%;}
								}
								.deviceList_statusImg{
									text-align: center;margin-top: -10px;
									img { width: 60px }
								}
								.deviceList_statusText{
									width: 158px;height: 46px;line-height: 46px;text-align: center;font-size: 22px;
									background: url('../../assets/images/deviceList_btn.png');
									&-green{color: #1cf33c;}
									&-orange{color: #ffc31f;}
									&-red{color: #fd0101;}
									&-gray{color: #afd7f3;}
									&-darkGray{color: #898888}
								}
							}
							.deviceList_info{
								border-left: 1px solid #1b5ba9;
								padding: 0 10px;
								li{
									padding-bottom: 6px;
									label{ font-size: 14px;color: #acd2ea; width: 70px;display: inline-block;text-align: right;}
									span{ font-size: 14px;color: #00c7fa; margin-left:10px;}
								}
							}
						}
					}
					/*点击时*/
					.lookBox_item:hover {
						.lookBox_top {
						}
						.lookBox_bottom {
							background:linear-gradient(#368DE7,#1458A8,#3573D7);
							border: 1px solid #82aaf3;
							box-sizing: border-box;
						}
					}
				}
			}
		}

		.title {
			color: #fff;
			height: 0.6rem;
			font-size: 0.20rem;
			font-weight: bold;
			width: 40%;
			text-align: center;
			margin: 0 auto;
			background: url("../../assets/images/deviceConnect_status2.png") no-repeat;
			background-size: 100% 100%;
			ul{
				display: flex;
				height: 100%;
				position: relative;
				li{
					flex: 1;
					height:100%;
					line-height: 0.6rem;
					position: relative;
				}
				li:nth-of-type(1):before{
						display: block;
						content: '';
						position: absolute;
						width: 12px;
						height: 12px;
						border-radius: 12px;
						background: #1cf33c;
						left: 0.3rem;
						top: 50%;
						margin-top: -5px;
				}
				li:nth-of-type(2):before{
						display: block;
						content: '';
						position: absolute;
						width: 12px;
						height: 12px;
						border-radius: 12px;
						background: #ffc31f;
						left: 0.3rem;
						top: 50%;
						margin-top: -5px;
				}
				li:nth-of-type(3):before{
						display: block;
						content: '';
						position: absolute;
						width: 12px;
						height: 12px;
						border-radius: 12px;
						background: #353535;
						left: 0.3rem;
						top: 50%;
						margin-top: -5px;
				}
				li:nth-of-type(4):before{
						display: block;
						content: '';
						position: absolute;
						width: 12px;
						height: 12px;
						border-radius: 12px;
						background: #fd0101;
						left: 0.3rem;
						top: 50%;
						margin-top: -5px;
				}
				li:nth-of-type(5):before{
						display: block;
						content: '';
						position: absolute;
						width: 12px;
						height: 12px;
						border-radius: 12px;
						background: #838990;
						left: 0.3rem;
						top: 50%;
						margin-top: -5px;
				}
			}
		}
		.statusBar_box{
			width: 32px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: absolute;
			left: 30px;
			top:5px;
			z-index: 2;
			.img{
				position: absolute;top:-15px;left:0px;z-index: 2;
				width: 32px;height:112px;
			}
		}

	}




</style>
