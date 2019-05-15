<template>
  <div :class="[{'common_head': true},headClass]">
    <div class="common_head-left">
      <div class="backBtn" v-if="isShowBackBtn" @click="handleBack">
        <img src="../assets/images/common_back.png" />
      </div>
    </div>
    <div class="common_head-center">
      <div
        :class="{'title': true, 'cursorPointer': isClickedTitle}"
        @click="handleTitle"
      >
        {{titleText}}
      </div>
    </div>
    <div class="common_head-right">
      <span class="time" v-if="isShowCurrentTime" v-text="currentTime"></span>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'CommonHead',
  props: {
    // 是否显示返回按钮
    isShowBackBtn: {
      type: Boolean,
      default: true
    },
    // 是否显示系统时间
    isShowCurrentTime: {
      type: Boolean,
      default: true
    },
    // 标题是否可点击
    isClickedTitle: {
      type: Boolean,
      default: false
    },
    // 标题
    titleText: {
      type: String,
      default: ''
    },
    // 标题行class
    headClass: {
      type: String,
      default: ''
    },
    // 标题class
    titleClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentTime: '', // 系统时间
      timeIntervalId: null // 系统时间定时器
    }
  },
  mounted() {
    // 如果显示系统时间
    if (this.isShowCurrentTime) {
      this.getCurrentDateTime();
      this.timeIntervalId = setInterval(() => {
        this.getCurrentDateTime()
      })
    }
  },
  methods: {
    // 返回按钮点击
    handleBack() {
      this.$emit('backBtnClick')
    },
    handleTitle() {
      this.$emit('titleClick')
    },
    // 时间格式化
    getCurrentDateTime() {
      this.currentTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  destroyed() {
    clearInterval(this.timeIntervalId)
  }
}
</script>
<style lang="scss" scoped>
.common_head{
  width: 100%;
  height: 110px;overflow: hidden;
  display: flex;
  background-image: url(../assets/images/common_bodyHeadBg01.png);
  background-size: 100% 100%;
  &-left{
    // border:1px solid red;
    flex: 1;
    position: relative;
    .backBtn{
      display: inline-block;
      cursor: pointer;
      position: absolute;bottom: 0px;left:15px;
    }
  }
  &-center{
    // border:1px solid blue;
    flex: 2;
    text-align: center;
    text-align: center;
    font-size: 0.42rem;
    // font-size: 42px;
    color: #fff;
    font-weight: 700;
    position: relative;
    .title{
      width:80%;
      position: absolute;left:50%;top:50%;transform: translate(-50%,-50%);
    }
  }
  &-right{
    // border:1px solid red;
    flex: 1;
    padding-right: 20px;
    text-align: right;
    position: relative;
    .time{
      width: 270px;
      display: inline-block;
      font-size: 34px;
      color: rgb(171, 171, 171);
      font-family: fontnameUnidreamLED !important;
      text-align: left;
      position: absolute;bottom: 0px;right:15px;
    }
  }
}
</style>
