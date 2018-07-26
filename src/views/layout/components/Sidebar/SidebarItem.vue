<template>
  <!-- 首先判定当前的路由菜单是否有传入hidden: true的参数 如果有那么久不显示该参数 -->
  <div v-if="!item.hidden&&item.children"
       class="menu-wrapper">
    <!-- 即现在生成显示的是只有一个菜单的菜单渲染方式 -->
    <!-- 首先判定当前的路由菜单是否只有一个显示的子路由菜单 且当前的唯一的子菜单不能有子菜单项 并且当前的子菜单必须有带入alwaysShow参数 -->
      <router-link v-if="hasOneShowingChild(item.children) && !onlyOneChild.children&&!item.alwaysShow" :to="resolvePath(onlyOneChild.path)">
        <!-- 将element-ui的index属性指定为当前唯一的子菜单的path项 -->
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <!-- 读取子菜单对应的icon项生成对应的图标 如果没有传入那么将不会生成 -->
          <svg-icon v-if="onlyOneChild.meta&&onlyOneChild.meta.icon" :icon-class="onlyOneChild.meta.icon"></svg-icon>
          <!-- 显示的对应文字内容就是在路由菜单中定义的title选项 -->
          <span v-if="onlyOneChild.meta&&onlyOneChild.meta.title" slot="title">{{generateTitle(onlyOneChild.meta.title)}}</span>
        </el-menu-item>
      </router-link>

    <!-- 如果不符合生成一个菜单的选项那么就将生成多个带子菜单的选项 -->
      <el-submenu v-else :index="item.name||item.path">
        <template slot="title">
          <!-- 同理 生成对应的图标项 -->
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <!-- 通过读取翻译插件对象中的对应的属性值获取到对应的显示标题 -->
          <span v-if="item.meta&&item.meta.title" slot="title">{{generateTitle(item.meta.title)}}</span>
        </template>

        <!-- 生成对应的子菜单项目 -->
        <template v-for="child in item.children" v-if="!child.hidden">
          <!-- 如果对应的子菜单还有对应的children 即多层路由嵌套 那么就再调用对应的sidebar-item调用 -->
          <!-- 并将对应的当前路由进行拼接后作为base-path传入 -->
          <sidebar-item :is-nest="true"
                        class="nest-menu"
                        v-if="child.children&&child.children.length>0"
                        :item="child"
                        :key="child.path"
                        :base-path="resolvePath(child.path)"></sidebar-item>

          <!-- 如果当前的子菜单没有对应的子菜单了 即当前的子菜单不存在对应的路由嵌套 -->
          <router-link v-else :to="resolvePath(child.path)" :key="child.name">
            <!-- 那么就直接引用对应的element-ui中的对应子菜单的组件生成对应的菜单项 -->
            <el-menu-item :index="resolvePath(child.path)">
              <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
              <span v-if="child.meta&&child.meta.title" slot="title">{{generateTitle(child.meta.title)}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

  </div>
</template>

<script>
import path from 'path'
import { generateTitle } from '@/utils/i18n'

export default {
  name: 'SidebarItem',
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    //定义判定指定路由菜单中是否只有一个可显示的子菜单
    hasOneShowingChild(children) {
      //对传入的对应子菜单的数组调用filter函数
      const showingChildren = children.filter(item => {
        //如果该子菜单中有传入对应的hidden参数
        if (item.hidden) {
          //那么就返回false 即当前的子菜单不能被算做有效的子菜单
          return false
        } else {
          //如果没有hidden参数
          // temp set(will be used if only has one showing child )
          //那么将当前data对象中的变量onlyOneChild 保存改子菜单
          this.onlyOneChild = item
          //并将该子菜单成功推入了过滤之后的新数组中
          return true
        }
      })
      //判定当前的新数组中是否只有一个有效的子菜单
      if (showingChildren.length === 1) {
        //如果是只有一个 那么就返回true
        return true
      }
      //如果不是只有一个那么就返回false
      return false
    },
    resolvePath(...paths) {
      //即定义当前菜单的跳转路由的地址
      //通过当前父菜单的路由在通过拼接上子菜单的路由地址并返回
      return path.resolve(this.basePath, ...paths)
    },
    generateTitle
  }
}
</script>

