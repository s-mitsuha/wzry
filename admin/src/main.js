import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 将http注册到vue的变量
import http from './http.js'
Vue.prototype.$http = http

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
