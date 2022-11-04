import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions,
  getters,
  plugins: [
    persistedState({
      storage: window.sessionStorage,
      key: 'appData',
      reducer: vuexState => {
        return {
          loginUser: vuexState.loginUser,
          token: vuexState.token,
          loginTime: vuexState.loginTime,
          refreshState: vuexState.refreshState,
          deviceRefreshState: vuexState.deviceRefreshState,
          menuCollapse: vuexState.menuCollapse,
          isNewDeviceChange: vuexState.isNewDeviceChange,
          notifyUnreadTotal: vuexState.notifyUnreadTotal,
          notifyUnreadListData: vuexState.notifyUnreadListData,
          deviceTypeListData: vuexState.deviceTypeListData,
          protocolId: vuexState.protocolId // 设备端口
        }
      }
    })
  ]
})
