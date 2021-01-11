import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

import CategoriesEdit from '../views/categoriesEdit.vue'
import CategoriesList from '../views/categoriesList.vue'

import ItemsEdit from '../views/itemsEdit.vue'
import ItemsList from '../views/itemsList.vue'

import HeroesEdit from '../views/heroesEdit.vue'
import HeroesList from '../views/heroesList.vue'

import ArticlesEdit from '../views/articlesEdit.vue'
import ArticlesList from '../views/articlesList.vue'

import AdsEdit from '../views/adsEdit.vue'
import AdsList from '../views/adsList.vue'

import Admin_usersEdit from '../views/adminUsersEdit.vue'
import Admin_usersList from '../views/adminUsersList.vue'

import Login from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'Login',
    component:Login,
    // 添加一个属性，标记login为公共访问页
    meta: {isPublic: true}
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    //重定向
    redirect: 'admin_users/list',
    // 为Main组件添加子路由
    children:[
      {path:'categories/create', component:CategoriesEdit},
      {path:'categories/list', component:CategoriesList},
      // props:true,允许传参
      {path:'categories/edit/:id', component:CategoriesEdit, props:true},

      {path:'items/create', component:ItemsEdit},
      {path:'items/list', component:ItemsList},
      {path:'items/edit/:id', component:ItemsEdit, props:true},

      {path:'heroes/create', component:HeroesEdit},
      {path:'heroes/list', component:HeroesList},
      {path:'heroes/edit/:id', component:HeroesEdit, props:true},

      {path:'articles/create', component:ArticlesEdit},
      {path:'articles/list', component:ArticlesList},
      {path:'articles/edit/:id', component:ArticlesEdit, props:true},

      {path:'ads/create', component:AdsEdit},
      {path:'ads/list', component:AdsList},
      {path:'ads/edit/:id', component:AdsEdit, props:true},

      {path:'admin_users/create', component:Admin_usersEdit},
      {path:'admin_users/list', component:Admin_usersList},
      {path:'admin_users/edit/:id', component:Admin_usersEdit, props:true}
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由守卫，前端权限校验
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !sessionStorage.getItem('token')) next('/login')
  // 如果用户未能验证身份，则 `next` 会被调用两次
  next()
})

export default router
