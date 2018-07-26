//引入axios核心库
import axios from 'axios'
//引入Message组件
import { Message } from 'element-ui'
//引入vuex实例对象
import store from '@/store'
//引入获取token的方法函数
import { getToken } from '@/utils/auth'

// 创建axios实例对象
const service = axios.create({//传入一个配置对象
  //指定对应的baseURL 改项是根据当前的开发模式 来进行对应的修改
  baseURL: process.env.BASE_API, // api的base_url
  //设定请求的失效时间 即如果超过对应的时间 没有获取到对应的数据 那么就会失败
  timeout: 5000 // request timeout
})

//发出请求的拦截器
service.interceptors.request.use(config => {
  // 该方法是有axios方法暴露给外部的
  //用于在请求被发出之前进行一些公共的操作 比如添加token的请求头 对参数进行格式化的处理等等
  if (store.getters.token) {//判定当前的全局vuex对象中是否有对应的token值
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    //通过给请求头添加[ xxxx ] 对应的字段使每个请求都会携带上对应的值
    config.headers['X-Token'] = getToken()
  }
  //最后将该请求返回
  return config
}, error => {
  //错误处理函数
  //当请求被驳回或是发生错误时候处理的流程逻辑
  console.log(error) // for debug
  //调用Promise的错误处理函数
  Promise.reject(error)
})

//返回请求的处理逻辑程序
service.interceptors.response.use(
  //我们可以在该程序处理中 进行对返回的数据进行判定 从而进行不同的行为
  //如返回数据的错误信息的统一判断 进行统一的错误信息的输出
  //从而不需要在每个请求中需要单独对其所返回的逻辑程序中进行对应的处理
  response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  // response => {
  //   const res = response.data
  //   if (res.code !== 20000) {
  //     Message({
  //       message: res.message,
  //       type: 'error',
  //       duration: 5 * 1000
  //     })
  //     // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //       // 请自行在引入 MessageBox
  //       // import { Message, MessageBox } from 'element-ui'
  //       MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //         confirmButtonText: '重新登录',
  //         cancelButtonText: '取消',
  //         type: 'warning'
  //       }).then(() => {
  //         store.dispatch('FedLogOut').then(() => {
  //           location.reload() // 为了重新实例化vue-router对象 避免bug
  //         })
  //       })
  //     }
  //     return Promise.reject('error')
  //   } else {
  //     return response.data
  //   }
  // },
  //对返回请求时候的错误处理的统一程序
  error => {
    console.log('err' + error) // for debug
    Message({//调用message组件进行错误信息的相关输出
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    //最后调用promise的错误流程处理
    return Promise.reject(error)
  })
//最后将对应的请求实例进行暴露
export default service
