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
.componentBorder {
  width: 100%;
  /* border: 2px solid #2c3e50; */
  padding: 8px 0px;
  border-radius: 4px;
  margin: 8px 0px;
}

.componentBorder:hover {
  /* border: 2px solid #2881da; */
}
</style>