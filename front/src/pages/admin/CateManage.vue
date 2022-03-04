<template>
    <!-- 导航区 -->
    <breadcrumb :name="childProps.name" :path="childProps.path"></breadcrumb>

    <el-row class="row-bg">
        <el-col>
          <el-button type="primary" @click="addCate()">添加分类</el-button>
        </el-col>
    </el-row>

    <el-card v-for="item of cateLists" class="cateCard">
      <el-row justify="space-between">
         <el-col :span="5" @click="showCateArticle(item.name)"><h1>{{item.name}}</h1>
         </el-col>
         <el-col :span="4">{{item.createdAt}}</el-col>
      </el-row>
      <el-row justify="end">
         <el-col :span="3">
           <a @click="showCateArticle(item.name)"><span>查看</span></a>
           <a @click="showEditCate(item)"><span>修改</span></a>
           <a @click="deleteCate(item)"><span>删除</span></a>
         </el-col>
      </el-row>
    </el-card>
</template>

<script>
import {onMounted,getCurrentInstance,reactive,computed} from 'vue'
import {useRouter} from 'vue-router'
import breadcrumb from '../../components/admin/Breadcrumb.vue'
import {useStore } from 'vuex'
export default {

      components:{breadcrumb},
      setup(){
          
        let cateLists =reactive([])
        let childProps=reactive({
            path:'/cateManage',
            name:'分类管理',
        })  
        const router = useRouter()
        const store= useStore()
        const { proxy}= getCurrentInstance();
        onMounted(()=>{
          // console.log(proxy.$message)
          getAllCateLists()
        })

        function getAllCateLists() {
          store.dispatch('getList','cate')
        }
        cateLists=computed(()=>store.state.cateLists)

        function addCate(){
              proxy.$prompt('请输入新的分类', '添加分类', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                inputErrorMessage: 'Invalid Cate',
                inputPattern:/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
              })
                .then(({ value }) => {

                  proxy.$axios.post('/api/cate',{
                    name: value,
                  })
                  .then(
                    response=>{
                       proxy.$message({type: 'success',message: `Add successful`,})
                       getAllCateLists()
                    }
                  )

                })
                .catch(() => {
                  proxy.$message({
                    type: 'info',
                    message: 'Input canceled',
                  })
                })
               
        }

        function showCateArticle(name){
          // router.push('/cateArticle/'+name)
          let routeUrl = router.resolve('/cateArticle/'+name);
              // console.log(routeUrl)
          window.open(routeUrl .href, '_blank');

        }

        async function showEditCate(item){

          try{
              let res=await proxy.$prompt(`原来的分类是：${item.name}`, '修改分类', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                inputErrorMessage: 'Invalid Cate',
                inputPattern:/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
              })
              // console.log(res)
              proxy.$axios.put('/api/cate',{
                id:item.id,
                name:res.value,
                prename:item.name
              }).then(
                response=>{
                   proxy.$message.success('修改成功')
                   getAllCateLists()
                }
              )
          }catch{
            proxy.$message.info('Input canceled')
          }
        }

        async function deleteCate(item){
          if(confirm('Are you sure you want to delete this cate?')){
            let res=await proxy.$axios.delete('/api/cate', {
              data:{
              id: item.id,
              name:item.name
              }
            })
            if(res.status!==200) {
              proxy.$message.error('删除文章失败');
              return;
            }
            proxy.$message.success('删除文章成功');
            getAllCateLists()
          }  
        }

        return{
          cateLists,
          childProps,
          showEditCate,
          deleteCate,
          addCate,
          getAllCateLists,
          showCateArticle,
        }
      }
}
</script>

<style lang="less" scoped>
.row-bg {
  padding: 20px 0;
  background-color: #f9fafc;
}
a{
  display: inline-block !important;
  padding: 2%;
}

.el-col{
  cursor: pointer !important;
}
</style>