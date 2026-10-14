<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 style="text-align:center;margin-bottom:20px">工作中台登录</h2>
      <el-form ref="loginFormRef" :model="loginForm" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    login() {
      const accounts = {
        admin: { role: 'admin', permissions: ['user:add', 'user:edit', 'user:delete'] },
        manager: { role: 'manager', permissions: ['user:edit'] },
        viewer: { role: 'viewer', permissions: [] }
      }
      const username = this.loginForm.username.trim()
      const account = accounts[username]
      if (!account || this.loginForm.password !== '123456') {
        this.$message.error('账号或密码错误')
        return
      }
      this.$store.commit('setUserInfo', { username, ...account })
      this.$store.commit('setToken', `${username}-demo-token`)
      this.$message.success('登录成功')
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
}
.login-card {
  width: 420px;
}
</style>
