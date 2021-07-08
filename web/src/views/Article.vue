<template>
  <div class="article-page" v-if="article">
    <div class="article-head d-flex p-3 border-b">
      <i  class="iconfont icon-Active text-blue fs-xl"></i>
      <strong class="title flex-1 px-2 text-blue text-ellipsis">{{article.title}}</strong>
      <div class="created">{{article.created_at | date}}</div>
    </div>
    <div class="article-body p-3 fs-xl" v-html="article.body"></div>
    <div class="article-relative px-3 py-2 border-t">
      <div class="relative-head d-flex py-2">
        <i class="iconfont icon-Menu"></i>
        <strong class="fs-xl px-2 text-blue">相关资讯</strong>
      </div>
      <div class="relative-item d-flex py-2" v-for="item in article.relative" :key="item._id">
        <router-link tag="div" :to="`/article/${item._id}`" class="relative-title text-ellipsis flex-1">{{item.title}}</router-link>
        <div class="article-date text-grey">{{item.created_at | date}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs';
export default {
  props:{id:{}},
  data(){
    return{
      article:{}
    }
  },
  watch:{
    id(){
      this.fetchArticle()
    }
  },
  filters:{
    date(val){
      return dayjs(val).format('YYYY-MM-DD')
    }
  },
  methods:{
    async fetchArticle(){
      let res = await this.$http.get(`/article/${this.id}`)
      this.article = res.data
    }
  },
  created(){
    this.fetchArticle()
  }
}
</script>
<style lang="scss">
.article-body{
  width: 100%;
  p{
    line-height: 22px;
  }
  img{
    width: 100%;
    height: auto;
  }
}
</style>

