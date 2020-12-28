<template>
  <div content="categories-edit">
    <h1>{{this.id?'编辑':'新建'}}分类</h1>
    <el-form
      ref="form"
      :model="model"
      label-width="80px"
    >
    <el-form-item label="上级分类">
        <el-select  v-model="model.parent">
          <!-- label是展示的值，value是选择的值 -->
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
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
        parent: ''
      },
      parents:[]
    };
  },
  methods: {
    async save() {
      let res = null;
      if(this.id){
          res = await this.$http.put(`/rest/categories/${this.id}`, this.model);
          this.$message({
              type: 'success',
              message: '修改成功'
          })
      }else{
          res = await this.$http.post("/rest/categories", this.model);
      }
      console.log(res.data);
      this.$router.push("/categories/list");
    },
    cancel() {
      this.$router.push("/categories/list");
    },
    async fetch(){
        const res = await this.$http.get(`/rest/categories/${this.id}`);
        this.model = res.data
    },
    async fetchParents(){
        const res = await this.$http.get('/rest/categories');
        this.parents = res.data
    }
  },
  created(){
      this.id && this.fetch()
      this.fetchParents()
  },
  components: {},
};
</script>

<style>
</style>
