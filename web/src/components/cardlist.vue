<template>
  <div class="card-list-comp">
    <m-card :icon="icon" :title="title">
      <div
        id="cardlist-comp"
        class="px-2"
      >
        <div class="nav reverse jc-between">
          <div
            class="nav-item py-3"
            :class="currIndex == index? 'active':''"
            v-for="(item,index) in cardlist"
            :key="index"
            v-cloak
            @click="$refs.mySwiper.$swiper.slideTo(index+1)"
          >{{item.name}}</div>
        </div>
        <div class="card-swiper pt-2">
          <swiper
            ref="mySwiper"
            :options="{loop: true,initialSlide: 1,autoHeight:true,}"
            @slideChange="currIndex = $refs.mySwiper.$swiper.realIndex;"
          >
            <swiper-slide
              v-for="(cat,i) in cardlist"
              :key="i"
            >
              <slot
                name="cardcontent"
                :cat="cat"
              ></slot>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </m-card>
  </div>
</template>

<script>
export default {
  props: {
    icon: {type: String,require: true},
    title: {type: String, require: true},
    cardlist: { type: Array, require: true },
  },
  data() {
    return {
      currIndex: 0,
    };
  },
  methods: {
  },
  components: {},
};
</script>

<style>
</style>
