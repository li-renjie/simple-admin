<template>
  <div class="bread-crumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item v-for="item in this.$route.matched" :key="item.path">{{ item.meta.title }} </el-breadcrumb-item> -->
      <el-breadcrumb-item v-for="item in getBreadCrumbList()" :key="item.path" :to="item.to">{{ item.meta.title }} </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'bread-crumb',
  props: {
    //
  },
  data() {
    return {
      //
    }
  },
  methods: {
    getBreadCrumbList() {
      let res = []
      let matched = this.$route.matched
      matched.forEach( (item) => {
        //let meta = item.meta
        if (item.meta.title && typeof item.meta.title === 'function') {
          //$route.matched.meta.title是函数对象，需要处理
          item.meta.title = item.meta.title(this.$route)    //
        }
        let obj = {
          name: item.name,
          path: item.path,
          meta: item.meta
        }
        res.push(obj)
      })
      let homeItem = {
        name: 'home',
        path: '/home',
        to: '/home',
        meta: { title: '首页' }
      }
      if (matched.some(item => item.name === homeItem.name)) {
        return res    //matched中已经有home，直接返回
      } else {
        res = [ homeItem ].concat(res)
        return res
      }
    },
    
  }
}
</script>

<sytle>

</sytle>