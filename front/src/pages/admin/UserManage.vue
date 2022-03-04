<template>
    <breadcrumb :name=" childProps.name" :path="childProps.path"></breadcrumb>

    <el-card>
      暂无内容
    </el-card>
</template>

<script>
import {reactive} from 'vue'
import breadcrumb from '../../components/admin/Breadcrumb.vue'
export default {

  components:{breadcrumb},
  setup(){
    let childProps=reactive({
      path:'/userManage',
      name:'用户管理',
    })

    return{
      childProps
    }

  }

}
</script>

<style lang="less" scoped>
.el-card {
  margin: 40px 0;
}
</style>