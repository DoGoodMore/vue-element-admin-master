<template>
  <!-- 左侧的菜单对应组件 -->
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <!-- 内部使用的是element-ui中的menu组件 -->
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <!-- 其内部通过循环调用 sidebar-item 组件生成对应的菜单列表 -->
      <sidebar-item v-for="route in permission_routers"
                    :key="route.name"
                    :item="route"
                    :base-path="route.path"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
