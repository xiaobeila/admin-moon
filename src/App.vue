<template>
  <div id="app">
    <layout v-if="path != '/login'"></layout>
    <router-view v-if="path == '/login'"></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {
    layout: () => import("./components/layout/AdminLayout"),
  },
  data() {
    return {
      path: ''
    }
  },
  mounted() {
    this.path = this.$route.path
  },
  watch: {
    $route(to, from) {
      console.log(from.path); // 从哪来
      console.log(to.path); // 到哪去
      this.path = to.path
    },
  },
};
</script>

<style>
@import "common/css/common.scss";
</style>
