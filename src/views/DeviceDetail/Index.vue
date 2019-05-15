<template>
	<div class="device">
		<div class="device_head">
			<div class="leftInfo" @click="$router.push('/DeviceList')" style="cursor:pointer"><img src="../../assets/images/common_back.png"></div>
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
							<img src="../../assets/images/DeviceConnect_jc.png" style="width:80%;height:80%"/>
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
									<span class="mainProcedureLiSpan">主程序&nbsp;&nbsp; <em> {{deviceData.mainPgm}} </em></span>
								</li>
								<li class="otherProcedure topConentLi">
									<span class="mainProcedureLiSpan">执行程序&nbsp;&nbsp; <em> {{deviceData.curPgm}}</em></span>
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
							<ul class="centerConent dljitem">
								<li class="centerContentLi">
									<ul class="centerContentDiv" style="margin-bottom: -0.3rem;">
										<li class="centerContentDivSpanZhuZhou"><em>给定主轴转速</em> </li>
										<li class="centerContentDivSpanZhuZhouNumber" v-if="!deviceData.scode"><em></em></li>
										<li class="centerContentDivSpanZhuZhouNumber" v-else><em>&nbsp;&nbsp;&nbsp;{{Math.floor(deviceData.scode)||0}}&nbsp;RPM</em></li>
									</ul>
									<ul class="centerContentDiv">
										<li class="centerContentDivSpanZhuZhou"><em>实际主轴转速 </em></li>
										<li class="centerContentDivSpanZhuZhouNumber" v-if="!deviceData.actSpin"><em>&nbsp;</em></li>
										<li class="centerContentDivSpanZhuZhouNumber" v-else><em>&nbsp;&nbsp;&nbsp;{{Math.floor(deviceData.actSpin)||0}}&nbsp;RPM</em></li>
									</ul>
								</li>
								<li class="centerContentLi">
									<ul class="centerContentDiv" style="margin-bottom: -0.3rem;">
										<li class="centerContentDivSpanZhuZhou"><em>主轴负载率</em> </li>
										<li class="centerContentDivSpanZhuZhouNumber" style="margin-left: -0.5rem" v-if="!deviceData.spinLoad"><em></em></li>
										<li class="centerContentDivSpanZhuZhouNumber" style="margin-left: -0.5rem" v-else><em>&nbsp;&nbsp;&nbsp;{{Math.floor(deviceData.spinLoad)}}&nbsp;%</em></li>
									</ul>
									<ul class="centerContentDiv">
										<li class="centerContentDivSpanZhuZhou"><em>主轴最大负载率 </em></li>
										<li class="centerContentDivSpanZhuZhouNumber" style="margin-left: -0.5rem" v-if="!deviceData.maxSpinLoad"><em>&nbsp;&nbsp;</em></li>
										<li class="centerContentDivSpanZhuZhouNumber" style="margin-left: -0.5rem" v-else><em>&nbsp;&nbsp;&nbsp;{{Math.floor(deviceData.maxSpinLoad)}}&nbsp;%</em></li>
									</ul>
								</li>
								<li class="centerContentLi">
									<ul class="centerContentDiv" style="margin-bottom: -0.3rem;">
										<li class="centerContentDivSpanZhuZhou"><em>给定进给率</em> </li>
										<li class="centerContentDivSpanZhuZhouNumber" style="margin-left: -1rem" v-if='!deviceData.fCode'><em></em></li>
										<li class="centerContentDivSpanZhuZhouNumber" style="margin-left: -1rem" v-else><em>&nbsp;&nbsp;&nbsp;{{Math.floor(deviceData.fCode)+ '&nbsp;' + danwei }}</em></li>
									</ul>
									<ul class="centerContentDiv">
										<li class="centerContentDivSpanZhuZhou"><em>实际进给率 </em></li>
										<li class="centerContentDivSpanZhuZhouNumber" style="margin-left: -1rem" v-if="!deviceData.actFeed"><em>&nbsp;&nbsp;</em></li>
										<li class="centerContentDivSpanZhuZhouNumber" style="margin-left: -1rem" v-else><em>&nbsp;&nbsp;&nbsp;{{Math.floor(deviceData.actFeed)+ '&nbsp;' +  danwei }}</em></li>
									</ul>
								</li>
								<li class="centerContentLi">
									<ul class="centerContentDiv" style="margin-bottom: -0.3rem;">
										<li class="centerContentDivSpanZhuZhou"><em>主轴一温度</em> </li>
										<li class="centerContentDivSpanZhuZhouNumber" style="margin-left: -1rem" v-if="!deviceData.spinTmp1"><em>&nbsp;</em></li>
										<li class="centerContentDivSpanZhuZhouNumber" style="margin-left: -1rem" v-else><em>&nbsp;&nbsp;&nbsp;{{deviceData.spinTmp1 !== '0.00' ?Math.floor(deviceData.spinTmp1)+'&nbsp;℃':'/'}}</em></li>
									</ul>
									<ul class="centerContentDiv">
										<li class="centerContentDivSpanZhuZhou"><em>主轴二温度 </em></li>
										<li class="centerContentDivSpanZhuZhouNumber" style="margin-left: -1rem" v-if="!deviceData.spinTmp2"></li>
										<li class="centerContentDivSpanZhuZhouNumber" style="margin-left: -1rem" v-else><em>&nbsp;&nbsp;&nbsp;{{deviceData.spinTmp2 !== '0.00' ?Math.floor(deviceData.spinTmp2)+'&nbsp;℃':'/'}}</em></li>
									</ul>
								</li>

							</ul>
							<!--底部-->
							<div class="bottomConent dljitem">
								<ul class="bottomConentUl">
									<!--bottom左侧-->
									<li class="BLeft">
										<ul class="BLeftLine">
											<li>
												<ul class="BLeftLineUl">
													<li class="BLeftLineUlLi bgTitle"></li>
													<li class="BLeftLineUlLi bgTitle">X</li>
													<li class="BLeftLineUlLi bgTitle">Y</li>
													<li class="BLeftLineUlLi bgTitle">Z</li>
													<li class="BLeftLineUlLi bgTitle">C</li>
													<li class="BLeftLineUlLi bgTitle">B</li>
												</ul>
											</li>
										</ul>
										<ul class="BLeftLine">
											<li>
												<div class="BLeftLineUlDiv bgTitle">绝对坐标</div>
												<ul class="BLeftLineUl" v-for="(item,index) in deviceData.absPos ||5">
													<li class="BLeftLineUlLi">{{typeof item === "number" ? 0 : item}}</li>
												</ul>
											</li>
										</ul>
										<ul class="BLeftLine">
											<li>
												<div class="BLeftLineUlDiv bgTitle">相对坐标</div>
												<ul class="BLeftLineUl" v-for="(item,index) in deviceData.relPos ||5">
													<li class="BLeftLineUlLi">{{typeof item === "number" ? 0 : item}}</li>
												</ul>
											</li>
										</ul>
										<ul class="BLeftLine">
											<li>
												<div class="BLeftLineUlDiv bgTitle">机械坐标</div>
												<ul class="BLeftLineUl" v-for="(item,index) in deviceData.machPos||5">
													<li class="BLeftLineUlLi">{{typeof item === "number" ? 0 : item}}</li>
												</ul>
											</li>
										</ul>
										<ul class="BLeftLine">
											<li>
												<div class="BLeftLineUlDiv bgTitle">剩余距离</div>
												<ul class="BLeftLineUl" v-for="(item,index) in deviceData.remDist ||5">
													<li class="BLeftLineUlLi">{{typeof item === "number" ? 0 : item}}</li>
												</ul>
											</li>
										</ul>

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
													<li v-if="!deviceData.fV"></li>
													<li v-else>{{deviceData.fV !== '0' ?Math.floor(deviceData.fV):'/'}}</li>
													<li v-if="!deviceData.ovFeed"></li>
													<li v-else>{{deviceData.ovFeed||0}}</li>
													<li v-if="!deviceData.actFeed"></li>
													<li v-else>{{deviceData.actFeed||0}}</li>
												</ul>
											</li>
											<li>
												<div class="bottomConentLiRightUlF">S</div>
												<ul class="bottomConentLiRightUlFS">
													<li>设定S值</li>
													<li>主轴倍率</li>
													<li>主轴负载</li>
												</ul>
												<ul class="bottomConentLiRightUlFS FSnumber">
													<li v-if="!deviceData.rV"></li>
													<li v-else>{{deviceData.rV !== '0' ?Math.floor(deviceData.rV):'/'}}</li>
													<li v-if="!deviceData.ovSpin"></li>
													<li v-else>{{deviceData.ovSpin||0}}</li>
													<li v-if="!deviceData.spinLoad"></li>
													<li v-else>{{deviceData.spinLoad||0}}</li>
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
										<div id="pie" style="width:100%;height:100%">
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
	import EchartsLine from './EchartsLine.vue'
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
				deviceData: {}, // 右上角设备参数信息
        danwei:'', //进给率 的单位
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
			this.renderPie(document.getElementById('pie'), this.echartsData);


			window.addEventListener('resize', this.handleResize); // echarts图自适应

      this.IntervalId = setInterval(()=>{
				this.getDeviceParamsInfo(deviceID)  // 右上角设备参数信息
        this.getJGLDanwei(deviceID) // 右上角--进给率单位				
        this.findMachineConnectioninfo(deviceID);
      },5000)

		},
		methods: {
			//----------------右上角设备参数信息  start -------------->
			async getDeviceParamsInfo(deviceID) {
        const res = await reqDeviceRightList(deviceID)
				if (res && res.code === 200) {
          if(res.data!==null){
            this.deviceData = res.data
            this.deviceData.mainPgm === '-100000.0F' ? this.deviceData.mainPgm = ' ' : this.deviceData.mainPgm
            this.deviceData.curPgm === '-100000.0F' ? this.deviceData.curPgm = ' ' : this.deviceData.curPgm
            this.deviceData.mode === '-100000.0F' ? this.deviceData.mode = ' ' : this.deviceData.mode
            this.deviceData.ncStatus === '-100000.0F' ? this.deviceData.ncStatus = ' ' : this.deviceData.ncStatus
            this.deviceData.alarm === '-100000.0F' ? this.deviceData.alarm = ' ' : this.deviceData.alarm
            this.deviceData.emg === '-100000.0F' ? this.deviceData.emg = ' ' : this.deviceData.emg
            this.deviceData.curNcPtr === '-100000.0F' ? this.deviceData.curNcPtr = '' : this.deviceData.curNcPtr
            this.deviceData.scode === '-100000.0F' ? this.deviceData.scode = '' : this.deviceData.scode
            this.deviceData.actSpin === '-100000.0F' ? this.deviceData.actSpin = '' : this.deviceData.actSpin
            this.deviceData.spinLoad === '-100000.0F' ? this.deviceData.spinLoad = '' : this.deviceData.spinLoad
            this.deviceData.maxSpinLoad === '-100000.0F' ? this.deviceData.maxSpinLoad = '' : this.deviceData.maxSpinLoad
            this.deviceData.fCode === '-100000.0F' ? this.deviceData.fCode = '' : this.deviceData.fCode
            this.deviceData.actFeed === '-100000.0F' ? this.deviceData.actFeed = '' : this.deviceData.actFeed
            this.deviceData.spinTmp1 === '-100000.0F' ? this.deviceData.spinTmp1 = '' : this.deviceData.spinTmp1
            this.deviceData.spinTmp2 === '-100000.0F' ? this.deviceData.spinTmp2 = '' : this.deviceData.spinTmp2

            this.deviceData.absPos[0] === '-100000.0F' ? this.deviceData.absPos = [' ',' ',' ',' ',' '] : this.deviceData.absPos
            this.deviceData.relPos[0] === '-100000.0F' ? this.deviceData.relPos = [' ',' ',' ',' ',' '] : this.deviceData.relPos
            this.deviceData.machPos[0] === '-100000.0F' ? this.deviceData.machPos = [' ',' ',' ',' ',' '] : this.deviceData.machPos
            this.deviceData.remDist[0] === '-100000.0F' ? this.deviceData.remDist = [' ',' ',' ',' ',' '] : this.deviceData.remDist

            this.deviceData.curNcBlk[0] === '-100000.0F' ? this.deviceData.curNcBlk = [' '] : this.deviceData.curNcBlk

            this.deviceData.fV === '-100000.0F' ? this.deviceData.fV = '' : this.deviceData.fV
            this.deviceData.ovFeed === '-100000.0F' ? this.deviceData.ovFeed = '' : this.deviceData.ovFeed
            this.deviceData.actFeed === '-100000.0F' ? this.deviceData.actFeed = '' : this.deviceData.actFeed
            this.deviceData.rV === '-100000.0F' ? this.deviceData.rV = '' : this.deviceData.rV
            this.deviceData.ovSpin === '-100000.0F' ? this.deviceData.ovSpin = '' : this.deviceData.ovSpin
            this.deviceData.spinLoad === '-100000.0F' ? this.deviceData.spinLoad = '' : this.deviceData.spinLoad


          } else {
            this.deviceData = {
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
              rV:'/',
              ovSpin:'',
              absPos:[],
              relPos:[],
              machPos:[],
              remDist:[],
            }
          }

				}
			},
      async getJGLDanwei(Danwei){
			  const res = await reqJGLDanwei(Danwei)
        if(res&&res.code===200){
			    if(res.data!==null){
			      this.danwei = res.data.dataUnit
          }
        }
      },
			//-----------------右上角设备参数信息 end ------------->

			// 饼图echarts
			renderPie(dom, data) {
				var myChart = echarts.init(dom)
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
				const dateStr = moment(new Date()).format('YYYY-MM-DD');
				const params = {
					onemachineNo: deviceID,
					date: dateStr
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

				this.renderPie(document.getElementById('pie'), this.echartsData);
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
				echarts.init(document.getElementById('pie')).resize();
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
			flex: 1.5
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
					font-size: 0.16rem;
					color: #ffffff;
					display: flex;
					align-items: center;

					em {
						font-size: 0.24rem;
						color: #00c7fa;
					}
				}
			}

			.zhibiao {
				flex: 1.3;
			}
		}

		.centerConent {
			flex: 3;
			display: flex;
			margin: 15px 0;
			background-color: rgba(0, 186, 255, 0.2);

			.centerContentLi {
				flex: 1;
				display: flex;
				flex-direction: column;
				margin: 2px;

				.centerContentDiv {
					flex: 1;
					display: flex;
					margin: 2px;
					justify-content: center;
					align-items: center;

					.centerContentDivSpan {
						font-size: 0.16rem;
						flex: 1;
						display: flex;
						justify-content: center;
						align-items: center;
						color: #ffffff;

						em {
							font-size: 0.24rem;
							color: #00c7fa;
						}
					}

					.centerContentDivSpanZhuZhou {
						flex: 1;
						text-align: left;
						height: 20%;
						line-height: 100%;
            padding-left: 1rem;

						em {
							font-size: 0.16rem;
							color: #ffffff;
						}
					}

					.centerContentDivSpanZhuZhouNumber {
						flex: 1;
						text-align: left;
						height: 20%;
						line-height: 100%;
            margin-left: -0.8rem;

						em {
							font-size: 0.24rem;
							color: #00c7fa;
						}
					}
				}
			}
		}

		.bottomConent {
			flex: 4;
			display: flex;

			.bottomConentUl {
				flex: 1;
				display: flex;

				.bottomConentLi {
					flex: 1;
					display: flex;
					box-sizing: border-box;
				}

				/*.bottomConentLiLeft{
        !*background-color: rgba(0,186,255,0.2);*!
        margin-right: 10px;
        display: flex;
        .titleXYZ{
          flex: 1;
          display: flex;flex-direction: column;
          li{
            flex: 1;
            margin: 1px;
            background-color: rgba(0,186,255,0.2)
          }
          .colorWhite{
            background:linear-gradient(rgba(51,171,251,0.3),rgba(136,209,247,0.3));
            color: #fff;
          }
          .margin0{
            margin:1px 0px ;
          }
        }
        .titleLeft{
          li{
            display: flex;
            color: #ffffff;
            font-size: 0.16rem;
            justify-content: center;
            align-items: center;
            background:linear-gradient(rgba(51,171,251,0.3),rgba(136,209,247,0.3));
          }
        }
        .titleConent{
          li{
            display: flex;
            color: #00c7fa;
            font-size: 0.16rem;
            justify-content: center;
            align-items: center;
          }
        }
      }*/
				.BLeft {
					flex: 1;
					display: flex;
					flex-direction: column;
					margin-right: 10px;
					box-sizing: border-box;

					.BLeftLine {
						flex: 1;
						display: flex;

						/*background:#0DCCEA ;*/
						/*margin: 1px;*/
						li {
							flex: 1;
							display: flex;

							.BLeftLineUl {
								flex: 5;
								display: flex;

								.BLeftLineUlLi {
									flex: 1;
									justify-content: center;
									align-items: center;
									background-color: rgba(0, 186, 255, 0.2);
									margin: 1px 0px;
									font-size: 0.16rem;
									color: #ffffff;
									;
								}

								.bgTitle {
									background: linear-gradient(rgba(51, 171, 251, 0.3), rgba(136, 209, 247, 0.3));
									margin-right: 1px;
								}
							}

							.BLeftLineUlDiv {
								flex: 5;
								display: flex;
								justify-content: center;
								align-items: center;
								background: linear-gradient(rgba(51, 171, 251, 0.3), rgba(136, 209, 247, 0.3));
								margin: 0 1px 1px 0;
								font-size: 0.16rem;
								box-sizing: border-box;
								color: #ffffff;
								text-align: center;
							}
						}
					}
				}

				.bottomConentLiRight {
					display: flex;

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
								font-size: 0.24rem;
								color: #fff;
							}

							.bottomConentLiRightUlFS {
								flex: 2;
								display: flex;
								flex-direction: column;

								li {
									flex: 1;
									display: flex;
									justify-content: center;
									align-items: center;
									background: rgba(0, 186, 255, 0.2);
									font-size: 0.16rem;
									color: #fff;
								}
							}

							.FSnumber {
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
</style>
