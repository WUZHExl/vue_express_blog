import { createRouter, createWebHashHistory } from 'vue-router'
import sideBar from '../components/sideBar.vue'
import article from '../components/Article.vue'
import about from '../components/About.vue'
import articleDetail from '../components/ArticleDetail.vue'
import login from '../components/admin/Login.vue'
import Home from '../components/admin/Home'
import articleManage from '../components/admin/ArticleManage'
import welcome from '../components/admin/Welcome'
import articleEdit from '../components/admin/ArticleEdit'
import cateManage from '../components/admin/CateManage'
import cateArticle from '../components/CateArticle'
import userManage from '../components/admin/UserManage'

const routes = [
  {path:'/',redirect:'/article'},
  {path: '/article', components: {sidebar: sideBar,content:article}},
  // {path: '/', component: article},
  {path:'/about', components: {sidebar: sideBar,content:about}},
  {path: '/article/:id', components: {sidebar: sideBar,content:articleDetail}},
  {path:'/cateArticle/:name', components:{sidebar: sideBar,content:cateArticle}},
  {path:'/login',component:login},
  {
    path:'/home',
    component:Home,
    redirect:'/welcome',
    children:[
      {path:'/welcome',component:welcome},
      {path:'/articleManage',component:articleManage},
      {path:'/articleEdit/:id?',component:articleEdit},
      {path:'/cateManage',component:cateManage},
      {path:'/userManage',component:userManage},
    ]
        
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//全局前置守卫：初始化时执行、每次路由切换前执行
router.beforeEach((to,from,next)=>{
  //to:将要访问的路径
  // from:代表从哪来
  // next()函数，放行；  next('/login')强制跳转
    let id=to.params.id;
    if(to.path==='/login'||to.path==='/'||to.path===`/article/${id}`||to.path==='/about'|| to.path==='/article') return next()
    //获取token
    const tokenStr=sessionStorage.getItem('token')
    if(!tokenStr) return next('/login')
    next()
  
  })

export default router
