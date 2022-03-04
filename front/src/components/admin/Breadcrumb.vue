<template>
      <!-- 导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path:path}">{{name}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
  props: ["path", "name"],// 如果这行不写，下面就接收不到
  setup(props) {
    // console.log(props) // 
  },
}
</script>

<style>

</style>