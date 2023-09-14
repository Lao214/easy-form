<template>
  <div class="componentBorder" style="" @click="callBack">
    <div style="display:flex;flex-wrap:wrap;">
      <label style="margin-left: 7px;margin-bottom: 7px;font-weight: 600;width:94%;">{{ attributes.label }}</label>
      <el-select  style="margin-left: 7px;margin-bottom: 7px;font-weight: 600;width:44%;" v-model="attributes.defaultValue" @change="callBack()" filterable placeholder="请选择">
        <el-option v-for="item in attributes.radioOptions" :key="item.radioValue" :label="item.radioLabel" :value="item.radioValue">
        </el-option>
      </el-select>
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
</style>