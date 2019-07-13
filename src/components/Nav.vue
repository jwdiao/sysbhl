<template>
<div class="common_navBox">
    <div class="common_navBtn" @click.stop="isOpenedNav = !isOpenedNav">
      <img src="../assets/images/icon_menu-spread.png" />
    </div>
    <!-- :class="(current==item.id) ? 'active': ''" -->
    <div class="common_navCon" v-if="isOpenedNav">
        <ul class="common_nav">
            <li
            v-for="item in NavPageList"
            :key="item.id"
            @click="$router.push(item.url)"
            >{{item.name}}</li>
        </ul>
    </div>
</div>
</template>
<script>
import { NavList } from '@/utils/Constants'
export default {
    name: 'CommonNav',
    props: {
        current: {
            type: String,
            default: 'Overview'
        }
    },
    data() {
        return {
          NavPageList: NavList.filter(item => item.id!==this.current),
          isOpenedNav: false,
        }
    },
    mounted() {
      document.body.addEventListener('click',() =>{
        this.isOpenedNav = false
      })        
    }
}
</script>

<style lang="scss" scoped>
    .common_navBox{
      position: fixed;
      left: 15px;
      top: 72px;
      z-index: 10    
    }
    .common_navBtn{
      width: 98px;
      height: 40px;
      line-height: 40px;
      border-radius: 20px;
      text-align: center;
      cursor: pointer;
      background-color: #002b55;
      img{ vertical-align: middle; }
    }
    .common_navCon{
      width: 200px;padding:20px 0;
      background-color: rgba(1,19,45,0.9);
      border: 2px solid #0460a5;
      margin-top: 15px;
    //   position: absolute;
    //   top: 110px;
    //   left: 15px;
    //   z-index: 100;
      text-align: center;
      /deep/ .el-scrollbar__wrap{ overflow-x: hidden; }
    }
    .common_nav{
      li{
        background: rgba(12,51,103,.1);
        height: 74px;
        line-height: 74px;
        border: 1px solid rgb(27,46,70);
        color: #009aff;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        &:hover{ color:#fff; background-color:#4787f6;}
        &.active{ color:#fff; background-color:#4787f6; }
      }
    }
</style>

