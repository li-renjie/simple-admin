import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import RouteInfo from './views/RouteInfo.vue'

Vue.use(Router)

/**
 * 自定义的路由元信息（注意配置了meta的路由才会显示到侧边栏）:
 * meta: {
 *   title: 'title',                  显示在侧边栏、面包屑中的名字
 *   icon: 'svg-name',                该页面在侧边栏中显示的图标
 *   hidden: 'true',                  此级路由是否出现在左侧菜单栏和面包屑中，默认为false
 *   role: ['super_admin','admin']    可访问该页面的权限数组，默认为空，所有用户可访问
 * }
 */

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登陆',
        hidden: true
      },
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/',
      name: 'root',
      redirect: '/home',
      meta: {
        hidden: true,
      }
      //component: Home
    },
    {
      path: '/main',
      name: 'main',
      meta: {
        hidden: true
      },
      component: Main
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        title: '首页',
        icon: 'el-icon-menu'
      },
      component: Main,
    },
    {
      path: '/sysmanage',
      name: 'sysmanage',
      meta: {
        title: '系统管理',
        icon: 'el-icon-setting',
        role: ['super_admin']
      },
      component: Main,
      children: [
        {
          path: 'user',
          name: 'user',
          meta: {
            title: '用户管理',
            icon: 'el-icon-menu'
          },
          component: () => import('./views/user/UserTable.vue')
        },
        {
          path: 'permission',
          name: 'permission',
          meta: {
            title: '权限管理',
            icon: 'el-icon-menu',
            role: ['super_admin']
          },
          component: RouteInfo
        },
        {
          path: 'role',
          name: 'role',
          meta: {
            title: '角色管理',
            icon: 'el-icon-share',
          },
          component: RouteInfo
        },
      ]
    },
    {
      path: '/test1',
      name: 'test1',
      meta: {
        title: '测试1',
        icon: 'el-icon-star-on',
      },
      component: Main,
      children: [
        {
          path: 'test1-1',
          name: 'test1-1',
          meta: {
            title: '测试1-1',
            icon: 'el-icon-share',
            role: ['admin']
          },
          component: RouteInfo
        },
        {
          path: 'test1-2',
          name: 'test1-2',
          meta: {
            title: '测试1-2',
            icon: 'el-icon-star-on'
          },
          component: RouteInfo
        },
      ]
    },
    {
      path: '/test2',
      name: 'test2',
      meta: {
        title: '测试2',
        icon: 'el-icon-star-on'
      },
      component: Main,
      children: [
        {
          path: 'test2-1',
          name: 'test2-1',
          meta: {
            title: '测试2-1',
            icon: 'el-icon-phone'
          },
          component: RouteInfo
        },
        {
          path: 'test2-2',
          name: 'test2-2',
          meta: {
            title: '测试2-2',
            icon: 'el-icon-star-on'
          },
          component: RouteInfo,
          children: [
            {
              path: 'test2-2-1',
              name: 'test2-2-1',
              meta: {
                title: '测试2-2-1',
                icon: 'el-icon-phone'
              },
              component: RouteInfo
            },
            {
              path: 'test2-2-2',
              name: 'test2-2-2',
              meta: {
                title: '测试2-2-2',
                icon: 'el-icon-star-on'
              },
              component: RouteInfo
            }
          ]
        },
      ]
    },
    {
      path: '/401',
      name: 'error_401',
      meta: {
        hidden: true
      },
      component: () => import('./views/401.vue')
    },
    {
      path: '*',   //未匹配到的路径，返回404页面
      name: 'error_404',
      meta: {
        hidden: true
      },
      component: () => import('./views/404.vue')
    }
  ]
})
