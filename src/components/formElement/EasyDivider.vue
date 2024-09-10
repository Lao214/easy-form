<template>
  <div class="componentBorder" :class="optionsIndex === optionKey ? 'active' : ''" @click="callBack">
    <div :style="'width:98%;background-color:' + attributes.defaultValue + ';height:4px;margin: 10px auto;'"></div>
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
  props: ['optionKey','attributes'],
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
.componentBorder {
  width: 100%;
  border: 2px solid #2c3e50;
  padding: 8px 0px;
  border-radius: 4px;
  margin: .7rem 0px;
  text-align: start;
  cursor: pointer;
  position: relative;
}

.active {
  border:2px solid #ea5524;
}

.componentBorder:hover {
  border:2px solid #ea5524;
}

.floating-del-btn {
    position: absolute;
    right: -2.3rem;
    top: 2.4rem;
    width: 2rem;
    height: 2rem;
    background: #c91414;
    color: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.floating-btn {
    position: absolute;
    right: -2.3rem;
    top: 0;
    width: 2rem;
    height: 2rem;
    background: #383333;
    color: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>