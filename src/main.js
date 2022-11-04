import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
// 按需引入element
import 'element-ui/lib/theme-chalk/index.css'
import '@/common/js/element.js'
// 全局样式重置
import '@/common/css/reset.scss'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/chart-bar.js'
import 'vue-awesome/icons/chart-area.js'
import 'vue-awesome/icons/chart-pie.js'
import 'vue-awesome/icons/chart-line.js'
import 'vue-awesome/icons/align-left.js'
Vue.component('icon', Icon)
// 引入图标样式
import '@/common/icon/iconfont.css'
// 引入全局组件
import '@/common/js/components-global-regist.js'

// 封装js文件
import gem from '@/common/js/gem'
Vue.use(gem)
// 引入全局css
import '@/common/scss/style.scss'
// 引入echarts
import * as echarts from 'echarts'
import dataV from '@jiaminghi/data-view'
Vue.use(dataV)
Vue.prototype.$echarts = echarts
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
