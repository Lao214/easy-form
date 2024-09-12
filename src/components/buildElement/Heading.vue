<template>
  <div class="componentBorder">
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

  }
}
</script>

<style scoped>
@import '../../assets/global.css';
</style>