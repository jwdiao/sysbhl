<template>
  <div :class="[{'common_basicTitle01': true},headClass]">
    <span class="circle">•</span>
    <span class="title">{{titleText}}</span>
    <img class="img" src="../assets/images/DeviceConnect_title.png" />
  </div>
</template>
<script>
export default {
  name: 'CommonBasicTitle01',
  props: {
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
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
  },
  destroyed() {
  }
}
</script>
<style lang="scss" scoped>
.common_basicTitle01{
		padding-left: 15px;
		height: 50px;

		.circle {
			margin-left: 5px;
			font-size: 32px;
			color: rgb(2, 201, 252);
			display: inline-block;
			vertical-align: middle;
		}

		.title {
			display: inline-block;
			vertical-align: middle;
			font-size: 28px;
			color: #fff;
			margin-left: 10px;
			font-weight: bold;
		}

		.img {
			display: inline-block;
			vertical-align: middle;
			margin-left: 5px;
		}
}
</style>
