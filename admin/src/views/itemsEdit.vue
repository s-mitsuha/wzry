<template>
  <div content="items-edit">
    <h1>{{this.id?'编辑':'新建'}}物品</h1>
    <el-form
      ref="form"
      :model="model"
      label-width="80px"
    >
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <!--action这里绑定的是绝对路径  -->
        <!--on-success绑定上传成功后的执行函数  -->
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="setAuthorization()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img
            v-if="model.icon"
            :src="model.icon"
            class="avatar"
          >
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
  props: {
    //   这里接受的参数直接解耦成对象
    id: {},
  },
  data() {
    return {
      model: {
        name: "",
        icon: "",
      },
    };
  },
  methods: {
    async save() {
      let res = null;
      if (this.id) {
        res = await this.$http.put(`/rest/items/${this.id}`, this.model);
        this.$message({
          type: "success",
          message: "修改成功",
        });
      } else {
        res = await this.$http.post("/rest/items", this.model);
      }
      console.log(res.data);
      this.$router.push("/items/list");
    },
    cancel() {
      this.$router.push("/items/list");
    },
    async fetch() {
      const res = await this.$http.get(`/rest/items/${this.id}`);
      this.model = res.data;
    },
    afterUpload(res){
      // 显式赋值this.$set(赋值对象,属性,键值)
      this.$set(this.model,'icon',res.url)
      // this.model.icon = res.url
    }
  },
  created() {
    this.id && this.fetch();
  },
  components: {},
};
</script>

<style>
</style>
