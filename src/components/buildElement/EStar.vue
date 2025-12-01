<template>
  <div class="eva-container">
    <p class="eva-label">
      <span v-if="attributes.require" class="eva-required">*</span>{{ attributes.label }}
    </p>
    <el-rate :max="attributes.max" @change="callBack" v-model="attributes.defaultValue" :icons="attributes.radioOptions" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" style="margin:10px 20px;"></el-rate>
  </div>
</template>

<script>
export default {
  props: ['optionKey','attributes'],
  data() {
    return {

    }
  },
  methods: {
    callBack() {
      this.$emit('callBack', this.optionKey)
    }
  }
}
</script>

<style>
@import '../../assets/global.css';

/* 自定义el-rate图标大小 */
.el-rate .el-rate__item i{
  font-size: 24px; /* 调整图标的大小为24像素，根据需要进行调整 */
}

</style>