<template>
  <div class="content">
    <div class="article_wrap" v-for="item in articleList">
      <div class="article_title" @click="articleDetail( item.id )">{{ item.title }}</div>
      <div class="article_info">
        <span class="article_info_date">发表于：{{ item.createdAt }}</span>
        <span class="article_info_label">标签：
        <span v-if="item.cate.split(',').length === 0||item.cate.split(',')[0]===''">未分类</span>
        <el-tag v-else v-for="tag in item.cate.split(',')" class="tag_margin" size="small">{{ tag }}</el-tag>
        </span>
      </div>
      <div class="article_gist">{{ item.desc }}</div>
      <div class="article_button article_all" @click="articleDetail( item.id )">阅读全文</div>
      <div class="article_underline"></div>
    </div>
  </div>

</template>

<script>
import { reactive,onMounted,getCurrentInstance,toRefs,computed} from 'vue'
import { useRouter } from 'vue-router'
import {useStore } from 'vuex'
  export default {

    setup(){
      let articleList=reactive([])

      const { proxy } = getCurrentInstance();
      const router = useRouter()
      const store = useStore()
      onMounted(()=>{
        // console.log("======onMounted=========");
        // console.log(articleList)
        store.dispatch('getList','article')

      })
      articleList=computed(()=>store.state.articleList)

      function articleDetail(id){
        // console.log(router)
        router.push('/article/' + id)
      }

      return {
        articleList,
        articleDetail
      }
    }
  }
</script>

<style lang="less">

  .content {
    width: 75%;
    float: right;
    background: white;
    .article_wrap {
      padding: 40px 20px 0px 20px;
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

    .article_underline {
      height: 1px;
      width: 100%;
      background: #545455;
      margin: 80px auto 0;
    }
  }
</style>