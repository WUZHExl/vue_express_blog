<template>
    <el-container
    class="layout-container-demo"
    >
    <!-- 头部 -->
    <el-header :style="{position: 'fixed', zIndex: 1, width: '100%'}">
      <div>
        <span>博客管理系统</span>
      </div>
      <el-button type="info" @click="layout">退出</el-button>
    </el-header>

    <el-container :style="{marginTop:'60px'}">

        <el-aside :width="isCollapse?'64px':'200px'" style="background-color:#333744"
                  :style="{position: 'fixed',zIndex: 1, weight: '100%'}"
        >

          <div class="toggle-button" @click="toggleCollapse">|||</div>
          <el-menu 
              background-color="#333744"
              text-color="#fff"
              active-text-color="#409EFF"
              :default-active="activePath"
              :collapse="isCollapse"
          >
              <el-menu-item index="2" @click="Goto('/articleManage')">
                <el-icon><document /></el-icon>
                <template #title>文章管理</template>
              </el-menu-item>
              <el-menu-item index="3"  @click="Goto('/cateManage')">
                <el-icon><notebook /></el-icon>  
                <template #title>分类管理</template>
              </el-menu-item>
              <el-menu-item index="1" @click="Goto('/userManage')">
                <el-icon><avatar /></el-icon>
                <template #title>用户管理</template>
              </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main :style="{marginLeft:isCollapse?'64px':'200px'}">

          <router-view></router-view>
        </el-main>

    </el-container>


    </el-container>
</template>

<script>
import {reactive,ref,getCurrentInstance,onMounted,toRefs} from 'vue'
import {useRouter} from 'vue-router'
export default {

        setup(){
            // const activePath=ref('')
            const useData=reactive({
              activePath:'',
              isCollapse:false,
            })
            const { proxy } = getCurrentInstance();
            const router = useRouter()
            onMounted(()=>{

                router.push('/welcome')
            })

            let Goto=function(path){
               router.push(path)
            }

            let layout=()=>{
              window.sessionStorage.removeItem('token')
              router.push('/login')
            }

            function toggleCollapse(){
               useData.isCollapse=!useData.isCollapse
            }

            return{
              ...toRefs(useData),
              Goto,
              toggleCollapse,
              layout
            }


        }
}
</script>

<style lang="less" scope>
  .layout-container-demo{
    // height: 100%;
    height: 100vh;
  }

  .el-header{
    background-color: #373D41;
    display:flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size:20px;
    > div{
      display:flex;
      align-items:center;
      span{
        margin-left:15px ;
      }
    }
  }


  .el-aside {
    background-color: #333744;
    /* color: #333; */
     text-align: center; 
    /* line-height: 200px; */
    height: 100%;
    .el-menu {
      border-right: none;
    }
  }

   .toggle-button{
   background-color:'#4A5064';
   font-size:10px;
   line-height:24px;
   color: #fff;
   text-align: center;
   letter-spacing: 0.2em;
   cursor: pointer;

 }
</style>