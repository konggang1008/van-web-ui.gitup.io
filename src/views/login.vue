<template>
  <div class="login-container">
    <div class="login-form">
      <el-form size="medium" :model="loginForm" :rules="loginFormRules" ref="loginForm">
        <el-form-item prop="enterprise">
          <el-input type="text" v-model.trim="loginForm.enterprise" placeholder="请输入企业"
            prefix-icon="iconfont icon-qiyeyuanquwuye">
          </el-input>
        </el-form-item>
        <el-form-item prop="mailbox">
          <el-input type="text" v-model.trim="loginForm.mailbox" placeholder="请输入邮箱"
            prefix-icon="iconfont icon-youxiang">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model.trim="loginForm.password" :type="isPassword ? 'text' : 'password'" placeholder="请输入密码"
            prefix-icon="iconfont icon-mima">
            <i slot="suffix" @click="isPassword = !isPassword" :class="
                isPassword ? 'iconfont icon-kejian' : 'iconfont icon-biyanjing'
              "></i>
          </el-input>

        </el-form-item>
        <el-form-item prop="captcha" class="login-certificate">
          <el-input type="text" class="inputCheckCode" v-model.trim="loginForm.captcha" placeholder="请输入验证码"
            prefix-icon="el-icon-search" @keyup.enter.native="login('loginForm')">
          </el-input>
          <img @click="refreshCaptchaImg" class="captchaImg" :src="captchaImg" alt="" />
        </el-form-item>
        <el-form-item>
          <el-button class="login-submit" @click.prevent="login('loginForm')" type="primary">
            登&nbsp;录&nbsp;控&nbsp;制&nbsp;台</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Api from "@/Api/apis";
export default {
  data () {
    return {
        loginForm: {
        enterprise: 'labs',
        mailbox: 'labs@aivanlink.com',
        password: 'Vdm@labs999',
        captcha: ''
      },
      // 登录验证
      loginFormRules: {
        enterprise: [
          { required: true, message: '请输入企业', trigger: 'blur' },
        ],
        mailbox: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            validator: function (rule, value, callback) {
              if (
                /^\w+@([\da-z.-]+)\.([a-z]+|[\u2E80-\u9FFF]+)$/.test(value) ==
                false
              ) {
                callback(new Error('请输入正确的邮箱格式'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            validator: function (rule, value, callback) {
              if (
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_.])[A-Za-z\d$@$!%*?&]{8,}/.test(
                  value
                ) == false
              ) {
                callback(
                  new Error('请输入8位以上包含数字大小写字母特殊字符的密码')
                )
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
        captcha: [{ required: true, message: '验证码', trigger: 'blur' }],
      },
      isPassword: false,
      captchaImg: '',
    }
  },
  methods: {
    // 获取验证码
    getCaptchaImg () {
      this.uuid = this.$randomUUID()
      Api.getCaptchaImg({ uuid: this.uuid }).then((res) => {
        this.captchaImg = res.data.data
      })
    },
    // 刷新验证码
    refreshCaptchaImg () {
      this.getCaptchaImg()
    },
    // 登录
    login (loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          const param = {
            captcha: this.loginForm.captcha,
            password: this.loginForm.password,
            username: this.loginForm.enterprise + '\\' + this.loginForm.mailbox,
            uuid: this.uuid,
          }
          Api.postLogin(param).then(
            (res) => {
              if (res.data.code == 200) {
                // 保存token
                this.$store.commit('setAppTokenInfo', res.data.data)
                // 保存用户信息
                this.$store.dispatch('getLoginUserData').then(() => {
                  this.$router.replace({
                    path: this.$route.query.redirect
                      ? this.$route.query.redirect
                      : '/',
                  })
                })
              } else {
                this.getCaptchaImg()
              }
            },
            () => {
              this.getCaptchaImg()
            }
          )
        } else {
          this.getCaptchaImg()
          return false
        }
      })
    },
  },
  mounted () {
    this.getCaptchaImg()
  },
}
</script>
<style lang="scss" scoped>
.login-form {
  z-index: 3;
  position: absolute;
  top: 20%;
  right: 10%;
  width: 300px;
  margin-top: 70px;
  margin-left: 125px;
  .login-certificate {
    .captchaImg {
      width: 100px;
      height: 36px;
      cursor: pointer;
      vertical-align: top;
      margin-left: 14px;
    }
    .inputCheckCode {
      width: 185px;
    }
  }
  .login-submit {
    width: 100%;
  }
}
.title {
  margin-top: 70px;
}
.login-container {
  min-height: 100%;
  width: 100%;

  overflow: hidden;
  background: url("~@/assets/loginBC3.png") no-repeat;
  background-size: 100% 100%;
}

.loginForm {
  float: right;
  margin: 240px 300px 0 0;
}
</style>



