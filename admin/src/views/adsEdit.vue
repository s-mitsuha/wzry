<template>
  <div content="ads-edit">
    <h1>{{this.id?'编辑':'新建'}}广告位</h1>
    <el-form
      ref="form"
      :model="model"
      label-width="80px"
    >
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button
          type="primary"
          @click.native.prevent="model.ads.push({})"
        >添加广告</el-button>
        <el-row style="margin: 10px 0px;"
          v-for="(item,i) in model.ads"
          :key="i"
        >
          <el-form-item  label="连接地址">
            <el-input v-model="item.url"></el-input>
          </el-form-item>
          <el-form-item label="图片" style="margin: 10px 0px;">
            <el-upload class="avatar-uploader"
              :action="$http.defaults.baseURL+'/upload'"
              :show-file-list="false"
              :on-success="(res)=>{$set(item,'img',res.url)}"
            >
              <img  v-if="item.img" :src="item.img" class="avatar" >
              <i v-else class="el-icon-plus avatar-uploader-icon" ></i>
            </el-upload>
          </el-form-item>
          <el-form-item style="margin: 0rem 6.5rem;">
            <el-button type="danger" @click.native.prevent="item.splice(i,1)">删除</el-button>
          </el-form-item>
        </el-row>
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
        ads: [],
      },
    };
  },
  methods: {
    async save() {
      let res = null;
      if (this.id) {
        res = await this.$http.put(`/rest/ads/${this.id}`, this.model);
        this.$message({
          type: "success",
          message: "修改成功",
        });
      } else {
        res = await this.$http.post("/rest/ads", this.model);
      }
      console.log(res.data);
      this.$router.push("/ads/list");
    },
    cancel() {
      this.$router.push("/ads/list");
    },
    async fetch() {
      const res = await this.$http.get(`/rest/ads/${this.id}`);
      this.model = res.data;
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
