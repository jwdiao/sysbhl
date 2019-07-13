<template>
    <div class="common_select">
        <el-select v-model="craftValue" placeholder="请选择工艺类型" @change="handleChangeFun">
          <el-option
            v-for="item in craftOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            
          ></el-option>
        </el-select>
    </div>
</template>
<script>
import { reqGroupList } from '@/api'
export default {
    name: 'Select',
    data() {
        return {
            companyCode: '',
            companyName: '',
            craftValue: '', // 工艺值
            craftOptions: [], // 工艺下拉值,
        }
    },
    mounted() {
        // 从localStory里面取选中的公司
        const sbhlSelectedCompanyStr = localStorage.getItem('sbhl-OverView-SelectedCompany')
        if(sbhlSelectedCompanyStr && sbhlSelectedCompanyStr!==undefined){
            const sbhlSelectedCompanyObj = JSON.parse(sbhlSelectedCompanyStr)
            this.companyCode = sbhlSelectedCompanyObj.value; // 公司编码
            this.companyName = sbhlSelectedCompanyObj.label // 公司名字
        }
        this.getCraftOption()
    },
    methods: {
    // 获取工艺类型
        async getCraftOption() {
            const res = await reqGroupList(this.companyCode)
            if (res && res.code === 200) {
                this.craftOptions = [
                    { 
                        value: '',
                        label: '全部工艺类型'
                    }
                ]
                const dataArr = res.data
                if(!dataArr.length) return;
                dataArr.map((item) => {
                    const obj = {
                        label: item.firstGroupName,
                        value: item.firstGroupCode
                    }
                    this.craftOptions.push(obj)
                })
            }
        },
        handleChangeFun(val) {
            // debugger;
            this.$emit('select', val)
        }      
    }
}
</script>
<style lang="scss" scoped>
.common_select{ display: inline-block }
</style>

