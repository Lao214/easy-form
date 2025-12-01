<template>
  <div class="eva-container">
    <div class="eva-row">
      <label class="eva-label">
        <span v-if="attributes.require" class="eva-required">*</span>{{ attributes.label }}
      </label>
      <textarea class="eva-textarea" @change="callBack" v-model="attributes.defaultValue"> </textarea>
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