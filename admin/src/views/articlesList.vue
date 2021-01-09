<template>
  <div content="articles-list">
    <h1>分类列表</h1>
    <el-table :data="articles">
      <el-table-column
        prop="_id"
        label="ID"
        width="300"
      >
      </el-table-column>
      <!-- props="categories.name" -->
      <el-table-column label="分类">
        <template v-slot="scope">
          <el-col :md="4"
            v-for="item in scope.row.categories"
            :key="item._id"
          >{{item.name}},
          </el-col>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template v-slot="scope">
          <el-button
            @click="$router.push(`/articles/edit/${scope.row._id}`)"
            type="text"
            size="small"
          >编辑</el-button>
          <el-button
            @click="remove(scope.row)"
            type="text"
            size="small"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/rest/articles");
      this.articles = res.data;
    },
    remove(row) {
      this.$confirm(`此操作将删除分类${row.name}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http.delete(`/rest/articles/${row._id}`);
        if (res.data.status === "succeed") {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        }
        this.fetch();
      });
    },
  },
  created() {
    this.fetch();
  },
  components: {},
};
</script>

<style>
</style>
