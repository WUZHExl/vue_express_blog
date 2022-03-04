<template>
<div class="left_me">
    <div class="menu_title">
      <h1>Arz'S NOTES</h1>
      <h5>桃李春风一杯酒，江湖夜雨十年灯</h5>
    </div>
    <nav>
      <ul>
        <router-link to='/'>
          <li class="nav">
            <span>首页</span>
          </li>
        </router-link>
        <router-link to='/about'>
          <li class="nav">
            <span>关于</span>
          </li>
        </router-link>
        <li class="nav">
            <span>分类</span>
        </li>
        <ul>
            <li v-for="item in cateName" class="childList" @click="showCateArticle(item.name)">{{item.name}}</li>
        </ul>

      </ul>
    </nav>
    <div class="info">
      <img src="../../assets/header.jpg" alt="head">
      <div class="info_name">Arz</div>
      <div class="archive">
        <ul>
          <router-link to='/'>
            <li>
              <span class="archive_count">{{articleNumber}}</span>
              <span class="archive_name">文章</span>
            </li>
          </router-link>
        </ul>
      </div>
      <ul class="communication">
        <li class="communication_item">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="553531290@qq.com"
          placement="top"
        >
        <a><span>Email</span></a> 
        </el-tooltip>
        </li>
        <li class="communication_item">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="https://github.com/WUZHExl"
            placement="top"
          >
          <a href="https://github.com/WUZHExl" target="_blank">
            <span>GitHub</span>
          </a>
          </el-tooltip>
        </li>
        <li class="communication_item">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="17821255446"
          placement="top"
        >
        <a><span>Phone</span></a>
        </el-tooltip>
        </li>

        <li class="communication_item">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="wz394319"
          placement="top"
        >
        <a><span>WeChat</span></a>
        </el-tooltip>
        </li>
      </ul>
    </div>
</div>
</template>

<script>
import {ref,reactive,onMounted,getCurrentInstance,computed} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
export default {
    setup(){
      let articleNumber=ref(0)
      let cateName=reactive([])
      const router = useRouter()
      const store= useStore()
      const { proxy } = getCurrentInstance();
      cateName=computed(()=>store.state.cateLists)
      onMounted(()=>{
        // console.log("======onMounted=========");
        // console.log(articleNumber)
        proxy.$axios.get('/api/article/')
        .then(
        response =>{
            articleNumber.value = response.data.length
         }
        )
        getAllCateLists()
      })

      function getAllCateLists() {

        store.dispatch('getList','cate')
      
      }

      function showCateArticle(name){
          router.push('/cateArticle/'+name)
      }

      return{
        articleNumber,
        cateName,
        getAllCateLists,
        showCateArticle,
      }
    }

}
</script>

<style lang="less" scoped>
  .left_me {
    // float: left;
    width: 18%;
    margin-right: 20px;
    position:fixed;

    a{
      &:hover {
          color: #222;
          background: #f5f7f9;
        }
    }


    .menu_title {
      background: rgb(38, 42, 48); 
      color: white;
      padding: 10px 0;
    }

    nav {
      background: white;
      padding: 20px 0;
    }

    .nav {
      padding: 8px 20px;
      text-align: left;
    }

    .childList{
      text-align: left;
      padding:5px 30px ;
      font-size: 12px;
      cursor: pointer;
      &:hover {
          color: #222;
          background: #f5f7f9;
      }
    }

    .info {
      margin-top: 10px;
      padding: 20px;
      background: white;
      img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
      }
    }

    .info_name {
      font-weight: 600;
      padding: 5px;
    }

    .archive {
        padding-top: 20px;
        .archive_count {
              display: block;
              color: #222;
              font-weight: 600;
              font-size: 16px;
        }

        .archive_name {
        display: block;
        color: #999;
        font-size: 14px;
        }
    }

    .communication {
      padding-top: 20px;
    }

    .communication_item {
      display: inline-block;
      width: 40%;
      font-size: 14px;
      font-weight: 600;
      padding: 5px;
    }

  }

  @media (max-width: 767px) {
    .left_menu {
      display: none;
    }
  }





</style>