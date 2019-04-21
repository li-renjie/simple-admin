<template>
  <el-container class="main-container" >
    <!-- 导航菜单-折叠前 -->
    <el-aside  class="side-container" width="250px" v-show="! isCollapsed">
      <side-menu :is-collapsed="false" :menu-list="getMenuList"></side-menu>
    </el-aside>
    <!-- 导航菜单-折叠后 -->
    <div class="side-container-collapsed" v-show="isCollapsed">
      <side-menu :is-collapsed="true" :menu-list="getMenuList"></side-menu>
    </div>
    <el-container>
      <el-header class="header-container">
        <header-bar v-on:change-collapse="handleCollapse"></header-bar>
      </el-header>
      <el-main>
        <bread-crumb class="bread-crumb"></bread-crumb>
          <div class="main"><router-view/></div>
      </el-main>
    </el-container>
  </el-container>
  
</template>
  
<script>
import SideMenu from '@/components/SideMenu'
import HeaderBar from '@/components/HeaderBar'
import BreadCrumb from '@/components/BreadCrumb'
import { getMenuListByRoutes } from '@/utils/permission'

export default {
  name: 'main-component',
  components: {
    SideMenu,
    HeaderBar,
    BreadCrumb
  },
  props: {
    //
  },
  data() {
    return {
      active: this.$route.path,    //当前激活的菜单项
      isCollapsed: false,
      //routes: this.$router.options.routes,    //所有配置的路由
    }
  },
  computed: {
    getMenuList() {
      let roles = this.$store.state.user.role
      let routes = this.$router.options.routes
      return getMenuListByRoutes(routes, roles)
    },
  },
  methods: {
    handleCollapse() {
      //触发折叠菜单栏
      this.isCollapsed = ! this.isCollapsed
    }
  }
}
</script>

<sytle lang="less">
  .main-container {
    height: 100%;
  }
  .header-container {
    line-height: 60px;    //内部元素垂直居中
    border-bottom: solid 1px #e6e6e6;
    box-shadow: 0px 2px 3px #e6e6e6;
    padding-left: 0px !important;
  }
  .side-container {
    height: 100%;
    text-align: left;    //菜单栏文本居左显示
    background-color: #304156;
  }
  .side-container-collapsed {
    height: 100%;
    text-align: left;    //菜单栏文本居左显示
    background-color: #304156;
  }
  .bread-crumb {
    border-bottom: solid 1px #e6e6e6;
    padding-bottom: 15px;
  }
  .right-menu {
    float: right;
  }
  .main {
    margin-top:10px
  }
</sytle>