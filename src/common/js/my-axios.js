// axios的请求拦截以及响应拦截
import axios from 'axios'
// import qs from "qs";
import router from '@/router'
import { Message } from 'element-ui'

const resetMessage = (options) => {
  let doms = document.getElementsByClassName('el-message')
  let canShow = true
  for (let i = 0; i < doms.length; i++) {
    if (options.message === doms[i].getElementsByClassName('el-message__content')[0].innerHTML) {
      canShow = false
    }
  }
  if (doms.length === 0 || canShow) {
    Message(options)
  }
};
['error', 'success', 'info', 'warning'].forEach(type => {
  resetMessage[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    return resetMessage(options)
  }
})
// export const message = resetMessage
import store from '@/store/index.js'
axios.defaults.timeout = 100000
const toPermission = () => {
  store.dispatch('loginOut')
  
}


// 生产环境有实现devServer里边的代理功能，进而支持web和api服务可以分开独立部署
axios.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.VUE_APP_API_SERVER.substring(
        0,
        process.env.VUE_APP_API_SERVER.length -
          process.env.VUE_APP_API_SUFFIX.length
      )
    : ''

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    if (store.state.token) {
      config.headers.Authorization = 'Bearer ' + store.state.token
    }
    return config
  },
  (error) => {
    //////////console.log('interceptors.request.error='+error)
    if (error.response.status == 401 || error.response.status == 502) {
      // if(error.response.status == 1) {
      if (!window.localStorage.getItem('reLoginMessage')) {
        resetMessage.error('请重新登录')
        router.push('/login')
        window.localStorage.setItem('reLoginMessage', true)
      }
      toPermission()
    }
    return Promise.reject(error)
  }
)
// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.data.code == 200 ) {
      // resetMessage.success({
      //   message: response.data.tips,
      // })
      return Promise.resolve(response)
    } else {
      resetMessage.warning({
        message: response.data.tips,
      })
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是2开头的的情况
  // 这里可以跟你们的后台开发人员协商好统一的错误状态码
  // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
  (error) => {
    if (error.response.data.code) {
      switch (error.response.data.code) {
        case 400:
          resetMessage.warning({
            message: '请求出错',
          })
          toPermission()
          break
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          if (router.currentRoute.path !== '/login') {
            toPermission()
          }

          resetMessage.warning({
            message: '授权过期，请重新登录',
          })
          toPermission()
          break
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          resetMessage.warning({
            message: '暂无此访问权限',
          })
          // 清除token
          toPermission()
          break
        // 404请求不存在
        case 404:
          resetMessage.warning({
            message: '请求错误,未找到该资源',
          })
          break
        // 其他错误，直接抛出错误提示
        case 500:
          resetMessage.warning({
            message: '服务器端出错',
          })
          toPermission()
          break
        case 502:
          toPermission()
          resetMessage.warning({
            message: '授权过期，请重新登录',
          })
          break
        case 504:
          resetMessage.warning({
            message: '服务器超时或未响应',
          })
          toPermission()
          break
        default:
          resetMessage.warning({
            message: '连接服务器失败',
          })
          toPermission()
      }
      return Promise.reject(error.response)
    }
  }
)

export default {
  post: function (url = '', data = {}, config) {
    return axios.post(url, data, config)
  },

  put: function (url = '', data = {}, config) {
    return axios.put(url, data, config)
  },

  get: function (url, params = {}, config) {
    let OPTIONS = Object.assign({ params }, config)
    return axios.get(url, OPTIONS)
  },

  jump: function (url, isNewWindow = true) {
    if (isNewWindow) {
      window.open(url, '_blank')
    } else {
      window.open(url)
    }
  },

  delete: function (url = '', params = {}, config) {
    let OPTIONS = Object.assign({ params }, config)
    return axios.delete(url, OPTIONS)
  },
  getBaseUrl: function () {
    return axios.defaults.baseURL
  },
  setBaseUrl: function (url) {
    axios.defaults.baseURL = url
  },
}
