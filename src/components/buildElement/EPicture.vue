<template>
  <div class="componentBorder">
    <div style="display:flex;flex-wrap:wrap;">
      <label style="margin-left: 7px;margin-bottom: 7px;font-weight: 600;width:98%;text-align:center;">{{ attributes.label }}</label>
      <img :src="attributes.defaultValue" style="width:97%;margin: 0 auto">
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
</style>