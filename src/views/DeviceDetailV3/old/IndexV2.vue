<template>
	<div class="device">
		<div class="device_head">
			<div class="leftInfo" @click="goBackFun" style="cursor:pointer"><img src="../../assets/images/common_back.png"></div>
			<div class="title">{{companyName}}设备数据互联</div>
			<div class="rightInfo">
			</div>
		</div>
		<div class="device_mainWrap">
			<div class="device_titleBox">
				<span class="device_circle">•</span>
				<span class="device_title">机床信息</span>
				<img class="device_img" src="../../assets/images/DeviceConnect_title.png" />
			</div>
			<div class="device_main">
				<div class="device_mainLeft">
					<div class="device_leftTop">
						<p class="name">{{deviceDataObj.machineName}}</p>
						<div class="img">
							<img :src="deviceData.urlPath" style="width:80%;" />
						</div>
						<div class="timeBox">
							<span class="text" v-if="deviceDataObj.machineStatus==1" style="color:#1cf33c">&nbsp;作业</span>
							<span class="text" v-if="deviceDataObj.machineStatus==2" style="color:#ffc31f">&nbsp;待机</span>
							<span class="text" v-if="deviceDataObj.machineStatus==3" style="color:#484b4f">&nbsp;关机</span>
							<span class="text" v-if="deviceDataObj.machineStatus==4" style="color:#fd0101">&nbsp;故障</span>
							<span class="time">{{deviceDataObj.time}}</span>
						</div>
					</div>
					<div class="device_leftBottom">
						<el-scrollbar style="height:100%;">
							<ul v-if="deviceData&&deviceData.curNcBlk">
								<li v-for="(item,index) in deviceData.curNcBlk" :key='"curNcBlk"+index' :class='"curNcBlk"+index'>{{item}}</li>
							</ul>
						</el-scrollbar>
					</div>
				</div>
				<div class="device_mainRight">
					<div class="device_rightTop">
						<!-- djw -------------------------------------djw---->
						<div class="DeviceParams">
							<!--顶部-->
							<ul class="topConent dljitem">
								<li class="mainProcedure topConentLi">
									<span class="mainProcedureLiSpan">主程序&nbsp;&nbsp; <em :title="deviceData.mainPgm"> {{deviceData.mainPgm}} </em></span>
								</li>
								<li class="otherProcedure topConentLi">
									<span class="mainProcedureLiSpan">执行程序&nbsp;&nbsp; <em :title="deviceData.curPgm"> {{deviceData.curPgm}}</em></span>
								</li>
								<li class="otherTarget topConentLi zhibiao">
									<span class="mainProcedureLiSpan">执行行号/指标&nbsp;&nbsp; <em> {{deviceData.curNcPtr}}</em></span>
								</li>
								<li class="modals topConentLi">
									<span class="mainProcedureLiSpan">模式&nbsp;&nbsp; <em> {{deviceData.mode}}</em></span>
								</li>
								<li class="status topConentLi">
									<span class="mainProcedureLiSpan">状态&nbsp;&nbsp; <em> {{deviceData.ncStatus}}</em></span>
								</li>
								<li class="unNormal topConentLi">
									<span class="mainProcedureLiSpan">报警&nbsp;&nbsp; <em> {{deviceData.alarm}}</em></span>
								</li>
								<li class="scram topConentLi">
									<span class="mainProcedureLiSpan">急停&nbsp;&nbsp; <em> {{deviceData.emg}}</em></span>
								</li>
							</ul>
							<!--中间-->
							<ul class="centerConent">
								<li class="centerContentLi" style="flex: 1.5">
									<div class="centerContentDiv">
										<label>命令主轴转速</label>
										<span>{{twoPoint(deviceData.scode[0])}} RPM</span>
										<span>{{twoPoint(deviceData.scode[1])}} RPM</span>
									</div>
									<div class="centerContentDiv">
										<label>实际主轴转速</label>
										<span>{{twoPoint(deviceData.actSpin[0])}} PRM</span>										
										<span>{{twoPoint(deviceData.actSpin[1])}} PRM</span>										
									</div>
									<div class="splitLine"></div>
								</li>
								<li class="centerContentLi" style="flex: 1.4">
									<div class="centerContentDiv">
										<label>主轴负载</label>
										<span>{{twoPoint(deviceData.spinLoad[0])}}%</span>
										<span>{{twoPoint(deviceData.spinLoad[1])}}%</span>
									</div>
									<div class="centerContentDiv">
										<label>主轴最大负载</label>
										<span v-for="(item, index) in deviceData.maxSpinLoad" :key="index">
											{{twoPoint(item)}}%
										</span>
									</div>
									<div class="splitLine"></div>
								</li>
								<li class="centerContentLi">
									<div class="centerContentDiv">
										<label>命令进给率</label>
										<span>{{twoPoint(deviceData.fCode) + danwei}} </span>
									</div>
									<div class="centerContentDiv">
										<label>实际进给率</label>
										<span>{{twoPoint(deviceData.actFeed)+ danwei}}</span>										
									</div>
									<div class="splitLine"></div>
								</li>
								<li class="centerContentLi">
									<div class="centerContentDiv">
										<label>主轴一温度</label>
										<span>{{twoPoint(deviceData.spinTmp1)}}</span>
									</div>
									<div class="centerContentDiv">
										<label>主轴二温度</label>
										<span>{{twoPoint(deviceData.spinTmp2)}}</span>										
									</div>
								</li>
							</ul>
							<!--底部-->
							<div class="bottomConent dljitem">
								<ul class="bottomConentUl">
									<!--bottom左侧-->
									<li class="BLeftNew">
										<div class="label">
											<ul>
												<li></li>
												<li>绝对坐标</li>
												<li>相对坐标</li>
												<li>机械坐标</li>
												<li>剩余距离</li>
											</ul>
										</div>
										<div class="con" style="width:715px">
											<el-scrollbar class="xscrollbar">
												<div class="xscrollbar-con" id="xscrollbarCon">
												<ul class="conTop">
													<li class="deviceDetailXmzLiItem" v-for="(item,index) in deviceData.axisName" :key="index">{{item}}</li>
												</ul>
												<ul class="conBottom">
													<li>
														<span class="deviceDetailXmzLiItem" v-for="(item,index) in deviceData.absPos" :key="index">{{twoPoint(item)}}</span>
													</li>
													<li>
														<span class="deviceDetailXmzLiItem" v-for="(item,index) in deviceData.relPos" :key="index">{{twoPoint(item)}}</span>
													</li>
													<li>
														<span class="deviceDetailXmzLiItem" v-for="(item,index) in deviceData.machPos" :key="index">{{twoPoint(item)}}</span>
													</li>
													<li>
														<span class="deviceDetailXmzLiItem" v-for="(item,index) in deviceData.remDist" :key="index">{{twoPoint(item)}}</span>
													</li>
												</ul>
												</div>
											</el-scrollbar>
										</div>
									</li>
									<!--bottom右侧-->
									<li class="bottomConentLi bottomConentLiRight">
										<ul class="bottomConentLiRightUl">
											<li>
												<div class="bottomConentLiRightUlF">F</div>
												<ul class="bottomConentLiRightUlFS">
													<li>设定F值</li>
													<li>F倍率</li>
													<li>实际进给</li>
												</ul>
												<ul class="bottomConentLiRightUlFS FSnumber">
														<li>{{deviceData.fV}}</li>
														<li>{{deviceData.ovFeed}}</li>
														<li>{{deviceData.actFeed}}</li>
												</ul>
											</li>
											<li>
												<div class="bottomConentLiRightUlF">S</div>
												<ul class="bottomConentLiRightUlFS">
													<li>设定S值</li>
													<li>主轴倍率</li>
													<li>主轴负载</li>
												</ul>
												<ul class="bottomConentLiRightUlFS FSnumber" style="flex:3;">
													<li>
														<span class="twoColumn">{{twoPoint(deviceData.rV[0])}}</span>
														<span class="twoColumn">{{twoPoint(deviceData.rV[1])}}</span></li>
													<li>
														<span class="twoColumn">{{twoPoint(deviceData.ovSpin[0])}}</span>
														<span class="twoColumn">{{twoPoint(deviceData.ovSpin[1])}}</span>
														</li>
													<li>
														<span class="twoColumn">{{twoPoint(deviceData.spinLoad[0])}}</span>
														<span class="twoColumn">{{twoPoint(deviceData.spinLoad[1])}}</span>
													</li>
												</ul>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</div>
						<!-- djw -------------------------------------djw-end  -->
					</div>
					<div class="device_rightBottom">
						<div class="device_rightBottom-left">
							<div class='my_box'>
								<div class="myBox_left">
									<div class="progress_box">
										<div style="" class="progress_item" v-for="(item , index) in progress" :key='"progress"+index'>
											<div class="title">{{item.title}}</div>
											<div class="progress">
												<el-progress :percentage="item.percentage" :stroke-width="15" :text-inside="true" :color="item.color"></el-progress>
											</div>
											<div class="time">{{item.time}}</div>
										</div>
									</div>
									<div class="pie_box">
										<div id="pieY" style="width:100%;height:100%">
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="device_rightBottom-right">
							<EchartsLine />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import echarts from 'echarts'
	import moment from 'moment'
	import {
		reqDeviceRightList,
		machineConnectioninfo,
    reqJGLDanwei,
	} from '../../api'
	import EchartsLine from './EchartsLineV2.vue'
	export default {
		name: 'DeviceConnect',
		components: {
			EchartsLine
		},
		data() {
			return {
				companyCode: '0701',
				companyName: '三一德力佳',
				deviceDataObj: {}, //首页传过来的设备名称和从接口获取的时间和设备状态
				deviceData: {
					curNcPtr:'',
					scode:'',
					actSpin:'',
					spinLoad:'',
					maxSpinLoad:'',
					fCode:'',
					actFeed:'',
					spinTmp1:'/',
					spinTmp2:'/',
					fV:'/',
					ovFeed:'',
					rV:['0','0'],
					ovSpin:'',
					absPos:[],
					relPos:[],
					machPos:[],
					remDist:[],
					urlPath: ''
				}, // 右上角设备参数信息
				danwei:'', //进给率 的单位
				pieDom: '',
				progress: [
					{
						id: 1,
						title: '作业',
						percentage: 0,
						color: '#25EE3D',
						time: '00:00:00'
					}, {
						id: 2,
						title: '待机',
						percentage: 0,
						color: '#FFC620',
						time: '00:00:00'
					},
					{
						id: 3,
						title: '故障',
						percentage: 0,
						color: '#F50400',
						time: '00:00:00'
					}, {
						id: 4,
						title: '关机',
						percentage: 0,
						color: '#48494B',
						time: '00:00:00'
					}
				],
				echartsData: [{
						value: 335,
						name: '作业',
					},
					{
						value: 310,
						name: '待机',
						selected: true
					},
					{
						value: 234,
						name: '故障',

					},
					{
						value: 135,
						name: '关机',
						selected: true
					},
        ],
        IntervalId: null
			}
		},
		filters: {

		},
		mounted() {
			// 选中的子公司
			const companyCodeStr = localStorage.getItem('sbhl-OverView-SelectedCompany')
			this.companyCode = JSON.parse(companyCodeStr).value
			this.companyName = JSON.parse(companyCodeStr).label

			const deviceInfoFromLocalstory = JSON.parse(localStorage.getItem('deviceID')) // 设备信息
			const deviceID = deviceInfoFromLocalstory.machineNo // 设备id
			this.deviceDataObj.machineName = deviceInfoFromLocalstory.machineName // 设备name

			this.getDeviceParamsInfo(deviceID) // 右上角设备参数信息
			this.getJGLDanwei(deviceID) // 右上角--进给率单位


      this.findMachineConnectioninfo(deviceID); // 右侧饼图和进度条数据


			window.addEventListener('resize', this.handleResize); // echarts图自适应

      this.IntervalId = setInterval(()=>{
				this.getDeviceParamsInfo(deviceID)  // 右上角设备参数信息
        this.getJGLDanwei(deviceID) // 右上角--进给率单位				
        this.findMachineConnectioninfo(deviceID);
      },5000)

		},
		methods: {
			// 返回按钮
			goBackFun() {
				const fromRouter = this.$route.params.fromRouter
				if (fromRouter) {
					this.$router.push(fromRouter)
				} else {
					this.$router.push('/DeviceList')
				}
			},
			/**
       * 方法名：getDayTypeFun
       * 描述：判断是白班还是夜班
       */
      getDayTypeFun () {
				var timeY = moment(new Date()).format('HH')
				let dayType = ''
        if (timeY >= 8 && timeY < 20) {
          dayType = 1 // '白班'
        } else {
          dayType = 2 // '夜班'
				}
				return dayType
			},
			getDayStrFun () {
				// 日期规则：2019.06.11 8：00 ~ 2019.06.12 8：00 日期为2019.06.11
        let currentDateStr = ''; // 目标日期
        const todayDateStr = moment(new Date()).format('YYYY-MM-DD'); // 今日日期
        const yesterdayStr = moment().subtract(1, 'day').format('YYYY-MM-DD'); // 昨日
        const currentHour = moment().hour() // 值从0~23
        // console.log('currentHour:',currentHour)
        // console.log('yesterdayStr:',yesterdayStr)
        // 如果当前小时<8时，日期取昨天的日期，如果当前小时>=8小时，日期取当前日期
        if (currentHour < 8) {
          currentDateStr = yesterdayStr
        } else {
          currentDateStr = moment(new Date()).format('YYYY-MM-DD')
				}
				return 	currentDateStr
			},
			//----------------右上角设备参数信息  start -------------->
			async getDeviceParamsInfo(deviceID) {
				const currentDateStr = this.getDayStrFun()
				const dayType = this.getDayTypeFun()
        const res = await reqDeviceRightList(deviceID,currentDateStr,dayType)
				if (res && res.code === 200) {
          if(res.data!==null){
						this.handleData(res.data)
          }
				}
			},
			strToArrFun(str) {
				// console.log('str:',str)
				// console.log('strrrr:',str.split('|'))
				if (str) {
					return str.split('|')
				}
			},
			twoPoint(data) {
				// debugger;
				// console.log('hhhh:',data)
				if (data === '-100000.0F') {
					return '/'
				}
				if (data === null) {
					return 0
				}
				const dataFloat = parseFloat(data)
				if (dataFloat) {
					return dataFloat.toFixed(2)
				} else {
					return dataFloat
				}
			},
			handleData(resData) {
				const item = resData
				this.deviceData = {
						...item,
						mainPgm: item.mainPgm,
						curPgm: item.curPgm,
						mode: item.mode,
						ncStatus: item.ncStatus,
						alarm: item.alarm,
						emg: item.emg,
						curNcPtr: this.twoPoint(item.curNcPtr),

						scode: this.strToArrFun(item.scode), // 命令主轴转速(多个值)
						actSpin: this.strToArrFun(item.actSpin), // 实际主轴转速(多个值)
						spinLoad: this.strToArrFun(item.spinLoad), // 主轴负载 (多个值)
						maxSpinLoad: this.strToArrFun(item.maxSpinLoad), // 主轴最大负载(多个值)
						fCode: item.fCode, // 命令进给率
						actFeed: item.actFeed, // 实际进给率
						spinTmp1: item.spinTmp1, // 主轴一温度
						spinTmp2: item.spinTmp2, // 主轴二温度

            absPos: item.absPos,
            relPos: item.relPos,
            machPos: item.machPos,
						remDist: item.remDist,
						curNcBlk: item.curNcBlk,

						curNcBlk: item.curNcBlk,
						
						fV: this.twoPoint(item.fV), // 设定F值						
						ovFeed: this.twoPoint(item.ovFeed), // F倍率						
						actFeed : this.twoPoint(item.actFeed),// 实际进给						
						rV: this.strToArrFun(item.rV),// 设定S值(多个值)						
						ovSpin: this.strToArrFun(item.ovSpin),// 主轴倍率	(多个值)										
				}
				// console.log('devicehhh:',this.deviceData)
				let widthContainer = 715
				let liWidth = 100
				let contentWidth = 715
				const itemLen = this.deviceData.axisName.length;
				// console.log('uuu:',itemLen)
				if (itemLen<=7) {
					liWidth = (widthContainer/itemLen)-2
					contentWidth = 715
				} else {
					liWidth = 100
					contentWidth = itemLen*100+itemLen*2
				}
				this.$nextTick(()=> {
					// console.log('hh:',document.getElementById('xscrollbarCon'))

					document.getElementById('xscrollbarCon').style.width = contentWidth+'px'
					const topConDom = document.getElementsByClassName('deviceDetailXmzLiItem')
					// console.log('topConDom:',topConDom.length)
					if (!topConDom.length) return;
					for (var i=0;i<topConDom.length;i++) {
						topConDom[i].style.width = liWidth+'px'
					}
				})

			},
      async getJGLDanwei(Danwei){
				const currentDateStr = this.getDayStrFun()
				const dayType = this.getDayTypeFun()
			  const res = await reqJGLDanwei(Danwei, currentDateStr, dayType)
        if(res&&res.code===200){
			    if(res.data!==null){
			      this.danwei = res.data.dataUnit
          }
        }
      },
			//-----------------右上角设备参数信息 end ------------->

			// 饼图echarts
			renderPie(data) {
				var myChart = echarts.init(this.pieDom)
				var option = null
				option = {

					tooltip: {
						trigger: 'item',
						formatter: " {b} : {c}m <br/>百分比 : {d}%"
					},

					series: [{
							name: '访问来源',
							type: 'pie',
							radius: '55%',
							center: ['center', 'center'],
							/* data: [{
									value: 335,
									name: '作业',

								},
								{
									value: 310,
									name: '待机',
									selected: true
								},
								{
									value: 234,
									name: '故障',

								},
								{
									value: 135,
									name: '关机',
									selected: true
								},

							], */
							data: data,
							label: {
								color: '#fff',
								formatter: '{b}:{c}m'
								//position:'inner'

							},
							itemStyle: {
								/* normal:{
									label:{
									show: true,
									formatter: '{b} : {c} ({d}%)'
									},
								}, */
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								},
								color: function(params) {
									//自定义颜色
									var colorList = [
										'#25EE3D', '#FFC620', '#F50400', '#48494B',
									];
									return colorList[params.dataIndex]
								}
							}
						},

					]
				};
				if (option && typeof option === 'object') {
					myChart.setOption(option, true);
				}
			},
			// 饼图echarts和进度条数据 和 左上角设备工作状态和时间
			async findMachineConnectioninfo(deviceID) {
				const currentDateStr = this.getDayStrFun()
				const dayType = this.getDayTypeFun()
				const params = {
					deviceID: deviceID,
					date: currentDateStr,
					dayType: dayType
        }
        const res = await machineConnectioninfo(params);
				this.progress[0].percentage = Math.floor(res.data.startupTime * 100 * 100) / 100 // 作业百分比
				this.progress[0].time = this.countTime(res.data.startupTimeMinute) || 0 // 作业时间
				this.progress[1].percentage = Math.floor(res.data.standbyTime * 100 * 100) / 100 // 待机百分比
				this.progress[1].time = this.countTime(res.data.standbyTimeMinute) // 待机时间
				this.progress[2].percentage = Math.floor(res.data.failureTime * 100 * 100) / 100 // 故障百分比
				this.progress[2].time = this.countTime(res.data.failureTimeMinute) // 故障时间
				this.progress[3].percentage = Math.floor(res.data.offTime * 100 * 100) / 100 // 关机百分比
				this.progress[3].time = this.countTime(res.data.offTimeMinute) // 关机时间

				this.echartsData[0].value = this.returnMin(res.data.startupTimeMinute) // 作业时间(min)
				this.echartsData[1].value = this.returnMin(res.data.standbyTimeMinute) // 待机时间(min)
				this.echartsData[2].value = this.returnMin(res.data.failureTimeMinute) // 故障时间(min)
				this.echartsData[3].value = this.returnMin(res.data.offTimeMinute) // 关机时间(min)

        const currentStatus = res.data.machineStatus;
        if(currentStatus===1){ // 作业
          this.deviceDataObj.time = this.progress[0].time
        } else if(currentStatus===2) { // 待机
          this.deviceDataObj.time = this.progress[1].time
        } else if(currentStatus===4) { // 故障
          this.deviceDataObj.time = this.progress[2].time
        } else if(currentStatus===3) { // 关机
          this.deviceDataObj.time = this.progress[3].time
        } 
        this.deviceDataObj.machineStatus = currentStatus

				this.$nextTick(() => {
					this.pieDom = document.getElementById('pieY');
					this.renderPie(this.echartsData);
				})
				
			},
			// 计算时间函数
			countTime(value) {
				var h = Math.floor(value / 3600) < 10 ? '0' + Math.floor(value / 3600) : Math.floor(value / 3600);
				var m = Math.floor((value / 60 % 60)) < 10 ? '0' + Math.floor((value / 60 % 60)) : Math.floor((value / 60 % 60));
				var s = Math.floor(value % 60) < 10 ? '0' + Math.floor((value % 60)) : Math.floor((value % 60));
				return h + ':' + m + ':' + s
			},
			// 返回分钟
			returnMin(value) {
				var m = Math.floor(value / 60 * 100) / 100;
				return m
			},
			handleResize() {
				echarts.init(document.getElementById('pieY')).resize();
			},

    },
    destroyed() {
      clearInterval(this.IntervalId)
    }
	}
</script>
<style lang="scss" scoped>

	// 标题
	.device_titleBox {
		padding-left: 15px;
		height: 50px;

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
		display: flex;
		overflow: hidden;
		padding: 0px 20px 20px 20px;
	}


	.device_mainLeft {
		// border:1px solid red;
		height: 100%;
		width: 315px;


		//padding: 0 15px 15px 15px;
		margin-right: 15px;
		display: flex;
		flex-direction: column
	}

	.device_leftTop {
		background: rgba(0, 186, 255, 0.1);
		padding-top: 25px;
		padding-bottom: 40px;
		flex: 1.5;
		display: flex;
		flex-direction: column;
		// width: 100%;

		.name {
			font-size: 30px;
			color: #fff;
			text-align: center;
			height: 40px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
		}

		.img {
			width: 100%;
			margin: 10px auto 0;
			text-align: center;
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.timeBox {
			width: 266px;
			height: 90px;
			position: relative;
			margin: 10px auto 0;
			// border:1px solid red;
			background-image: url(../../assets/images/DeviceConnect_time.png);
			background-size: 100% 100%;
		}

		.text {
			font-size: 36px;
			color: #01ff8a;
			position: absolute;
			top: 20px;
			left: 20px;
		}

		.time {
			font-size: 22px;
			color: #00fcf9;
			position: absolute;
			bottom: 5px;
			right: 20px;
		}
	}

	.device_leftBottom {
		background: rgba(0, 186, 255, 0.1);
		margin-top: 15px;
		font-size: 18px;
		color: #aec9ff;
		padding: 15px;
		flex: 1;
		//height:276px;
		overflow: hidden;

		/deep/ .el-scrollbar__wrap {
			overflow-x: hidden;
		}

		ul {
			padding: 15px;

			li {
				margin-top: 5px;
				font-size: 0.18rem;
				color: #aec9ff;
			}

			.curNcBlk0 {
				color: #ffffff;
				font-size: 0.24rem;
			}
		}
	}



	.device_mainRight {
		height: 100%;
		width: calc(100% - 410px - 15px);
		flex: 1;
		// background: rgba(39, 69, 111, 0.3);
		display: flex;
		flex-direction: column
	}

	.device_rightTop {
		background: rgba(39, 69, 111, 0.3);
		padding: 15px;
		flex: 1.47;
	}

	.device_rightBottom {
		// margin:15px;
		margin-top: 15px;
		// width: 100%;
		//padding: 0px 0px 15px 0px;
		//height:276px;
		flex: 1;
		display: flex;

		&-left {
			//width:860px;
			background: rgba(39, 69, 111, 0.3);
			flex: 1
		}

		&-right {
			flex: 1;
			margin-left: 15px;
			background: rgba(39, 69, 111, 0.3);

		}
	}


	// djw start
	.DeviceParams {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		// background: #021035;
		.dljitem {
			/* background: #021035;*/
		}

		.topConent {
			flex: 2;
			display: flex;
			background-color: rgba(0, 186, 255, 0.2);

			.topConentLi {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;

				.mainProcedureLiSpan {
					font-size: 0.14rem;
					color: #ffffff;
					display: flex;
					align-items: center;

					em {
						font-size: 0.2rem;
						color: #00c7fa;
						max-width: 170px;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}
				}
			}
			.mainProcedure{ flex: 1.4 }
			.otherProcedure{ flex: 1.4 }

			.zhibiao {
				flex: 1.3;
			}
		}

		.centerConent {
			flex: 3;
			display: flex;
			margin: 15px 0;
			background-color: rgba(0, 186, 255, 0.2);
			align-items: center;
			.centerContentLi {
				flex: 1;
				display: flex;
				flex-direction: column;
				margin: 2px;
				position: relative;max-height: 125px;min-height: 75px;
				// border:1px solid #ff0;
				.centerContentDiv {
					// border:1px solid red;
/* 					flex: 1;
					display: flex;
					margin: 2px;
					align-items: center;
					justify-content: start; */
					label {
						color: #fff;font-size: 0.14rem;width: 120px;text-align: right;display:inline-block;
					}
					span {
						color: #00c7fa;font-size: 0.2rem;margin-left:15px;
					}
					&:nth-child(2n) {
						margin-top: 3%;
					}
				}
			}
		}

		.bottomConent {
			// flex: 3;
			height: 161px;
			display: flex;

			.bottomConentUl {
				flex: 1;
				display: flex;

				.bottomConentLi {
					flex: 1;
					display: flex;
					box-sizing: border-box;
				}

				.bottomConentLiRight {
					display: flex;height:161px;margin-left:10px;

					.bottomConentLiRightUl {
						display: flex;
						flex: 1;

						li {
							flex: 1;
							display: flex;
							margin: 1px;

							.bottomConentLiRightUlF {
								flex: 1;
								display: flex;
								justify-content: center;
								align-items: center;
								background: linear-gradient(rgba(51, 171, 251, 0.3), rgba(136, 209, 247, 0.3));
								font-size: 0.2rem;
								color: #fff;
							}

							.bottomConentLiRightUlFS {
								flex: 1.5;
								display: flex;
								flex-direction: column;

								li {
									flex: 1;
									display: flex;
									justify-content: center;
									align-items: center;
									background: rgba(0, 186, 255, 0.2);
									font-size: 0.14rem;
									color: #fff;
								}
								.twoColumn{
									width: 50%;height:100%;line-height: 51px;text-align: center;
									&:nth-child(2n){ border-left: 2px solid #13284d; }
								}
							}

							.FSnumber {
								flex: 2;
								li {
									font-size: 0.16rem;
									color: #00c7fa;
								}
							}
						}
					}
				}
			}
		}
	}


.BLeftNew{
	font-size: 14px;
	display: flex;
	.label{
		color: #fff;
		width: 100px;
		ul {
			li {
				// background-color: rgba(42, 75, 133,0.3);
				background: linear-gradient(rgba(51, 171, 251, 0.3), rgba(136, 209, 247, 0.3));
				height: 30px;line-height: 30px;text-align: center;margin-top:2px;
			}
		}
	}
	.con{
		.conTop{
			margin-top:2px;color:#fff;
			// display: flex;
			li{
				// flex: 1;
				width: 100px;display: inline-block;
				// background-color: rgba(42, 75, 133,0.3);
				background: linear-gradient(rgba(51, 171, 251, 0.3), rgba(136, 209, 247, 0.3));margin-left:2px;
				height: 30px;line-height: 30px;text-align: center;
			}
		}
		.conBottom{
			color:#00c7fa;
			li {
				// display: flex;
				background-color: rgba(0, 186, 255,0.1);margin-top:2px;
				span{
					// flex: 1;
					display: inline-block;width: 100px;margin-left:2px;
					height: 30px;line-height: 30px;text-align: center;
				}
			}
		}
		.xscrollbar /deep/ .el-scrollbar__bar.is-horizontal{ opacity: 1; }
		// .xscrollbar-con{ width: 730px; }
	}
}
	// djw end


	//mfs start
	.my_box {
		font-size: 12px;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;

		.myBox_left {
			//border: 1px solid gray;
			flex: 1;
			margin-right: 0.10rem;
			//background: rgba(39, 69, 111, 1);
			display: flex;
			flex-direction: row;

			.progress_box {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				margin: 0px 20px;

				.progress_item {
					display: flex;
					flex-direction: row;
					height: 0.15rem;
					margin-bottom: 0.30rem;

					.title {
						width: 0.55rem;
						text-align: center;
						color: #fff;
						position: relative;
					}

					.title:after {
						content: '';
						display: inline-block;
						width: 0.10rem;
						height: 0.10rem;
						position: absolute;
						background: #25EE3D;
						left: 0px;
						border-radius: 0.10rem;
						top: 0.03rem;
					}

					.progress {
						flex: 3;

						/deep/ .el-progress-bar__outer {
							background: rgba(20, 59, 100, .5)
						}

						/deep/ .el-progress-bar__innerText {
							color: #000;
						}
					}

					.time {
						width: 0.55rem;
						text-align: center;
						color: #3C8BC3;
					}
				}

				.progress_item:nth-of-type(2) {
					.title:after {
						background: #FFC620;
					}
				}

				.progress_item:nth-of-type(3) {
					.title:after {
						background: #F50400;
					}
				}

				.progress_item:nth-of-type(4) {
					margin-bottom: 0;

					.title:after {
						background: #48494B;
					}
				}
			}

			.pie_box {
				flex: 1;
			}
		}

		.myBox_right {
			border: 1px solid gray;
			flex: 1;
			background: rgba(39, 69, 111, 1);
		}
	}

	//mengfs end



	.splitLine{
		width:2px;height: 70%;background-color:#1963b4;position:absolute;right:10%;top: 50%;transform: translateY(-50%)
	}
</style>
