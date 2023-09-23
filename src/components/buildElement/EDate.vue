<template>
  <div class="componentBorder">
    <div style="display:flex;flex-wrap:wrap;">
      <label style="margin-left: 7px;margin-bottom: 7px;font-weight: 600;width:94%;">{{ attributes.label }}</label>
      <el-date-picker style="margin-left: 7px;margin-bottom: 7px;font-weight: 600;width:44%;" v-model="attributes.defaultValue" @change="callBack()" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
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
.componentBorder {
  width: 100%;
  /* border: 2px solid #2c3e50; */
  padding: 8px 0px;
  border-radius: 4px;
  margin: 14px 0px;
  text-align: start;
}

.componentBorder:hover {
  /* border: 2px solid #2881da; */
}
</style>