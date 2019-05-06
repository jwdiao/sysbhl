<template>
	<div class='my_box'>
		<div class="myBox_left">
			<div class="progress_box">
				<div style="" class="progress_item" v-for="(item , index) in progress" :key="item.id">
					<div class="title">{{item.title}}</div>
					<div class="progress">
						<el-progress :percentage="item.percentage" :stroke-width="15" :text-inside="true" :color="item.color"></el-progress>
					</div>
					<div class="time">{{item.time}}</div>
				</div>
			</div>
			<div class="pie_box">
                <div id="pie" style="width:100%;height:100%" >
					
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	import echarts from 'echarts'
	import moment from 'moment'
	import http from '../../api/http'
	export default {
		name: 'busy',
		data() {
			return {
				message: 'hello world',
				progress: [{
						id: 1,
						title: '作业',
						percentage: 20,
						color: '#25EE3D',
						time: '09:32:33'
					}, {
						id: 2,
						title: '待机',
						percentage: 30,
						color: '#FFC620',
						time: '09:32:33'
					},
					{
						id: 3,
						title: '故障',
						percentage: 40,
						color: '#F50400',
						time: '09:32:35'
					}, {
						id: 4,
						title: '关机',
						percentage: 50,
						color: '#48494B',
						time: '09:32:33'
					}
				]
			}

		},
		mounted() {
			
           this.renderPie(document.getElementById('pie'));
		   window.addEventListener('resize', this.handleResize);
		},
		methods: {
			renderPie(dom) {
				var myChart = echarts.init(dom)
				var option = null
				option = {

					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},

					series: [{
						name: '访问来源',
						type: 'pie',
						radius: '55%',
						center: ['center', 'center'],
						data: [{
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
						label:{
							color:'#fff',
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
							color:function(params) {
                                    //自定义颜色
                                    var colorList = [          
                                            '#25EE3D', '#FFC620', '#F50400', '#48494B', 
                                        ];
                                        return colorList[params.dataIndex]
                            }
						}
					},
					{
						
							name: '访问来源',
							type: 'pie',
							radius: '55%',
							center: ['center', 'center'],
							data: [{
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
							label:{
								color:'#fff',
						        position:'inner',
						        formatter: '{d}%'
								
							},
							itemStyle: {
								
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								},
								color:function(params) {
						                //自定义颜色
						                var colorList = [          
						                        '#25EE3D', '#FFC620', '#F50400', '#48494B', 
						                    ];
						                    return colorList[params.dataIndex]
						        }
							}
					}
					]
				};
				if (option && typeof option === 'object') {
					myChart.setOption(option, true);
				}
				
				/* myChart.dispatchAction({
				type: 'showTip',
				seriesIndex:0 ,//第几条series
				dataIndex: 1,//第几个tooltip
				}) */
			},
			handleResize(){
				echarts.init(document.getElementById('pie')).resize();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my_box {
		font-size: 12px;
		width: 100%;
		height:100%;
		height: 3rem;
		margin: 0.1rem auto;
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

				/* 			    /deep/ .el-progress--text-inside .el-progress-bar{
					margin:15px 0px; 
				} */
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
					margin-bottom:0;
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
</style>
