<template>
  <div>
    <NavTop></NavTop>
    <div class="main">
      <router-view/>
    </div>

  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import NavTop from '@/components/layout/NavTop.vue'

export default {
  components: {
    NavTop
  },
  data() {
    return {
      
    }
  },
  mounted() {
    var token = getToken()
    console.log(token,'/view/index')
    if(!token) {
      this.$message({
        message: '登录已过期，请重新登录',
        type: 'warning'
      })
      this.$router.push({ path: '/' })
    } else {
      this.$store.dispatch('user/getInfo').then(() => {
        this.username = this.$store.state.user.name
      })
    }
  
  }
}
</script>

<style scoped>
</style>