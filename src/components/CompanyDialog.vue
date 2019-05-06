<template>
  <div>
    <!-- 头部下拉 start -->
    <div class="index_selectDialog" v-show="selectDialogShow">
      <ul>
        <li>
          <p class="title">事业部</p>
          <div class="common_select">
            <el-select
            v-model="careerValue"
            @change="careerChange"
            placeholder="请选择"
            >
              <el-option
                v-for="item in careerOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </li>
        <li>
          <p class="title">子公司</p>
          <div class="common_select">
            <el-select
            v-model="company_code"
            placeholder="请选择"
            >
              <el-option
                v-for="item in companyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </li>
        <li>
          <span class="btn confirm" @click="handleConfirm">确定</span>
          <span class="btn cancel" @click="handleCancel">取消</span>
        </li>
      </ul>
    </div>
    <!-- 头部下拉 end -->
  </div>
</template>
<script>
export default {
  name: 'CompanyDialog',
  props: ['showflag'],
  data() {
    return {
      selectDialogShow: false, // 是否显示顶部事业部子公司弹窗
      careerValue: '', // 点击标题下拉事业部选中值
      careerOptions: [ // 事业部下拉option
        {label:'重机事业部',value:'zhongji'},
        {label:'重能事业部',value:'zhongneng'},
      ],
      company_code: '', // 子公司选中值
      companyOptions: [], // 子公司option
    }
  },
  watch: {
    showflag(val) {
      this.selectDialogShow = val
    }
  },
  methods: {
    careerChange (val) {
      // console.log(`选择的事业部是：${val}`)
      this.companyOptions = []
      this.company_code = ''
      if (val === 'zhongji') {
        this.companyOptions = [
          {label:'北京桩机',value:'0301'},
        ]
      } else if (val === 'zhongneng') {
        this.companyOptions = [
          {label:'三一重能',value:'0701'},
        ]
      }
    },
    handleConfirm () {
      if (!this.careerValue) {
        this.$message({
          type: 'warning',
          message: '请选择事业部!',
          customClass: 'messageInfo'
        });
        return;
      }
      if (this.company_code === '') {
        this.$message({
          type: 'warning',
          message: '请选择子公司!'
        });
        return;
      }
      let selectedCompanyStr = this.getCompanyNameByCode(this.company_code)
      this.$emit('confirmcallback',selectedCompanyStr) // 选中的公司码
    },
    // 关闭顶部选择事业部弹窗
    handleCancel () {
      this.selectDialogShow = false
      this.$emit('showdialog',this.selectDialogShow) // 弹窗是否显示
    },
    getCompanyNameByCode (code) {
      let obj ={}
      obj = this.companyOptions.find(item => {
        return item.value === code
      })
      return JSON.stringify(obj);
    }
  }
}
</script>
<style lang="scss" scoped>
  .index_selectDialog{
    background-color: rgba(9, 20, 40, 0.8);border:1px solid #6bb9d5;
    position:fixed;top:105px;z-index:999;left:50%;transform: translateX(-50%);
    padding:28px 60px 48px;
    width:420px;margin:0 auto;font-size:12px;
    .title{font-size:20px;color:#fff;margin-top:20px;}
    .common_select{margin-top:10px;}
    .el-select{
      width:100%;
    }
    /deep/ .el-input__inner {
        height: 38px !important;
        line-height: 38px !important;
    }
    .btn{
      height:40px;line-height:40px;display: inline-block;font-size:20px;
      text-align: center;border-radius: 4px;margin-top:30px;width:48%;
    }
    .confirm{
      background-color: #0088ff;color:#fff;cursor: pointer;
    }
    .cancel{
      margin-left:4%;
      background-color: #b3b3bd;color:#0c1932;cursor: pointer;
    }
  }
</style>

