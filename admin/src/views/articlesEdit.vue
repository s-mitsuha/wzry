<template>
  <div content="articles-edit">
    <h1>{{this.id?'编辑':'新建'}}文章</h1>
    <el-form
      ref="form"
      :model="model"
      label-width="80px"
    >
      <el-form-item label="分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <!-- 图片默认以base64存储，体积过大 -->
        <!-- 对图片的存储自定义，保证上传数据的优化 -->
        <vue-editor
          v-model="model.body"
          useCustomImageHandler
          @image-added="handleImageAdded"
        ></vue-editor>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
          v-model="model.date"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
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
// 引入vue2-editor ，富文本编辑器
import { VueEditor } from "vue2-editor";
export default {
  props: {
    //   这里接受的参数直接解耦成对象
    id: {},
  },
  components: {
    VueEditor,
  },
  data() {
    return {
      model: {
        categories: [],
        title: "",
        body: "",
        date:''
      },
      categories: [],
    };
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      // 定义上传数据，以表单数据形式
      var formData = new FormData();
      // 定义上传的参数名和数据，参数名和后台的参数名一致
      formData.append("file", file);
      const res = await this.$http.post("/upload", formData);
      // 在光标位置插入图片，图片的url为请求结果的url
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    async save() {
      let res = null;
      if (this.id) {
        res = await this.$http.put(`/rest/articles/${this.id}`, this.model);
        this.$message({
          type: "success",
          message: "修改成功",
        });
      } else {
        res = await this.$http.post("/rest/articles", this.model);
      }
      console.log(res.data);
      this.$router.push("/articles/list");
    },
    cancel() {
      this.$router.push("/articles/list");
    },
    async fetch() {
      const res = await this.$http.get(`/rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get("/rest/categories");
      this.categories = res.data;
    },
  },
  created() {
    this.id && this.fetch();
    if(!this.id) {
      this.model.date = Date.now()
    } 
    this.fetchCategories();
  },
};
</script>

<style>
</style>
