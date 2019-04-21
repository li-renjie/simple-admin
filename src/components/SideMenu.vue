<template>
  <el-menu class="menu-vertical" router :default-active="active" :collapse="isCollapsed" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
    <div class="logo">
      <span v-show="! isCollapsed">Admin Web</span>
    </div>
    <template v-for="(item,index) in menuList">
      <!-- 有孩子节点就调用递归组件side-menu-item，没有就定义为el-menu-item -->
      <template v-if="! item.children">
        <el-menu-item :index="item.path" :key="`menu-${item.name}`">
          <i :class="item.meta.icon"></i>
          <span style="margin-left: 10px;">{{item.meta.title}}</span>
        </el-menu-item>
      </template>
      <template v-else>
        <side-menu-item :parent-item="item" :base-path="item.path" :key="`menu-${item.name}`"></side-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script>
import SideMenuItem from '@/components/SideMenuItem'

export default {
  name: 'side-menu',
  components: {
    SideMenuItem
  },
  props: {
    menuList: {
      type: Array,
      default() { 
        return []
      }
    },
    isCollapsed: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      //
    }
  },
  computed: {
   active() {
     return this.$route.path    //
   }
  },
  methods:{
    //
  }
}
</script>

<sytle lang="less">
.logo {
  height: 60px;
  background-color: #155e64;
  display: flex;    //使用flex布局
  align-items: center;    //flex布局：内部元素垂直居中
  justify-content: center;    //flex布局：内部元素水平居中
  color:#fff;
  font-size: 30px;
}
.menu-vertical {
  border-right: none !important;    //消除el-menu的右边框
}
</sytle>