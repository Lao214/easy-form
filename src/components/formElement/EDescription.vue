<template>
  <div>
    <div class="eva-container eva-container-interactive" :class="{ 'active': optionsIndex === optionKey }" @click="callBack">
      <p class="eva-text-content">{{ attributes.defaultValue }}</p>
      <span v-show="optionKey === optionsIndex" class="eva-btn-float eva-btn-copy" @click.stop="copyThis()">
        <i class="el-icon-document-copy"></i>
      </span>
      <span v-show="optionKey === optionsIndex" class="eva-btn-float eva-btn-delete" @click.stop="delThis()">
        <i class="el-icon-delete"></i>
      </span>
    </div>
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

.eva-text-content {
  margin: 4px;
  font-weight: 600;
  padding: 0 10px;
}
</style>