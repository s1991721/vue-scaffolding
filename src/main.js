import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//使用elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

import 'normalize.css/normalize.css' //去除全屏边框，为去除各浏览器的差异

// 自定义css
import './styles/index.scss'

//添加SvgIcon
import './icons'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

console.log(process.env.VUE_APP_BASE_API)
