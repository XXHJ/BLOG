<template>
  <div id="sign_wrap">
    <h1>后台管理</h1>
    <el-input
      v-model="name"
      placeholder="请输入用户名"
    ></el-input>
    <el-input
      v-model="password"
      placeholder="请输入密码"
      type="password"
    ></el-input>
    <el-button @click="signup">注册</el-button>
    <el-button
      type="primary"
      @click="signin"
    >登录</el-button>
  </div>
</template>

<script>
import { login } from '../../api/index'
export default {
  name: 'signin',
  data () {
    return {
      name: '',
      password: '',
      hasName: false // 用户名被占
    }
  },
  mounted: function () {

  },
  methods: {
    signup: function () {
      let _this = this
      if (this.name.length < 6) {
        this.$message.error('用户名不能为空或小于六个字符')
        return
      }

      if (this.password.length < 6) {
        this.$message.error('密码不能为空或小于六个字符')
        return
      }

      login.getUser({ name: this.name }).then(res => {
        if (res.data.name === _this.name) {
          _this.$message.error('该用户已存在')
          _this.name = ''
          // 由于异步，name的改变比正常流执行得慢，所以不能通过判断name去执行是否post
          // 所以我把post移入else中，而不是在外面通过判断name执行
        } else {
          let obj = {
            name: _this.name,
            password: _this.password
          }

          login.signup({
            userInfo: obj
          }).then(res => {
            if (res.status === 200) {
              _this.$message({
                message: '注册成功',
                type: 'success'
              })
            } else {
              console.log('注册失败')
            }
          })
        }
      })
    },
    signin: function () {
      let _this = this
      if (this.name.length < 6) {
        this.$message.error('用户名不能为空或小于六个字符')
        return
      }

      if (this.password.length < 6) {
        this.$message.error('密码不能为空或小于六个字符')
        return
      }

      login.getUser({ name: this.name }).then(res => {
        if (_this.password !== res.data.password) {
          _this.$message.error('用户名或密码不正确')
        } else {
          sessionStorage.setItem('username', res.data.name)
          sessionStorage.setItem('userId', res.data._id)
          let obj = {
            name: _this.name,
            password: _this.password
          }
          login.signin({
            userInfo: obj
          }).then(res => {
            if (res.status === 200) {
              console.log(res)
              _this.$message({
                message: '登录成功',
                type: 'success'
              })
              delete _this.password
              _this.$router.go(-1)
            } else {
              console.log('登录失败')
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
#sign_wrap {
  width: 300px;
  margin: 200px auto;
}

#sign_wrap h1 {
  color: #383a42;
  padding: 10px;
}

#sign_wrap div {
  padding-bottom: 20px;
}
</style>
