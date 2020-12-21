import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

import CategoriesEdit from '../views/categoriesEdit.vue'
import CategoriesList from '../views/categoriesList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    // 为Main组件添加子路由
    children:[
      {path:'categories/create', component:CategoriesEdit},
      {path:'categories/list', component:CategoriesList},
      // props:true,允许传参
      {path:'categories/edit/:id', component:CategoriesEdit, props:true}
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
