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
                  return item.cate.split(',').indexOf(name)!==-1
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
    .article_wrap {
      padding: 40px 20px 0px 20px;
    }

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

    .article_title {
      display: inline-block;
      color: #222;
      font-size: 34px;
      font-weight: 600;
      border-bottom: 1px solid white;
      cursor: pointer;
      &:hover{
        border-bottom: 1px solid #222;
      }
    }

    .article_info {
      color: #999;
      font-size: 14px;
      padding-top: 8px;
    }

    .tag_margin {
      margin: 3px;
    }

    .article_gist {
      text-align: left;
      padding-top: 40px;
      padding-bottom: 40px;
      font-size: 16px;
    }

    .article_button {
      display: inline-block;
      padding: 3px 12px;
      border: 2px solid #222;
      color: #222;
      font-size: 14px;
      cursor: pointer;
    }

    .article_all:hover {
      color: white;
      background: #000;
      font-weight: 600;
    }



  }
</style>