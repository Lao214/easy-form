<template>
  <div class="eva-container">
    <div class="eva-row" style="justify-content: center;">
      <label class="eva-label" style="text-align: center;">{{ attributes.label }}</label>
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