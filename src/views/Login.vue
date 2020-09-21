<template>
<div class="login-container">
  <Form ref="loginForm" class="login-form" :model="formObj" :rules="loginRules">
    <div class="title-container">
      <h3 class="title">{{title}}</h3>
    </div>
    <FormItem prop="username">
      <Input v-model="formObj.username" size="large" placeholder="用户名：admin">
      <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" size="large" v-model="formObj.password" @keyup.enter.native="handleLogin" placeholder="密码：any">
      <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <Button :loading="loading" size="large" class="submit-btn" type="primary" @click="handleLogin">{{loading ? '登录中' : '登录'}}</Button>
  </Form>
</div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex';
const validateUsername = (rule, value, vCallback) => {
  if (!value) {
    vCallback('请输入正确的用户名')
  } else {
    vCallback();
  }
};
const validatePassword = (rule, value, vCallback) => {
  if (value.length < 6) {
    vCallback('密码不能少于6个字符')
  } else {
    vCallback()
  }
};
export default {
  name: 'Login',
  data () {
    return {
      title: 'vue-base-frame',
      formObj: {
        username: 'admin',
        password: '1234567'
      },
      loading: false,
      loginRules: {
        username: [{
          required: true,
          validator: validateUsername
        }],
        password: [{
          required: true,
          validator: validatePassword
        }]
      }
    };
  },
  computed: {
    ...mapGetters(['transformedRoutes'])
  },
  methods: {
    ...mapActions(['login', 'generateRoutes']),
    handleLogin () {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.loading = true;
          try {
            const res = await this.login(this.formObj);
            console.log(res);
            if (res.code === 0 || res.code === 200) {
              await this.generateRoutes(); // 获取菜单列表
              this.loading = false;
              console.log(this.transformedRoutes);
              if (this.transformedRoutes && this.transformedRoutes.length > 0) {
                const {
                  code,
                  path
                } = this.transformedRoutes[0];
                this.$router.push({
                  path: this.redirect || path,
                  query: this.otherQuery || {
                    code
                  }
                })
              }
            } else {
              this.loading = false;
              this.$message.error('获取菜单失败...');
            }
          } catch (err) {
            this.loading = false;
          }
        }
      });
    },
    getOtherQuery (query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur];
        }
        return acc;
      }, {})
    }
  },
  watch: {
    $route: {
      handler (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect; // 获取上次界面路径
          this.otherQuery = this.getOtherQuery(query); // 获取额外参数
        }
      },
      immediate: true
    }
  },
  created () {
    console.log(11111)
  }
};
</script>

<style lang="scss">
.login-container {
  .el-form-item {
    position: relative;
  }

  .el-input {
    input {
      padding-left: 8%;
    }
  }
}
</style><style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .login-form {
    width: 368px;
    margin: 0 auto;
    margin-top: 80px;

    .icon {
      color: rgba(0, 0, 0, 0.65);
      position: absolute;
      left: 10px;
      z-index: 10;
      top: 50%;
      transform: translateY(-50%);
    }

    .submit-btn {
      width: 100%;
    }
  }
}
</style>
