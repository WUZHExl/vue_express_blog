<template>
  <!-- <div class="black_line"></div> -->
  <div>
    <router-view></router-view>
  </div>
  <div class="main">
      <router-view name="sidebar"></router-view>
      <!-- <sideBar></sideBar> -->
      <router-view name="content"></router-view>
  </div>
</template>

<script>
// import sideBar from './components/sideBar.vue'
export default {
  // components: {sideBar},
  setup() {
    
  },
}
</script>

 <style lang="less">
</style>
