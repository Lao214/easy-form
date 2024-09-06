<template>
    <div class="text-body">
        <!-- <te class="e-text-ui" >
            {{ attributes.val }}
        </p> -->
        <div class="e-text-ui" v-html="formattedText"></div>
    </div>
</template>

<script>
export default {
    props: ['optionKey','attributes'],
    computed: {
        formattedText() {
            // 将 \n 替换为 <br> 标签
            return this.attributes.val.replace(/\n/g, '<br>');
        }
    },
    methods: {

    }
}
</script>

<style scoped>

.text-body {
    background: rgba(255, 255, 255, 0);
    width: calc(100% - 4rem);
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


.e-text-ui {
    width: 100%;
    height: auto;
    text-align: left;
}

</style>