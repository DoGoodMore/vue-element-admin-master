//引入Vue核心库
import Vue from 'vue'

//引入重置浏览器样式的css文件
import 'normalize.css/normalize.css'

//引入Element-UI UI样式库
import Element from 'element-ui'
//引入Element-ui ui样式的css文件
import 'element-ui/lib/theme-chalk/index.css'

//引入全局样式文件
import '@/styles/index.scss'

//引入APP.vue 核心Vue的渲染组件
import App from './App'
//引入vue-router实例对象
import router from './router'
//引入vuex核心文件
import store from './store'

//引入il18n国际化组件 用于对中文/英文(通过引入的js文件决定)之间的互相转换
// 以及定义转换后的词汇等
import i18n from './lang'
//引入icon文件
import './icons'

//引入抛错信息的展示方法
import './errorLog'
// !!! 引入了对于vue-router跳转时进行相关操作的js文件
//就是通过该文件来进行前端路由的权限判定且动态修改渲染的菜单列表等
import './permission'

//引入mock.js 用于模拟真实的获取数据的环境
import './mock' // simulation data

//引入全局的vue过滤器
import * as filters from './filters'

//声明使用element ui组件库
Vue.use(Element, {
  //并设置了默认的尺寸为medium 即可以改变改配置项来设置按钮 标签等默认的尺寸等
  size: 'medium',
  //生命使用了il18n国际化插件
  i18n: (key, value) => i18n.t(key, value)
}) ;

// 通过遍历引入的全局的过滤器 并将其注册到Vue构造函数上
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
}) ;

//Vue的配置项 用于配置是否显示在生产模式下的警告信息
Vue.config.productionTip = false ;

//生成一个Vue的实例对象
new Vue({
  //指定元素
  el: '#app',
  //指定vue-router对象
  router,
  //指定vuex实例对象
  store,
  //指定了国际化组件的实例对象
  i18n,
  //使用渲染函数进行跟组件的渲染
  render: h => h(App)
}) ;
