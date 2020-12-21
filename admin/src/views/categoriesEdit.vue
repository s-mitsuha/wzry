<template>
  <div content="categories-edit">
    <h1>{{this.id?'编辑':'新建'}}分类</h1>
    <el-form
      ref="form"
      :model="model"
      label-width="80px"
    >
      <el-form-item label="分类名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click.native.prevent="save"
        >保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props:{
    //   这里接受的参数直接解耦成对象
      id: {}
  },
  data() {
    return {
      model: {
        name: "",
      },
    };
  },
  methods: {
    async save() {
      let res = null;
      if(this.id){
          res = await this.$http.put(`/categories/${this.id}`, this.model);
          this.$message({
              type: 'success',
              message: '修改成功'
          })
      }else{
          res = await this.$http.post("/categories", this.model);
      }
      console.log(res.data);
      this.$router.push("/categories/list");
    },
    cancel() {
      this.$router.push("/categories/list");
    },
    async fetch(){
        const res = await this.$http.get(`/categories/${this.id}`);
        this.model.name = res.data.name
    }
  },
  created(){
      this.id && this.fetch()
  },
  components: {},
};
</script>

<style>
</style>
