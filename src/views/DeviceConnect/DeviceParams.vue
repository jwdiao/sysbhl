<template>
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
</template>
<script>
export default {
  name: 'DeviceParams'
}
</script>
<style lang="scss" scoped>
.DeviceParams{
  width: 100%;
  height: 100%;
  display: flex;flex-direction: column;
  background: #021035;
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
</style>

