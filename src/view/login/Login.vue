<template>
  <div>
    <section class="user">
      <div class="user_options-container">
        <div class="user_options-text">
          <div class="user_options-unregistered">
            <h2 class="user_unregistered-title">{{ $t('DontHaveAnAccount')  }}</h2>
            <p class="user_unregistered-text">{{ $t('registerSlogan') }}</p>
            <button class="user_unregistered-signup" id="signup-button" @click="handleSignupClick">{{ $t('signUp') }}</button>
          </div>

          <div class="user_options-registered">
            <h2 class="user_registered-title">{{ $t('haveAnAccount') }}</h2>
            <p class="user_registered-text">{{ $t('loginSlogan') }}</p>
            <button class="user_registered-login" id="login-button" @click="handleLoginClick">{{ $t('loginBtn') }}</button>
          </div>
        </div>
        
        <div :class="'user_options-forms' + ' ' + userFormsClass" id="user_options-forms">
          <div class="user_forms-login">
            <h2 class="forms_title">Login</h2>
            <form class="forms_form">
              <div class="forms_fieldset">
                <div v-show="logInWay === 0" class="forms_field">
                  <input type="text" placeholder="Email or Username" v-model="loginForm.username" class="forms_field-input" />
                </div>
                <div v-show="logInWay === 0" class="forms_field">
                  <input type="password" placeholder="Password" v-model="loginForm.password" class="forms_field-input"  />
                </div>
                <div v-show="logInWay === 1" class="forms_field">
                  <input type="text" placeholder="Email" class="forms_field-input"/>
                </div>
                <div v-show="logInWay === 1" class="forms_field" style="display: flex;">
                  <input type="text" placeholder="Code" class="forms_field-input" style="width: 70%;"/>
                  <button type="submit" class="forms_buttons-action" style="width: 30%;">{{ $t('send') }}</button>
                </div>
              </div>
              <div class="forms_buttons">
                <!-- <button type="button" class="forms_buttons-forgot">Forgot password?</button> -->
                <div style="display: flex;align-items: center;">
                  <i v-show="logInWay === 0" class="fa fa-envelope" style="color: gray;font-size: 27px;" @click="logInWay = 1"></i>
                  <i v-show="logInWay === 1" class="fa fa-mail-reply" style="color: gray;font-size: 27px;" @click="logInWay = 0"></i>
                  <svg t="1724932470072" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2527" width="27" height="27" style="margin-left: 1rem;cursor: pointer;" @click="changeI18N()"><path d="M636.416 418.304H885.76c16.384 0 32.256 6.656 44.032 18.432s18.432 27.648 18.432 44.032V885.76c0 16.384-6.656 32.256-18.432 44.032s-27.648 18.432-44.032 18.432H480.256c-16.384 0-32.256-6.656-44.032-18.432s-18.432-27.648-18.432-44.032v-249.344H542.72c24.576 0 48.64-9.728 66.048-27.136 17.408-17.408 27.136-41.472 27.136-66.048l0.512-124.928zM75.264 137.728c0-16.384 6.656-32.256 18.432-44.032s27.648-18.432 44.032-18.432H542.72c16.384 0 32.256 6.656 44.032 18.432s18.432 27.648 18.432 44.032V542.72c0 16.384-6.656 32.256-18.432 44.032s-27.648 18.432-44.032 18.432H137.728c-16.384 0-32.256-6.656-44.032-18.432s-18.432-27.648-18.432-44.032V137.728zM199.68 407.04h45.568v-24.064h65.536v115.2h48.128V382.464h67.072v19.968h49.664V250.368H359.424v-33.28c0-9.728 1.536-18.432 4.096-25.6 0.512-1.024 1.024-2.56 1.536-4.096 0-1.024-3.072-1.536-9.216-2.56h-45.568v65.536H199.68v156.672z m45.568-119.296h65.536v58.88H245.248V287.744z m180.736 58.88h-66.56V287.744h67.072v58.88z m198.656 475.136l18.944-52.224h97.792l18.944 52.224H814.08l-87.04-247.808h-62.976l-89.6 247.808h50.176z m32.256-93.696l36.352-105.984h1.536l33.28 105.984h-71.168z m228.352-403.456h-62.464c0-69.12-55.808-124.928-124.928-124.928V137.728c103.936 0 187.392 83.968 187.392 186.88z m-747.52 374.272H199.68c0 69.12 55.808 124.928 124.928 124.928V885.76c-103.424 0-186.88-83.456-186.88-186.88z m0 0" fill="#1c3c57" p-id="2528"></path></svg>
                </div>
        
                <button type="button" class="forms_buttons-action" @click="handleLogin()">{{ $t('login') }}</button>
              </div>
            </form>
          </div>
          <div class="user_forms-signup">
            <h2 class="forms_title">Sign Up</h2>
            <form class="forms_form">
              <div class="forms_fieldset">
                <div v-show="signUpWay === 0" class="forms_field">
                  <input type="text" placeholder="Username" class="forms_field-input"  />
                </div>
                <div v-show="signUpWay === 1" class="forms_field">
                  <input type="text" placeholder="Email" class="forms_field-input"/>
                </div>
                <div v-show="signUpWay === 1" class="forms_field" style="display: flex;">
                  <input type="text" placeholder="Code" class="forms_field-input" style="width: 70%;"/>
                  <button class="forms_buttons-action" style="width: 30%;">{{ $t('send') }}</button>
                </div>
                <div v-show="signUpWay === 0" class="forms_field">
                  <input type="password" placeholder="Password" class="forms_field-input"  />
                </div>
              </div>
              <div class="forms_buttons" style="display: flex;justify-content: space-between;align-items: center;margin-top: 35px;">
                <i v-show="signUpWay === 0" class="fa fa-envelope" style="color: gray;font-size: 27px;" @click="signUpWay = 1"></i>
                <i v-show="signUpWay === 1" class="fa fa-mail-reply" style="color: gray;font-size: 27px;" @click="signUpWay = 0"></i>
                <button type="button" class="forms_buttons-action">{{ $t('signUp') }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { removeToken } from '@/utils/auth'

export default {
  data() {
    return {
      userFormsClass: '', // 初始状态为空
      signUpWay: 0, //0为普通注册，1为邮箱注册
      logInWay: 0,
      loading: false,
      loginForm: {
        username: '',
        password: ''
      },
    }
  },
  methods: {
    changeI18N() {
      if(this.$i18n.locale === 'zh') {
        this.$i18n.locale = 'en'
      } else {
        this.$i18n.locale = 'zh'
      }
      localStorage.setItem('i18n-easyform', this.$i18n.locale)
    },
    handleSignupClick() {
      this.userFormsClass = 'bounceLeft';
    },
    handleLoginClick() {
      this.userFormsClass = 'bounceRight';
    },
    async handleLogin() {
      if(!this.loginForm.username) {
        this.$message({
          message: '请输入用户名',
          type: 'warning'
        });
        return
      }
      if(!this.loginForm.password) {
        this.$message({
          message: '请输入密码',
          type: 'warning'
        })
        return
      }
      removeToken()
      this.loading = true
      try {
        // 等待 login 操作完成
        await this.$store.dispatch('user/login', this.loginForm)
        // 等待 getInfo 操作完成
        await this.$store.dispatch('user/getInfo')
        // 跳转到 /dashboard
        this.$router.push({ path: '/home' })
      } catch (error) {
        // 处理错误
        console.error(error);
      } finally {
        // 确保在操作完成后设置 loading 为 false
        this.loading = false;
      }
    }
  }
}
</script>


<style scoped>
* {
  box-sizing: border-box;
}

body {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 1em;
}

button {
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: 0;
  cursor: pointer;
}

input {
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: 0;
}
input[type=submit] {
  cursor: pointer;
}
input::-moz-placeholder {
  font-size: 0.85rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}
input:-ms-input-placeholder {
  font-size: 0.85rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}
input::placeholder {
  font-size: 0.85rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}

/**
 * * Bounce to the left side
 * */
@-webkit-keyframes bounceLeft {
  0% {
    transform: translate3d(100%, -50%, 0);
  }
  50% {
    transform: translate3d(-30px, -50%, 0);
  }
  100% {
    transform: translate3d(0, -50%, 0);
  }
}
@keyframes bounceLeft {
  0% {
    transform: translate3d(100%, -50%, 0);
  }
  50% {
    transform: translate3d(-30px, -50%, 0);
  }
  100% {
    transform: translate3d(0, -50%, 0);
  }
}
/**
 * * Bounce to the left side
 * */
@-webkit-keyframes bounceRight {
  0% {
    transform: translate3d(0, -50%, 0);
  }
  50% {
    transform: translate3d(calc(100% + 30px), -50%, 0);
  }
  100% {
    transform: translate3d(100%, -50%, 0);
  }
}
@keyframes bounceRight {
  0% {
    transform: translate3d(0, -50%, 0);
  }
  50% {
    transform: translate3d(calc(100% + 30px), -50%, 0);
  }
  100% {
    transform: translate3d(100%, -50%, 0);
  }
}
/**
 * * Show Sign Up form
 * */
@-webkit-keyframes showSignUp {
  100% {
    opacity: 1;
    visibility: visible;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes showSignUp {
  100% {
    opacity: 1;
    visibility: visible;
    transform: translate3d(0, 0, 0);
  }
}
/**
 * * Page background
 * */
.user {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: #ccc;
  background-size: cover;
}
.user_options-container {
  position: relative;
  width: 80%;
}
.user_options-text {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: rgba(34, 34, 34, 0.85);
  border-radius: 3px;
}

/**
 * * Registered and Unregistered user box and text
 * */
.user_options-registered,
.user_options-unregistered {
  width: 50%;
  padding: 75px 45px;
  color: #fff;
  font-weight: 300;
}

.user_registered-title,
.user_unregistered-title {
  margin-bottom: 15px;
  font-size: 1.66rem;
  line-height: 1em;
}

.user_unregistered-text,
.user_registered-text {
  font-size: 0.83rem;
  line-height: 1.4em;
}

.user_registered-login,
.user_unregistered-signup {
  margin-top: 30px;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px 30px;
  color: #fff;
  text-transform: uppercase;
  line-height: 1em;
  letter-spacing: 0.2rem;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}
.user_registered-login:hover,
.user_unregistered-signup:hover {
  color: rgba(34, 34, 34, 0.85);
  background-color: #ccc;
}

/**
 * * Login and signup forms
 * */
.user_options-forms {
  position: absolute;
  top: 50%;
  left: 30px;
  width: calc(50% - 30px);
  min-height: 420px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  transform: translate3d(100%, -50%, 0);
  transition: transform 0.4s ease-in-out;
}
.user_options-forms .user_forms-login {
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
}
.user_options-forms .forms_title {
  margin-bottom: 45px;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1em;
  text-transform: uppercase;
  color: #0b3c59;
  letter-spacing: 0.1rem;
}
.user_options-forms .forms_field:not(:last-of-type) {
  margin-bottom: 20px;
}
.user_options-forms .forms_field-input {
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 6px 20px 6px 6px;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: gray;
  letter-spacing: 0.1rem;
  transition: border-color 0.2s ease-in-out;
}
.user_options-forms .forms_field-input:focus {
  border-color: gray;
}
.user_options-forms .forms_buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.7rem;
}

.user_options-forms .forms_buttons-forgot {
  font-family: "Montserrat", sans-serif;
  letter-spacing: 0.1rem;
  color: #ccc;
  text-decoration: underline;
  transition: color 0.2s ease-in-out;
}
.user_options-forms .forms_buttons-forgot:hover {
  color: #b3b3b3;
}
.user_options-forms .forms_buttons-action {
  background-color: #0b3c59;
  border-radius: 3px;
  padding: 10px 35px;
  font-size: 1rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  transition: background-color 0.2s ease-in-out;
}
.user_options-forms .forms_buttons-action:hover {
  background-color: #11537a;
}
.user_options-forms .user_forms-signup,
.user_options-forms .user_forms-login {
  position: absolute;
  top: 70px;
  left: 40px;
  width: calc(100% - 80px);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out, transform 0.5s ease-in-out;
}
.user_options-forms .user_forms-signup {
  transform: translate3d(120px, 0, 0);
}
.user_options-forms .user_forms-signup .forms_buttons {
  justify-content: flex-end;
}
.user_options-forms .user_forms-login {
  transform: translate3d(0, 0, 0);
  opacity: 1;
  visibility: visible;
}

/**
 * * Triggers
 * */
.user_options-forms.bounceLeft {
  -webkit-animation: bounceLeft 1s forwards;
          animation: bounceLeft 1s forwards;
}
.user_options-forms.bounceLeft .user_forms-signup {
  -webkit-animation: showSignUp 1s forwards;
          animation: showSignUp 1s forwards;
}
.user_options-forms.bounceLeft .user_forms-login {
  opacity: 0;
  visibility: hidden;
  transform: translate3d(-120px, 0, 0);
}
.user_options-forms.bounceRight {
  -webkit-animation: bounceRight 1s forwards;
          animation: bounceRight 1s forwards;
}

/**
 * * Responsive 990px
 * */
@media screen and (max-width: 990px) {
  .user_options-forms {
    min-height: 350px;
  }
  .user_options-forms .forms_buttons {
    flex-direction: column;
  }
  .user_options-forms .user_forms-login .forms_buttons-action {
    margin-top: 30px;
  }
  .user_options-forms .user_forms-signup,
.user_options-forms .user_forms-login {
    top: 40px;
  }

  .user_options-registered,
.user_options-unregistered {
    padding: 50px 45px;
  }
}
</style>