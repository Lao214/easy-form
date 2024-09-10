<template>
    <div class="body">
        <div class="main">
            <component v-for="(item, index) in feedback" :key="index" :is="item.component" :attributes="item.attributes" :optionKey="index" />
        </div>
    </div>
</template>

<script>
import eTextUI from '@/components/evaUI/eTextUISucc.vue'

export default {
    components: {
        eTextUI
    },
    data() {
        return {
            // 暂时存储数据
            feedback: JSON.parse(sessionStorage.getItem('feedback' + this.$route.query.key))
        }
    },
    created() {
        console.log(this.feedback)
    }
}
</script>

<style scoped>
.body {
    height: auto;
    background: #a7ce74;
    min-height: 100vh;
    padding-top: 3rem;
}

.main {
    width: 81vw;
    max-width: 960px;
    background: #ffffff;
    margin: 0 auto;
    padding: 1rem;
    height: auto;
    min-height:77vh;
}
</style>