import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
// 新增代码：引入全部组件及样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIcons from '@element-plus/icons'

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



app.use(router)
for (const name in ElIcons){
	app.component(name,ElIcons[name])
}
app.use(ElementPlus)

app.use(VMdEditor)

app.config.globalProperties.$axios=axios
app.mount('#app')

