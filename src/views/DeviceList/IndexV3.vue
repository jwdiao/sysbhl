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
              <li>故障</li>
              <li>关机</li>
            </ul>
					</div>
					<el-scrollbar class="message">
						<div class="lookBox">
							<div
								class="lookBox_item"
								v-for="item in boardList"
								:key="item.id"
								@click="companyClick(item)"
							>
								<div class="lookBox_bottom">
                  <div class="lookBox_bottom_img">
										<!-- 作业 -->
										<div class="statusBar_box" v-if="item.machineStatus === 1">
											<img src="./images/device_status-green.png" class="img" />
										</div>
										<div class="statusBar_box" v-if="item.machineStatus === 2">
											<img src="./images/device_status-orange.png" class="img" />
										</div>
										<div class="statusBar_box" v-if="item.machineStatus === 3">
											<img src="./images/device_status-gray.png" class="img" />
										</div>
										<div class="statusBar_box" v-if="item.machineStatus === 4">
											<img src="./images/device_status-red.png" class="img" />
											<img src="../../assets/images/deviceList_halo.png" class="statusBar_fail" />
										</div>
										<!-- <div class="statusBar_box" v-if="item.machineStatus === 1">
											<div class="statusBar greenBg"></div>
											<div class="statusBar_line greenBg"></div>
										</div>
										<div class="statusBar_box" v-if="item.machineStatus === 2">
											<div class="statusBar orangeBg"></div>
											<div class="statusBar_line orangeBg"></div>
										</div>
										<div class="statusBar_box" v-if="item.machineStatus === 4">
											<div class="statusBar redBg"></div>
											<div class="statusBar_line redBg"></div>
											<img src="../../assets/images/deviceList_halo.png" class="statusBar_fail" />
										</div>
										<div class="statusBar_box" v-if="item.machineStatus === 3">
											<div class="statusBar grayBg"></div>
											<div class="statusBar_line grayBg"></div>
										</div> -->
										<img :src="item.serialNo" class="device_img" />
                    <!-- <img v-show="item.machineStatus === 1 ? true : false" src="./images/normal.png" alt=""> -->
                    <!-- <img v-show="item.machineStatus === 2 ? true : false" src="./images/daiji.png" alt=""> -->
                    <!-- <img v-show="item.machineStatus === 3 ? true : false" src="./images/off.png" alt=""> -->
                    <!-- <img v-show="item.machineStatus === 4 ? true : false" src="./images/problem.png" alt=""> -->
                  </div>
                  <div class="lookBox_bottom_message">
                    <span class="left">设备名字</span>
                    <span class="right" v-html="item.machineName"></span>
                  </div>
									<div class="lookBox_bottom_message">
										<span class="left">设备型号</span>
										<span class="right" v-html="item.machineModel"></span>
									</div>
									<div class="lookBox_bottom_message">
										<span class="left">设备编号</span>
										<span class="right" v-html="item.machineNo"></span>
									</div>
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
		reqGetMachineInterConnectionStaCenter
	} from '../../api'
	export default {
		name: 'equipmentsafety',
		components: {
			CommonHead,
		},
		data() {
			return {
				currentTime: '', // 系统时间
				companyCode: '0301', // 选中的公司code
      	companyName: '北京桩机', // 选中的公司name
				type: '', // 类型 01 工艺，02 加工中心 
				typeCode: '', // 类型 01 工艺，02 加工中心 (值)
				boardList: [], //看板数组
			};
		},
		mounted() {
			this.currentTime = this.getCurrentDateTime(); // 获取当前时间

			// 选中的子公司
			const companyCodeStr = localStorage.getItem('sbhl-OverView-SelectedCompany')
			this.companyCode = JSON.parse(companyCodeStr).value
			this.companyName = JSON.parse(companyCodeStr).label

			// 选中的工艺或者加工中心
			const craftOrCenter = localStorage.getItem('sbhl-DeviceHome-Param')
			this.type = JSON.parse(craftOrCenter).type; // 工艺和加工中心区分类型：01工艺，02加工中心
			this.typeCode = JSON.parse(craftOrCenter).typeCode; // 值

			this.getOnlineboard();
		},
		methods: {
			// 返回按钮回调
			handleBackBtn() {
				this.$router.replace('/OverView');
			},
			// 获取系统当前时间
			getCurrentDateTime() {
				return moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
			},
			// 点击每一项进入DeviceConnect.vue页面
			companyClick(item) {
        this.$router.replace({name:'DeviceDetail',params:{deviceInfoArr:item}})
        localStorage.setItem('deviceID',JSON.stringify(item))
        /*获取时*/
        // this.deviceInfoArrData = this.$route.params.deviceInfoArr
			},
			/*看板信息*/
			async getOnlineboard() {
				const currentDate = this.currentTime.substring(0,10) // 2019-10-11
				
				let res = ''
				if( this.type =='01') { // 工艺
					const paramsObjCraft = {
						companyCode: this.companyCode, // 子公司code
						requestType: this.type, // 01 工艺，02 加工中心 
						firstGroupCode: this.typeCode, // 值
						date: currentDate
					}
					res = await reqGetMachineInterConnectionSta(paramsObjCraft);
				} else if (this.type=='02') { // 加工中心
					const paramsObjCenter = {
						companyCode: this.companyCode, // 子公司code
						requestType: this.type, // 01 工艺，02 加工中心 
						workCenterCode: this.typeCode, // 值
						date: currentDate
					}
					res = await reqGetMachineInterConnectionStaCenter(paramsObjCenter);
				}
				if (res && res.code === 200) {
					this.boardList = res.data
				}
			},

		},
	}
</script>

<style lang="scss" scoped>
	.bottom_message {
		height: 100%;overflow: hidden;
		display: flex;
		flex-direction: row;
		#onlineLv {
			height: calc(100% - 0.34rem);
		}
		#onlineCount {
			height: calc(100% - 0.34rem);
		}
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
						width: 360px;
						height: 280px;
						margin-right: 50px;
						margin-bottom: 25px;
						cursor: pointer;
						margin-left: 50px;
						background:url("./images/fourslg.png") no-repeat;
						background-size:100% 100%;
						/*设备在线看板开始*/
						.lookBox_bottom {
							/*background: rgba(27, 50, 91, 0.6);*/
							background: rgba(0, 186, 255, 0.1);
							width: 100%;
							height: 100%;
							padding: 10px 15px 0;
							border: 1px solid rgba(39, 69, 111, 0.3);
							.lookBox_bottom_img{
								text-align: center;width: 150px;margin: 0 auto;padding-top:25px;
								position: relative;
								min-height: 140px;max-height:170px;
							}
							.lookBox_bottom_img .device_img{
								width: 180px;
								height: 145px;
    						overflow: hidden;
							}

							/*看板开始*/
							.lookBox_bottom_message {
								height: 30px;
								display: flex;
								.left {
									flex: 1;
									margin-right: 20px;
									color: #fff;
									font-size: 14px;
									text-align: right;
									width: 100px;
								}
								.right {
									flex: 2;
									text-align: left;
									color: #00c7fa;
									font-weight: 400;
									font-size: 14px;
									white-space: nowrap;
									text-overflow: ellipsis;
									overflow: hidden;
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
			background: url("../../assets/images/deviceConnect_status.png") no-repeat;
			background-size: 100% 100%;
			ul{
				display: flex;
				height: 100%;
				position: relative;
				li{
					flex: 1;
					height:100%;
					line-height: 0.6rem;
				}
				li:nth-of-type(1):before{
						display: block;
						content: '';
						position: absolute;
						width: 12px;
						height: 12px;
						border-radius: 12px;
						background: #1cf33c;
						left: 0.5rem;
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
						left: 2.35rem;
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
						background: #fd0101;
						left: 4.20rem;
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
						background: #484b4f;
						left: 6.05rem;
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

.statusBar_fail{
		position: absolute;    top: -80px;
    left: -57px;
z-index: 2;
		animation: blink 1s linear infinite;  
    /* 其它浏览器兼容性前缀 */
    -webkit-animation: blink 1s linear infinite;
    -moz-animation: blink 1s linear infinite;
    -ms-animation: blink 1s linear infinite;
    -o-animation: blink 1s linear infinite;
}
/* 定义keyframe动画，命名为blink */
@keyframes blink{
  0%{opacity: 1;}
  100%{opacity: 0;} 
}
/* 添加兼容性前缀 */
@-webkit-keyframes blink {
    0% { opacity: 1; }
    100% { opacity: 0; }
}
@-moz-keyframes blink {
    0% { opacity: 1; }
    100% { opacity: 0; }
}
@-ms-keyframes blink {
    0% {opacity: 1; } 
    100% { opacity: 0;}
}
@-o-keyframes blink {
    0% { opacity: 1; }
    100% { opacity: 0; }
}

</style>
