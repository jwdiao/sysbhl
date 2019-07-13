<template>
    <el-scrollbar style="height:100%;">
        <ul>
            <li v-for="(item,index) in data" :key='"curNcBlk"+index' :class='"curNcBlk"+index'>{{item}}</li>
        </ul>
    </el-scrollbar>
</template>
<script>
export default {
    name: 'LeftBottomCurNcBlk',
    props: {
        data: {
            type: Array,
            default: function() {
                return []
            }
        }
    }
}
</script>
<style lang="scss" scoped>

</style>

