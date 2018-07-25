//引入了vue的核心库
import Vue from 'vue'
//引入了对应的全局vuex的实例对象
import store from './store'

//我们可以控制对应的错误信息的显示时机 即只是在生产模式下显示
// if (process.env.NODE_ENV === 'production') {

//通过调用Vue的对外暴露的config.errorHandler钩子函数
//获取到对应的错误对象信息
Vue.config.errorHandler = function(err, vm, info, a) {
  // Don't ask me why I use Vue.nextTick, it just a hack.
  // detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
  Vue.nextTick(() => {
    //并将对应的错误信息对象添加到全局的错误对象中
    store.dispatch('addErrorLog', {
      err,
      vm,
      info,
      url: window.location.href
    })
    console.error(err, info)
  })
}

// }
