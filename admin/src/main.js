import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 将http注册到vue的变量
import http from './http.js'
Vue.prototype.$http = http

// 混入公共的vue属性
Vue.mixin({
  data(){
    return{

    }
  },
  computed:{
    uploadUrl(){
      return this.$http.defaults.baseURL+'/upload'
    }
  },
  methods:{
    setAuthorization(){
      return {Authorization: `Bearer ${sessionStorage.getItem('token') || ''}`}
    }
  }
})
import '../src/style.css'

Vue.config.productionTip = false

new Vue({
  router,  
  render: h => h(App)
}).$mount('#app')
