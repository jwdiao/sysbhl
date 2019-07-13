<template>
<div class="common_bg common_bg02">
    <CommonHead
        :isShowBackBtn="true"
        :isClickedTitle="false"
        :titleText="`${companyName}焊接机器人`"
        @backBtnClick="handleBackBtn"
        :isShowCurrentTime="false"
    />
    <div class="common_main common_blockColor">
        <div class="robot_headBox">
            <CommonBasicTitle01 title-text="焊接机器人" />
            <ul>
                <li>作业</li>
                <li>待机</li>
                <li>离线</li>
                <li>故障</li>
                <li>关机</li>
            </ul>
        </div>
        <div class="robot_con">
            <div class="robot_item robot_item-first">
                <div class="img"><img src="../../assets/images/detail_robot.png" /></div>
                <div class="model">型号：{{baseInfo.machineModel}}</div>
                <div class="name">{{baseInfo.machineName}}（A.B.C.D）</div>
                <div class="timeBox">
                        <span class="text" :class="getStatusColor(baseInfo.status)">&nbsp;{{getMachineStatusTextFun(baseInfo.status)}}</span>
                        <span class="time">{{getMachineStatusTime(baseInfo.status,baseInfo)}}</span>
                </div>
                <div class="params">
                    <span>总参数名</span>
                    <em>（单位 bool量：0无效 1有效）</em>
                </div>
                <el-scrollbar class="scrollbarY paramsList">
                    <ul class="list">
                        <li><span class="label">变位机动力头右移限位</span><span class="num">-</span></li>
                        <li><span class="label">变位机从动头左移限位</span><span class="num">{{baseInfo.leftLimit|filterAbnormal}}</span></li>
                        <li><span class="label">变位机从动头右移限位</span><span class="num">{{baseInfo.rightLimit|filterAbnormal}}</span></li>
                        <li><span class="label">变位机主动横移定位启动</span><span class="num">-</span></li>
                        <li><span class="label">变位机从动横移定位启动</span><span class="num">-</span></li>
                        <li><span class="label">变位机主动横移回零启动</span><span class="num">-</span></li>
                        <li><span class="label">变位机从动横移回零启动</span><span class="num">-</span></li>
                        <li><span class="label">系统复位</span><span class="num">-</span></li>
                        <li><span class="label">手动/自动</span><span class="num">-</span></li>
                        <li><span class="label">主动头停止</span><span class="num">{{baseInfo.drivingHeadStop|filterAbnormal}}</span></li>
                        <li><span class="label">焊接启动指示</span><span class="num">{{baseInfo.weldingStartIndication|filterAbnormal}}</span></li>
                        <li><span class="label">焊接停止指示</span><span class="num">{{baseInfo.weldingStopIndication|filterAbnormal}}</span></li>
                        <li><span class="label">流程暂停信号</span><span class="num">-</span></li>
                        <li><span class="label">流程启动</span><span class="num">-</span></li>
                        <li><span class="label">定位模块报警</span><span class="num">-</span></li>
                        <li><span class="label">卡盘变频器报警</span><span class="num">-</span></li>
                        <li><span class="label">支撑升降变频器报警</span><span class="num">-</span></li>
                        <li><span class="label">接料伸缩变频器报警</span><span class="num">-</span></li>
                        <li><span class="label">主动卡盘堵转监测</span><span class="num">-</span></li>
                        <li><span class="label">从动卡盘堵转监测</span><span class="num">-</span></li>
                    </ul>
                </el-scrollbar>            
            </div>
            <div class="robot_item robot_itemArm robot_item-second" v-for="(item, index) in armDataArr" :key="`robot${index}`">
                <div class="armFlag">
                    <span class="line"></span>
                    <span class="circle" :class="getStatusBgColor(item.status)"></span>
                    <span class="text">{{item.machineName}}</span>
                    <span class="line"></span>
                </div>
                <ul class="elec">
                    <li>
                        <label>电压</label>
                        <span>{{item.voltage|filterAbnormal}} V</span>
                    </li>
                    <li>
                        <label>焊接电流</label>
                        <span>{{item.current|filterAbnormal}}A</span>
                    </li>
                    <li>
                        <label>保护气流量</label>
                        <span>{{item.velocity|filterAbnormal}}CM/M</span>
                    </li>
                </ul>
                <div class="armImg">
                    <div class="img">
                        <img src="../../assets/images/detail_robotArm.png" />
                        <div class="armItem first">1关节{{item.corners[0]|filterAbnormal}}°</div>
                        <div class="armItem second">2关节{{item.corners[1]|filterAbnormal}}°</div>
                        <div class="armItem three">3关节{{item.corners[2]|filterAbnormal}}°</div>
                        <div class="armItem four">4关节{{item.corners[3]|filterAbnormal}}°</div>
                        <div class="armItem five">5关节{{item.corners[4]|filterAbnormal}}°</div>
                        <div class="armItem six">6关节{{item.corners[5]|filterAbnormal}}°</div>
                    </div>
                </div>
                <div class="coordinate">
                    <ul class="bgLabel">
                        <li></li>
                        <li>世界坐标系</li>
                        <li>用户坐标系</li>
                    </ul>
                    <div style="overflow:hidden;">
                    <el-scrollbar class="scrollbarX">
                    <div class="conten" style="width: 510px;">
                        <ul class="bgTitle">
                            <li>X</li>
                            <li>y</li>
                            <li>z</li>
                            <li>w</li>
                            <li>p</li>
                            <li>r</li>
                        </ul>
                        <ul class="bgData">
                            <li v-for="(num,index) in item.worldCoordinate" :key="`worldCoordinate${index}`">{{num|filterAbnormal}}</li>
                        </ul>
                        <ul class="bgData">
                            <li v-for="(num,index) in item.userCoordinate" :key="`userCoordinate${index}`">{{num|filterAbnormal}}</li>
                        </ul>
                    </div>
                    </el-scrollbar>
                    </div>
                </div>
                <div class="ElecVoltage" >
                    <div :id="`detail_robotArm${index+1}`" style="width: 100%;height: 100%"></div>
                </div>
                <div class="armParams">
                    <div class="title">
                        <span>总参数名</span>
                        <em>（单位 bool量：0无效 1有效）</em>
                    </div>
                    <el-scrollbar class="scrollbarY armParamsList">
                    <ul>
                        <li><span class="label">机器人1暂停中是否</span><span class="num">{{item.pause|filterAbnormal}}</span></li>
                        <li><span class="label">机器人1程序运行中</span><span class="num">-</span></li>
                        <li><span class="label">机器人1原位置信号</span><span class="num">-</span></li>
                        <li><span class="label">机器人1第一次启动</span><span class="num">{{item.firstPosition|filterAbnormal}}</span></li>
                        <li><span class="label">机器人1急停</span><span class="num">-</span></li>
                        <li><span class="label">机器人1外部重启</span><span class="num">{{item.reStart|filterAbnormal}}</span></li>
                        <li><span class="label">机器人1激光寻点启动</span><span class="num">-</span></li>
                        <li><span class="label">水冷检测1</span><span class="num">-</span></li>
                        <li><span class="label">冷却水位监测1</span><span class="num">-</span></li>
                        <li><span class="label">机器人1DO48清枪启动	</span><span class="num">-</span></li>
                        <li><span class="label">机器人1报警	</span><span class="num">-</span></li>
                    </ul>
                    </el-scrollbar>
                </div>
            </div>
            <!-- A臂 start -->
            <!-- <div class="robot_item robot_itemArm robot_item-second">
                <div class="armFlag">
                    <span class="line"></span>
                    <span class="circle"></span>
                    <span class="text">A臂</span>
                    <span class="line"></span>
                </div>
                <ul class="elec">
                    <li>
                        <label>电压</label>
                        <span>1000 V</span>
                    </li>
                    <li>
                        <label>焊接电流</label>
                        <span>10A</span>
                    </li>
                    <li>
                        <label>保护气流量</label>
                        <span>1000CM/M</span>
                    </li>
                </ul>
                <div class="armImg">
                    <div class="img">
                        <img src="../../assets/images/detail_robotArm.png" />
                        <div class="armItem first">1关节90°</div>
                        <div class="armItem second">2关节90°</div>
                        <div class="armItem three">3关节90°</div>
                        <div class="armItem four">4关节90°</div>
                        <div class="armItem five">5关节90°</div>
                        <div class="armItem six">6关节90°</div>
                    </div>
                </div>
                <div class="coordinate">
                    <ul class="bgLabel">
                        <li></li>
                        <li>世界坐标系</li>
                        <li>用户坐标系</li>
                    </ul>
                    <div style="overflow:hidden;">
                    <el-scrollbar class="scrollbarX">
                    <div class="conten" style="width: 425px;">
                        <ul class="bgTitle">
                            <li>X</li>
                            <li>y</li>
                            <li>z</li>
                            <li>A</li>
                            <li>B</li>
                        </ul>
                        <ul class="bgData">
                            <li>10000</li>
                            <li>10000</li>
                            <li>10000</li>
                            <li>10000</li>
                            <li>10000</li>
                        </ul>
                        <ul class="bgData">
                            <li>10000</li>
                            <li>10000</li>
                            <li>10000</li>
                            <li>10000</li>
                            <li>10000</li>
                        </ul>
                    </div>
                    </el-scrollbar>
                    </div>
                </div>
                <div class="ElecVoltage" >
                    <div id="detail_robotArmA" style="width: 100%;height: 100%"></div>
                </div>
                <div class="armParams">
                    <div class="title">
                        <span>总参数名</span>
                        <em>（单位 bool量：0无效 1有效）</em>
                    </div>
                    <el-scrollbar class="scrollbarY armParamsList">
                    <ul>
                        <li><span class="label">机器人1暂停中是否</span><span class="num">0</span></li>
                        <li><span class="label">机器人1程序运行中</span><span class="num">-</span></li>
                        <li><span class="label">机器人1原位置信号</span><span class="num">-</span></li>
                        <li><span class="label">机器人1第一次启动</span><span class="num">0</span></li>
                        <li><span class="label">机器人1急停</span><span class="num">-</span></li>
                        <li><span class="label">机器人1外部重启</span><span class="num">0</span></li>
                        <li><span class="label">机器人1激光寻点启动</span><span class="num">-</span></li>
                        <li><span class="label">水冷检测1</span><span class="num">-</span></li>
                        <li><span class="label">冷却水位监测1</span><span class="num">-</span></li>
                        <li><span class="label">机器人1DO48清枪启动	</span><span class="num">-</span></li>
                        <li><span class="label">机器人1报警	</span><span class="num">-</span></li>
                    </ul>
                    </el-scrollbar>
                </div>
            </div> -->
            <!-- A臂 end -->
            <!-- B臂 start -->
            <!-- <div class="robot_item robot_itemArm robot_item-second">
                <div class="armFlag">
                    <span class="line"></span>
                    <span class="circle"></span>
                    <span class="text">B臂</span>
                    <span class="line"></span>
                </div>
                <ul class="elec">
                    <li>
                        <label>电压</label>
                        <span>1000 V</span>
                    </li>
                    <li>
                        <label>焊接电流</label>
                        <span>10A</span>
                    </li>
                    <li>
                        <label>保护气流量</label>
                        <span>1000CM/M</span>
                    </li>
                </ul>
                <div class="armImg">
                    <div class="img">
                        <img src="../../assets/images/detail_robotArm.png" />
                        <div class="armItem first">1关节90°</div>
                        <div class="armItem second">2关节90°</div>
                        <div class="armItem three">3关节90°</div>
                        <div class="armItem four">4关节90°</div>
                        <div class="armItem five">5关节90°</div>
                        <div class="armItem six">6关节90°</div>
                    </div>
                </div>
                <div class="coordinate">
                    <ul class="bgLabel">
                        <li></li>
                        <li>世界坐标系</li>
                        <li>用户坐标系</li>
                    </ul>
                    <div style="overflow:hidden;">
                    <el-scrollbar class="scrollbarX">
                    <div class="conten" style="width: 425px;">
                        <ul class="bgTitle">
                            <li>X</li>
                            <li>y</li>
                            <li>z</li>
                            <li>A</li>
                            <li>B</li>
                        </ul>
                        <ul class="bgData">
                            <li>10000</li>
                            <li>10000</li>
                            <li>10000</li>
                            <li>10000</li>
                            <li>10000</li>
                        </ul>
                        <ul class="bgData">
                            <li>10000</li>
                            <li>10000</li>
                            <li>10000</li>
                            <li>10000</li>
                            <li>10000</li>
                        </ul>
                    </div>
                    </el-scrollbar>
                    </div>
                </div>
                <div class="ElecVoltage">
                    <div id="detail_robotArmB" style="width: 100%;height: 100%"></div>
                </div>
                <div class="armParams">
                    <div class="title">
                        <span>总参数名</span>
                        <em>（单位 bool量：0无效 1有效）</em>
                    </div>
                    <el-scrollbar class="scrollbarY armParamsList">
                    <ul>
                        <li><span class="label">机器人1暂停中是否</span><span class="num">0</span></li>
                        <li><span class="label">机器人1程序运行中</span><span class="num">-</span></li>
                        <li><span class="label">机器人1原位置信号</span><span class="num">-</span></li>
                        <li><span class="label">机器人1第一次启动</span><span class="num">0</span></li>
                        <li><span class="label">机器人1急停</span><span class="num">-</span></li>
                        <li><span class="label">机器人1外部重启</span><span class="num">0</span></li>
                        <li><span class="label">机器人1激光寻点启动</span><span class="num">-</span></li>
                        <li><span class="label">水冷检测1</span><span class="num">-</span></li>
                        <li><span class="label">冷却水位监测1</span><span class="num">-</span></li>
                        <li><span class="label">机器人1DO48清枪启动	</span><span class="num">-</span></li>
                        <li><span class="label">机器人1报警	</span><span class="num">-</span></li>
                    </ul>
                    </el-scrollbar>
                </div>
            </div> -->
            <!-- B臂 end -->
            <!-- C臂 start -->
            <!-- <div class="robot_item robot_itemArm robot_item-second">
                <div class="armFlag">
                    <span class="line"></span>
                    <span class="circle"></span>
                    <span class="text">C臂</span>
                    <span class="line"></span>
                </div>
                <ul class="elec">
                    <li>
                        <label>电压</label>
                        <span>1000 V</span>
                    </li>
                    <li>
                        <label>焊接电流</label>
                        <span>10A</span>
                    </li>
                    <li>
                        <label>保护气流量</label>
                        <span>1000CM/M</span>
                    </li>
                </ul>
                <div class="armImg">
                    <div class="img">
                        <img src="../../assets/images/detail_robotArm.png" />
                        <div class="armItem first">1关节90°</div>
                        <div class="armItem second">2关节90°</div>
                        <div class="armItem three">3关节90°</div>
                        <div class="armItem four">4关节90°</div>
                        <div class="armItem five">5关节90°</div>
                        <div class="armItem six">6关节90°</div>
                    </div>
                </div>
                <div class="coordinate">
                    <ul class="bgLabel">
                        <li></li>
                        <li>世界坐标系</li>
                        <li>用户坐标系</li>
                    </ul>
                    <div style="overflow:hidden;">
                    <el-scrollbar class="scrollbarX">
                    <div class="conten" style="width: 425px;">
                        <ul class="bgTitle">
                            <li>X</li>
                            <li>y</li>
                            <li>z</li>
                            <li>A</li>
                            <li>B</li>
                        </ul>
                        <ul class="bgData">
                            <li>10000</li>
                            <li>10000</li>
                            <li>10000</li>
                            <li>10000</li>
                            <li>10000</li>
                        </ul>
                        <ul class="bgData">
                            <li>10000</li>
                            <li>10000</li>
                            <li>10000</li>
                            <li>10000</li>
                            <li>10000</li>
                        </ul>
                    </div>
                    </el-scrollbar>
                    </div>
                </div>
                <div class="ElecVoltage">
                    <div id="detail_robotArmC" style="width: 100%;height: 100%"></div>
                </div>
                <div class="armParams">
                    <div class="title">
                        <span>总参数名</span>
                        <em>（单位 bool量：0无效 1有效）</em>
                    </div>
                    <el-scrollbar class="scrollbarY armParamsList">
                    <ul>
                        <li><span class="label">机器人1暂停中是否</span><span class="num">0</span></li>
                        <li><span class="label">机器人1程序运行中</span><span class="num">-</span></li>
                        <li><span class="label">机器人1原位置信号</span><span class="num">-</span></li>
                        <li><span class="label">机器人1第一次启动</span><span class="num">0</span></li>
                        <li><span class="label">机器人1急停</span><span class="num">-</span></li>
                        <li><span class="label">机器人1外部重启</span><span class="num">0</span></li>
                        <li><span class="label">机器人1激光寻点启动</span><span class="num">-</span></li>
                        <li><span class="label">水冷检测1</span><span class="num">-</span></li>
                        <li><span class="label">冷却水位监测1</span><span class="num">-</span></li>
                        <li><span class="label">机器人1DO48清枪启动	</span><span class="num">-</span></li>
                        <li><span class="label">机器人1报警	</span><span class="num">-</span></li>
                    </ul>
                    </el-scrollbar>
                </div>
            </div> -->
            <!-- C臂 end -->
            <!-- D臂 start -->
            <!-- <div class="robot_item robot_itemArm robot_item-second">
                <div class="armFlag">
                    <span class="line"></span>
                    <span class="circle"></span>
                    <span class="text">D臂</span>
                    <span class="line"></span>
                </div>
                <ul class="elec">
                    <li>
                        <label>电压</label>
                        <span>1000 V</span>
                    </li>
                    <li>
                        <label>焊接电流</label>
                        <span>10A</span>
                    </li>
                    <li>
                        <label>保护气流量</label>
                        <span>1000CM/M</span>
                    </li>
                </ul>
                <div class="armImg">
                    <div class="img">
                        <img src="../../assets/images/detail_robotArm.png" />
                        <div class="armItem first">1关节90°</div>
                        <div class="armItem second">2关节90°</div>
                        <div class="armItem three">3关节90°</div>
                        <div class="armItem four">4关节90°</div>
                        <div class="armItem five">5关节90°</div>
                        <div class="armItem six">6关节90°</div>
                    </div>
                </div>
                <div class="coordinate">
                    <ul class="bgLabel">
                        <li></li>
                        <li>世界坐标系</li>
                        <li>用户坐标系</li>
                    </ul>
                    <div style="overflow:hidden;">
                    <el-scrollbar class="scrollbarX">
                    <div class="conten" style="width: 425px;">
                        <ul class="bgTitle">
                            <li>X</li>
                            <li>y</li>
                            <li>z</li>
                            <li>A</li>
                            <li>B</li>
                        </ul>
                        <ul class="bgData">
                            <li>10000</li>
                            <li>10000</li>
                            <li>10000</li>
                            <li>10000</li>
                            <li>10000</li>
                        </ul>
                        <ul class="bgData">
                            <li>10000</li>
                            <li>10000</li>
                            <li>10000</li>
                            <li>10000</li>
                            <li>10000</li>
                        </ul>
                    </div>
                    </el-scrollbar>
                    </div>
                </div>
                <div class="ElecVoltage">
                    <div id="detail_robotArmD" style="width: 100%;height: 100%"></div>
                </div>
                <div class="armParams">
                    <div class="title">
                        <span>总参数名</span>
                        <em>（单位 bool量：0无效 1有效）</em>
                    </div>
                    <el-scrollbar class="scrollbarY armParamsList">
                    <ul>
                        <li><span class="label">机器人1暂停中是否</span><span class="num">0</span></li>
                        <li><span class="label">机器人1程序运行中</span><span class="num">-</span></li>
                        <li><span class="label">机器人1原位置信号</span><span class="num">-</span></li>
                        <li><span class="label">机器人1第一次启动</span><span class="num">0</span></li>
                        <li><span class="label">机器人1急停</span><span class="num">-</span></li>
                        <li><span class="label">机器人1外部重启</span><span class="num">0</span></li>
                        <li><span class="label">机器人1激光寻点启动</span><span class="num">-</span></li>
                        <li><span class="label">水冷检测1</span><span class="num">-</span></li>
                        <li><span class="label">冷却水位监测1</span><span class="num">-</span></li>
                        <li><span class="label">机器人1DO48清枪启动	</span><span class="num">-</span></li>
                        <li><span class="label">机器人1报警	</span><span class="num">-</span></li>
                    </ul>
                    </el-scrollbar>
                </div>
            </div> -->
            <!-- D臂 end -->
        </div>
    </div>
</div>

</template>
<script>
import echarts from 'echarts'
import moment from 'moment'
import CommonHead from '@/components/Head'
import CommonBasicTitle01 from '@/components/BasicTitle01.vue'
// import RobotArm from './components/RobotArm'
import RobotDianliu from './components/RobotDianliu'
import { _SessionStorageObj, getMachineStatusText, getDayTypeFun, getDayStrFun, formatDurationTime2 } from '@/utils'
import {
    reqVoltageAndCurrentMinute,
    reqVoltageAndCurrentNew,
    reqFindRobotDetails
} from '../../api'
import { clearTimeout } from 'timers';
export default {
  name: 'Robot',
  components: {
    CommonHead,
    CommonBasicTitle01,
    // RobotArm,
    RobotDianliu
  },
  filters: {
      filterAbnormal(val) {
          if (val=='-100000.0F') {
              return '0'
          }
      }
  },
  data() {
    return {
      companyCode: '0701',
      companyName: '三一德力佳',
      deviceID: '',

      isInit: true,
      AllEchartsArr: [],
      dianliuaAId: null,

      baseInfo: {
             machineName: '',  // 机器名称
             machineModel: '', // 设备型号
             leftLimit: '', // 变位机从动头横移左限位
             rightLimit: '', // 变位机从动头横移右限位
             drivingHeadStop: '', // 主动头停止
             weldingStartIndication: '', // 焊接启动指示
             weldingStopIndication: '', // 焊接停止指示
             status: 1, // 状态
             startupTime: '', // 开机时间
             offTime: '', // 关机时间
             standbyTime: '', // 待机时间
             failureTime: '', // 故障时间
             unlineTime: '', // 离线时间
      },
      armDataArr: [
          {
              corners: [0,0,0,0,0,0], // 转角 数组
              worldCoordinate: [0,0,0,0,0,0], // 世界坐标 数组
              userCoordinate: [0,0,0,0,0,0], // 用户坐标
              voltage: '', // 电压
              current: '', // 电流
              velocity: '', // 流速
              status: 2, // 状态
              pause: '', // 暂停  PLC数据
              reStart: '', // 重启  PLC数据
              firstPosition: '', // 第一次启动 PLC数据 
          },
          {
              corners: [0,0,0,0,0,0], // 转角 数组
              worldCoordinate: [0,0,0,0,0,0], // 世界坐标 数组
              userCoordinate: [0,0,0,0,0,0], // 用户坐标
              voltage: '', // 电压
              current: '', // 电流
              velocity: '', // 流速
              status: 1, // 状态
              pause: '', // 暂停  PLC数据
              reStart: '', // 重启  PLC数据
              firstPosition: '', // 第一次启动 PLC数据 
          },
          {
              corners: [0,0,0,0,0,0], // 转角 数组
              worldCoordinate: [0,0,0,0,0,0], // 世界坐标 数组
              userCoordinate: [0,0,0,0,0,0], // 用户坐标
              voltage: '', // 电压
              current: '', // 电流
              velocity: '', // 流速
              status: 1, // 状态
              pause: '', // 暂停  PLC数据
              reStart: '', // 重启  PLC数据
              firstPosition: '', // 第一次启动 PLC数据 
          },
          {
              corners: [0,0,0,0,0,0], // 转角 数组
              worldCoordinate: [0,0,0,0,0,0], // 世界坐标 数组
              userCoordinate: [0,0,0,0,0,0], // 用户坐标
              voltage: '', // 电压
              current: '', // 电流
              velocity: '', // 流速
              status: 1, // 状态
              pause: '', // 暂停  PLC数据
              reStart: '', // 重启  PLC数据
              firstPosition: '', // 第一次启动 PLC数据 
          },
      ],

        // isInit: true,
        aArmDom: '',
        bArmDom: '',
        cArmDom: '',
        dArmDom: '',
        aArmData: {
            voltage: [],
            current: [],
            velocity: [],
        },
        bArmData: {
            voltage: [],
            current: [],
            velocity: [],
        },
        cArmData: {
            voltage: [],
            current: [],
            velocity: [],
        },
        dArmData: {
            voltage: [],
            current: [],
            velocity: [],
        },
        prevData: '',
        dianliuaTimeoutId: ''
    }
  },
  computed: {

  },
  mounted() {
    // 从localStory里面取选中的公司
    const sbhlSelectedCompanyObj = _SessionStorageObj.get('sbhl-OverView-SelectedCompany')
    if (sbhlSelectedCompanyObj) {
        this.companyCode = sbhlSelectedCompanyObj.value; // 公司编码
        this.companyName = sbhlSelectedCompanyObj.label // 公司名字
        const deviceInfoFromLocalstory = _SessionStorageObj.get('deviceID') // 设备信息
        this.deviceID = deviceInfoFromLocalstory.machineNo // 设备id
        // this.deviceID = "ZJ110201008_Mitsubishi_27"
    }
    this.getRobotDetailsFun()


    this.aArmDom = echarts.init(document.getElementById("detail_robotArm1"))
    this.initEchartsElec(this.aArmDom)

    this.bArmDom = echarts.init(document.getElementById("detail_robotArm2"))
    this.initEchartsElec(this.bArmDom)

    this.cArmDom = echarts.init(document.getElementById("detail_robotArm3"))
    this.initEchartsElec(this.cArmDom)

    this.dArmDom = echarts.init(document.getElementById("detail_robotArm4"))
    this.initEchartsElec(this.dArmDom)

    this.getTwoMinutesFun2()
  },
  methods: {
        // 返回按钮回调
        handleBackBtn() {
            const fromRouter = this.$route.params.fromRouter
            if (fromRouter) {
                this.$router.push(fromRouter)
            } else {
                this.$router.push('/DeviceList')
            }
        },
        async getRobotDetailsFun() {
            const params = {
                "date": getDayStrFun(),
                "dayType": getDayTypeFun(),
                "machineNo": this.deviceID
            }
            const res = await reqFindRobotDetails(params)
            if (res && res.code === 200) {
                const dataObj = res.data
                this.baseInfo = {
                        machineName: dataObj.machineName,  // 机器名称
                        machineModel: dataObj.machineModel, // 设备型号
                        leftLimit: dataObj.leftLimit, // 变位机从动头横移左限位
                        rightLimit: dataObj.rightLimit, // 变位机从动头横移右限位
                        drivingHeadStop: dataObj.drivingHeadStop, // 主动头停止
                        weldingStartIndication: dataObj.weldingStartIndication, // 焊接启动指示
                        weldingStopIndication: dataObj.weldingStopIndication, // 焊接停止指示
                        status: dataObj.status, // 状态
                        startupTime: dataObj.startupTime, // 开机时间
                        offTime: dataObj.offTime, // 关机时间
                        standbyTime: dataObj.standbyTime, // 待机时间
                        failureTime: dataObj.failureTime, // 故障时间
                        unlineTime: dataObj.unlineTime, // 离线时间
                }
                this.armDataArr= res.data.robotList
            }
        },
        // 左侧获取作业状态
        getMachineStatusTextFun(status) {
            return getMachineStatusText(status)
        },
        // 获取机械臂状态背景色
        getStatusColor(status) {
            if (status == 1) return {green: true}
            if (status == 2) return {orange: true}
            if (status == 3) return {lightGray: true}
            if (status == 4) return {red: true}
            if (status == 5) return {darkGray: true}
        },
        getStatusBgColor() {
            if (status == 1) return {greenBg: true}
            if (status == 2) return {orangeBg: true}
            if (status == 3) return {lightGrayBg: true}
            if (status == 4) return {redBg: true}
            if (status == 5) return {darkGrayBg: true}
        },
        // 左侧获取时间
        getMachineStatusTime(machineStatus, data) {
            // 1 作业， 2 待机，3 关机，4 故障，5 离线
            if (machineStatus == 1) {
                const runTime = data.startupTime - data.standbyTime
                return formatDurationTime2(runTime) // 作业 = 开机-待机
            } else if (machineStatus == 2) {
                return formatDurationTime2(data.standbyTime)
            } else if (machineStatus == 3) {
                return formatDurationTime2(data.offTime);
            } else if (machineStatus == 4) {
                return formatDurationTime2(data.failureTime); 
            } else if (machineStatus == 5) {
                return formatDurationTime2(data.unlineTime);
            } else {
                return 0
            }        
        },

    // ==================电流 start=================
        handleDataA(item, yValue) {
            var obj = {}
            // moment(item.planDate).format('YYYY/MM/DD').split('/').join('-')
            // const strTime = moment(item.time).format('YYYY/MM/DD HH:mm:ss')
            // const strTime2 = moment(new Date('2019-07-11T19:33:21.979Z')).format('YYYY-MM-DD HH:mm:ss')
            // console.log('str:',moment('2019-07-11T19:33:21.979Z').format('YYYY-MM-DD HH:mm:ss'))
            // var dateStr = (item.time).substring(0,10).split('-').join('/')
            // var timeStr = (item.time).substring(11,19)
            // var time2 = dateStr+' '+timeStr
            const strTime = moment().format('YYYY/MM/DD')+' '+item.time
            // console.log('str:',strTime)
            var yNewValue = 0
            if (yValue == "-100000.0F") {
                yNewValue = 0
            } else {
                var yNewValue = (yValue*1)<0?0:yValue
                yNewValue = yNewValue?yNewValue:0
            }

            obj.name = strTime
            obj.value = [strTime, yNewValue]
            // console.log('obj:',obj)
            return obj
        },
        async initEchartsElec(dom) {
            var option = {
                color:['#019df0','#e764dd','#00fcf9','#ecf166'],
                legend: {
                    top: 4,
                    // left: 10,
                    textStyle: {
                        color: "#fff",
                        fontSize: 10
                    },
                    icon: 'roundRect',
                    itemWidth: 10, // 设置图例的宽高
                    itemHeight: 2,
                },

                grid: {
                    top: 55,
                    bottom: 30,
                    left: 40,
                    right: 100,
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false
                    },
                    // formatter: function(val){
                    //     console.log('formatter:',val)
                    //     return val
                    // }
                },
                xAxis: {
                    type: 'time',
                    axisLine: {  // 控制x轴线的样式
                        lineStyle: {
                        type: 'dotted',
                        color: '#fff',
                        width: '1'
                        }
                    },
                    axisPointer: {
                        type: 'shadow'
                    },
                    axisTick: { // 控制x轴坐标刻度不显示
                        show: false
                    },
                    axisLabel : {
                        textStyle: {
                            color: '#aec9ff'
                        },
                        formatter: function(val) {
                            return moment(val).format('HH:mm:ss')
                        },
                        showMaxLabel: true, //是否显示最大 tick 的 label
                        showMinLabel: true,
                    },
                    splitLine: {
                        show: false
                    },
                    splitNumber: 4
                },
                yAxis: [
                    {
                        type: 'value',
                        min: 0,
                        name: '单位:电压V',
                        nameTextStyle: {
                            color: '#fff',
                            align: 'left',
                            // padding:[0,20,0,0]
                        },
                        boundaryGap: [0.2, 0.2],
                        axisLabel: {
                        formatter: '{value}',
                        textStyle: {
                            color: '#fff'
                        }
                        },
                        splitLine: { //网格线
                        show: true,
                        lineStyle: {
                            color: ['#293e60'],
                            width: 1,
                            type: 'dotted'
                        }

                        },
                        axisLine: {  // 控制y轴线的样式
                        lineStyle: {
                            type: 'solid',
                            color: '#55aefb',
                            width: '1' }
                        },
                        axisTick: {
                        show: false
                        },
                    },
                    {
                        type: 'value',
                        name: 'A',
                        min: '0',
                        nameTextStyle: {
                            color: '#e764dd',
                            // padding:[0,40,0,0]
                        },
                        position: 'right', // 位于右侧的y轴
                        offset: 0,
                        // boundaryGap: [0.2, 0.2],
                        axisLabel: {
                            showMaxLabel: true, //是否显示最大 tick 的 label
                            showMinLabel: true, //是否显示最小 tick 的 label
                            formatter: '{value} ',
                            textStyle: {
                                color: '#e764dd'
                            }
                        },
                        splitLine: { //网格线
                        show: true,
                        lineStyle: {
                            color: ['#293e60'],
                            width: 1,
                            type: 'dotted'
                        }

                        },
                        axisLine: {  // 控制y轴线的样式
                        lineStyle: {
                            type: 'solid',
                            color: '#e764dd',
                            width: '1' }
                        },
                        axisTick: {
                        // show: false
                        },
                    },
                    {
                        type: 'value',
                        name: 'L/min',
                        min: '0',
                        nameTextStyle: {
                            color: '#00fcf9',
                            // padding:[0,-40,0,0]
                        },
                        // boundaryGap: [0.4, 0.4],
                        position: 'right', // 位于右侧的y轴
                        offset: 40,
                        axisLabel: {
                            showMaxLabel: true, //是否显示最大 tick 的 label
                            showMinLabel: true, //是否显示最小 tick 的 label
                            formatter: '{value} ',
                            textStyle: {
                                color: '#00fcf9'
                            }
                        },
                        splitLine: { //网格线
                        show: true,
                        lineStyle: {
                            color: ['#293e60'],
                            width: 1,
                            type: 'dotted'
                        }

                        },
                        axisLine: {  // 控制y轴线的样式
                            lineStyle: {
                                type: 'solid',
                                color: '#00fcf9',
                                width: '1'
                            }
                        },
                        axisTick: {
                            // show: false
                        },
                    },
                    // {
                    //     type: 'value',
                    //     name: 'A',
                    //     min: '0',
                    //     nameTextStyle: {
                    //         color: '#ecf166',
                    //         // padding:[0,-40,0,0]
                    //     },
                    //     // boundaryGap: [0.4, 0.4],
                    //     position: 'right', // 位于右侧的y轴
                    //     offset: 60,
                    //     axisLabel: {
                    //         showMaxLabel: true, //是否显示最大 tick 的 label
                    //         showMinLabel: true, //是否显示最小 tick 的 label
                    //         formatter: '{value} ',
                    //         textStyle: {
                    //             color: '#ecf166'
                    //         }
                    //     },
                    //     splitLine: { //网格线
                    //     show: true,
                    //     lineStyle: {
                    //         color: ['#293e60'],
                    //         width: 1,
                    //         type: 'dotted'
                    //     }

                    //     },
                    //     axisLine: {  // 控制y轴线的样式
                    //         lineStyle: {
                    //             type: 'solid',
                    //             color: '#ecf166',
                    //             width: '1'
                    //         }
                    //     },
                    //     axisTick: {
                    //         // show: false
                    //     },
                    // },
                ],
                series: [
                    {
                        name:'电压',
                        type: 'line',
                        showSymbol: false,
                        hoverAnimation: false,
                        animationDuration: 800,
                        lineStyle: {
                            color: '#019df0',
                            width: '1'
                        },
                        yAxisIndex: 0,
                        data: [],
                        // data: [
                        //   { value: [ '2016/2/18 03:00:00', 363 ] },
                        //   { value: [ '2016/2/18 04:00:00', 384 ] },
                        //   { value: [ '2016/2/18 05:00:00', 371 ] },
                        // ]
                    },
                    {
                        name:'焊接电流',
                        type:'line',
                        showSymbol: false,
                        hoverAnimation: false,
                        animationDuration: 800,
                        lineStyle: {
                            color: '#e764dd',
                            width: '1'
                        },
                        yAxisIndex: 1,
                        data: []
                    },
                    {
                        name:'保护气流量',
                        type: 'line',
                        showSymbol: false,
                        hoverAnimation: false,
                        animationDuration: 800,
                        lineStyle: {
                            color: '#00fcf9',
                            width: '1'
                        },
                        yAxisIndex: 2,
                        data: [],                       
                    },
                    // {
                    //     name:'A相电流',
                    //     type: 'line',
                    //     showSymbol: false,
                    //     hoverAnimation: false,
                    //     animationDuration: 800,
                    //     lineStyle: {
                    //         color: '#ecf166',
                    //         width: '1'
                    //     },
                    //     yAxisIndex: 3,
                    //     data: [],                        
                    // },
                ]
            };
            dom.setOption(option, false, false);
        },
        // 2分钟
        async getTwoMinutesFun2() {
            const response = await reqVoltageAndCurrentMinute(this.deviceID)
            if (!this.isInit) return;
            if (response && response.code === 200){
                this.isInit = false
                const dataArr = response.data
                if (dataArr&&dataArr[0].length) {
                    this.twoMinute(dataArr)
                }
            } else {
                return false
            }
            // this.dianliuaTimeoutId = setTimeout(() => {
                this.dianliuaAId = setInterval(async () => {
                    this.getOneSecondFun2()
                }, 2000);
            // }, 1000)

        },
        // 1秒
        async getOneSecondFun2() {
            let loading = true
            const responseOneSecond = await reqVoltageAndCurrentNew(this.deviceID);
            if(responseOneSecond && responseOneSecond.code === 200 && responseOneSecond.data){
                loading = false
                const dataArr = responseOneSecond.data
                this.oneSecond(dataArr)
            } else {
                return false
            }
        }, 
        // 1s钟数据
        setDataOneSecondFun2(currentDataObj) {
            
            this.aArmData.spinLoad.push(this.handleDataA(currentDataObj,currentDataObj.spinLoad))
            this.aArmData.spinLoad2.push(this.handleDataA(currentDataObj,currentDataObj.spinLoad2))
            this.aArmData.actSpin.push(this.handleDataA(currentDataObj,currentDataObj.actSpin))
            this.aArmData.actSpin2.push(this.handleDataA(currentDataObj,currentDataObj.actSpin2))

            this.bArmData.spinLoad.push(this.handleDataA(currentDataObj,currentDataObj.spinLoad))
            this.bArmData.spinLoad2.push(this.handleDataA(currentDataObj,currentDataObj.spinLoad2))
            this.bArmData.actSpin.push(this.handleDataA(currentDataObj,currentDataObj.actSpin))
            this.bArmData.actSpin2.push(this.handleDataA(currentDataObj,currentDataObj.actSpin2))

            this.cArmData.spinLoad.push(this.handleDataA(currentDataObj,currentDataObj.spinLoad))
            this.cArmData.spinLoad2.push(this.handleDataA(currentDataObj,currentDataObj.spinLoad2))
            this.cArmData.actSpin.push(this.handleDataA(currentDataObj,currentDataObj.actSpin))
            this.cArmData.actSpin2.push(this.handleDataA(currentDataObj,currentDataObj.actSpin2))

            this.dArmData.spinLoad.push(this.handleDataA(currentDataObj,currentDataObj.spinLoad))
            this.dArmData.spinLoad2.push(this.handleDataA(currentDataObj,currentDataObj.spinLoad2))
            this.dArmData.actSpin.push(this.handleDataA(currentDataObj,currentDataObj.actSpin))
            this.dArmData.actSpin2.push(this.handleDataA(currentDataObj,currentDataObj.actSpin2))




        },
        // 重新渲染echarts
        setEchartOptionFun2() {
            this.aArmDom.setOption({
                series: [
                    {
                    data: this.aArmData.voltage
                    },
                    {
                    data: this.aArmData.current
                    },
                    {
                    data: this.aArmData.velocity
                    }
                ],
            });            
            this.bArmDom.setOption({
                series: [
                    {
                    data: this.bArmData.voltage
                    },
                    {
                    data: this.bArmData.current
                    },
                    {
                    data: this.bArmData.velocity
                    }
                ],
            });            
            this.cArmDom.setOption({
                series: [
                    {
                    data: this.cArmData.voltage
                    },
                    {
                    data: this.cArmData.current
                    },
                    {
                    data: this.cArmData.velocity
                    }
                ],
            });            
            this.dArmDom.setOption({
                series: [
                    {
                    data: this.dArmData.voltage
                    },
                    {
                    data: this.dArmData.current
                    },
                    {
                    data: this.dArmData.velocity
                    }
                ],
            });            
        }, 
        // shift
        shiftDataFun2() {
            if (this.aArmData.voltage.length > 120) {
                this.aArmData.voltage.shift();
                this.aArmData.current.shift();
                this.aArmData.velocity.shift();
            }            
            if (this.bArmData.voltage.length > 120) {
                this.bArmData.voltage.shift();
                this.bArmData.current.shift();
                this.bArmData.velocity.shift();
            }            
            if (this.cArmData.voltage.length > 120) {
                this.cArmData.voltage.shift();
                this.cArmData.current.shift();
                this.cArmData.velocity.shift();
            }            
            if (this.dArmData.voltage.length > 120) {
                this.dArmData.voltage.shift();
                this.dArmData.current.shift();
                this.dArmData.velocity.shift();
            }
            this.getOneSecondFun2();           
        },
        twoMinute(dataArr) {
            const aArmData = dataArr[0].reverse()
            const bArmData = dataArr[1].reverse()
            const cArmData = dataArr[2].reverse()
            const dArmData = dataArr[3].reverse()

                for(var i=0;i<aArmData.length;i++) {
                    const currentDataObj = aArmData[i]
                    this.aArmData.voltage.push(this.handleDataA(currentDataObj,currentDataObj.voltage))
                    this.aArmData.current.push(this.handleDataA(currentDataObj,currentDataObj.current))
                    this.aArmData.velocity.push(this.handleDataA(currentDataObj,currentDataObj.velocity))
                }
                this.aArmDom.setOption({
                    series: [
                        {
                            data: this.aArmData.voltage
                        },
                        {
                            data: this.aArmData.current
                        },
                        {
                            data: this.aArmData.velocity
                        }
                    ],
                });  

                for(var i=0;i<bArmData.length;i++) {
                    const currentDataObj = bArmData[i]
                    this.bArmData.voltage.push(this.handleDataA(currentDataObj,currentDataObj.voltage))
                    this.bArmData.current.push(this.handleDataA(currentDataObj,currentDataObj.current))
                    this.bArmData.velocity.push(this.handleDataA(currentDataObj,currentDataObj.velocity))
                }
                this.bArmDom.setOption({
                    series: [
                        {
                        data: this.bArmData.voltage
                        },
                        {
                        data: this.bArmData.current
                        },
                        {
                        data: this.bArmData.velocity
                        }
                    ],
                }); 


                for(var i=0;i<cArmData.length;i++) {
                    const currentDataObj = cArmData[i]
                    this.cArmData.voltage.push(this.handleDataA(currentDataObj,currentDataObj.voltage))
                    this.cArmData.current.push(this.handleDataA(currentDataObj,currentDataObj.current))
                    this.cArmData.velocity.push(this.handleDataA(currentDataObj,currentDataObj.velocity))
                }
                this.cArmDom.setOption({
                    series: [
                        {
                        data: this.cArmData.voltage
                        },
                        {
                        data: this.cArmData.current
                        },
                        {
                        data: this.cArmData.velocity
                        }
                    ],
                }); 


                for(var i=0;i<dArmData.length;i++) {
                    const currentDataObj = dArmData[i]
                    this.dArmData.voltage.push(this.handleDataA(currentDataObj,currentDataObj.voltage))
                    this.dArmData.current.push(this.handleDataA(currentDataObj,currentDataObj.current))
                    this.dArmData.velocity.push(this.handleDataA(currentDataObj,currentDataObj.velocity))
                }
                this.dArmDom.setOption({
                    series: [
                        {
                        data: this.dArmData.voltage
                        },
                        {
                        data: this.dArmData.current
                        },
                        {
                        data: this.dArmData.velocity
                        }
                    ],
                }); 
       
        },
        toSec(time) {
            // debugger;
            var s = '';   
            var hour = time.split(':')[0];
            var min = time.split(':')[1];
            var sec = time.split(':')[2];    
            s = Number(hour*3600) + Number(min*60) + Number(sec);    
            return s;
        },
        oneSecond(dataArr) {
            const currentData = dataArr[0].time
            // console.log('currentData:',this.toSec(currentData))
            // console.log('currentData2:',this.toSec(this.prevData))
            if (currentData<=this.prevData) return;
            this.shiftDataFun2()
            const aArmDataObj = dataArr[0]
            const bArmDataObj = dataArr[1]
            const cArmDataObj = dataArr[2]
            const dArmDataObj = dataArr[3]

            this.prevData = dataArr[0].time

            this.aArmData.voltage.push(this.handleDataA(aArmDataObj,aArmDataObj.voltage))
            this.aArmData.current.push(this.handleDataA(aArmDataObj,aArmDataObj.current))
            this.aArmData.velocity.push(this.handleDataA(aArmDataObj,aArmDataObj.velocity))
            this.aArmDom.setOption({
                series: [
                    {
                    data: this.aArmData.voltage
                    },
                    {
                    data: this.aArmData.current
                    },
                    {
                    data: this.aArmData.velocity
                    }
                ],
            });

            this.bArmData.voltage.push(this.handleDataA(bArmDataObj,bArmDataObj.voltage))
            this.bArmData.current.push(this.handleDataA(bArmDataObj,bArmDataObj.current))
            this.bArmData.velocity.push(this.handleDataA(bArmDataObj,bArmDataObj.velocity))

            this.bArmDom.setOption({
                series: [
                    {
                    data: this.bArmData.voltage
                    },
                    {
                    data: this.bArmData.current
                    },
                    {
                    data: this.bArmData.velocity
                    }
                ],
            }); 


            this.cArmData.voltage.push(this.handleDataA(cArmDataObj,cArmDataObj.voltage))
            this.cArmData.current.push(this.handleDataA(cArmDataObj,cArmDataObj.current))
            this.cArmData.velocity.push(this.handleDataA(cArmDataObj,cArmDataObj.velocity))

            this.cArmDom.setOption({
                series: [
                    {
                    data: this.cArmData.voltage
                    },
                    {
                    data: this.cArmData.current
                    },
                    {
                    data: this.cArmData.velocity
                    }
                ],
            }); 


            this.dArmData.voltage.push(this.handleDataA(dArmDataObj,dArmDataObj.voltage))
            this.dArmData.current.push(this.handleDataA(dArmDataObj,dArmDataObj.current))
            this.dArmData.velocity.push(this.handleDataA(dArmDataObj,dArmDataObj.velocity))

            this.setEchartOptionFun2()

        }   
    // ==================电流 end=================           
  },
  destroyed() {
      clearInterval(this.dianliuaAId)
      this.dianliuaAId = null
      clearTimeout(this.dianliuaTimeoutId)
      this.dianliuaTimeoutId = null
  }
}
</script>
<style lang="scss" scoped>
.scrollbarX{
    width: 100%;height: 100%;
    /deep/ .el-scrollbar__wrap{
        overflow-x: hidden;
    }
    /deep/ .el-scrollbar__bar.is-horizontal{
        opacity: 1;
    }
    /deep/ .el-scrollbar__thumb:hover{ background-color: #3271c8; }
}
.scrollbarY{
    /deep/ .el-scrollbar__wrap{
        overflow-x: hidden;
    }
    /deep/ .el-scrollbar__bar.is-vertical{
        opacity: 1;
    }
}
.robot_headBox {
    .common_basicTitle01{ position: fixed; top: 130px;left: 10px; }	
    ul{
        display: flex;
        color: #fff;
        font-size: 0.20rem;
        font-weight: bold;
        width: 40%;
        text-align: center;
        margin: 0 auto;
        background: url("../../assets/images/deviceConnect_status2.png") no-repeat;
        background-size: 100% 100%;
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
.robot_con{
    height: calc(100% - 60px - 20px);overflow: hidden;margin-top:5px;
    display: flex;flex-wrap:nowrap;
   .robot_item{
       height: 100%;flex:1;overflow: hidden;
       background-color: rgba(0, 186, 255, 0.1);
       margin-left: 15px;
       &-first{
           text-align: center;display: flex;flex-direction: column;
           .img{ height: 280px; }
           .model{ font-size: 28px; color: #fff; }
           .name{ font-size: 18px; color: #bddcf9; }
           	.timeBox {
                width: 260px;height: 84px;
                position: relative;
                margin: 10px auto 0;
                // border:1px solid red;
                background-image: url(../../assets/images/DeviceConnect_time.png);
                background-size: 100% 100%;
                .text {
                    font-size: 36px;color: #01ff8a;
                    position: absolute;top: 16px;left: 20px;
                    &.green{ color: #1cf33c }
                    &.red{ color: #fd0101 }
                    &.orange{ color: #ffc31f }
                    &.darkGray{ color: #353535 }
                    &.lightGray{ color: #838990 }
                }
                .time {
                    font-size: 20px;color: #00fcf9;
                    position: absolute;bottom: 4px;right: 20px;
                }
            }
            .params {
                margin-top: 20px;
                span{ font-size: 24px; color: #fff; }
                em{ font-size: 12px; color: #02d8e7; }
            }
            .paramsList{flex: 1;padding-bottom: 10px;padding-top: 4px;}
            .list{
                text-align: left; padding:0 20px;
                li{ margin-top: 10px; }
                .label{ font-size: 14px; color: #aec9ff; width: 200px;text-align: right; display: inline-block;}
                .num{ font-size: 14px; color: #00c7fa;padding-left: 10px; }
            }
       }
       &Arm{
           padding: 0px 10px 10px; display: flex;flex-direction:column;
           .armFlag{
               display: flex; align-items: center;justify-content: center;height: 55px;
               .line{ height: 1px;background-color:#1963b4;width: 50px; }
               .circle{ width: 14px; height: 14px; border-radius: 50%; margin-left: 15px; background-color: #1cf33c }
               .text{ font-size: 28px; color: #fff; padding-right: 15px; padding-left: 5px; }
               .greenBg{ background-color: #1cf33c }
                .redBg{ background-color: #fd0101 }
                .orangeBg{ background-color: #ffc31f }
                .darkGrayBg{ background-color: #353535 }
                .lightGrayBg{ background-color: #838990 }
           }
           .elec{
               background-color: rgba(0, 186, 255, 0.1);
               height: 90px;padding: 10px;display: flex;flex-direction: column;
               li { display: flex; flex: 1 }
               label{ font-size: 16px; color: #fff; width: 80px;text-align: right;display: inline-block;flex: 1 }
               span{ font-size: 18px; color: #00c7fa; padding-left: 20px;flex: 1 }
           }
           .armImg{
               background-color: rgba(0, 186, 255, 0.1);margin-top: 10px;
               display: flex;align-items: center;justify-content: center;
               .img {
                   width: 285px; height: 152px;position: relative;
                }
               .armItem{ 
                   font-size: 12px; color: #00b7f4;
                   position: absolute;
                }
               .first{ top: 5px;right:64px }
               .second{ top: 48px;right:25px }
               .three{ top: 113px;right:20px }
               .four{ top: 7px;left:50px }
               .five{ top: 60px;left: 10px }
               .six{ top: 116px;left: 7px }
           }
           .coordinate{
               background-color: rgba(0, 186, 255, 0.1); height: 105px;margin-top: 10px;overflow: hidden;
               display: flex;
               .bgLabel{
                    text-align: center;
                    
                    li{ 
                        margin-bottom: 2px;height: 30px;line-height: 30px;
                        background: linear-gradient(rgba(51, 171, 251, 0.3), rgba(136, 209, 247, 0.3));
                        color:#fff;width: 83px;
                    }
               }
               .conten{
                   flex: 1;margin-left: 2px;
                   li{
                       margin-right: 2px;
                   }
                   .bgTitle{
                       height: 30px;line-height: 30px;overflow: hidden;margin-bottom: 2px;
                       li {
                           background: linear-gradient(rgba(51, 171, 251, 0.3), rgba(136, 209, 247, 0.3));
                           color:#fff;width: 83px;display: inline-block;text-align: center;
                       }
                    }
                   .bgData{
                       height: 30px;line-height: 30px;overflow: hidden;margin-bottom: 2px;
                       background-color: rgba(0,186,255,0.1);
                       li {
                           color:#fff;width: 83px;display: inline-block;text-align: center;
                       }
                   }
               }
           }
           .ElecVoltage{
               background-color: rgba(0, 186, 255, 0.1); height: 160px;margin-top: 10px;
           }
           .armParams{
               background-color: rgba(0, 186, 255, 0.1); margin-top: 10px;flex: 1;padding: 10px;
               display: flex;flex-direction:column;
               .title{
                   span{ font-size: 20px; color: #fff; }
                   em{ font-size: 12px; color: #02d8e7; }
               }
               .armParamsList{flex: 1}
               ul{ padding: 10px 20px }
               .label{ font-size: 14px; color: #aec9ff; width: 150px; display: inline-block;text-align: right;}
               .num{ font-size: 14px; color: #00c7fa;padding-left: 10px; }
           }
       }
   } 
}


</style>

