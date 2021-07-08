<template>
  <div class="hero-page" v-if="hero">
    <div class="hero-header bg-black py-2 px-3 d-flex top-head ai-center text-white">
     <img width="30" src="../assets/images/logo.png" alt="logo">
     <div class="fs-lg px-3">王者荣耀</div>
     <div class="flex-1 fs-sm">攻略站</div>
     <div class="fs-sm">立即下载&gt;</div>
   </div>
    <div class="hero-info text-white" :style="{'background-image':`url(${hero.banner})`}">
      <div class="hero-info-bg  d-flex flex-col jc-end p-3">
        <div class="hero-title">{{hero.title}}</div>
        <h2 class="hero-name m-0 py-2">{{hero.name}}</h2>
        <div class="hero-cats py-1 fs-xs" v-if="hero.categories">{{hero.categories.map(v=>v.name).join('/')}}</div>
        <div class="hero-info-bottom d-flex jc-between">
          <div class="hero-scores d-flex ai-center" v-if="hero.scores">
            <div class="scroes-label">难度</div>
            <div class="scores-difficult bg-primary badge">{{hero.scores.difficult}}</div>
            <div class="scroes-label">技能</div>
            <div class="scores-skill bg-blue badge">{{hero.scores.skill}}</div>
            <div class="scroes-label">攻击</div>
            <div class="scores-attack bg-danger badge">{{hero.scores.attack}}</div>
            <div class="scroes-label">生存</div>
            <div class="scores-survive bg-grey badge">{{hero.scores.survive}}</div>
          </div>
          <div class="hero-skins">
          皮肤: {{hero.skin}} &gt;
          </div>
          </div>
      </div>   
    </div>
    <div class="hero-content ">
      <div class="nav reverse jc-around pb-2 pt-3 mt-2 bg-white">
        <div class="nav-item active">英雄初识</div>
        <div class="nav-item">进阶攻略</div>
      </div>
      <div class="hero-swiper w-100">
        <div class="mx-3 border-b"></div>

        <swiper>
          <swiper-slide >
            <div class="hero-skills">
              <div class="btns bg-white d-flex jc-around fs-xl p-3">
                <div class="btn btn-border d-flex py-3 flex-1 jc-center">
                  <i class="iconfont icon-Menu text-primary pr-3"></i>
                  <div class="btn-info">一图识英雄</div>
                </div>
                <div class="btn btn-border d-flex ml-2 py-3 flex-1 jc-center">
                  <i class="iconfont icon-Menu text-primary pr-3"></i>
                  <div class="btn-info">一图识英雄</div>
                </div>
              </div>
              <div class="skills-info bg-white p-3">
                <div class="skill-icons d-flex jc-around" v-if="hero.skills">
                  <div v-for="(item,i) in hero.skills" :key="i" >
                    <img class="skill-icon" :src="item.skill.icon" :class="{'active': currSkillIndex==i}" width="70" height="70" @click="currSkillIndex = i">
                  </div>
                </div>
                <div class="skill-txt" v-if="skill">
                  <div class="skill-info-row d-flex my-3 py-3">
                  <h3 class="skill-name m-0">{{skill.skill.name}}</h3>
                
                  <div class="skill-cool">(冷却:{{skill.skill.cooling}}</div>
                  <div class="skill-cost">消耗:{{skill.skill.cost}})</div>
                </div>

                <p class="skill-decoration py-2 border-b fs-xl line-h">{{skill.skill.decoration}}</p>
                <div class="skill-tip line-h">小提示:{{skill.tip}}</div>
                </div>
              </div>
            </div>

            <m-card :icon="'iconfont icon-Menu'" :title="'出装推荐'">
              <h3>顺风出装</h3>
              <div class="items d-flex jc-around border-b pb-1">
                <div class="item text-center" v-for="(item,i) in hero.tailWindItems" :key="i">
                  <div>
                    <img :src="item.icon" width="50" height="50">
                    <div class="item-name">{{item.name}}</div>
                  </div>
                </div>
              </div>
              <h3>顺风出装</h3>
              <div class="items d-flex jc-around">
                <div class="item text-center" v-for="(item,i) in hero.headWindItems" :key="i">
                  <div>
                    <img :src="item.icon" width="50" height="50">
                    <div class="item-name">{{item.name}}</div>
                  </div>
                </div>
              </div>
            </m-card>

            <m-card :icon="'iconfont icon-Menu'" :title="'使用技巧'">
              <p class="line-h">{{hero.usageTip}}</p>
            </m-card>

            <m-card :icon="'iconfont icon-Menu'" :title="'对抗技巧'">
              <p class="line-h">{{hero.battleTip}}</p>
            </m-card>

            <m-card :icon="'iconfont icon-Menu'" :title="'团战思路'">
              <p class="line-h">{{hero.teamTip}}</p>
            </m-card>

            <m-card :icon="'iconfont icon-Menu'" :title="'英雄关系'">
              <h3>最佳搭档</h3>
              <div class="hero-partners" v-for="(item,i) in hero.partners" :key="i">
                <div class="partner d-flex pb-3">
                  <img :src="item.hero.avatar" width="55" height="55">
                  <div class="description line-h pl-3 pt-1">{{item.description}}</div>
                </div>
              </div>
            </m-card>

          </swiper-slide>
          <swiper-slide>
            <h1>进阶攻略</h1>
          </swiper-slide>
        </swiper>
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
      hero:{},
      currSkillIndex: 0
    }
  },
  watch:{
    id(){
      this.fetchHero()
    }
  },
  computed:{
    skill(){
      return this.hero.skills && this.hero.skills[this.currSkillIndex]
    }
  },
  filters:{
    date(val){
      return dayjs(val).format('YYYY-MM-DD')
    }
  },
  methods:{
    async fetchHero(){
      let res = await this.$http.get(`/hero/${this.id}`)
      this.hero = res.data
      console.log(this.hero)
    }
  },
  created(){
    this.fetchHero()
  }
}
</script>
<style lang="scss">
@import '../assets/style/_variable.scss';
.hero-info{
  height: 29vh;
  background-size: auto 100%;
  .hero-info-bg{
    height: 29vh;
    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%);
    background: -moz-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0)), color-stop(100%,rgba(0,0,0,1)));
    background: -webkit-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%);
    background: -o-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%);
    background: -ms-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%);
  }
}
.skills-info{
  .skill-icons{
    .skill-icon{
      border: 3px solid transparent;
      border-radius: 45%;
      &.active{
        border-color: map-get($map: $colors, $key: 'primary');
      }
    }
  }
}
.items{
  .item{
    img{
      border-radius: 50%;
    }
  }
}
</style>

