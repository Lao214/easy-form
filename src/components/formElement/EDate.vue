<template>
  <div class="eva-container eva-container-interactive" :class="{ 'active': optionsIndex === optionKey }" @click="callBack">
    <div class="eva-row">
      <label class="eva-label">
        <span v-if="attributes.require" class="eva-required">*</span>{{ attributes.label }}
      </label>
      <el-date-picker class="eva-input-select" v-model="attributes.defaultValue" @change="callBack()" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
    </div>
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

.eva-input-select {
  margin-left: 7px;
  margin-bottom: 7px;
  font-weight: 600;
  width: 44%;
}
</style>