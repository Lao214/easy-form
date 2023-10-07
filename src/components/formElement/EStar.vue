<template>
  <div class="componentBorder" style="" @click="callBack">
    <p style=" padding: 0px 16px;font-weight: 700"><span v-if="attributes.require" style="color: red;">*</span>{{ attributes.label }}</p>
    <el-rate :max="attributes.max" v-model="attributes.defaultValue" :icons="attributes.radioOptions" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" style="margin:10px 20px;"></el-rate>
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
.componentBorder {
  width: 100%;
  border: 2px solid #2c3e50;
  padding: 8px 0px;
  border-radius: 4px;
  margin: 14px 0px;
  text-align: start;
}

.componentBorder:hover {
  border: 2px solid #2881da;
}

/* 自定义el-rate图标大小 */
.el-rate .el-rate__item i{
  font-size: 24px; /* 调整图标的大小为24像素，根据需要进行调整 */
}

</style>