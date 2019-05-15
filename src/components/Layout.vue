<template>
<div class="common_wrapper">
  <div class="common_head">
    <div class="common_head-left">
      <div class="backBtn" v-if="isShowBackBtn" @click="handleBack">
        <img src="../assets/images/common_back.png" />
      </div>
    </div>
    <div class="common_head-center">
      <div class="title">三一集团设备数据中心</div>
    </div>
    <div class="common_head-right">
      <span class="time">2019-05-06 17:13:01</span>
      <slot></slot>
    </div>
  </div>
  <div class="common_main">
  </div>
</div>
</template>
<script>
export default {
  name: 'Head',
  props: {
    isShowBackBtn: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleBack() {
      this.$emit('backBtnClick')
    }
  }
}
</script>
<style lang="scss" scoped>
.common_wrapper{ 
  height: 100%;
  background-image: url(../assets/images/common_bodyBg01.png);
  background-size: cover;

}
.common_head{
  width: 100%;
  height: 110px;overflow: hidden;
  display: flex;
  background-image: url(../assets/images/common_bodyHeadBg01.png);
  background-size: 100% 100%;
  &-left{
    border:1px solid red;
    flex: 1;
    padding-left: 20px;
    padding-top: 60px;
    .backBtn{

    }
  }
  &-center{
    border:1px solid blue;
    flex: 2;
    text-align: center;
    text-align: center;
    font-size: 0.42rem;
    color: #fff;
    font-weight: 700;
    line-height: 110px;
  }
  &-right{
    border:1px solid red;
    flex: 1;
    padding-right: 20px;
    text-align: right;
    .time{
      width: 250px;
      display: inline-block;
      font-size: 30px;
      color: rgb(171, 171, 171);
      font-family: fontnameUnidreamLED !important;
      padding-top: 60px;
    }
  }
}
.common_main{
  height: calc(100% - 110px - 15px - 15px);
  background: rgba(39, 69, 111, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin: 15px;
}
</style>
