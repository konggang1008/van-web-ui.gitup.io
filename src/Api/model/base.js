// 公共的请求
import axios from '@/common/js/my-axios'
const Base = {
  // 获取图片验证码
  getCaptchaImg(params) {
    return axios.post('/api/auth/captcha/img', params)
  },
  // 用户名密码登录
  postLogin(params) {
    return axios.post('/api/auth/login/login', params)
  },
  //获取用户信息
  getUserInfo() {
    return axios.get('/api/user/current')
  },
  // 退出登录
  authLoginOut(params) {
    return axios.post('/api/auth/logout', params)
  },
  // 设备详情
  deviceDetail(params) {
    return axios.get('/api/device/detail' + '/' + params + '?isCode=false', [])
  },
  //物模型数据-属性状态
  modelDataProp(params) {
    return axios.post('/api/device/modelDataProp/prop', params)
  },
  //获取设备日志
  deviceLog(params) {
    return axios.post('/api/logs/deviceLog/list', params)
  },
  //历史数据
  listPropHistory(params) {
    return axios.post('/api/device/modelDataProp/listPropHistory', params)
  },
    //产品详情
    productDetail(params){
      return axios.get('/api/device/prod/detail' + '/' + params , [])
    },
}
export default Base
