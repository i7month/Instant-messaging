import { getToken, setToken, removeToken } from '@/utils/auth'
import api from '@/api/api'

const user = {
  state: {
    honeUp:null,// 挂断视频时的信息
    message:null, // 接通视频时的信息
    uid:null,//声网发消息的id
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    // 挂断视频时的信息
    HANG_UP: (state, honeUp) => {
      state.honeUp = honeUp
    },
    // 接通视频时的信息
    SET_MESSAGE: (state, message) => {
      state.message = message
    },
    SET_UID: (state, uid) => {
      state.uid = uid
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
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    // Login ({ commit }, userInfo) {
    //   return new Promise((resolve, reject) => {
    //     api.login(userInfo).then(res => {
    //       if (res.code === 200) {
    //         setToken(res.data)
    //         commit('SET_TOKEN', res.data)
    //       }
    //       resolve()
    //     }).catch(err => {
    //       reject(err)
    //     })
    //   })
    // },

    // 获取用户信息
    // GetUserInfo ({ commit }) {
    //   return new Promise((resolve, reject) => {
    //     api.getUserInfo().then(res => {
    //       // console.log(res)
    //       if (res.code === 200) {
    //         commit('SET_NAME', res.data.name)
    //         commit('SET_AVATAR', res.data.avatar)
    //         commit('SET_ROLES', res.data.role)
    //       }
    //       resolve(res)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    //
    // // 登出
    // LogOut ({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     logout(state.token).then(() => {
    //       commit('SET_TOKEN', '')
    //       commit('SET_ROLES', [])
    //       removeToken()
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 前端 登出
    // FedLogOut ({ commit }) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', '')
    //     removeToken()
    //     resolve()
    //   })
    // }
  }
}

export default user
