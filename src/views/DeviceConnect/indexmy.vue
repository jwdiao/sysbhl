<template>
  <div class="device">
    <div class="device_head">
      <div class="leftInfo"><img src="../../assets/images/index_back.png"></div>
      <div class="title">南口德利佳设备互联</div>
      <div class="rightInfo">
        <div class="selectCompany">
          <div class="selectCompany_btn" @click="showCompany = true">
            <span class="selectCompany_title">{{selectedCompany}}</span>
            <!--默认向下展开三角-->
            <div class="triangle triangle_top" v-show="!showCompany"></div>
            <!--点击后向上收起-->
            <div class="triangle triangle_bottom" v-show="showCompany"></div>
          </div>
        </div>
      </div>
       <div class="selectCompany_con" v-show="showCompany">
         <ul>
            <li v-for="item in companyOpt" :key="item.id" @click="selectCompanyFun(item)">{{item.title}}</li>
          </ul>
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
            <div>
              <p class="name">卧车</p>
              <div class="img"><img src="../../assets/images/DeviceConnect_jc.png" /></div>
              <div class="timeBox">
                <span class="text">运行</span>
                <span class="time">00:00:38</span>
              </div>
            </div>
          </div>
          <div class="device_leftBottom" >
            <el-scrollbar style="height:100%;" >
              <ul>
                <li v-for="item in 50" :key="item">
                  G0G90X0.Y0.S1000M3
                </li>
              </ul>
            </el-scrollbar>
          </div>
        </div>
        <div class="device_mainRight">
          <div class="device_rightTop">
            <!-- djw -->
              <div class="DeviceParams">
                <!--顶部-->
                <ul class="topConent dljitem">
                  <li class="mainProcedure topConentLi">
                    <span class="mainProcedureLiSpan">主程序 <em> Q2352</em></span>
                  </li>
                  <li class="otherProcedure topConentLi">
                    <span class="mainProcedureLiSpan">执行程序 <em> Q2352</em></span>
                  </li>
                  <li class="otherTarget topConentLi zhibiao">
                    <span class="mainProcedureLiSpan">执行行号/指标 <em> Q2352</em></span>
                  </li>
                  <li class="modals topConentLi">
                    <span class="mainProcedureLiSpan">模式 <em> Q2352</em></span>
                  </li>
                  <li class="status topConentLi">
                    <span class="mainProcedureLiSpan">状态 <em> Q2352</em></span>
                  </li>
                  <li class="unNormal topConentLi">
                    <span class="mainProcedureLiSpan">报警 <em> Q2352</em></span>
                  </li>
                  <li class="scram topConentLi">
                    <span class="mainProcedureLiSpan">急停 <em> Q2352</em></span>
                  </li>
                </ul>
                <!--中间-->
                <ul class="centerConent dljitem">
                  <li class="centerContentLi">
                    <div class="centerContentDiv">
                      <span class="centerContentDivSpan">命令主轴转速 <em>&nbsp;&nbsp;&nbsp;Q2352</em></span>
                    </div>
                    <div class="centerContentDiv">
                      <span class="centerContentDivSpan">命令主轴转速 <em>&nbsp;&nbsp;&nbsp;Q2352</em></span>
                    </div>
                  </li>
                  <li class="centerContentLi">
                    <ul class="centerContentDiv">
                      <li class="centerContentDivSpanZhuZhou"><em>主轴负载</em> </li>
                      <li class="centerContentDivSpanZhuZhouNumber"><em>&nbsp;&nbsp;&nbsp;Q2352</em></li>
                    </ul>
                    <ul class="centerContentDiv">
                      <li class="centerContentDivSpanZhuZhou"><em>主轴最大负载 </em></li>
                      <li class="centerContentDivSpanZhuZhouNumber"><em>&nbsp;&nbsp;&nbsp;Q2352</em></li>
                    </ul>
                  </li>
                  <li class="centerContentLi">
                    <div class="centerContentDiv">
                      <span class="centerContentDivSpan">命令进给率 <em>&nbsp;&nbsp;&nbsp; Q2352</em></span>
                    </div>
                    <div class="centerContentDiv">
                      <span class="centerContentDivSpan">实际进给率 <em>&nbsp;&nbsp;&nbsp;Q2352</em></span>
                    </div>
                  </li>
                  <li class="centerContentLi">
                    <div class="centerContentDiv">
                      <span class="centerContentDivSpan">主轴一温度 <em>&nbsp;&nbsp;&nbsp;Q2352</em></span>
                    </div>
                    <div class="centerContentDiv">
                      <span class="centerContentDivSpan">主轴二温度 <em>&nbsp;&nbsp;&nbsp;Q2352</em></span>
                    </div>
                  </li>

                </ul>
                <!--底部-->
                <div class="bottomConent dljitem">
                  <ul class="bottomConentUl">
                    <!--bottom左侧-->
                    <li class="bottomConentLi bottomConentLiLeft">
                      <ul class="titleXYZ titleLeft">
                        <li></li>
                        <li>绝对坐标</li>
                        <li>相对坐标</li>
                        <li>机械坐标</li>
                        <li>剩余距离</li>
                      </ul>
                      <ul class="titleXYZ titleConent">
                        <li class="colorWhite">X</li>
                        <li class="margin0">0</li>
                        <li class="margin0">-1.02</li>
                        <li class="margin0">-127.23</li>
                        <li class="margin0">0.064</li>
                      </ul>
                      <ul class="titleXYZ titleConent">
                        <li class="colorWhite" >Y</li>
                        <li class="margin0">0</li>
                        <li class="margin0">-1.02</li>
                        <li class="margin0">-127.23</li>
                        <li class="margin0">0.064</li>
                      </ul>
                      <ul class="titleXYZ titleConent">
                        <li class="colorWhite">Z</li>
                        <li class="margin0">0</li>
                        <li class="margin0">-1.02</li>
                        <li class="margin0">-127.23</li>
                        <li class="margin0">0.064</li>
                      </ul>
                      <ul class="titleXYZ titleConent">
                        <li class="colorWhite">C</li>
                        <li class="margin0">0</li>
                        <li class="margin0">-1.02</li>
                        <li class="margin0">-127.23</li>
                        <li class="margin0">0.064</li>
                      </ul>
                      <ul class="titleXYZ titleConent">
                        <li class="colorWhite">B</li>
                        <li class="margin0">0</li>
                        <li class="margin0">-1.02</li>
                        <li class="margin0">-127.23</li>
                        <li class="margin0">0.064</li>
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
                            <li>0.00</li>
                            <li>100%</li>
                            <li>0.00</li>
                          </ul>
                        </li>
                        <li>
                          <div class="bottomConentLiRightUlF">S</div>
                          <ul class="bottomConentLiRightUlFS">
                            <li>设定F值</li>
                            <li>F倍率</li>
                            <li>实际进给</li>
                          </ul>
                          <ul class="bottomConentLiRightUlFS FSnumber">
                            <li>0.00</li>
                            <li>100%</li>
                            <li>0.00</li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            <!-- djw end -->
          </div>
          <div class="device_rightBottom">
            <div class="device_rightBottom-left">left</div>
            <div class="device_rightBottom-right">
              <DianLiu />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import DianLiu from './DianLiu.vue'
export default {
  name: 'DeviceConnect',
  data() {
    return {
      showCompany: false,
      companyOpt: [
        {id: '001', title: '三一桩机'},
        {id: '002', title: '三一重能'}
      ],
      selectedCompany: '三一桩机',
    }
  },
  components: {
    DianLiu
  },
  mounted() {
    /* new BScroll('.device_leftBottom',{
      scrollbar:true,
      bounce:false,//回弹效果
      mouseWheel:true,//滚轮滚动
    }) */
  },
  methods: {
    selectCompanyFun(item) {
      this.selectedCompany = item.title
      this.showCompany = false;
    }
  }
}
</script>
<style lang="scss" scoped>
// 选择子公司
.selectCompany{
  // position: fixed;right:24px;top:20px;
  float:right;margin-top:20px;margin-right:20px;
  .selectCompany_btn{
    width:140px;
    height:40px;text-align: center;line-height: 40px;
    background: gradient(linear, left top, left bottom, from(#4CDDED), to(#0088FE));
    background: linear-gradient(to top,  #4CDDED,  #0088FE);
    background: -ms-linear-gradient(to top,  #4CDDED,  #0088FE);
    color:#fff;font-size:22px;border-radius: 5px;cursor: pointer;
    position: relative;
  }
  .selectCompany_title{

  }
  /*默认向下展开三角*/
  .triangle_top{
    width:0px;
    height:0px;
    border:7.5px solid transparent;
    border-top:9px solid #fff;
    position:absolute;
    top:16px;
    right:7px;
  }
  /*点击后向上收起*/
  .triangle_bottom {
    width:0px;
    height:0px;
    border:7.5px solid transparent;
    border-bottom:9px solid #fff;
    position:absolute;
    top:8px;
    right:7px;
  }
  
}
.selectCompany_con{
  position: fixed;right:20px;top:60px;z-index:22;
  width: 300px;
  background-color: rgba(9, 20, 40, 0.7);
  border: 1px solid #7ed9f1;
  color:#fff;font-size:18px;
  // padding:10px 20px;
  padding-top:30px;
  padding-bottom:30px;
  ul{
    li{
      // height:40px;line-height: 40px;border:1px solid red;
      cursor: pointer;text-align: center;
      padding:20px 0;
      border-top:1px solid #24334d;
      &:first-child{border:0}
    }
  }
}

// 标题
.device_titleBox{
  padding-left:15px;height:50px;
  .device_circle{
    margin-left: 5px; font-size: 32px; color: rgb(2, 201, 252);
    display: inline-block;vertical-align: middle;
  }
  .device_title{
    display: inline-block;vertical-align: middle;
    font-size: 28px;color:#fff;margin-left:10px;
    font-weight: bold;
  }
  .device_img{
    display: inline-block;vertical-align: middle;margin-left:5px;
  }
}

.device{
  font-size: 12px;
  height:100%;
  background-image: url(../../assets/images/DeviceConnect_bj.png);
  background-size: 100% 100%;
}
.device_head{
  background-image: url(../../assets/images/DeviceConnect_headBg.png);
  background-size: 100% auto;
  background-repeat: no-repeat;
  height:110px;
  display: flex;
  .leftInfo{
    flex: 1;
    // border:1px solid red;
    padding-top:70px;padding-left:20px;
  }
  .title{
    flex: 2;
    font-size:0.42rem;color:#fff;text-align: center;line-height: 130px;
  }
  .rightInfo{
    flex: 1;
    // border:1px solid blue;
    text-align: right;padding-top:50px;
  }
}

.device_mainWrap{
  height: calc(100% - 110px - 30px);
  margin:15px;
  background: rgba(39, 69, 111, 0.2);
  border:1px solid #192948;
}
.device_main{
  height: calc(100% - 50px);
  overflow: hidden;
}


.device_mainLeft{
  // border:1px solid red;
  height:100%;width: 410px;
  float: left;
  
  padding: 0 15px 15px 15px;
  display: flex;
  flex-direction: column
}
.device_leftTop{
  background: rgba(0, 186, 255, 0.1);
  padding-top:25px;padding-bottom:40px;
  // width: 100%;
  .name{ font-size: 30px;color:#fff; text-align: center;}
  .img{width: 316px;margin:10px auto 0;}
  .timeBox{
    width: 266px;height:90px;position: relative;margin:10px auto 0;
    // border:1px solid red;
    background-image: url(../../assets/images/DeviceConnect_time.png);
    background-size: 100% 100%;
  }
  .text{font-size:36px;color:#01ff8a;position:absolute;top:20px;left:20px;}
  .time{font-size:22px;color:#00fcf9;position:absolute;bottom:5px;right:20px;}
}
.device_leftBottom{
  background: rgba(0, 186, 255, 0.1);
  margin-top:20px;font-size:18px;color:#aec9ff;
  padding:15px;
  flex:1;
  overflow: hidden;
  /deep/ .el-scrollbar__wrap{
    overflow-x: hidden;
  }
  ul{
    padding:15px;
    li{
      margin-top:5px;
    }
  }
}



.device_mainRight{
  height:100%;width: calc(100% - 410px - 15px);
  float: left;
  // background: rgba(39, 69, 111, 0.3);
  display: flex;
  flex-direction: column
}
.device_rightTop{
  background: rgba(39, 69, 111, 0.3);padding: 15px;
}
.device_rightBottom{
// margin:15px;
  margin-top:15px;
  // width: 100%;
  flex:1;
  display: flex;
  &-left{
    width:860px;
    background: rgba(39, 69, 111, 0.3);
  }
  &-right{
    flex:1;margin-left:15px;
    background: rgba(39, 69, 111, 0.3);
  }
}


// djw start
.DeviceParams{
  width: 100%;
  height: 100%;
  display: flex;flex-direction: column;
  // background: #021035;
  .dljitem{
   /* background: #021035;*/
  }
  .topConent{
    flex: 2;
    display: flex;
    background-color: rgba(0,186,255,0.2);
    .topConentLi{
      flex: 1;
      display: flex;
      justify-content: center;align-items: center;
      .mainProcedureLiSpan{
        font-size: 0.16rem;
        color: #ffffff;
        em{
          font-size: 0.24rem;
          color: #00c7fa;
        }
      }
    }
    .zhibiao{
      flex: 1.3;
    }
  }
  .centerConent{
    flex: 3;
    display: flex;
    margin: 15px 0;
    background-color: rgba(0,186,255,0.2);
    .centerContentLi{
      flex: 1;display: flex;flex-direction: column;
      margin: 2px;
      .centerContentDiv{
        flex: 1;display: flex;
        margin: 2px;
        justify-content: center;align-items: center;
        .centerContentDivSpan{
          font-size: 0.16rem;
          flex: 1;
          display: flex; justify-content: center;align-items: center;
          color: #ffffff;
          em{
            font-size: 0.24rem; color: #00c7fa;
          }
        }
        .centerContentDivSpanZhuZhou{
          flex: 1;text-align: right;
          height: 100%;
          line-height: 90%;
          em{
            font-size: 0.16rem;
            color: #ffffff;
          }
        }
        .centerContentDivSpanZhuZhouNumber{
          flex: 1;text-align: left;
          height: 100%;
          line-height: 90%;
          em{
            font-size: 0.24rem;  color: #00c7fa;
          }
        }
      }
    }
  }
  .bottomConent{
    flex: 4;display: flex;

    .bottomConentUl{
      flex: 1;
      display: flex;
      .bottomConentLi{
        flex: 1;display: flex;
        margin: 5px;
      }
      .bottomConentLiLeft{
        /*background-color: rgba(0,186,255,0.2);*/
        .titleXYZ{
          flex: 1;
          display: flex;flex-direction: column;
          li{
            flex: 1;
            margin: 1px;
            background-color: rgba(0,186,255,0.2)
          }
          .colorWhite{
            background:linear-gradient(left,rgba(42,75,133,0.3),rgba(42,75,133,0.8));
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
            background:linear-gradient(left,rgba(42,75,133,0.3),rgba(42,75,133,0.8));
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
      }
      .bottomConentLiRight{
        display: flex;
        .bottomConentLiRightUl{
          display: flex;
          flex: 1;
          li{
            flex: 1;display: flex;
            margin: 1px;
            .bottomConentLiRightUlF{
              flex: 1;
              display: flex;
              justify-content: center;
              align-items: center;
              background:linear-gradient(rgba(42,75,133,0.3),rgba(42,75,133,0.8));
              font-size: 0.24rem;
              color: #fff;
            }
            .bottomConentLiRightUlFS{
              flex: 2;display: flex;flex-direction: column;
              li{
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                background: rgba(0,186,255,0.2);
                font-size: 0.16rem;
                color: #fff;
              }
            }
            .FSnumber{
              li{
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
</style>

