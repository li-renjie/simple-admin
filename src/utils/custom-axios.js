import axios from 'axios'
import store from '@/store'
//import router from '@/router'

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // Do something before request is sent
    const token = store.state.user.token
    if (token) {
      // 根据需求自行修改，这里将token放到报文头部的Authorization字段中
      //console.log('token:', token);
      config.headers.Authorization = token;
    } else {
      //console.log('没有token，需要登陆');
    }
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  });

// 响应拦截器
axios.interceptors.response.use(
  response => {
    // Do something with response data
    // 可以根据响应数据中的code值来做不同的处理（和后端约定）
    //console.log('请求响应数据：',response)
    return response;
  },
  error => {
    // Do something with response error
    if (error && error.response) {
      switch (error.response.status) {
        case 400: {
          console.log('请求错误(400)');
          break;
        }
        case 401: {
          console.log('未授权，请重新登录(401)');
          //删除本地token，重新登陆
          break;
        }
        default: {
          console.log(error.response.status);
        }
      }
    } else {
       console.log('连接服务器失败！');
    }
    return Promise.reject(error);    //如果用Promise.resolve(err)，则回调中能收到通知
  });

export default axios
