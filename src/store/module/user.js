import { login, getUserInfo, logout } from '@/api/user'
import { setToken, getToken, removeToken, setUserName, getUserName, removeUserName} from '@/utils/user'

export default {
  state: {
    userName: getUserName(),
    token: getToken(),
    role: [],    //用户角色
    hasGetUserInfo: false,
    //avatar: '',
  },
  getters: {
    //
  },
  mutations: {
    setUserName (state,name) {
      state.userName = name
      //localStorage.setItem('username',name);
      setUserName(name)   //调用@/utils/user.js中的同名函数
    },
    setToken (state,token) {
      state.token = token
      setToken(token)
    },
    removeUserName (state) {
      state.userName = ''
      removeUserName()
    },
    removeToken (state) {
      state.token = ''
      removeToken()
    },
    setRole (state, role) {
      state.role = role
    },
    setHasGetUserInfo (state, status) {
      state.hasGetUserInfo = status
    }
    
  },
  actions: {
    //登陆
    handleLogin( {commit}, {username,password}) {
      return new Promise((resolve, reject) => {
        login( {username, password} ).then( res => {
          const data = res.data
          if (data.token){
            commit('setToken', data.token)
            resolve()
          } else {
            reject('No token in response!')
          }
        }).catch( err => {
          reject(err)
        })
      })
    },
    //获取用户信息
    handleUserInfo ({ state, commit }) {
      return new Promise((resolve,reject) => {
        getUserInfo(state.token).then(res => {
          const data = res.data
          commit('setUserName', data.data.username)
          commit('setRole',data.data.role)
          commit('setHasGetUserInfo',true)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    //退出登陆
    handleLogout ( {commit, state}) {
      return new Promise((resolve, reject) => {
        logout().then((res) => {
          commit('removeUserName')
          commit('removeToken')
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },

  }
}