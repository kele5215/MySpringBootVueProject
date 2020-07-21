<template>
  <div class="login">
    <el-card>
      <h2>Login</h2>
      <!-- 当一个 form 元素中只有一个输入框时，在该输入框中按下回车应提交该表单。如果希望阻止这一默认行为，可以在 <el-form> 标签上添加 -->
      <el-form
        class="login-form"
        :model="loginForm"
        :rules="rules"
        ref="form"
        @submit.native.prevent="login"
      >
        <!-- 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="Username"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="Password"
            type="password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            class="login-button"
            type="primary"
            native-type="submit"
            block
            >Login</el-button
          >
        </el-form-item>
        <a class="forgot-password" href="https://oxfordinformatics.com/"
          >Forgot password ?</a
        >
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      validCredentials: {
        username: 'admin',
        password: '123456'
      },
      loginForm: {
        username: '',
        password: ''
      },
      loading: false,
      rules: {
        username: [
          {
            required: true,
            message: 'Username is required',
            trigger: 'blur'
          },
          {
            min: 4,
            message: 'Username length should be at least 5 characters',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: 'Password is required', trigger: 'blur' },
          {
            min: 5,
            message: 'Password length should be at least 5 characters',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    simulateLogin () {
      return new Promise(resolve => {
        setTimeout(resolve, 800);
      });
    },
    async login () {
      const valid = await this.$refs.form.validate();
      if (!valid) {
        return;
      }
      this.loading = true;
      await this.simulateLogin();
      this.loading = false;
      if (
        this.loginForm.username !== '' &&
        this.loginForm.password !== ''
      ) {
        this.$message.success('Login successfull');
        this._login()
      } else {
        this.$message.error('Username or password is invalid');
      }
    },
    _login () {
      this.$store
        .dispatch('user/_login', this.loginForm)
        .then(res => {
          console.log(res.data);
          if (res.data.code !== 200) {
            // this.refresh()
            this.$router.push({
              path: '/error',
              query: { message: res.data.message }
            });
          } else {
            this.$router.push(this.$route.query.redirect)
            // if (this.notifyObj) {
            //   this.notifyObj.close()
            // }
            // this.notifyObj = null
          }
        })
        .catch(error => {
          // this.refresh()
          this.$message.error(error.message)
        })
    },

    handleLogin () {
      this.loading = true;
      this.$store
        .dispatch('user/_login', this.loginForm)
        .then(response => {
          console.log(response);
          this.loading = false;
          const code = response.data.code;
          if (code === 200) {
            this.$router.push({
              path: '/success',
              query: { data: response.data.data }
            });
          } else {
            this.$router.push({
              path: '/error',
              query: { message: response.data.message }
            });
          }
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-button {
  width: 100%;
  margin-top: 40px;
}
.login-form {
  width: 290px;
}
.forgot-password {
  margin-top: 10px;
}
</style>
<style lang="scss">
$teal: rgb(0, 124, 137);
.el-button--primary {
  background: $teal;
  border-color: $teal;

  &:hover,
  &.active,
  &:focus {
    background: lighten($teal, 7);
    border-color: lighten($teal, 7);
  }
}
.login .el-input__inner:hover {
  border-color: $teal;
}
.login .el-input__prefix {
  background: rgb(238, 237, 234);
  left: 0;
  height: calc(100% - 2px);
  left: 1px;
  top: 1px;
  border-radius: 3px;
  .el-input__icon {
    width: 30px;
  }
}
.login .el-input input {
  padding-left: 35px;
}
.login .el-card {
  padding-top: 0;
  padding-bottom: 30px;
}
h2 {
  font-family: "Open Sans";
  letter-spacing: 1px;
  font-family: Roboto, sans-serif;
  padding-bottom: 20px;
}
a {
  color: $teal;
  text-decoration: none;
  &:hover,
  &:active,
  &:focus {
    color: lighten($teal, 7);
  }
}
.login .el-card {
  width: 340px;
  display: flex;
  justify-content: center;
}
</style>
