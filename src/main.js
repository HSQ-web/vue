// 入口文件
import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//导入vuex
import Vuex from 'vuex'
Vue.use(Vuex)
// 创建一个仓储
//这里的store 一定要大写
// 每次我们刚进入的时候我们从本地存储拿出来 放入到我们的car数组里
   var car = JSON.parse(localStorage.getItem('car') || '[]')
   var store = new Vuex.Store({
   state:{
      car:car
   },
   mutations:{
    //点击加入购物车把购物车的信息 加入到我们的store 中的 car 中
          addTocar(state,carinfo){
            // 这里加入购物车  有俩种情况  第一是原先购物车就有东西 我们只需要更新数量count 就可以了
            //立个flag 就假设一上来购物车就是空的
                  var flag = false
                  state.car.some(item => {
                  if (item.id === carinfo.id) {
                  item.count += parseInt(carinfo.count)  
                  flag = true
                  return true
                    }
                  })
            //如果没有 我们直接把商品数据直接push进去我们的car 即可 
                if (!flag) {
                  state.car.push(carinfo)
                }
                
               //当我们加入购物车的时候 除了要把数据存贮到我们state 里面 为了避免刷新就没了
               //我们还要在本地存储 localstorage
               localStorage.setItem('car',JSON.stringify(state.car))

          },
          updateGoodsInfo(state, goodsinfo) {
            // 修改购物车中商品的数量值
            // 分析： 
            state.car.some(item => {
              if (item.id == goodsinfo.id) {
                item.count = parseInt(goodsinfo.count)
                return true
              }
            })
            // 当修改完商品的数量，把最新的购物车数据，保存到 本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
          },
          removeFormCar(state, id) {
            // 根据Id，从store 中的购物车中删除对应的那条商品数据
            state.car.some((item, i) => {
              if (item.id == id) {
                state.car.splice(i, 1)
                return true;
              }
            })
            // 将删除完毕后的，最新的购物车数据，同步到 本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
          },
          updateGoodsSelected(state, info) {
            state.car.some(item => {
              if (item.id == info.id) {
                item.selected = info.selected
              }
            })
            // 把最新的 所有购物车商品的状态保存到 store 中去
            localStorage.setItem('car', JSON.stringify(state.car))
          }
   },
   getters:{
   //想当于计算属性 也很像过滤器filter
       getAllCount(state){
         var c = 0;
         state.car.forEach(item => {
          c += item.count;
         });
         return c 
       },
       getGoodsCount(state) {
        var o = {}
        state.car.forEach(item => {
          o[item.id] = item.count
        })
        return o
      },
      getGoodsSelected(state) {
        var o = {}
        state.car.forEach(item => {
          o[item.id] = item.selected
        })
        return o
      },
      getGoodsCountAndAmount(state) {
        var o = {
          count: 0, // 勾选的数量
          amount: 0 // 勾选的总价
        }
        state.car.forEach(item => {
          if (item.selected) {
            o.count += item.count
            o.amount += item.price * item.count
          }
        })
        return o
      }      
   }
  })
//导入VueResource
import VueResource from 'vue-resource'
Vue.use(VueResource)
//设置请求根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
Vue.http.options.emulateJSON = true;
//导入我们自己封装的路由模块
import router from './router.js'
//定义全局过滤器 
//需要node 中的 moment 模块 格式化日期
import moment from 'moment'
Vue.filter("dataFormat",function (datestr, pattern = "YYYY-MM-DD hh:mm:ss") {
	return moment(datestr).format(pattern)
})
// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/mui.css'
import './lib/mui/css/golbal.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'

//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 按需导入 Mint-UI 中的组件   
// import { Header,Swipe, SwipeItem,Button,Lazyload} from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload)
//全局导入
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

// 导入 App 根组件
import app from './App.vue'

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router,
  store
})