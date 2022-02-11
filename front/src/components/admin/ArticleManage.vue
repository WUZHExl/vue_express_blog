<template>
    <!-- 导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="row-bg">
        <el-col>
          <el-button type="primary" @click="showEditArticle()">写文章</el-button>
        </el-col>
    </el-row>

    <el-card class="box-card" v-for="item in articleList" >
       <el-row justify="space-between">
         <el-col :span="18" @click="showArticleDetail(item.id)"><h1>{{item.title}}</h1></el-col>
         <el-col :span="4">{{item.createdAt}}</el-col>
       </el-row>
       <el-row justify="space-between" class="options">
         <el-col :span="10">{{item.desc}}</el-col>
         <el-col :span="3">
           <a @click="showEditArticle(item.id)"><span>编辑</span></a>
           <a @click="showArticleDetail(item.id)"><span>浏览</span></a>
           <a @click="deleteArticle(item.id)"><span>删除</span></a>
         </el-col>

       </el-row>
    </el-card>
</template>

<script>
import { reactive,onMounted,getCurrentInstance,toRefs} from 'vue'
import { useRouter } from 'vue-router'
export default {


      setup(){
          let articleList=reactive([])
          const router=useRouter()
          const { proxy } = getCurrentInstance();
          onMounted(()=>{
              getALLArticle()
          })

          function getALLArticle(){
            proxy.$axios.get('/api/article')
              .then(
              response =>{
                articleList.splice(0,articleList.length,...response.data)
                articleList=articleList.reverse()
                // console.log(articleList)
              }
              )
              .catch(error =>{
                  console.log(error)}
              )
          }

          function showEditArticle(id){
            if(id){
               router.push(`/articleEdit/${id}`)
            }
            else  router.push('/articleEdit')
          }

          function showArticleDetail(id){
              // router.push('/article/'+id)
              let routeUrl = router.resolve('/article/'+id);
              // console.log(routeUrl)
              window.open(routeUrl .href, '_blank');

          }

          async function deleteArticle(id){
              // console.log(id)
              if(confirm('Are you sure you want to delete this article?')){
                let res=await proxy.$axios.delete('/api/article', {
                  data:{
                  id: id
                  }
                })
                if(res.status!==200) {
                  proxy.$message.error('删除文章失败');
                  return;
                }
                proxy.$message.success('删除文章成功');
                getALLArticle()
              }       
          }

          return{
            articleList,
            showEditArticle,
            showArticleDetail,
            deleteArticle,
            getALLArticle
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

.options{
  padding-top:10px ;
}

.el-col{
  cursor: pointer !important;
}
</style>