import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

import CategoriesEdit from '../views/categoriesEdit.vue'
import CategoriesList from '../views/categoriesList.vue'

import ItemsEdit from '../views/itemsEdit.vue'
import ItemsList from '../views/itemsList.vue'

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
      {path:'categories/edit/:id', component:CategoriesEdit, props:true},

      {path:'items/create', component:ItemsEdit},
      {path:'items/list', component:ItemsList},
      {path:'items/edit/:id', component:ItemsEdit, props:true}
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
