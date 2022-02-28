<template>
    <div class="edit_wrap">
      <div class="return_button">
        <el-button icon="arrow-left" size="small" @click="goBack">返回</el-button>
      </div>
      <div class="edit_head">标题</div>
      <el-input v-model="title" placeholder="请输入标题"></el-input>
      
      <div class="tag_wrap">
        <span>标签: </span>
        <el-tag
            class="mx-1"
            :key="tag"
            v-for="tag in labels"
            :closable="true"
            :disable-transitions="true"
            @close="handleClose(tag)"
        >{{ tag }}
        </el-tag>

        <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>

      </div>

      <div class="edit_head">简介</div>
      <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入简介"
          v-model="desc">
      </el-input>
      
      <div class="edit_head">内容 (Markdown编辑器)</div>
      <v-md-editor v-model="content" height="600px"></v-md-editor>
      <div class="save_button">
        <el-button type="primary" @click="saveContent">保存</el-button>
      </div>
    </div>
</template>

<script>
import {ref,reactive,toRefs,getCurrentInstance,onMounted} from 'vue'
import {useRouter,useRoute} from 'vue-router'
export default {

  setup(){

    const useData=reactive({
      id:'',
      title: '',
      date: '',
      content: '',
      desc: '',
      labels: [],
      inputVisible: false,
      inputValue: '',
    })
    const saveTagInput=ref(null)
    const router = useRouter()
    const route = useRoute()
    const { proxy } = getCurrentInstance();

    onMounted(()=>{
      let {id} = route.params
      if(id!==''){
          proxy.$axios.get('/api/article/'+id)
          .then(
                response =>{
                //  article=response.data
                useData.title=response.data.title
                useData.labels=response.data.cate.split(',')
                useData.date=response.data.createdAt
                useData.content=response.data.content
                useData.desc=response.data.desc

                }
          )
      }
    
    })

    function goBack(){
        router.push('/articleManage')
    }

    function handleClose(tag){
        useData.labels.splice(useData.labels.indexOf(tag), 1)
    }

    function showInput(){
        useData.inputVisible = true
    }

    function handleInputConfirm(){
        let inputValue = useData.inputValue
        if (inputValue) useData.labels.push(inputValue)
        useData.inputVisible = false
        useData.inputValue = ''
    }

    async function saveContent(){

      if(useData.title===''){
        proxy.$message.error('请输入标题')
        return;
      }

      if(useData.content===''){
        proxy.$message.error('请输入内容')
        return;
      }

      let {id} = route.params
      if(id!==''){
        let newArticle={
          title:useData.title,
          desc:useData.desc,
          content:useData.content,
          cate:useData.labels.join(','),
          id:id,
        }

        const res=await proxy.$axios.put('/api/article',newArticle)
        if(res.status!==200) {
          proxy.$message.error('修改文章失败');
          return;
        }
        proxy.$message.success('修改文章成功');
        router.push('/articleManage');

      }
      else{
        let newArticle={
          title:useData.title,
          created_at:new Date(),
          desc:useData.desc,
          content:useData.content,
          cate:useData.labels.join(',')
        }
        // console.log(newArticle)
        const res=await proxy.$axios.post('/api/article',newArticle)
        // console.log(res)

        if(res.status!==200) {
          proxy.$message.error('添加文章失败');
          return;
        }
        proxy.$message.success('添加文章成功');
        router.push('/articleManage');
      }
    }

    return{
      saveTagInput,
      goBack,
      handleClose,
      showInput,
      handleInputConfirm,
      saveContent,
      ...toRefs(useData)

    }
  }

}
</script>

<style lang="less" scoped>
  .edit_wrap {
    padding: 30px;
    font-size: 16px;
  }

  .return_button {
    text-align: left;
    margin-bottom: 40px;
  }

  .tag_wrap {
    text-align: left;
    margin: 20px 0;
  }

  .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    width: 90px;
    // line-height: 30px;
    // padding-top: 0;
    // padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    height: 32px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .edit_wrap textarea {
    outline: none;
    font-size: 16px;
  }

  .edit_head {
    margin: 20px 0;
    text-align: left;
  }

  .save_button {
    padding: 40px 0;
  }
</style>