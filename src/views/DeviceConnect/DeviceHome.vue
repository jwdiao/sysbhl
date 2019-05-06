<template>
	<el-container>
		<el-header>
			<!--标头-->
			<div class="vision_title">
				<!-- <span @click="enterIndexPage">北京三一视觉考勤</span> -->
				<div @click="$router.push('/OverView')"
				style="cursor:pointer;position:absolute;top:70px;left:20px;width:88px;height:39px;z-index:10"
				><img src="../../assets/images/common_back.png"></div>				
				<!-- <span>三一北京产业园数据</span> -->
				<span>{{this.companyName}}设备数据系统</span>
			</div>
			<!--右上角时间-->
			<div class="control">
				<!-- <div class="button" @click="enterIndexPage('/HomeGuideDevice')"></div> -->
			</div>
		</el-header>
		
		<el-main style="overflow: hidden;">

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
							<div :class="{lookBox_item:true,active:index===key}" @click="companyClick(item)" v-for=" (item , key) in boardList" :key="key">
								<div class="lookBox_bottom">
                  <div style="text-align: center">
                    <img v-show="item.machineStatus === 1 ? true : false" src="./images/normal.png" alt="">
                    <img v-show="item.machineStatus === 2 ? true : false" src="./images/daiji.png" alt="">
                    <img v-show="item.machineStatus === 3 ? true : false" src="./images/off.png" alt="">
                    <img v-show="item.machineStatus === 4 ? true : false" src="./images/problem.png" alt="">
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
		</el-main>
	</el-container>
</template>

<script>
	import echarts from 'echarts'
	import moment from 'moment'
	import {
		// reqDeviceInfomation,
		reqGetMachineInterConnectionSta,
		reqGetMachineInterConnectionStaCenter
	} from '../../api'
	export default {
		name: 'equipmentsafety',
		data() {
			return {
				currentTime: '',
				index: 0,
				onLineTotalHour: '', //在线时长
				boardList: [], //看板数组
				chartData: {}, //上部echarts,
				companyCode: '0402', //工作中心编码
				companyName: '', //工作中心名
				type: '', // 类型 01 工艺，02 加工中心 
				typeCode: '', // 类型 01 工艺，02 加工中心 
				onLineXdata: [],
				onLineYdata: [],
				onLineDayXdata: [],
				onLineDayYdata: [],
				onLineDayLvdata: [],
				clockaColor: ['#2EC13C', '#36EDFF'],
				clockbColor: ['#FE7600', '#FFC54C'],
				clockcColor: ['#0089FF', '#0089FF']
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
			// 获取系统当前时间
			getCurrentDateTime() {
				return moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
			},
			enterIndexPage(path) {
				this.$router.replace(path);
			},
			// 点击每一项进入DeviceConnect.vue页面
			companyClick(item) {
        this.$router.replace({name:'DeviceConnect',params:{deviceInfoArr:item}})
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
						// workCenterName: this.typeCode,
						date: currentDate
					}
					res = await reqGetMachineInterConnectionStaCenter(paramsObjCenter);
				}
				if (res && res.code === 200) {
					this.boardList = res.data
					// this.companyName = res.data[0].companyName
				}
			},

		},
	}
</script>

<style lang="scss" scoped>
	.el-container {
		background: url(../../assets/images/common_bj.png) no-repeat;
		background-size: 100% 100%;
		height: 100%;
		font-size: 12px;

		/*头部开始*/
		.el-header {
			color: #333;
			text-align: center;
			height: 1.10rem !important;
			background: url(../../assets/images/common_nav.png) no-repeat;
			background-size: 100% 100%;
			padding-top: 0.20rem;
			position: relative;

			.vision_title {
				font-size: 0.44rem;
				color: #fff;
				font-weight: bold;
				height: 100%;
				span {
					margin-left: 0.15rem;
				}
			}
			.time {
				width: 2.40rem;
				font-size: 0.32rem;
				right: 44px;
				color: #ababab;
				position: absolute;
				top: 0.70rem;
				z-index: 10;
				text-align: left;
				font-family: fontnameUnidreamLED !important;
			}
			.control {
				width: 5.00rem;
				font-size: 0.32rem;
				left: 0.44rem;
				color: #ababab;
				position: absolute;
				top: 0.70rem;
				height: 0.40rem;
				div {
					float: left;
					font-size: 0.25rem;
					font-weight: bold;
					cursor: pointer;
					color: white;
				}
				.button {
					width: 90px;
					height: 40px;
					background: url(../../assets/images/common_back.png) no-repeat;
				}
			}
		}
		/*头部结束*/
		.el-main {
			height: calc(100% - 110px);
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

			.bottom_message {
				height: calc(100% - 0rem);
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
								width: 300px;
								height: 230px;
								margin-right: 10px;
								margin-bottom: 25px;
								cursor: pointer;
                margin-left: 50px;
                background:url("./images/fourslg.png") no-repeat;
                background-size:100% 100%;
								/*设备在线看板开始*/
								.lookBox_bottom {
									/*background: rgba(27, 50, 91, 0.6);*/
                  background: rgba(0, 186, 255, 0.1);
									width: 300px;
									height: 230px;
									padding: 20px 15px;

									/*看板开始*/
									.lookBox_bottom_message {
										height: 32px;

										/*span {
											display: inline-block;
											vertical-align: top;
										}*/
                    display: flex;
										.left {
                      flex: 1;
											margin-right: 20px;
											color: #fff;
											font-size: 0.14rem;
											text-align: right;
											width: 100px;
											line-height: 25px;
										}
										.right {
                      flex: 2;
											text-align: left;
											color: #00c7fa;
											font-weight: 400;
											font-size: 0.18rem;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                      overflow: hidden;
										}
									}
								}
							}
              /*点击时*/
							.lookBox_item:hover {
								/*border: 2px solid #4B88DE;*/
								box-sizing: initial;
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
			}

			/*底部两个echarts和设备在线看板结束*/
		}
	}
</style>
