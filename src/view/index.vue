<template>
  <div>
    <NavTop></NavTop>
    <div class="main">
      <router-view/>
    </div>

  </div>
</template>

<script>
import NavTop from '@/components/layout/NavTop.vue'

export default {
  components: {
    NavTop
  },
  data() {
    return {
      
    }
  },
  created() {}
}
</script>

<style scoped>
</style>