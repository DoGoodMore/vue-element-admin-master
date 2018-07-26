//获取到全局的vuex对象
import store from '@/store'

//获取body元素
const { body } = document ;
//声明最小宽度为1024 即如果当前body的宽度小于1024px时 那么就会隐藏当前的菜单列表背景层
const WIDTH = 1024
const RATIO = 3

export default {
  watch: {
    //监控路由对象的变化 即每次跳转路由的时候
    //如果当前的设备是小屏幕设备 切当前的菜单层处于开启状态
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        //那么就调用状态管理中的关闭当前菜单层的方法
        store.dispatch('closeSideBar', { withoutAnimation: false })
      }
    }
  },
  //在当前组件被解析之前调用对应的window的resize的方法
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted() {
    //在渲染完毕之后获取到当前的设备尺寸 是否为小屏幕尺寸
    const isMobile = this.isMobile()
    //如果当前的屏幕是小屏幕尺寸
    if (isMobile) {
      //调用全局的toggleDevice 将全局保存的屏幕尺寸变量切换为小屏幕尺寸
      store.dispatch('toggleDevice', 'mobile')
      //调用全局的关闭导航栏的事件
      store.dispatch('closeSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    //定义判定当前的屏幕尺寸的方法
    isMobile() {
      //获取到当前的窗口尺寸信息
      const rect = body.getBoundingClientRect()
      //并通过其与我们定义的最小宽度进行比对 并将其对比结果进行返回
      return rect.width - RATIO < WIDTH
    },
    //定义了在窗口尺寸发生变化的监听函数
    resizeHandler() {
      //判定当前的窗口是否隐藏
      if (!document.hidden) {
        //获取到当前屏幕尺寸是否为小屏幕尺寸
        const isMobile = this.isMobile()
        //不断更新全局的屏幕尺寸的变量的值
        store.dispatch('toggleDevice', isMobile ? 'mobile' : 'desktop')

        //当前屏幕尺寸发生变化 那么立即调用全局的关闭菜单栏的显示
        if (isMobile) {
          store.dispatch('closeSideBar', { withoutAnimation: true })
        }
      }
    }
  }
}

/*
*   当前文件是被注册在根显示组件layout中的mixins对象
*   用于在页面初次渲染之后通过对屏幕尺寸来更新菜单栏的不同的显示和隐藏
*   首先会在模板文件解析之前对window添加尺寸变化的监听事件 通过监听当前的屏幕尺寸从而进行菜单栏不同的
*   显示方式
*   在渲染完成之后 在渲染完毕之后会获取到当前的屏幕尺寸是否为小屏幕尺寸 如果是小屏幕尺寸 那么就调用相关的
*   隐藏菜单栏的全局方法
*   而判定当前屏幕是否为小屏幕尺寸的方法就是通过对我们定义好的最小尺寸标准和当前窗口的尺寸信息进行对应的
*   比对 从而进行相关的逻辑操作
*
* */
