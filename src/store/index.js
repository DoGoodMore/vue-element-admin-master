//引入vue核心库
import Vue from 'vue'
//引入vuex核心库
import Vuex from 'vuex'
//引入了对应的app store子模块
import app from './modules/app'
//引入了对应的错误信息输出方法
import errorLog from './modules/errorLog'
//引入了对应的权限控制的对应store模块
import permission from './modules/permission'
//引入了对应的tagsView模块
import tagsView from './modules/tagsView'
//引入对应的用户信息的模块
import user from './modules/user'
//引入对应的getters方法模块
import getters from './getters'

//声明使用了vuex
Vue.use(Vuex)

//生成一个新的vuex对象
const store = new Vuex.Store({
  //将对应的模块通过配置对象传入
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user
  },
  //并传入对应的getters
  getters
})
//将生成的vuex实例对象作为默认暴露对象暴露
export default store
