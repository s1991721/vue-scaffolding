<template>
  <div class="login-container">
    <el-form
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="account">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>

        <el-input
          ref="account"
          type="text"
          v-model="loginForm.account"
          placeholder="Account"
          auto-complete="on"
          name="account"
          tabindex="1"
        ></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>

        <el-input
          ref="password"
          :type="passwordType"
          v-model="loginForm.password"
          placeholder="Password"
          autocomplete="on"
          name="password"
          tabindex="2"
          @keyup.enter.native="login"
        ></el-input>

        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="login"
      >Login</el-button>
      <!-- @click.native.prevent 用来阻止默认行为 -->

      <div class="tips">
        <span>tips one</span>
        <span>tips two</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login', //组件名
  data() {
    const validateAccount = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }

    return {
      loginForm: {
        account: '',
        password: ''
      },
      loginRules: {
        account: [
          { required: true, trigger: 'blur', validator: validateAccount }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: 'password'
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        //DOM更新后执行的操作
        this.$refs.password.focus()
      })
    },

    login() {
      this.$refs.loginForm.validate(valid => {
        console.log('开始登陆')

        if (valid) {
          //验证成功执行登录
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false

              console.log('登陆成功')
            })
            .catch(err => {
              this.loading = false
              console.log('登陆失败')
              console.log(err)
            })
        } else {
          console.log('验证失败')
          return false
        }
      })
    }
  }
}
</script>

// 设置一个全局的样式，否则对input不生效
<style lang="scss">
$light_gray: #fff;
$cursor: #fff;

.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      height: 47px; //设置相同高度，否则显示偏上
      color: $light_gray; //文字颜色
      caret-color: $cursor; //光标颜色
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$light_gray: #fff;
$dark_gray: #889aa4;
$cursor: #fff;

.login-container {
  background-color: $bg;
  min-height: 100%;
  width: 100%;

  .title-container {
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .login-form {
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0; //手动设置垂直居中  方向：上右下左
    margin: 0 auto; //横向居中 0代表上下
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer; //鼠标悬停变食指
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    // &符号是scss和less里的语法，代表上一级选择器，实际编译成css就是span
    // :first-of-type 匹配的是该类型的第一个
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
}
</style>
