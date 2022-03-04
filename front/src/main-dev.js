import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"
import axios from 'axios'
// 新增代码：引入全部组件及样式
// 引入elementplus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIcons from '@element-plus/icons'


// 引入markdown文件
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

import './assets/global.css'

// highlightjs
import hljs from 'highlight.js';

VMdEditor.use(githubTheme, {
  Hljs: hljs,
});

const app=createApp(App)



app.use(router).use(store)
for (const name in ElIcons){
	app.component(name,ElIcons[name])
}
app.use(ElementPlus)
app.use(VMdEditor)


// axios.defaults.baseURL='http://127.0.0.1:3001/'
app.config.globalProperties.$axios=axios
app.mount('#app')

