<template>
  <div class="home">
    <swiper ref="mySwiper" :options="swiperOptions" >
      <swiper-slide ><img style="width:100%;" :src="swiperImgs[0].img"/></swiper-slide>
      <swiper-slide ><img style="width:100%;" :src="swiperImgs[1].img"/></swiper-slide>
      <swiper-slide ><img style="width:100%;" :src="swiperImgs[2].img"/></swiper-slide>
      <div class="homeSwiper text-right" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <div class="sprite d-flex flex-wrap bg-white py-3">
      <div class="sprite-item text-center my-3" v-for="(item,i) in sprites" :key="i">
        <div class="sprite-icon" :class="item.icon"></div>
        <div class="sprite-label">{{item.label}}</div>
      </div>
    </div>
    <!-- end of sprite -->
    
    <m-cardlist :icon="newsCard.icon" :title="newsCard.title" :cardlist="newsCardList">
        <template #cardcontent="{ cat }">
          <router-link tag="div" :to="`/article/${item._id}`" class="news-item d-flex py-2 ai-center" v-for="item in cat.articles" :key="item._id">
                <div class="news-type border-primary p-1 text-primary" >{{cat.name}}</div>
                <div class="news-title flex-1 pl-2 text-ellipsis">{{item.title}}</div>
                <div class="news-time">{{item.created_at}}</div>
          </router-link>
        </template>
      </m-cardlist>
    <!-- end of newsCard -->
    <m-cardlist :icon="heroesCard.icon" :title="heroesCard.title" :cardlist="heroesCardList">
        <template #cardcontent="{ cat }" >
          <div class="slide-content d-flex flex-wrap">
              <router-link tag="div" v-for="item in cat.heroes" :key="item._id" :to="`/hero/${item._id}`" class="hero-item pr-2" style="width:20%;text-align:center;">
                <div class="hero-avatar"><img :src="item.avatar" alt="avatar" style="width:60px;height:60px;"></div>
                <div class="hero-name">{{item.name}}</div>
              </router-link>
          </div>
        </template>
      </m-cardlist>
    <!-- end of heroesCard -->
  </div>
</template>

<script>
export default {
  data() {
    return {
        swiperOptions: { 
          pagination: {
            el: '.homeSwiper'
          }, 
          loop : true,
          // Some Swiper option/callback...
        },
        swiperImgs:[
          {img: require('../assets/images/0d93015a9b6db5c99bd6712dc8758479.jpeg')},
          {img: require('../assets/images/0cfcfac2d60121aa7c23b8c54b87f5c0.jpeg')},
          {img: require('../assets/images/a7de842164a057f63a1e3d3212b3843c.jpeg')}
        ],
        sprites:[
          {icon: 'sprite-news', label: '爆料站'},{icon: 'sprite-story', label: '故事站'},{icon: 'sprite-shop', label: '周边商城'},
          {icon: 'sprite-test', label: '体验服'},{icon: 'sprite-young', label: '新人专区'},{icon: 'sprite-extend', label: '荣耀·传承'},
          {icon: 'sprite-area', label: '王者营地'},{icon: 'sprite-public', label: '公众号'},{icon: 'sprite-bbjs', label: '版本介绍'},
          {icon: 'sprite-djhj', label: '对局环境'},{icon: 'sprite-wxwzt', label: '无限王者团'},{icon: 'sprite-cyhdy', label: '创意互动营'}
        ],
        newsCard:{
          icon: 'iconfont icon-Menu',
          title: '新闻资讯'
        },
        newsCardList:[],
        heroesCard:{
          icon: 'iconfont icon-Menu',
          title: '英雄列表'
        },
        heroesCardList:[],
        videosCard:{
          icon: 'iconfont icon-Menu',
          title: '精彩视频'
        }
    };
  },
  computed:{
  },
  methods: {
    async fetchArticles(){
      const res = await this.$http.get('/news/list')
      this.newsCardList = res.data
      this.newsCardList.map(el=>
        el.articles.map(e=>
          e.created_at = this.dayjs(e.created_at).format('MM-DD')
        )
      )
    },
    async fetchHeroes(){
      const res = await this.$http.get('/heroes/list')
      this.heroesCardList = res.data
    }
  },
  components: {},
  async created(){
    this.fetchArticles();
    this.fetchHeroes()
  }
};
</script>
   
<style lang="scss">
@import '../assets/style/_variable.scss';
  .swiper-pagination-bullets{
    position: relative;
    top: -30px;
    z-index: 1;
    display: inline-block;
    .swiper-pagination-bullet{
      position: relative;
      right: 12px;
      opacity: 1;
      background-color: #fff;
      &.swiper-pagination-bullet-active{background-color: #4b67af;}
    }
  }
  .sprite-item{
    width: calc(100% / 4);
    border-right: 1px solid map-get($map: $colors, $key: 'grey-1');
    &:nth-child(4n){
      border-right: none;
    }
  }
</style>
