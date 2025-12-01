<template>
  <div class="eva-container">
    <div :style="'width:98%;background-color:' + attributes.defaultValue + ';height:4px;margin: 10px auto;'"></div>
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
    }
  }
}
</script>

<style scoped>
@import '../../assets/global.css';
</style>