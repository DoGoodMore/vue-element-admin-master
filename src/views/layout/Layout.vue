<template>
  <!-- 布局结构 -->
  <div class="app-wrapper" :class="classObj">
    <!-- 用于显示当前的菜单的样式是展开或是收缩 通过判定当前的设备的尺寸 通过v-if进行其控制 -->
    <!-- 即 当屏幕为小屏幕尺寸的时候 会全部隐藏菜单的样式 而通过遮罩层的形式来显示对应的菜单列表 -->
    <!-- 遮罩层的显示条件为必须是小屏幕尺寸 且当前的菜单项处于开启状态 -->
    <div v-if="device==='mobile'&&sidebar.opened"
         class="drawer-bg"
         @click="handleClickOutside"></div>
    <!-- 生成对应的菜单列表的对应组件 -->
    <sidebar class="sidebar-container"></sidebar>
    <!-- 右侧的主体显示内容的盒模型 -->
    <div class="main-container">
      <!-- 右侧显示内容的第一层的导航内容 -->
      <navbar></navbar>
      <!-- 右侧第二层的标签显示列表 -->
      <tags-view></tags-view>
      <!-- 右侧的页面内容主体显示内容 -->
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      //该事件是点击遮罩层之后隐藏对应的菜单列表
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
