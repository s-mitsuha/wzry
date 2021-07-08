<template>
 <div class="main">
   <div class="header bg-black pt-2 pb-2 px-3 d-flex top-head">
     <img width="30" src="../assets/images/logo.png" alt="logo">
     <div class="info pl-3 flex-1">
       <div class="name text-white fs-lg">王者荣耀</div>
       <div class="decription text-grey fs-sm">团队成就更多</div>
     </div>
     <button class="btn bg-primary my-1 fs-sm">立即下载</button>
   </div>
   <!-- end of header -->
   <div class="nav py-3 jc-around">
     <div class="nav-item active">
       <router-link tag="div" to="/">首页</router-link>
     </div>
     <div class="nav-item">
       <router-link tag="div" to="/">攻略中心</router-link>
     </div>
     <div class="nav-item">
       <router-link tag="div" to="/">赛事中心</router-link>
     </div>
     <div class="nav-item">
       <router-link tag="div" to="/">IP新游</router-link>
     </div>
   </div>
   <!-- end of nav -->
   <router-view></router-view>
 </div>
</template>

<script>
export default {
 data() {
 return {

 }
 },
 methods: {

 },
 components: {

 }
}
</script>

<style lang="scss">
</style>
