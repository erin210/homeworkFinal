<script setup>
import axios from 'axios'
import { computed, ref } from 'vue'

const apiURL = 'https://todolist-api.hexschool.io'
const signInToken = ref(null)
const errMsg = ref('')

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

  getTodosData()
}

signCheck()

//登出-------
const signOutCheck = ref('')

const signoutPost = async () => {
  try {
    const res = await axios.post(
      `${apiURL}/users/sign_out`,
      {},
      {
        headers: {
          Authorization: signInToken.value
        }
      }
    )
    document.cookie = 'customToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
    signOutCheck.value = '您已登出囉！'
    alert(signOutCheck.value)
    checkUser.value.uid = ''

    console.log(res)
  } catch (error) {
    console.log(error)
    errMsg.value = error.response?.data?.message || '登出失敗'
  }
}

//抓原本的todos
const getTodo = ref([])
const todoMsg = ref('')
const getTodosData = async () => {
  try {
    const res = await axios.get(`${apiURL}/todos/`, {
      headers: {
        Authorization: signInToken.value
      }
    })
    if (res.data.status) {
      if (res.data.data.length === 0) {
        todoMsg.value = '目前尚無待辦事項'
        getTodo.value = res.data.data
      } else {
        todoMsg.value = ''
        res.data.data.forEach((item) => {
          const createTime = item.createTime
          const date = new Date(createTime * 1000)
          const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ')
          item.createTime = formattedDate
        })

        getTodo.value = res.data.data
      }
    } else {
      todoMsg.value = '目前尚無待辦事項'
    }
  } catch (error) {
    console.log(error)
    errMsg.value = error.response?.data?.message || '抓清單失敗'
  }
}

getTodosData()

//新增
const todoField = ref('')
const newTodo = ref({
  content: ''
})
const addTodos = async () => {
  try {
    newTodo.value.content = todoField.value
    const res = await axios.post(`${apiURL}/todos/`, newTodo.value, {
      headers: {
        Authorization: signInToken.value
      }
    })
    todoField.value = ''
    console.log('新增成功', res)
    getTodosData()
  } catch (error) {
    console.log(error)
    errMsg.value = error.response?.data?.message || '新增失敗'
  }
}

//確認清單項目
const toggleTodos = async (id, status) => {
  try {
    const res = await axios.patch(
      `${apiURL}/todos/${id}/toggle`,
      {
        status: status
      },
      {
        headers: {
          Authorization: signInToken.value
        }
      }
    )
    console.log('修改確認', res)
    getTodosData()
  } catch (error) {
    console.log(error)
    errMsg.value = error.response?.data?.message || '修改確認失敗'
  }
}

//刪除
const deleteTodos = async (id) => {
  try {
    const res = await axios.delete(`${apiURL}/todos/${id}`, {
      headers: {
        Authorization: signInToken.value
      }
    })

    console.log('刪除成功', res)
    getTodosData()
    console.log(getTodo.value)

    // if (getTodo.value.length === 0) {
    //   todoMsg.value = '目前尚無待辦事項'
    // } else {
    //   todoMsg.value = ''
    // }
  } catch (error) {
    console.log(error)
    errMsg.value = error.response?.data?.message || '刪除失敗'
  }
}

//修改項目
const editField = ref('')
const editIndex = ref(null)
const openField = (id, index) => {
  editIndex.value = index
  getTodo.value.forEach((item) => {
    if (item.id === id) {
      if (!editField.value == '') {
        item.content = editField
        console.log(item)
      }
    }
  })
}

const cancelField = () => {
  editIndex.value = null
}
const saveField = async (id, index) => {
  try {
    console.log(editField.value)

    getTodo.value[index].content = editField.value
    editIndex.value = null
    const res = await axios.put(
      `${apiURL}/todos/${id}`,
      {
        content: getTodo.value[index].content
      },
      {
        headers: {
          Authorization: signInToken.value
        }
      }
    )
    console.log('修改清單完成', res)
    getTodosData()
  } catch (error) {
    console.log(error)
    errMsg.value = error.response?.data?.message || '修改清單失敗'
  }
}

//分類 tab
const activeTab = ref('taball')
const selectTab = (tab) => {
  activeTab.value = tab
}

//抓出未完成
const checkListNot = computed(() => {
  return getTodo.value.filter((item) => item.status === false)
})

//抓出已完成
const checkListOK = computed(() => {
  return getTodo.value.filter((item) => item.status === true)
})

console.log(checkListNot.value.length)
</script>

<template>
  <!-- ToDo List -->
  <div id="todoListPage" class="bg-half">
    <nav>
      <h1><a href="#">ONLINE TODO LIST</a></h1>
      <ul>
        <li class="todo_sm">
          <a href="#"
            ><span>Hello!{{ checkUser.nickname }}!</span></a
          >
          <RouterLink to="/" @click="signoutPost">登出</RouterLink>
        </li>
      </ul>
    </nav>
    <div class="conatiner todoListPage vhContainer">
      <div class="todoList_Content">
        <div class="inputBox">
          <input type="text" placeholder="請輸入待辦事項" v-model="todoField" />
          <a href="" @click.prevent="addTodos(todoField)">
            <i class="fa fa-plus"></i>
          </a>
        </div>
        <div class="todoList_list">
          <ul class="todoList_tab">
            <li>
              <a
                href="#"
                :class="{ active: activeTab === 'taball' }"
                @click.prevent="selectTab('taball')"
                >全部</a
              >
            </li>
            <li>
              <a
                href="#"
                :class="{ active: activeTab === 'tabnot' }"
                @click.prevent="selectTab('tabnot')"
                >待完成</a
              >
            </li>
            <li>
              <a
                href="#"
                :class="{ active: activeTab === 'tabok' }"
                @click.prevent="selectTab('tabok')"
                >已完成</a
              >
            </li>
          </ul>
          <div class="todoList_items" v-if="activeTab === 'taball'">
            <ul class="todoList_item">
              <li v-for="(list, index) in getTodo" :key="list.id">
                <label class="todoList_label" :for="list.id" v-if="index !== editIndex">
                  <input
                    class="todoList_input"
                    type="checkbox"
                    value="true"
                    :id="list.id"
                    v-model="list.status"
                    @change="toggleTodos(list.id)"
                  />
                  <span>{{ list.content }}</span>
                </label>
                <p class="editBox" v-else>
                  <input type="text" v-model="editField" :placeholder="list.content" />
                  {{ editField }}
                  <button
                    type="button"
                    class="btn btn-outline-secondary btn-sm mx-2"
                    @click="cancelField(index)"
                  >
                    取消
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm mx-2"
                    @click="saveField(list.id, index)"
                  >
                    儲存
                  </button>
                </p>
                <a href="" @click.prevent="openField(list.id, index)" v-if="index !== editIndex">
                  <i class="fas fa-edit"></i>
                </a>
                <a href="" @click.prevent="deleteTodos(list.id)" v-if="index !== editIndex">
                  <i class="fa fa-times"></i>
                </a>
              </li>
            </ul>
            <p>{{ todoMsg }}</p>
            <div class="todoList_statistics" v-if="!todoMsg">
              <p>
                {{ checkListOK.length }} 個已完成項目 <br /><br />
                {{ checkListNot.length }} 個待完成項目
              </p>
            </div>
          </div>
          <div class="todoList_items" v-if="activeTab === 'tabnot'">
            <ul class="todoList_item">
              <li v-for="(list, index) in checkListNot" :key="list.id">
                <label class="todoList_label" :for="list.id" v-if="index !== editIndex">
                  <input
                    class="todoList_input"
                    type="checkbox"
                    value="true"
                    :id="list.id"
                    v-model="list.status"
                    @change="toggleTodos(list.id)"
                  />
                  <span>{{ list.content }}</span>
                </label>
                <p class="editBox" v-else>
                  <input type="text" v-model="editField" :placeholder="list.content" />
                  {{ editField }}
                  <button
                    type="button"
                    class="btn btn-outline-secondary btn-sm mx-2"
                    @click="cancelField(index)"
                  >
                    取消
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm mx-2"
                    @click="saveField(list.id, index)"
                  >
                    儲存
                  </button>
                </p>
                <a href="" @click.prevent="openField(list.id, index)" v-if="index !== editIndex">
                  <i class="fas fa-edit"></i>
                </a>
                <a href="" @click.prevent="deleteTodos(list.id)" v-if="index !== editIndex">
                  <i class="fa fa-times"></i>
                </a>
              </li>
            </ul>
            <p>{{ todoMsg }}</p>
            <div class="todoList_statistics" v-if="!todoMsg">
              <p>{{ checkListNot.length }} 個待完成項目</p>
            </div>
          </div>
          <div class="todoList_items" v-if="activeTab === 'tabok'">
            <ul class="todoList_item">
              <li v-for="(list, index) in checkListOK" :key="list.id">
                <label class="todoList_label" :for="list.id" v-if="index !== editIndex">
                  <input
                    class="todoList_input"
                    type="checkbox"
                    value="true"
                    :id="list.id"
                    v-model="list.status"
                    @change="toggleTodos(list.id)"
                  />
                  <span>{{ list.content }}</span>
                </label>
                <p class="editBox" v-else>
                  <input type="text" v-model="editField" :placeholder="list.content" />
                  {{ editField }}
                  <button
                    type="button"
                    class="btn btn-outline-secondary btn-sm mx-2"
                    @click="cancelField(index)"
                  >
                    取消
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm mx-2"
                    @click="saveField(list.id, index)"
                  >
                    儲存
                  </button>
                </p>
                <a href="" @click.prevent="openField(list.id, index)" v-if="index !== editIndex">
                  <i class="fas fa-edit"></i>
                </a>
                <a href="" @click.prevent="deleteTodos(list.id)" v-if="index !== editIndex">
                  <i class="fa fa-times"></i>
                </a>
              </li>
            </ul>
            <p>{{ todoMsg }}</p>
            <div class="todoList_statistics" v-if="!todoMsg">
              <p>{{ checkListOK.length }} 個已完成項目</p>
            </div>
          </div>

          <!-- {{ getTodo }} -->
        </div>
      </div>
    </div>
  </div>
</template>
