import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[
      { path: '/', component: Home },
      {
        path: '/article/:id',
        name: 'Article',
        props: true,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Article.vue')
      }
    ]
  },
  {
    path: '/hero/:id',
    name: 'Hero',
    component: ()=>import('../views/Hero.vue'),
    props: true,
  }
]

const router = new VueRouter({
  routes
})

export default router
