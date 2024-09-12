<template>
  <div class="componentBorderForm" :class="optionsIndex === optionKey ? 'active' : ''" @click="callBack">
    <div style="display:flex;flex-wrap:wrap;">
      <label style="margin-left: 7px;margin-bottom: 7px;font-weight: 600;width:94%"><span v-if="attributes.require" style="color: red;">*</span>{{ attributes.label }}</label>
      <input style="margin-left: 7px;margin-bottom: 11px;width:94%;height:30px;border: 1.5px solid #425c77;border-radius:4px;padding-left:7px" v-model="attributes.defaultValue">
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