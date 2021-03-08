<template>
  <div style='height: 100vh;' class='login-page'>
    <YX-header />
    <el-main class='flex1 flex row nowrap ai-center jc-center'>
      <!-- 登录 -->
      <template>
        <div class='w1200 flex row nowrap ai-stretch jc-between' key='login'>
          <div class='flex2 img'>
          </div>
          <div class='flex1' style='padding: 40px; border: 1px solid #D2D2D2;'>
            <h2>极客大学</h2>
            <div class='tab-group'>
              <div class='tab'>密码登录</div>
            </div>
            <div>
              <el-form :model="loginForm1" ref="loginForm1">
                <el-form-item prop="username">
                  <el-input type="text" placeholder='请输入用户名' size="large" :maxlength='11' v-model="loginForm1.username" :validate-event="!!loginForm1.username" />
                </el-form-item>
                <el-form-item prop="password">
                  <el-input v-model="loginForm1.password" type="password" style="position: fixed; bottom: -9999px; display: none;"></el-input>
                  <el-input type="password" placeholder='请输入登录密码' size="large" @input='loginForm1.password = $event.replace(/[\u4e00-\u9fa5]/g,"")' v-model="loginForm1.password" autocomplete="off" :validate-event="!!loginForm1.password"
                    @keyup.enter.native='toLoginByPassword'></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" style='width: 100%; margin-top: 32px;' size="large" @click.native.prevent='toLoginByPassword'>登录</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div>
            <div>
              <span>教研组：</span>
              <span>admin: admin</span>
            </div>
            <div>
              <span>班主任：</span>
              <span>teacher: teacher</span>
            </div>
            <div>
              <span>助教：</span>
              <span>assistant: assistant</span>
            </div>
            <div>
              <span>审核员：</span>
              <span>reviewer: reviewer</span>
            </div>
            <div>
              <span>学员：</span>
              <span>student: student</span>
            </div>
          </div>
        </div>
      </template>
    </el-main>
  </div>
</template>
<script>
import { mapActions, } from 'vuex';
import API from '@/utils/api';

export default {
  name: 'login',
  data() {
    return {
      loginForm1: { username: ``, password: ``, },
    };
  },
  methods: {
    ...mapActions({
      toLogin: `toLogin`,
    }),

    async toLoginByPassword() {
      const { username, password, } = this.loginForm1;
      this.$refs['loginForm1'].validate(async (valid) => {
        if (valid) {
          const res = await this.$axios({ method: 'POST', url: API.toLogin, data: { username: username, loginType: 0, password: this.$md5(password), }, });
          if (res && res.status === 200 && res.data && res.data.code === 0) {
            this.toLogin(res.data.data);
          } else {
            this.$message({ messgage: res.data.message, type: 'error', duration: 700, });
          }
        }
      });
    },
  },
}
</script>