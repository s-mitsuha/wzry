import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'

Vue.config.productionTip = false

import './assets/style/style.scss'
import router from './router'

import VueAwesomeSwiper from 'vue-awesome-swiper'

import '../src/assets/iconfonts/iconfont.css'
 
// import style
import 'swiper/css/swiper.css'
 
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

// 将http注册到vue的变量
import http from './http.js'
Vue.prototype.$http = http

import dayjs from 'dayjs'
Vue.prototype.dayjs = dayjs

import mCard from './components/card.vue'
Vue.component('mCard',mCard)
import mCardlist from './components/cardlist.vue'
Vue.component('mCardlist',mCardlist)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
