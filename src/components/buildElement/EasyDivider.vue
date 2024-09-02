<template>
  <div class="componentBorder">
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
.componentBorder {
  width: 100%;
  /* border: 2px solid #2c3e50; */
  padding: 8px 0px;
  border-radius: 4px;
  margin: .7rem 0px;
  text-align: start;
}

.componentBorder:hover {
  /* border: 2px solid #2881da; */
}

</style>