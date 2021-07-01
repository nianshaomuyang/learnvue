<template>

<el-container style="height: 100vh">
  <!--头部布局-->
    <div>
      <el-button class="right" @click="logout">安全退出</el-button>
    </div>
  <el-aside style="height: 100vh width:200px">

    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b" style="height: 100%">
      <h5>在线阅卷系统</h5>
      <el-menu-item index="/test">
        <i class="el-icon-menu"></i>
        <span slot="title">开始批阅</span>
      </el-menu-item>
      <el-menu-item index="/examresult">
        <i class="el-icon-document"></i>
        <span slot="title" >考试结果</span>
      </el-menu-item>
      <el-menu-item  index="/questionmanage">
        <i class="el-icon-mobile-phone"></i>
        <span slot="title" >题库管理</span>
      </el-menu-item>
      <el-menu-item  index="/exammanage">
        <i class="el-icon-setting"></i>
        <span slot="title" >试卷管理</span>
      </el-menu-item>
      <el-menu-item  index="/chatt">
        <i class="el-icon-setting"></i>
        <span slot="title" >聊天室</span>
      </el-menu-item>
    </el-menu>
    
    </el-aside>
    <!--路由区域-->
    <el-main>
			<router-view/>
	  </el-main>
 </el-container>
</template>
<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    }
  }
</script>

<style lang="less" scoped>

  html{
    height: 100%;

  }
  h5{
    color: aliceblue;
  }
  .right{
    position:absolute;
    top:20px;
    right: 50px;
    background-color: rgb(156, 183, 233);
  }
  
</style>