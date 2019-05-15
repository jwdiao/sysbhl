<template>
<div class="common_bg common_bg02">
  <CommonHead
    :isShowBackBtn="true"
    :isClickedTitle="true"
    :titleText="`${companyName}设备数据系统`"
    :isShowCurrentTime="false"
    @backBtnClick="handleBackBtn"
    @titleClick="handleTitleClick"
  />
  <div class="common_main common_blockColor ">
    <!-- common_blockColor根据实际需要添加 -->
    <div class="statistics_main">
      <div class="statistics_title-box clear">
          <div class="statistics_titleBox left">
            <span class="statistics_circle">•</span>
            <span class="statistics_title">排序统计</span>
            <img class="statistics_img" src="../../assets/images/DeviceConnect_title.png" />
          </div>
          <div class="right statistics_search">
            <el-date-picker
              v-model="dateValue"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <el-select v-model="craftValue" placeholder="请选择" class="common_select marginLeft10">
              <el-option
                v-for="item in craftOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="centerValue" placeholder="请选择" class="common_select marginLeft10">
              <el-option
                v-for="item in centerOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="machineTypeValue" placeholder="请选择" class="common_select marginLeft10">
              <el-option
                v-for="item in machineTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="bootRateValue" placeholder="请选择" class="common_select marginLeft10">
              <el-option
                v-for="item in bootRateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <div class="marginLeft15 inlineBlock common-btn">检索排名</div>
            <div class="marginLeft15 inlineBlock common-btn2">导出</div>
          </div>
      </div>

      <div id="onlineCount" class="statistics_echarts"></div>

      <div class="statistics_total">
        <div class="statistics_totalItem">
          <p class="statistics_percent green">100%</p>
          <p class="statistics_label">最大  P-XQG-0069</p>
        </div>
        <div class="statistics_totalItem">
          <p class="statistics_percent orange">100%</p>
          <p class="statistics_label">平均效率</p>
        </div>
        <div class="statistics_totalItem">
          <p class="statistics_percent red">100%</p>
          <p class="statistics_label">最小</p>
        </div>
      </div>

      <div class="statistics_title-box">
          <div class="statistics_titleBox">
            <span class="statistics_circle">•</span>
            <span class="statistics_title">详细信息</span>
            <img class="statistics_img" src="../../assets/images/DeviceConnect_title.png" />
          </div>
      </div>
      <div class="common_table statistics_table">
        <div class="table_thead">
          <span class="table_td">序号</span>
          <span class="table_td">机床名称</span>
          <span class="table_td">机床编号</span>
          <span class="table_td">工艺类型</span>
          <span class="table_td">工作中心</span>
          <span class="table_td">开机率</span>
        </div>
        <div class="table_tbody">
          <el-scrollbar class="table_tbodyInner">
            <div class="table_tr" v-for="item in 20">
              <span class="table_td">1</span>
              <span class="table_td">AQ400LS_P-XQG-0069</span>
              <span class="table_td">P-XQG-DO69</span>
              <span class="table_td">数据</span>
              <span class="table_td">数据 </span>
              <span class="table_td">100%</span>
            </div>
          </el-scrollbar>
        </div>
      </div>
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

      <!-- <div id="lineEcharts" class="statistics_echarts"></div> -->
    </div>
  </div>

  <!-- 弹窗 -->
  <div class="statistics_echartsDialog">
    <div class="statistics_echartsDialogInner">
      <div class="lineEcharts"></div>
      <div class="table"></div>
    </div>
  </div>
  <!-- 弹窗end -->
</div>
</template>
<script>
import echarts from 'echarts'
import CommonHead from '@/components/Head'
export default {
  name: 'Test',
  components: {
    CommonHead,
  },
  data() {
    return {
      companyCode: '0301', // 选中的公司code
      companyName: '北京桩机', // 选中的公司name
      dateValue: '', // 日期选择
      craftOptions: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      craftValue: '', // 工艺值
      centerOptions: [{ // 工艺opt
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      centerValue: '',
      machineTypeOptions: [{ // 机床类型opt
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      machineTypeValue: '', // 机床类型value
      bootRateOptions: [{ // 开机率下拉
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      bootRateValue: '', // 开机率下拉值
      echartsAdata: {
        xAxis : ['快而居','珠海港机','三一叶片','邵阳湖棋'],
        yData : ['20','68','82','40']
      },
      pageSize: 10,
      pageNum: 1,
      total: 0
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

    this.renderEchartsOnlineCount(echarts.init(document.getElementById('onlineCount')),this.echartsAdata)
    // this.renderEchartsLine(echarts.init(document.getElementById('lineEcharts')))
  },
  methods: {
    // 返回按钮回调
    handleBackBtn() {
      console.log('back btn clicked!')
      this.$router.push('/OverView');
    },
    // 标题按钮回调
    handleTitleClick() {
      console.log('title clicked!')
      this.showCompanyDialog = true // 关闭弹窗
    },
    // 柱状图
    renderEchartsOnlineCount(myChart, echartsAdata) { //在线统计echarts
      var option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '0%',
          top: '15%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: echartsAdata.xAxis,
          axisTick: {
            show: false,
            alignWithLabel: true
          },
          axisLine: { // 控制x轴线的样式
            lineStyle: {
              type: 'solid',
              color: '#56aefb',
              width: '1'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#2fdaeb'
            },
            interval: 0,
            rotate: 40
          },

        }],
        yAxis: [{
          type: 'value',
          min: 0,
          // max: data.maxY,
          // interval: data.intervalY,
          axisLine: { // 控制y轴线的样式
            lineStyle: {
              type: 'solid',
              color: '#55aefb',
              width: '1'
            }
          },
          axisLabel: {
            formatter: '{value}%',
            textStyle: {
              color: '#fff'
            },
            showMinLabel: true, // 是否显示最小 tick 的 label
            showMaxLabel: true, // 是否显示最大 tick 的 label
            verticalAlign: 'middle'
          },
          splitLine: { // 网格线
            show: true,
            lineStyle: {
              // color: ['#2c4264'],
              color: ['#146384'],
              width: 1,
              type: 'dotted'
            }
          },

        }],
        series: [{
          name: '在线率',
          type: 'bar',
          barWidth: '60%', // 控制柱子的宽度
          data: echartsAdata.yData,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [{
                    offset: 0,
                    color: '#05b7d4'
                  },
                  {
                    offset: 0.5,
                    color: '#2083d7'
                  },
                  {
                    offset: 1,
                    color: '#3758da'
                  }
                ]
              ),
              label: {
                show: true,
                position: 'top',
                formatter: '{c}',
                color: '#139cd6' //这是关键，在需要的地方加上就行了
              },
              barBorderRadius: 5
            },

          },
          barGap: '20%' // 控制柱子的间隔
        }]
      };
      myChart.setOption(option)
      myChart.on('click', function (params) {
        // 柱子点击事件
        console.log('click:', params)
      });
    },
    // 折线图
    renderEchartsLine(myChart) {
      var option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
        }]
      }
      myChart.setOption(option)
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNum = val
    },
  }
}
</script>
<style lang="scss" scoped>
// 标题
	.statistics_titleBox {
		padding-left: 15px;
		height: 50px;

		.statistics_circle {
			margin-left: 5px;
			font-size: 32px;
			color: rgb(2, 201, 252);
			display: inline-block;
			vertical-align: middle;
		}

		.statistics_title {
			display: inline-block;
			vertical-align: middle;
			font-size: 28px;
			color: #fff;
			margin-left: 10px;
			font-weight: bold;
		}

		.statistics_img {
			display: inline-block;
			vertical-align: middle;
			margin-left: 5px;
		}
  }
  .statistics_search{
    padding-top:8px;
  }
// nei rong
.statistics_main{
  display: flex;
  flex-direction: column;
  width: 100%;height:100%;overflow: hidden;
  padding: 15px;
  .common-pagination{
    padding:0 40px;
  }
}
.statistics_echarts{
  flex: 1;
  // height:300px;
  width: 100%;
}
.statistics_total{
  display: flex;
  padding: 0 50px;
}
.statistics_totalItem{
  flex: 1;
  text-align: center;
}
.statistics_percent{
  font-size: 27px;color:#139cd6;
  &.green{color: #00ff3c;}
  &.orange{color: #ffd800;}
  &.red{color: #ff0000;}
}
.statistics_label{
  font-size: 14px;color:#139cd6;
}

.statistics_table{
  overflow: hidden;
  height: 325px;
  padding:0 40px;
  .table_tbody{
    overflow: hidden;
    // height: 100%;
  }
  .table_tbodyInner{
    height: 270px;
  }
}
.statistics-pagination{

}

//---------------------echarts弹窗 start--------------------
.statistics_echartsDialog{

}
.statistics_echartsDialogInner{

}
.lineEcharts{

}
.table{

}
//---------------------echarts弹窗 end--------------------
</style>

