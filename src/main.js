import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css'    // A modern alternative to CSS resets
import { getToken } from './utils/user'
import { hasRoutePermission } from '@/utils/permission'

import axios from './utils/custom-axios'    //使用配置了请求响应拦截器的axios
Vue.prototype.$axios = axios;    //挂载到Vue的原型链上，在组件中就可以通过 this.$axios.get() 方式进行调用

//实际打包时应该不引入mock
if (process.env.NODE_ENV !== 'production') require('./mock')

//生产环境关掉提示
Vue.config.productionTip = false

Vue.use(ElementUI);

//路由守卫
router.beforeEach((to, from, next) => {
  const token = getToken()
  if (!token && to.name !== 'login') {
    //未登录且要跳转的页面不是登录页，跳转至登陆页
    next({name: 'login'})
  } else if (!token && to.name == 'login') {
    next()
  } else if (token && to.name === 'login') {
    //已登陆且跳转的页面是登陆页，跳转至home
    next({name: 'home'})
  } else {
    if ( store.state.user.hasGetUserInfo ) {
      if (hasRoutePermission(to, store.state.user.role)) {
        next()
      } else {
        next({path:'/401'})
      }
    } else {
      //刷新页面后vuex数据丢失，重新获取用户信息
      store.dispatch('handleUserInfo').then( () => {
        if (hasRoutePermission(to, store.state.user.role)) {
          next()
        } else {
          next({path:'/401'})
        }
      })
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
