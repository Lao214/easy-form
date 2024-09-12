<template>
  <div class="componentBorderForm" :class="optionsIndex === optionKey ? 'active' : ''" @click="callBack">
    <h1 style="margin: 0;text-align: center;">{{ attributes.title }}</h1>
    <p style="margin: 0;text-align: center;color: #858585;">{{ attributes.subtitle }}</p>
    <span v-show="optionKey === optionsIndex" class="floating-btn" @click="copyThis()">
      <i class="el-icon-document-copy"></i>
    </span>
    <span v-show="optionKey === optionsIndex" class="floating-del-btn" @click="delThis()">
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
</style>