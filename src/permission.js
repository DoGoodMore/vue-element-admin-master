//引入对应的vue-router实例对象和
import router from './router'
//引入对应的vuex实例对象
import store from './store'
//引入Message 消息通知的组件
import { Message } from 'element-ui'
//引入了进度动画的核心库
import NProgress from 'nprogress'
//引入进度动画对应的css样式文件
import 'nprogress/nprogress.css'// progress bar style
//引入了对应的获取token的方法
import { getToken } from '@/utils/auth' // getToken from cookie

//配置了进度动画的显示样式 禁止了右侧的小球显示
NProgress.configure({ showSpinner: false })

// 定义了hasPermission
// 该方法主要用于判定某个权限列表中是否包含了需要判定的权限
//如果有那么返回true 如果没有那么就返回false
//如果没有传入 需要判定的对应权限的角色 那么也会返回true
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

//定义的白名单列表 即 不需要进行角色判定可以直接进入的路由地址
const whiteList = ['/login', '/authredirect']

//在每次路由跳转之前调用的函数
router.beforeEach((to, from, next) => {
  //调用进度动画显示的方法
  NProgress.start() ;
  //判定当前是否有可用的token值
  if (getToken()) {
    //如果有获取到对应的token值
    //在判定当前要跳转的路由是否为登录页面
    if (to.path === '/login') {
      //如果是要跳往登录页面的路由
      //那么将其跳转到根页面
      next({ path: '/' }) ;
      //并在此调用动画的完成方法
      NProgress.done()
    } else {//如果不是跳往登录页面
      //判定当前的用户是否有对应的角色列表
      if (store.getters.roles.length === 0) {//如果当前的用户没有对应的角色列表
        //那么通过token值发送请求获取对应当前用户的角色信息
        store.dispatch('GetUserInfo').then(res => {
          //获取到角色信息
          const roles = res.data.roles
          //通过获取到的角色信息调用GenerateRoutes方法 改方法调用之后能根据当前的角色信息创建对应角色可访问的菜单列表
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            //通过调用vue-router实例对象调用该实例对象对应的addRoutes方法
            // 该方法用于动态的将传入的路由对象添加到当前的vue-router中
            router.addRoutes(store.getters.addRouters) ;
            //通过调用next方法
            //通过不断调用该方法 如果在动态路由对象添加成功后可跳转
            // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            next({ ...to, replace: true })
          })
        }).catch((err) => {
          //如果在获取角色的过程抛错
          //那么就强制当前用户登出
          store.dispatch('FedLogOut').then(() => {
            //并抛出错误信息
            Message.error(err || 'Verification failed, please login again')
            //并将当前的路由页面跳转到登录页面
            next({ path: '/' })
          })
        })
      } else {//如果当前的用户有对应的token值 也拥有对应的角色
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        //判断当前的角色是否有访问当前路由页面的权限
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          //如果有 那么就直接调用next方法
          next()//
        } else {
          //如果没有对应的权限  那么将跳转对应的401页面
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
        // 可删 ↑
      }
    }
  } else {//如果当前的用户没有对应的token信息
    /* has no token*/
    //判断当前用户要跳转的页面是否在白名单中
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      //如果在白名单中 那么直接调用next方法并允许用户进入
      next()
    } else {//如果不是在白名单中
      //那么将其重定向到登录页面进行登录验证等
      next('/login') // 否则全部重定向到登录页
      //最后一步并将进度条动画调用完成的函数
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

//在每次路由跳转成功的页面时候执行进度条动画的完成方法
router.afterEach(() => {
  NProgress.done()
})
