<template>
  <div class="componentBorder" style="" @click="callBack">
    <div style="display:flex;flex-wrap:wrap;">
      <label style="margin-left: 7px;margin-bottom: 7px;font-weight: 600;width:94%;text-align:center;">{{ attributes.label }}</label>
      <img :src="attributes.defaultValue" style="width:98%;margin: 0 auto">
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
  margin: .7rem 0px;
  text-align: start;
}

.componentBorder:hover {
  border: 2px solid #2881da;
}
</style>