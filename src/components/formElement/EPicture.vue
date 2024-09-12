<template>
  <div class="componentBorderForm" :class="optionsIndex === optionKey ? 'active' : ''" @click="callBack">
    <div style="display:flex;flex-wrap:wrap;">
      <label style="margin-left: 7px;margin-bottom: 7px;font-weight: 600;width:94%;text-align:center;">{{ attributes.label }}</label>
      <img :src="attributes.defaultValue" style="width:98%;margin: 0 auto">
    </div>
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
  data() {
    return {

    }
  },
  methods: {
    callBack() {
      this.$emit('callBack', this.optionKey)
    },
    delThis() {
      this.$emit('delThis', this.optionKey)
    },
    copyThis() {
      this.$emit('copyThis', this.optionKey)
    },
  }
}
</script>

<style scoped>
@import '../../assets/global.css';
</style>