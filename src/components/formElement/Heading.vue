<template>
  <div class="componentBorder" style="" @click="callBack">
    <h1 style="margin: 0;text-align: center;">{{ attributes.title }}</h1>
    <p style="margin: 0;text-align: center;color: #858585;">{{ attributes.subtitle }}</p>
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
  margin: 8px 0px;
}

.componentBorder:hover {
  border: 2px solid #2881da;
}
</style>