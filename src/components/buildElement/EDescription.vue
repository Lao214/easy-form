<template>
  <div>
    <div class="componentBorder">
      <p style="margin: 4px;font-weight: 600;">{{ attributes.defaultValue }}</p>
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
</style>