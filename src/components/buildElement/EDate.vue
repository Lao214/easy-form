<template>
  <div class="eva-container">
    <div class="eva-row">
      <label class="eva-label">
        <span v-if="attributes.require" class="eva-required">*</span>{{ attributes.label }}
      </label>
      <el-date-picker class="eva-input-select" v-model="attributes.defaultValue" @change="callBack()" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
    </el-date-picker>
    </div>
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