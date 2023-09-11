<template>
  <div>
    <NavTop :username="username" :avatar="avatar"></NavTop>
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
      username: '',
      avatar: 'https://img0.baidu.com/it/u=392728669,1375239372&fm=253&fmt=auto&app=138&f=JPEG?w=450&h=449'
    }
  },
  mounted() {
    var token = getToken()
    console.log(token)
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