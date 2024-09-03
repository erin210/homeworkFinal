<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const apiURL = 'https://todolist-api.hexschool.io'

const signUpUID = ref('')
const signPWCheck = ref('')
const router = useRouter()

//註冊
const signUpField = ref({
  email: '',
  password: '',
  nickname: ''
})

const signUpPost = async () => {
  try {
    const res = await axios.post(`${apiURL}/users/sign_up`, signUpField.value)
    console.log(res)
    signUpUID.value = res.data.uid

    router.push({ path: '/' })
  } catch (error) {
    console.log(error.message)
  }
}
</script>
<template>
  <!-- sign up -->
  <div id="signUpPage" class="bg-yellow">
    <div class="conatiner signUpPage vhContainer">
      <div class="side">
        <a href="#"
          ><img
            class="logoImg"
            src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
            alt=""
        /></a>
        <img
          class="d-m-n"
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png"
          alt="workImg"
        />
      </div>
      <div>
        <form class="formControls" action="index.html">
          <h2 class="formControls_txt">註冊帳號</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            class="formControls_input"
            type="text"
            id="email"
            name="email"
            placeholder="請輸入 email"
            v-model="signUpField.email"
            required
          />
          <label class="formControls_label" for="name">您的暱稱</label>
          <input
            class="formControls_input"
            type="text"
            name="name"
            id="name"
            placeholder="請輸入您的暱稱"
            v-model="signUpField.nickname"
          />
          <label class="formControls_label" for="pwd">密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="請輸入密碼"
            v-model="signUpField.password"
            required
          />
          <!-- {{ signUpField.password }} -->
          <label class="formControls_label" for="pwd">再次輸入密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="請再次輸入密碼"
            v-model="signPWCheck"
            required
          />
          <!-- {{ signPWCheck }} -->
          <span v-if="signUpField.password !== signPWCheck">此密碼需與密碼相同</span>
          <input
            class="formControls_btnSubmit"
            type="button"
            value="註冊帳號"
            @click="signUpPost"
          />
          <RouterLink class="formControls_btnLink" to="/">登入</RouterLink>
        </form>
      </div>
    </div>
  </div>
</template>
