<template>
 <div class="register">
     <el-card class="box-card" header="请先注册" style="width:50rem;margin:10rem auto;font-size:25px;" >
         <el-form>
             <el-form-item label="用户名">
                 <el-input v-model="admin_user.username"></el-input>
             </el-form-item>
             <el-form-item label="密码">
                 <el-input v-model="admin_user.password"></el-input>
             </el-form-item>
             <el-form-item >
                 <el-button type="primary" @click.native.prevent="register">注册</el-button>
                 <el-button @click.native.prevent="cancel()">取消</el-button>
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
     async register(){
         const res = await this.$http.post("/register",this.admin_user)
         console.log(res.data);
         this.$router.push('/login')
     },
     cancel(){}
 },
 components: {

 }
}
</script>

<style>
</style>
