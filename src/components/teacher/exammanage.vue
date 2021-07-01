<template>
  <div class="main">
    <div class="top">
    <!-- 卡片视图区 -->
    <el-card>
      <el-row :gutter="25">
        <el-col :span="10">
          <!-- 搜索添加 -->
          <el-input placeholder="请输入搜索内容"  clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加试卷</el-button>
        </el-col>
      </el-row>
    </el-card>
    </div>
    <el-card>
      <!-- 用户列表 -->
      <el-table :data="examlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="考试时间" prop="date"></el-table-column>
        <el-table-column label="试卷标题" prop="testname"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
            <!-- 删除 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 创建新用户对话框 -->
    <el-dialog title="添加试卷" :visible.sync="addDialogVisible" width="80%"
    @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <div class="card">
      <el-card>
      <el-form :model="addForm" 
        ref="addFormRef" label-width="50px">
        <!-- 用户名 -->
        <el-form-item label="标题" prop="testname">
          <el-input v-model="addForm.testname" style="width: 50%"></el-input>
        </el-form-item>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
       <el-form-item label="题目" prop="problem">
          <el-input v-model="addForm.problem"></el-input>
        </el-form-item>
        <el-form-item label="科目" prop="subject">
            <el-input v-model="addForm.subject"></el-input>
        </el-form-item>
        <el-form-item label="知识点" prop="points">
          <el-input v-model="addForm.points"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" >查询</el-button>
        </el-form-item>
        </el-form>
        
      </el-form>
      </el-card>
      </div>
      <div class="card">
        <el-card>
      <!-- 用户列表 -->
      <span>搜索结果</span>
        <el-table :data="questionlist" border stripe>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="题目" prop="problem"></el-table-column>
            <el-table-column label="科目" prop="subject"></el-table-column>
            <el-table-column label="知识点" prop="points"></el-table-column>
            

            <el-table-column label="操作">
            <el-button type="success" icon="el-icon-circle-plus" circle></el-button>
            </el-table-column>
        </el-table>
        </el-card>
      </div>
      <div>
        <el-card>
      <!-- 用户列表 -->
      <span>已选题目</span>
        <el-table :data="questionlist" border stripe>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="题目" prop="problem"></el-table-column>
            <el-table-column label="科目" prop="subject"></el-table-column>
            <el-table-column label="知识点" prop="points"></el-table-column>
            

            <el-table-column label="操作">
            <el-button type="success" icon="el-icon-remove" circle></el-button>
            </el-table-column>
        </el-table>
        </el-card>
      </div>
      <!-- 内容底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog title="修改用户信息" :visible.sync="editDialogVisible" width="50%" @colse="editDialogClosed">
       <el-form :model="editForm"  ref="editFormRef" label-width="70px">
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password"></el-input>
        </el-form-item>
        <!-- 班级 -->
        <el-form-item label="班级" prop="myclass">
          <el-input v-model="editForm.myclass"></el-input>
        </el-form-item>
        <!-- 权限 -->
        <el-form-item label="权限" prop="role">
          <el-input v-model="addForm.role"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      examlist: [],// 用户列表
      formInline:[],
      questionlist:[],
     
      total: 0, // 最大数据记录
      addDialogVisible: false ,// 对话框显示
      // 添加用户表单项
      addForm: {
        username:'',
        password:'',
        myclass:'',
      }, 
      // 控制修改用户对话框显示/隐藏
      editDialogVisible:false,
      // 修改用户信息
      editForm:{},
    };
  },
  created() {
    this.getUserList();
  },
  mounted() {
        document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
    },
  methods: {
    async getUserList() {
      // 调用post请求
      this.$http.post('allpaper').then(res => {
        this.examlist=res.data
        console.log(this.examlist)
      }).catch(error => {
        console.log(error)
      })
    },
    // 修改用户状态
    async userStateChanged(userinfo) {
      const { data: res } = await this.$http.put(
        `userState?id=${userinfo.id}&state=${userinfo.state}`
      );
      if (res != "success") {
        userinfo.state = !userinfo.state;
        return this.$message.error("操作失败！！！");
      }
      this.$message.success("操作成功！！！");
    },
    // 监听添加用户
    addDialogClosed(){
      this.$refs.addFormRef.resetFields();// 重置表单项
    },
    // 添加用户
    addUser(){
        this.$refs.addFormRef.validate(async valid =>{
        console.log(valid);
        if( !valid ) return;
        // 发起请求
        const {data:res} = await this.$http.post("addUser",this.addForm);
        if (res != "success") {
        userinfo.state = !userinfo.state;
        return this.$message.error("操作失败！！！");
        }
        this.$message.success("操作成功！！！");
        //隐藏
        this.addDialogVisible = false;
        this.getUserList();
      })
    },
    // 展示修改框
    async showEditDialog(id){
       
        const {data:res} = await this.$http.get("getUpdate?id="+id);
        // if (res != "success") {
        // userinfo.state = !userinfo.state;
        // return this.$message.error("操作失败！！！");
        // }
        // this.$message.success("操作成功！！！");

        this.editForm = res;
        this.editDialogVisible = true;
    },
    // 关闭窗口
    editDialogClosed(){
      this.$refs.editFormRef.resetFields();
    },
    // 确认修改
    editUserInfo(){
      this.$refs.editFormRef.validate(async valid =>{
        console.log(valid);
        if( !valid ) return;
        // 发起请求
        const {data:res} = await this.$http.put("editUser",this.editForm);
        console.log(res);
         if (res != "success") return this.$message.error("操作失败！！！");
        this.$message.success("操作成功！！！");
        //隐藏
        this.editDialogVisible = false;
        this.getUserList();
      });
    },
    // 删除按钮
    async deleteUser(id){
      // 弹框
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
      // 成功删除为confirm 取消为 cancel
      if(confirmResult!='confirm'){
        return this.$message.info("已取消删除");
      }
      const {data:res} = await this.$http.delete("deleteUser?id="+id);
      if (res != "success") {
        return this.$message.error("操作失败！！！");
      }
      this.$message.success("操作成功！！！");
      this.getUserList();
    },
  }
};
</script>
<style lang="less" scoped>

.main{
  width: 80%;
  text-align: center;
  margin-top: 20px;
  margin-left: 150px;

}
.top{
  margin-bottom: 20px;
}
.card{
      margin-bottom: 20px;
}
</style>