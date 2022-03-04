import { createStore } from 'vuex'
import axios from 'axios'


// Create a new store instance.
const store = createStore({
  state () {
    return {
      count: 0,
      articleList:[],
      cateLists:[],
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    setArticleLists(state,payload){
      state.articleList=payload.article
    },
    setCateLists(state,payload){
      // console.log(payload.cate)
      state.cateLists=payload.cate
    }

  },
  actions:{

    getList(context,type){
      axios.get('/api/'+type)
        .then(
          response=>{
            let newArr=[]
            newArr.splice(0,newArr.length,...response.data)
            newArr=newArr.reverse()
            type==='article'?
            context.commit('setArticleLists',{article:newArr}):
            context.commit('setCateLists',{cate:newArr})
          }
        )
        .catch(error =>{
          console.log(error)}
        )
    }
  }//actions

})

export default store