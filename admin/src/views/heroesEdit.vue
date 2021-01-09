<template>
  <div content="heroes-edit">
    <h1>{{this.id?'编辑':'新建'}}英雄</h1>
    <el-form
      ref="form"
      :model="model"
      label-width="80px"
    >
      <el-tabs
        type="border-card"
        value="skill"
      >
        <el-tab-pane
          label="基础信息"
          name="basic"
        >
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
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
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              ></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <!-- multiple多选 -->
            <el-select
              v-model="model.categories"
              multiple
            >
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="皮肤">
            <el-input v-model="model.skin"></el-input>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              :max="9"
              show-score
              v-model="model.scores.difficult"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate
              :max="9"
              show-score
              v-model="model.scores.skill"
            ></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate
              :max="9"
              show-score
              v-model="model.scores.attack"
            ></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              :max="9"
              show-score
              v-model="model.scores.survive"
            ></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select
              v-model="model.tailWindItems"
              multiple
            >
              <el-option
                v-for="item in items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select
              v-model="model.headWindItems"
              multiple
            >
              <el-option
                v-for="item in items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item type="textarea" label="使用技巧">
            <el-input v-model="model.usageTip"></el-input>
          </el-form-item>
          <el-form-item type="textarea" label="对抗技巧">
            <el-input v-model="model.battleTip"></el-input>
          </el-form-item>
          <el-form-item type="textarea" label="团战思路">
            <el-input v-model="model.teamTip"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane
          label="技能"
          name="skill"
        >
          <el-form-item>
            <el-button
              type="primary"
              @click.native.prevent="model.skills.push({skill:{},tip:''})"
            >添加技能</el-button>
          </el-form-item>
          <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
              <el-form-item label="名称">
              <el-input v-model="item.skill.name"> </el-input>
            </el-form-item>
            <el-form-item label="图标">
              <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL+'/upload'"
              :show-file-list="false"
              :on-success="(res)=>{$set(item.skill,'icon',res.url)}"
            >
              <img
                v-if="item.skill.icon"
                :src="item.skill.icon"
                class="avatar"
              >
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              ></i>
            </el-upload>
            </el-form-item>
            <el-form-item label="冷却">
              <el-input v-model="item.skill.cooling"> </el-input>
            </el-form-item>
            <el-form-item label="消耗">
              <el-input v-model="item.skill.cost"> </el-input>
            </el-form-item>
            <el-form-item label="描述">
              <el-input type="textarea" v-model="item.skill.decoration"> </el-input>
            </el-form-item>
            <el-form-item label="小提示">
              <el-input type="textarea" v-model="item.tip"> </el-input>
            </el-form-item>
            <el-button type="danger" style="margin: 2rem 6.5rem;" @click="model.skills.splice(i,1)">删除</el-button>
          </el-col>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top: 2rem;">
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
        title: "",
        categories: [],
        skin: 0,
        scores: {
          difficult: 0,
          skill: 0,
          attack: 0,
          survive: 0,
        },
        skills: [
          // {
          //   skill:{
          //       name:'',
          //       icon:'',
          //       cooling:'',
          //       cost:'',
          //       decoration:''
          //   },
          //   tip:''
          // }
        ],
        tailWindItems: [],
        headWindItems: [],
        usageTip: "",
        battleTip: "",
        teamTip: "",
      },
      categories: [],
      items: [],
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
      // 这里如果直接赋值会覆盖页面的model，此时如果数据库里没有scores中的数据，页面直接使用就会报错
      //所以用合并对象的方式赋值
      Object.assign(this.model, res.data);
      // this.model = res.data;
      console.log("this.model" + res.data);
    },
    async fetchCategories() {
      const res = await this.$http.get(`/rest/categories`);
      this.categories = res.data;
    },
    async fetchItems() {
      const res = await this.$http.get(`/rest/items`);
      this.items = res.data;
    },
    afterUpload(res) {
      this.model.avatar = res.url;
    }
  },
  created() {
    this.fetchCategories();
    this.fetchItems();
    this.id && this.fetch();
  },
  components: {},
};
</script>

<style>
</style>
