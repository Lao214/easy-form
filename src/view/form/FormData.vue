<template>
    <div>
        <el-row>
            <el-col :span="4">
                <LeftBodyVue></LeftBodyVue>
            </el-col>
            <el-col :span="20">
                
            </el-col>
        </el-row>
    </div>
</template>

<script>
import LeftBodyVue from '@/components/formDetails/LeftBody.vue'
export default {
    components: {
        LeftBodyVue
    },
}
</script>

<style scoped>

</style>