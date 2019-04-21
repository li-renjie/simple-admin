<template>
  <div class="login-container">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="50px" class="loginForm">
      <h3 class="title">系统登录</h3>
      <el-form-item label="账号" prop="account">
        <el-input type="text" v-model="loginForm.account" autocomplete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="loginForm.pass" autocomplete="off" placeholder="密码" @keyup.enter.native="handleSubmit"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked"  class="remember">记住密码</el-checkbox>
      <!-- <a class="" style="float:right; margin-right:15px; font-size:80%" href="">忘记密码</a> -->
      <span style="margin-left:30px; color:#F00" v-show="isFailed">登陆失败！</span>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        account: "super_admin",
        pass: "123456"
      },
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      },
      checked: false,
      logining: false,
      isFailed: false
    }
  },
  methods: {
    handleSubmit(){
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.logining = true;
          let loginParams = {
            username: this.loginForm.account,
            password: this.loginForm.pass
          };
          this.$store.dispatch('handleLogin',loginParams).then(res => {
            this.$store.dispatch('handleUserInfo').then( res => {
              this.logining = false;
              this.$router.push('/')    //登陆、获取用户信息成功后跳转至首页
            }).catch(err => {
              this.isFailed = true
              this.logining = false;
              console.log(err)
            })
          }).catch( err => {
            this.isFailed = true
            this.logining = false;
            console.log(err)
          })
        }
      })
    }

  }
}

</script>

<style lang="less">
  .login-container {
    text-align: left;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 30px #cac6c6;
    .title {
      margin: 0px auto 30px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 20px 0px;
      padding: 0px 0px 0px 50px;
      /* right: 85px; */
    }
  }
 
</style>
