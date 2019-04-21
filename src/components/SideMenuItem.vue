<template>
  <!-- 菜单项组件，递归遍历出嵌套菜单 -->
  <el-submenu :name="parentItem.name" :index="parentItem.path" >
    <template slot="title" >
      <i :class="parentItem.meta.icon"></i>
      <span style="margin-left: 10px;">{{parentItem.meta.title}}</span>
    </template>
    <template v-for="item in parentItem.children">
      <template v-if="item.children && item.children.length !== 0" >
        <side-menu-item :key="`menu-${item.name}`" :parent-item="item" :base-path="getPath(item.path)" class="sub-menu-inside" ></side-menu-item>
      </template>
      <template v-else >
        <el-menu-item :index="getPath(item.path)" :key="`menu-${item.name}`" class="menu-items">
          <i :class="item.meta.icon"></i>
          <span style="margin-left: 10px;">{{item.meta.title}}</span>
        </el-menu-item>
      </template>
    </template>
  </el-submenu>

</template>
  
<script>
export default {
  name: 'side-menu-item',
  props: {
    parentItem: {
      type: Object,
      default: () => {}
    },
    parentName: {
      type: String,
      default: ''
    },
    parentTitle: {
      type: String,
      default: ''
    },
    isCollapsed: {
      //是否折叠
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
      //active: this.$route.path,
    }
  },
  methods:{
    getPath(path) {
      //获取uri路径，index属性中使用
      let pattern = /^\//
      if (pattern.test(path)) {
        //path以/开头，是绝对路径，直接返回
        return path;
      } else {
        //相对路径，需要拼接
        return this.basePath + '/' + path
      }
    },
    
  }
}
</script>

<sytle lang="less">
//优化el-menu样式，设置内部子菜单项背景颜色和悬停颜色
.menu-items  {
  background-color: #1f2d3d !important;
  &:hover {
    background-color: #001528 !important;
  }
}
.sub-menu-inside {
  & .el-submenu__title {
    background-color: #1f2d3d !important;
    &:hover {
      background-color: #001528 !important;
    }
  }
}
</sytle>