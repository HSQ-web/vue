// 入口文件
import Vue from 'vue'
// 1.1 导入路由的包





// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/mui.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'


// 按需导入 Mint-UI 中的组件   
import { Header} from 'mint-ui'
Vue.component(Header.name, Header)



// 1.3 导入自己的 router.js 路由模块
/*import router from './router.js'*/


// 导入 App 根组件
import app from './App.vue'

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  // 1.4 挂载路由对象到 VM 实例上
})