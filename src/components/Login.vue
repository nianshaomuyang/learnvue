<template>
  <div class="login_container">
    <div class="login_box">

      <!--添加表单-->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        class="login_form"
        label-width="0px"
        
      >
        <el-form-item prop="学号">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icondenglu"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont iconmima" type="password"></el-input>
        </el-form-item>
        <el-form-item >
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      options: [{
        value: '选项1',
        label: '管理员'
      }, {
        value: '选项2',
        label: '教师'
      }, {
        value: '选项3',
        label: '学生'
      }],
      value: '',
      
      loginForm: {
        username: "admin",
        password: "123456"
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 8, message: "长度在 5 到 8 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 8, message: "密码为 6~8 位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        const {data:res}=await this.$http.post("login",this.loginForm)//访问后台
        this.$cookies.set("username",this.loginForm.username)
        if(res.flag=="ok"){
          window.sessionStorage.setItem('flag','ok');
          this.$message.success("登陆成功！");
          this.$router.push({path:"/teachermanage"});
          console.log(res.user);
        }
        else if(res.flag=="studentok"){
          window.sessionStorage.setItem('flag','studentok');
          this.$message.success("登陆成功！");
          this.$router.push({path:"/student"});
          console.log(res.user);
        }
        else if(res.flag=="teacherok"){
          window.sessionStorage.setItem('flag','teacherok');
          this.$message.success("登陆成功！");
          this.$router.push({path:"/teacher"});
          console.log(res.user);
        }
        else{
          this.$message.error("登陆失败！");
        
        }
        console.log(res);
      });
    }
  }
};
</script>

<style lang="less" scoped>

// 跟节点样式
.login_container {
  // background-color: #2b4b6b;
  // height: 100%;
  width: 100%;
  height: 100%;
  background-image: url("../assets/1.jpg");
  background-size: cover;
  background-position: center;
  position: relative;
}
// 登录框
.login_box {
  opacity: 0.6;
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 20px;// 圆角
  position: absolute;// 绝对定位
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);// 根据自己位置 以自己为长度位移
  // 头像框

  .btns {
    display: flex;// 弹性布局
    justify-content: flex-end; // 尾部对齐
  }
  .login_form {
    position: absolute;
    bottom: 0%;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;// 设置边框
    
  }
}
</style>