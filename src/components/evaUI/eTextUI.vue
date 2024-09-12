<template>
    <div class="body" :class="optionsIndex === optionKey ? 'active' : ''" @click="selectUI()">
        <textarea class="e-text-ui" v-model="attributes.val" placeholder="请输入反馈页面需要显示的文字..."></textarea>
        <span v-show="optionKey === optionsIndex" class="floating-btn" @click="copyThis()">
            <i class="el-icon-document-copy"></i>
        </span>
        <span v-show="optionKey === optionsIndex" class="floating-del-btn" @click="delThis()">
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

.body {
    background: white;
    width: calc(100% - 4rem);
    min-height: 6rem;
    border-radius: .2rem;
    box-sizing: border-box;
    padding: .7rem;
    margin:.8rem 0;
    cursor: pointer;
    position: relative;
    border:2px solid #110b5500;
}

.active {
    border:2px solid #152e3d;
}

.floating-del-btn {
    position: absolute;
    right: -2.3rem;
    top: 2.4rem;
    width: 2rem;
    height: 2rem;
    background: #c91414;
    color: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.floating-btn {
    position: absolute;
    right: -2.3rem;
    top: 0;
    width: 2rem;
    height: 2rem;
    background: #383333;
    color: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.e-text-ui {
    width: 100%;
    height: 5rem;
    resize: none;
    border: none;
    outline: none;
}

</style>