<template>
  <div class="componentBorder" style="">
    <div style="display:flex;flex-wrap:wrap;">
      <label style="margin-left: 7px;margin-bottom: 7px;font-weight: 600;width:94%"><span v-if="attributes.require" style="color: red;">*</span>{{ attributes.label }}</label>
      <input style="margin-left: 7px;margin-bottom: 11px;width:94%;height:30px;border: 1.5px solid #425c77;border-radius:4px;padding-left:7px" @change="callBack" v-model="attributes.defaultValue">
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