<template>
  <div class="componentBorderForm" :class="optionsIndex === optionKey ? 'active' : ''" @click="callBack">
    <div style="display:flex;flex-wrap:wrap;">
      <label style="margin-left: 7px;margin-bottom: 7px;font-weight: 600;width:94%;"><span v-if="attributes.require" style="color: red;">*</span>{{ attributes.label }}</label>
      <el-date-picker style="margin-left: 7px;margin-bottom: 7px;font-weight: 600;width:44%;" v-model="attributes.defaultValue" @change="callBack()" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
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