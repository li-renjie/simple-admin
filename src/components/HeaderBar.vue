<template>
  <div >
    <div class="side-trigger" v-on:click.prevent="handleCollapse">
      <!-- <i class="el-icon-menu"></i> -->
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill-rule="evenodd" d="M22,17 L22,19 L2,19 L2,17 L22,17 Z M22,13 L22,15 L2,15 L2,13 L22,13 Z M22,9 L22,11 L2,11 L2,9 L22,9 Z M22,5 L22,7 L2,7 L2,5 L22,5 Z"/>
      </svg>
    </div>
    <div class="right-menu">
      <!-- <span style="margin-right:10px">{{username}}</span> -->
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          {{username}} <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-on:click.native="handleUserCenter">个人中心</el-dropdown-item>
          <el-dropdown-item v-on:click.native="handleLogout">退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header-bar',
  props: {
    //
  },
  data() {
    return {
      username: this.$store.state.user.userName,
    }
  },
  methods:{
    handleCollapse() {
      this.$emit('change-collapse')
    },
    handleUserCenter() {
      alert('handleUserCenter')
    },
    handleLogout() {
      this.$store.dispatch('handleLogout').then(res => {
        this.$router.push('/login')
      })
    }
    
  }
}
</script>

<sytle lang="less">
  .side-trigger {
    width: 40px;
    height: 40px;
    text-align: center;
    font-size: 30px;
    float: left;
    
  }
</sytle>