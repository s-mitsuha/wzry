<template>
 <div id="card-comp" class="card py-2 bg-white mt-3 px-3">
  <div class="card-header d-flex py-2 pb-3 px-2">
        <i :class="icon"></i>
        <div class="card-header-title flex-1 px-2">{{title}}</div>
        <i class="iconfont icon-moreread px-2 fs-xl"></i>
  </div>
  <slot></slot>
 </div>
</template>

<script>
export default {
  props:{
    icon: {type: String,require: true},
    title: {type: String, require: true}
  },
  methods: {},
  components: {}
}
</script>

<style lang="scss" >
@import '../assets/style/_variable.scss';
.card{
    .card-header{
      border-bottom: 1px solid map-get($map: $colors, $key: 'grey-1');
    }
  }
</style>
