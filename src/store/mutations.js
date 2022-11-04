import router from '../router'
export default{
    // 用于存储token
    setAppTokenInfo(state, tokenInfo) {
      state.token = tokenInfo.token
      state.loginTime = tokenInfo.loginTime
    },
    // 用户信息
    setLoginUser(state, user) {
      state.loginUser = user
    },
    loginOut(state) {
      state.loginUser = {}
      state.defaultMenus = []
      state.token = ''
      if (router.currentRoute.fullPath.slice(0, 7) === '/login?') {
        router.replace({
          name: 'login',
        })
      } else {
        router.replace({
          name: 'login',
          query: {
            redirect: router.currentRoute.fullPath,
          },
        })
      }
    },
    wendu(state, user){
      state.wendu = user
    },
    shidu(state, user){
      state.shidu = user
    },
    zhen(state, user){
      state.zhen = user
    },
    qiya(state, user){
      state.qiya = user
    },
    men(state, user){
      state.men = user
    },
    fenshao(state, user){
      state.fenshao = user
    },
    baogang(state, user){
      state.baogang = user
    },
    guang(state, user){
      state.guang = user
    },
    deng(state, user){
      state.deng = user
    },
}