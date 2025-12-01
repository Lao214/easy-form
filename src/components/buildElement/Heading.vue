<template>
  <div class="eva-container">
    <h1 class="eva-heading-title">{{ attributes.title }}</h1>
    <p class="eva-heading-subtitle">{{ attributes.subtitle }}</p>
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

.eva-heading-title {
  margin: 0;
  text-align: center;
}

.eva-heading-subtitle {
  margin: 0;
  text-align: center;
  color: #858585;
}
</style>