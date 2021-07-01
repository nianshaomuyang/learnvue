// 我的试卷页面
<template>
  <div id="myExam">
    <div class="wrapper">
        <el-card class="box-card">
      <ul class="top">
        <li class="search-li"><div class="icon"><input type="text" placeholder="科目" class="search" v-model="key"><i class="el-icon-search"></i></div></li>
        <li class="search-li"><div class="icon"><input type="text" placeholder="知识点" class="search" v-model="key"><i class="el-icon-search"></i></div></li>
        <li><el-button type="primary" @click="search()">搜索试卷</el-button></li>
      </ul>
        </el-card>
        <el-card class="box-card" style="overflow:auto">
          
           <div class="add">
             <el-button @click="dialogVisible=true">
                <span class="el-icon-plus"> 新增题目</span>
              </el-button>  
           </div>
          <el-table
    :data="tableData"
    style="width: 100%"
    max-height="380">
    <el-table-column
        prop="subject"
        label="科目"
        width="80">
      </el-table-column>
      <el-table-column
        prop="problem"
        label="题目"
        width="380">
      </el-table-column>
      <el-table-column
        prop="points"
        label="知识点"
        width="80">
      </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="80">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteUser(scope.row.id)"
          type="text"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
            
        </el-card>
     
    </div>
    <!-- 添加用户的对话框 -->
    <div class="dialog">
        <el-dialog
        
            title="添加题目"
            :visible.sync="dialogVisible"
            width="50%"
            @close="addDialogClosed"
           >
            <!-- 内容的主体区域 -->
            
            <el-form ref="addFormRef" :model="addForm"  label-width="70px" >
                <el-form-item label="科目" prop="subject">
                    <el-input v-model="addForm.subject"></el-input>
                </el-form-item>
                <el-form-item label="题目" prop="problem">
                    <el-input v-model="addForm.problem"></el-input>
                </el-form-item>
                <el-form-item label="A选项" prop="answerA">
                    <el-input v-model="addForm.answerA"></el-input>
                </el-form-item>
                <el-form-item label="B选项" prop="answerB">
                    <el-input v-model="addForm.answerB"></el-input>
                </el-form-item>
                <el-form-item label="C选项" prop="answerC">
                    <el-input v-model="addForm.answerC"></el-input>
                </el-form-item>
                <el-form-item label="D选项" prop="answerD">
                    <el-input v-model="addForm.answerD"></el-input>
                </el-form-item>
                <el-form-item label="正确答案" prop="rightAnswer">
                    <el-input v-model="addForm.rightAnswer"></el-input>
                </el-form-item>
                <el-form-item label="答案分析" prop="analysis">
                    <el-input v-model="addForm.analysis"></el-input>
                </el-form-item>
                <el-form-item label="分数" prop="score">
                    <el-input v-model="addForm.score"></el-input>
                </el-form-item>
                <el-form-item label="知识点" prop="points">
                    <el-input v-model="addForm.points"></el-input>
                </el-form-item>
                <el-form-item label="难度" prop="level">
                    <el-input v-model="addForm.level"></el-input>
                </el-form-item>
                
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
        </el-dialog></div>
  </div>
  
</template>

<script>
export default {
  // name: 'myExam'
  data() {
    return {
      addForm: {
        subject: '',
        problem: '',
        answerA: '',
        answerB: '',
        answerC: '',
        answerD: '',
        rightAnswer: '',
        analysis: '',
        score: '',
        points: '',
        level: '',
      },
      dialogVisible:false,
      loading: false,
      key: null, //搜索关键字
      allExam: [], //所有考试信息
      tableData: []
    }
  },
  created() {
    this.getExamInfo()
    this.loading = true
  },
  
mounted() {
        document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
    },
  // watch: {
    
  // },
  methods: {
    // 监听添加用户对话框的关闭事件
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
      load () {
        this.count += 2
      },
    //获取当前所有题目信息
    getExamInfo() {
      this.$http.post('allquestions').then(res => {
        this.tableData=res.data
        console.log(this.tableData)
      }).catch(error => {
        console.log(error)
      })
      
    },
   
     // 点击按钮，添加新用户
    addUser () {
      this.$refs.addFormRef.validate(async valid => {
        // 校验失败
        if (!valid) return
        // 校验成功，可以发起添加用户的网络请求
        const {data: res} = await this.$http.post('addQuestion', this.addForm)
        if (res != "success") {
        return this.$message.error("操作失败！！！");
        }
        this.$message.success("操作成功！！！");
        // 隐藏添加用户的对话框
        this.dialogVisible = false
        // 重新获取用户列表数据
        this.getExamInfo()
      })
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
      const {data:res} = await this.$http.delete("deleteQuestion?id="+id);
      if (res != "success") {
        return this.$message.error("操作失败！！！");
      }
      this.$message.success("操作成功！！！");
      this.getExamInfo();
    },

  }
}
</script>

<style lang="less" scoped>
.dialog{
  height: 300px;
}
.add{
    text-align: left;
}
html{
    background-color: aqua;
}
.text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 900px;
  }
.pagination {
  padding: 20px 0px 30px 0px;
  .el-pagination {
    display: flex;
    justify-content: center;
  }
}
.paper {
  h4 {
    cursor: pointer;
    line-height: 100px;
  }
}
.paper .item a {
  color: #000;
}
.wrapper .top .order {
  cursor: pointer;
}
.wrapper .top .order:hover {
  color: #0195ff;
  border-bottom: 2px solid #0195ff;
}
.wrapper .top .order:visited {
  color: #0195ff;
  border-bottom: 2px solid #0195ff;
}
.item .info i {
  margin-right: 5px;
  color: #0195ff;
}
.item .info span {
  margin-right: 14px;
}
.paper .item {
    background-color: rgb(67, 119, 150);
  width: 380px;
  height: 200px;
  border-radius: 4px;
  padding: 20px 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 4px 2px rgba(217,222,234,0.3);
  transition: all 0.6s ease;
}
.paper .item:hover {
  box-shadow: 0 0 4px 2px rgba(140, 193, 248, 0.45);
  transform: scale(1.03);
}
.paper .item .info {
  font-size: 16px;
  color: #88949b;
}
.paper .item .name {
  font-size: 14px;
  color: #88949b;
}
.paper * {
  margin: 20px 0;
}
.wrapper .paper {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.top .el-icon-search {
  position: absolute;
  right: 10px;
  top: 10px;
}
.top .icon {
  position: relative;
}
.wrapper .top {
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}
#myExam .search-li {
  margin-left: auto;
}
.top .search-li {
  margin-left: auto;
}
.top li {
  display: flex;
  align-items: center;
}
.top .search {
  margin-left: auto;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #eee;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}
.top .search:hover {
  color: #0195ff;
  border-color: #0195ff;
}
.wrapper .top {
  display: flex;
}
.wrapper .top li {
  margin: 20px;
}
#myExam {
  width: 980px;
  margin: 0 auto;
}
#myExam .title {
  margin: 20px;
}
#myExam .wrapper {
  background-color: #f6f6f6;
}
</style>
