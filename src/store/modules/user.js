import wsFriendsApi from '@/api/wsFriendsApi'
import { login, getInfo, logout } from '../../api/userApi'
import { getToken, setToken, removeToken } from '@/utils/auth'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    buttons: [], // 新增
    menus: '', // 新增
    isFinishedLead: '',
    userId: '',
    friendApplyCount: 0
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  // 新增
  SET_BUTTONS: (state, buttons) => {
    state.buttons = buttons
  },
  // 新增
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  // 新增
  SET_FINISHED: (state, isFinishedLead) => {
    state.isFinishedLead = isFinishedLead
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
  SET_FRIENDAPPLYCOUNT: (state, friendApplyCount) => {
    state.friendApplyCount = friendApplyCount
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        // console.log(response,'response')
        commit('SET_TOKEN', response.data.token)
        localStorage.setItem('expTime',response.data.expTime)
        setToken(response.data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      if(!state.token) {
        console.log('token is null')
        return
      }
      getInfo().then(response => {
        if(response) {
          const { one } = response.data
          if (!one) {
            return reject('Verification failed, please Login again.')
          }
          // console.log(data.one.nickname)
          // const { name, avatar } = data
          if(one) {
            // console.log(one)
            commit('SET_NAME', one.nickname)
            commit('SET_AVATAR', one.avatar)
            commit('SET_MENUS', one.authorityList)
            commit('SET_FINISHED', one.isFinishedLead)
            commit('SET_USERID', one.id)

            // 修正：传递 one.menus 到 loadAsyncRoutes
            // dispatch('loadAsyncRoutes', one.menus).then(() => resolve(one)) // 确保异步操作完成
          }
  
          // commit('SET_BUTTONS', data.buttons)
          // commit('SET_MENUS', data.routers)
          resolve(one)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      if(!state.token) {
        console.log('token is null')
        return
      }
      logout().then(response => {
          console.log('removeToken')
          removeToken()
          commit('RESET_STATE')
          resolve()
          // resetRouter()
      })

    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  getMyFriendApplyCount({ commit }) {
    return new Promise(resolve => {
      if(!state.token) {
        return
      }
      wsFriendsApi.getMyFriendApplyCount().then(response => {
        console.log(response.data.count)
        commit('SET_FRIENDAPPLYCOUNT', response.data.count)
        resolve(response.data)
      })
    })
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
