import Vue from 'vue'
// 用于挂载全局组件
const requireComponent = require.context(
  // 其组件目录的相对路径
  '@/components',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /\.base\.vue/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = fileName
    .split('/')
    .pop()
    .replace(/\.\w+/g, '')
  // 全局注册组件
  Vue.component(componentName, componentConfig.default || componentConfig)
})
