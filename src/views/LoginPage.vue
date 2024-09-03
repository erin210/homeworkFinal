<script setup>
// import router from '@/router'
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const apiURL = 'https://todolist-api.hexschool.io'
const signInToken = ref(null)
const router = useRouter()

//登入----------------------

const signInField = ref({
  email: '',
  password: ''
})

const signStatus = ref()
const signInOK = ref('')
const errMsg = ref('')
const signInPost = async () => {
  try {
    const res = await axios.post(`${apiURL}/users/sign_in`, signInField.value)
    // console.log(res)
    signStatus.value = res.data.status
    signInToken.value = res.data.token
    signInOK.value = `Hello! ` + res.data.nickname + `! 登入成功囉！`
    alert(signInOK.value)
    // console.log('hi', signUpField.value)

    document.cookie = `customToken=${res.data.token}; expires=${res.data.exp}; path=/`
    // console.log('UID:', checkUser.value.uid)
    signCheck()
  } catch (error) {
    console.log(error)
    errMsg.value = error.response.data.message
  }
}

//驗證----------------------

const checkUser = ref({
  nickname: '',
  uid: ''
})

const signCheck = async () => {
  signInToken.value = document.cookie.replace(
    /(?:(?:^|.*;\s*)customToken\s*\=\s*([^;]*).*$)|^.*$/,
    '$1'
  )

  if (!signInToken.value) {
    console.log('尚未登入！')
    return //沒有 token
  }
  const res = await axios.get(`${apiURL}/users/checkout`, {
    headers: {
      Authorization: signInToken.value
    }
  })
  checkUser.value = res.data

  router.push({ path: '/todolist' })

  //   getTodosData()
}

signCheck()
</script>
<template>
  <!-- login_page -->
  <div id="loginPage" class="bg-yellow">
    <div class="conatiner loginPage vhContainer">
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
          <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            class="formControls_input"
            type="text"
            id="email"
            name="email"
            placeholder="請輸入 email"
            v-model="signInField.email"
            required
          />
          <span v-if="!signInField.email">此欄位不可留空</span>
          <label class="formControls_label" for="pwd">密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="請輸入密碼"
            v-model="signInField.password"
            required
          />
          <span v-if="!signInField.password">此欄位不可留空</span>
          <input class="formControls_btnSubmit" type="button" @click="signInPost" value="登入" />
          <!-- <a class="formControls_btnLink" href="#signUpPage">註冊帳號</a> -->
          <RouterLink class="formControls_btnLink" to="/signup">註冊帳號</RouterLink>
        </form>
      </div>
    </div>
  </div>
</template>
