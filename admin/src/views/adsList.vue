<template>
  <div content="ads-list">
    <h1>广告位列表</h1>
    <el-table :data="ads">
      <el-table-column
        prop="_id"
        label="ID"
        width="300"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="广告位名称"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template v-slot="scope">
          <el-button
            @click="$router.push(`/ads/edit/${scope.row._id}`)"
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
      ads: [],
    };
  },
  methods: {
    async fetch() {
        const res = await this.$http.get("/rest/ads");
        this.ads = res.data;
    },
    remove(row){
        this.$confirm(`此操作将删除广告位${row.name}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
            const res = await this.$http.delete(`/rest/ads/${row._id}`);
            if(res.data.status === 'succeed'){
                this.$message({
                type: 'success',
                message: '删除成功!'
            });
            } 
            this.fetch()
        })
    }
  },
  created() {
    this.fetch();
  },
  components: {},
};
</script>

<style>
</style>
