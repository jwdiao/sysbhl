<template>
<div class="common_bg common_bg02">
  <CommonHead
    :isShowBackBtn="true"
    :isClickedTitle="true"
    :titleText="`${companyName}设备数据系统`"
    @backBtnClick="handleBackBtn"
    @titleClick="handleTitleClick"
  />
  <CompanyDialog
    :showflag="showCompanyDialog" 
    @confirmcallback="confirmFun"
    @showdialog="showdialogFun"
  />
  <div class="common_main common_blockColor">
    <!-- common_blockColor根据实际需要添加 -->
    <p style="font-size:50px;color:#fff;text-align:center;margin-top:100px;">页面内容可随意添加</p>
    <p style="font-size:50px;color:#fff;text-align:center;">页面内容可随意添加</p>
  </div>
</div>
</template>
<script>
import CommonHead from '@/components/Head'
import CompanyDialog from '@/components/CompanyDialog.vue'
import { _SessionStorageObj } from '@/utils'
export default {
  name: 'Test',
  components: {
    CommonHead,
    CompanyDialog
  },
  data() {
    return {
      showCompanyDialog: false, // 是否显示顶部选择子公司
      companyCode: '0701', // 选中的公司code
      companyName: '三一德力佳', // 选中的公司name
    }
  },
  mounted() {
      // 从localStory里面取选中的公司
      const sbhlSelectedCompanyObj = _SessionStorageObj.get('sbhl-OverView-SelectedCompany')
      if (sbhlSelectedCompanyObj) {
        this.companyCode = sbhlSelectedCompanyObj.value; // 公司编码
        this.companyName = sbhlSelectedCompanyObj.label // 公司名字
      }
  },
  methods: {
    // 返回按钮回调
    handleBackBtn() {
      // console.log('back btn clicked!')
      this.$router.push('/OverView');
    },
    // 标题按钮回调
    handleTitleClick() {
      // console.log('title clicked!')
      this.showCompanyDialog = true // 关闭弹窗
    },
    //表头下拉框确定
    confirmFun (sbhlSelectedCompanyObj) {
      this.companyCode = sbhlSelectedCompanyObj.value; // 公司编码
      this.companyName = sbhlSelectedCompanyObj.label // 公司名字
      this.showCompanyDialog = false // 关闭弹窗
      this.$store.commit('changeOverViewSelectedCompanyMut',JSON.stringify(sbhlSelectedCompanyObj))
      _SessionStorageObj.set('sbhl-OverView-SelectedCompany',sbhlSelectedCompanyObj)  
    },
    // 监听组件内弹窗状态
    showdialogFun (flag) {
      this.showCompanyDialog = flag
    },
  }
}
</script>
<style lang="scss" scoped>
</style>

