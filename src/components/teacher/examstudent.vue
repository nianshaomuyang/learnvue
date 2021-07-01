<template>
<el-card>
  <el-table
    border
    height="500"
    :data="tableData"
    style="width: 50%">
    <!-- <el-table-column
      label="日期"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">2</span>
      </template>
    </el-table-column> -->
    <el-table-column
      label="姓名"
      width="180">
>
    <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row }}</el-tag>
    </template>      
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleReview(scope.row)">批阅</el-button>
      </template>
    </el-table-column>
  </el-table>
</el-card>
</template>

<script>
  export default {
    data() {
      return {
        tableData: []
      }
    },
    created(){
      this.getstudents()

    },
    mounted() {
        document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
    },
    methods: {
      handleReview(row) {
        let courseCode=this.$route.query.courseid //获取路由传递过来的课程编号
        // this.$router.push({path: '/examstudentdatail', query: {courseid: id}})//query传递参数
        console.log(row);
        this.$router.push({path: '/checkexam', query: {id: courseCode,username:row}})//query传递参数
      },
      getstudents(){
        let courseCode=this.$route.query.courseid
        this.$http.post('selectstudent',courseCode).then(res => {
        this.tableData=res.data
        console.log(this.tableData)
      }).catch(error => {
        console.log(error)
      })
      }

    }
  }
</script>
<style>
  
</style>