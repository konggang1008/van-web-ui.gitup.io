import Api from '@/Api/apis'
export default{
    // 当前登录用户
    getLoginUserData({ commit }) {
      return new Promise((resolve) => {
      Api.getUserInfo().then((ret) => {
          commit('setLoginUser', ret.data.data)
          resolve()
        })
      })
    },
    // 退出登录
    loginOut({ commit }) {
      return new Promise((resolve) => {
        Api.authLoginOut().then((res) => {
          if (res.status !== 20) {
            commit('loginOut')
            resolve()
          }
        })
      })
    },
}