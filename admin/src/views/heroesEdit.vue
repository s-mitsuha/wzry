<template>
  <div content="heroes-edit">
    <h1>{{this.id?'编辑':'新建'}}英雄</h1>
    <el-form
      ref="form"
      :model="model"
      label-width="80px"
    >
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <!--action这里绑定的是绝对路径  -->
        <!--on-success绑定上传成功后的执行函数  -->
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL+'/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img
            v-if="model.avatar"
            :src="model.avatar"
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
        avatar: "",
      },
    };
  },
  methods: {
    async save() {
      let res = null;
      if (this.id) {
        res = await this.$http.put(`/rest/heroes/${this.id}`, this.model);
        this.$message({
          type: "success",
          message: "修改成功",
        });
      } else {
        res = await this.$http.post("/rest/heroes", this.model);
      }
      console.log(res.data);
      this.$router.push("/heroes/list");
    },
    cancel() {
      this.$router.push("/heroes/list");
    },
    async fetch() {
      const res = await this.$http.get(`/rest/heroes/${this.id}`);
      this.model = res.data;
    },
    afterUpload(res){
      this.model.avatar = res.url
    }
  },
  created() {
    this.id && this.fetch();
  },
  components: {},
};
</script>

<style>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .el-icon-plus {
    position: relative;
    top: 70px;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
