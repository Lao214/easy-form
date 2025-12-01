<template>
  <div>
    <div class="eva-container">
      <p class="eva-text-content">{{ attributes.defaultValue }}</p>
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