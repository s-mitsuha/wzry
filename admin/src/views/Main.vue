<template>
 <div>
     <el-container style="height: 100vh; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <!-- 添加路由属性 -->
    <el-menu router :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>分类管理</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <!-- 路由路径一定要加'/' -->
          <!-- 给index赋值实现路由跳转 -->
          <el-menu-item index="/categories/create">新建分类</el-menu-item>
          <el-menu-item index="/categories/list">分类列表</el-menu-item>
        </el-menu-item-group>
        
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>
    
    <el-main>
      <router-view></router-view>
      <!-- <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table> -->
    </el-main>
  </el-container>
</el-container>
 </div>
</template>

<script>
export default {
 data() {
   return{

   }
 },
 methods: {

 },
 components: {

 }
}
</script>

<style>
 .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>
