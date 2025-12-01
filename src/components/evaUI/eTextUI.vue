<template>
    <div class="eva-container eva-container-interactive" :class="{ 'active': optionsIndex === optionKey }" @click="selectUI()">
        <textarea class="eva-textarea" v-model="attributes.val" placeholder="请输入反馈页面需要显示的文字..."></textarea>
        <span v-show="optionKey === optionsIndex" class="eva-btn-float eva-btn-copy" @click.stop="copyThis()">
            <i class="el-icon-document-copy"></i>
        </span>
        <span v-show="optionKey === optionsIndex" class="eva-btn-float eva-btn-delete" @click.stop="delThis()">
            <i class="el-icon-delete"></i>
        </span>
    </div>
</template>

<script>
export default {
    props: ['optionKey','attributes','optionsIndex'],
    methods: {
        selectUI() {
            this.$emit('selectUI', this.optionKey)
        },
        delThis() {
            this.$emit('delThis', this.optionKey)
        },
        copyThis() {
            this.$emit('copyThis', this.optionKey)
        }
    }
}
</script>

<style scoped>
@import '../../assets/global.css';
</style>