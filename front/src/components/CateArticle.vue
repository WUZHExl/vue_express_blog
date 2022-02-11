<template>
  <div class="content" v-if="article.length!==0">
    <div class="article_wrap" v-for="item in article">
      <div class="article_title" @click="articleDetail( item.id )">{{ item.title }}</div>
      <div class="article_info">
        <span class="article_info_date">发表于：{{ item.createdAt }}</span>
        <span class="article_info_label">标签：
        <span v-if="item.cate.length === 0||item.cate[0]===''">未分类</span>
        <el-tag v-else v-for="tag in item.cate.split(',')" class="tag_margin" size="small">{{ tag }}</el-tag>
        </span>
      </div>
      <div class="article_gist">{{ item.desc }}</div>
      <div class="article_button article_all" @click="articleDetail( item.id )">阅读全文</div>
      <div class="article_underline"></div>
    </div>
  </div>
  <div class="content" v-else>
    <div class="article_another">
      该分类下没有相关文章
    </div>
  </div>
</template>

<script>
  import { useRoute,useRouter } from 'vue-router'
  import { reactive,onMounted,getCurrentInstance,watchEffect} from 'vue'

  export default {

    setup(){

      let article=reactive([])
      const route= useRoute()
      const router = useRouter()
      const { proxy } = getCurrentInstance();
      watchEffect(()=>{
        let name = route.params.name
        proxy.$axios.get('/api/article/')
        .then(
              response =>{
              // console.log(response.data)
              let temp=response.data.filter(item=>{
                  return item.cate.indexOf(name)!==-1
              })
              article.splice(0,article.length,...temp)
              article=article.reverse()
              }
        )
      })

      function articleDetail(id){
        router.push('/article/' + id)
      }

      return{
        article,
        articleDetail,
      }
    }
  }
</script>

<style lang="less" scoped>
  .content {
    width: 75%;
    float: right;
    background: white;

    .article_detail_title {
      cursor: default;
    }

    .article_detail_content {
      text-align: left;
      padding: 60px 0;
      font-size: 18px;
    }

    .content_dir{
      text-align: left !important;
    }

    .article_underline {
      height: 1px;
      width: 100%;
      background: #545455;
      margin: 80px auto 0;
    }

    .article_another{
      padding: 40px 0;
    }


  }
</style>