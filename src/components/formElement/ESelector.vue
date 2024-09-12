<template>
  <div class="componentBorderForm" :class="optionsIndex === optionKey ? 'active' : ''" @click="callBack">
    <div style="display:flex;flex-wrap:wrap;">
      <label style="margin-left: 7px;margin-bottom: 7px;font-weight: 600;width:94%;"><span v-if="attributes.require" style="color: red;">*</span>{{ attributes.label }}</label>
      <el-select  style="margin-left: 7px;margin-bottom: 7px;font-weight: 600;width:44%;" v-model="attributes.defaultValue" @change="callBack()" filterable placeholder="请选择">
        <el-option v-for="item in attributes.radioOptions" :key="item.valu" :label="item.label" :value="item.valu">
        </el-option>
      </el-select>
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