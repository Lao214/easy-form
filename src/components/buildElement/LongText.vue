<template>
  <div class="componentBorder">
    <div style="display:flex;flex-wrap:wrap;">
      <label style="margin-left: 7px;margin-bottom: 7px;font-weight: 600;width:94%"><span v-if="attributes.require" style="color: red;">*</span>{{ attributes.label }}</label>
      <textarea style="margin-left: 7px;margin-bottom: 11px;width:94%; min-height:100px;border: 1.5px solid #425c77;border-radius:4px;padding-left:7px" @change="callBack" v-model="attributes.defaultValue"> </textarea>
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