<template>
  <div class="content">
    <div class="article_wrap">
      <div class="article_title article_detail_title">{{ title }}</div>
      <div class="article_info">
        <span class="article_info_date">发表于：{{ createdAt }}</span>
        <span class="article_info_label">标签：
        <span v-if="cate.length === 0||cate[0]===''">未分类</span>
        <el-tag v-else class="tag_margin" v-for="tag in cate">{{ tag }}</el-tag>
        </span>
      </div>
      <!-- v-html="compiledMarkdown()" -->
      <!-- <div class="article_detail_content" v-html="content"></div> -->
      <div class="content_dir">
      <v-md-editor v-model="content" mode="preview"></v-md-editor>
      </div>
    </div>
  </div>
</template>

<script>
  import { useRoute } from 'vue-router'
  import { reactive,onMounted,getCurrentInstance,toRefs} from 'vue'
  export default {

    setup(){

      let article=reactive({
        title:'',
        createdAt:'',
        cate:'',
        content:''
      })
      const route= useRoute()
      const { proxy } = getCurrentInstance();

      onMounted(()=>{
        let id = route.params.id
        // console.log(typeof id)
        proxy.$axios.get('/api/article/'+id)
        .then(
              response =>{
              //  article=response.data
              article.title=response.data.title
              article.cate=response.data.cate.split(',')
              article.createdAt=response.data.createdAt
              article.content=response.data.content
              }
        )
      
      })

      return{
        ...toRefs(article),

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
      // margin: 40px 0 0
    }

    .article_detail_content {
      text-align: left;
      padding: 60px 0;
      font-size: 18px;
    }

    .content_dir{
      text-align: left !important;
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


  }
</style>