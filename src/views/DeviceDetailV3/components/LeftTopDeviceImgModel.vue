<template>
    <div class="fill LeftTopDeviceImgModel">
        <div class="img">
            <img :src="url" style="width:80%;" />
        </div>
        <p class="model">型号:{{info.machineModel}}</p>
        <p class="name">{{info.machineName}}</p>
        <div class="timeBox">
        <span class="text" v-if="info.machineStatus==1" style="color:#1cf33c">&nbsp;作业</span>
        <span class="text" v-if="info.machineStatus==2" style="color:#ffc31f">&nbsp;待机</span>
        <span class="text" v-if="info.machineStatus==3" style="color:#6b6d71">&nbsp;关机</span>
        <span class="text" v-if="info.machineStatus==4" style="color:#fd0101">&nbsp;故障</span>
        <span class="text" v-if="info.machineStatus==5" style="color:#444445">&nbsp;离线</span>
        <span class="time">{{info.time}}</span>
        </div>        
    </div>
</template>
<script>
export default {
    name: 'LeftTopDeviceImgModel',
    props: ['info','url']
}
</script>
<style lang="scss" scoped>
.LeftTopDeviceImgModel{
    display: flex;flex-direction: column;
    .name {
      color:#bddcf9;font-size: 18px;text-align: center
		}
    .model{
      font-size: 26px;color: #fff;text-align: center;margin-top:5px;
      white-space: nowrap;overflow: hidden;text-overflow: ellipsis;
    }
	.img {
		display: flex;justify-content: center;align-items: center;padding-top:5px;
        img { height: 180px; overflow: hidden; }
	}
	.timeBox {
        width: 260px;height: 84px;
        position: relative;
        margin: 10px auto 0;
        // border:1px solid red;
        background-image: url(../../../assets/images/DeviceConnect_time.png);
        background-size: 100% 100%;
        .text {
            font-size: 36px;color: #01ff8a;
            position: absolute;top: 16px;left: 20px;
        }
        .time {
            font-size: 20px;color: #00fcf9;
            position: absolute;bottom: 4px;right: 20px;
        }
	}
}
</style>

