<template>
 <div class="login">
     <el-card class="box-card" header="请先登录" style="width:50rem;margin:10rem auto;" >
         <el-form>
             <el-form-item label="用户名">
                 <el-input v-model="admin_user.username"></el-input>
             </el-form-item>
             <el-form-item label="密码">
                 <el-input v-model="admin_user.password"></el-input>
             </el-form-item>
             <el-form-item >
                 <el-button type="primary" @click.native.prevent="login">登录</el-button>
                 <el-button >取消</el-button>
             </el-form-item>
         </el-form>
     </el-card>
 </div>
</template>

<script>  
export default {
 data() {
 return {
     admin_user:{
         username:'',
         password:''
     }
 }
 },
 methods: {
     async login(){
         const res = await this.$http.post('/login',this.admin_user)
        //  localStorage存到本地存储，浏览器关闭再打开依旧存在
        //  localStorage.setItem('token',res.data)
        // sessionStorage存到会话，浏览器关闭时自动清空
        sessionStorage.setItem('token',res.data.token)
        sessionStorage.setItem('user',res.data.user)
        this.$router.push('/') 
     }
 },
 components: {

 }
}
</script>

<style>
</style>
