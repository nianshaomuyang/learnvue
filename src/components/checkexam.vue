<!--考生答题界面-->
<template>
  <div id="answer">
      <!--顶部信息栏-->
     <div class="top">
       <ul class="item">
         <li><i class="el-icon-notebook-2" ref="toggle"></i></li>
         <li>在线考试</li>
         <li class="righttop">
           <i class="el-icon-user-solid"></i>
           <div class="msg">
             <p>姓名：{{username}}</p>
             <!-- <p>班级:  vjrifh</p> -->
           </div>
         </li>
         <li><i class="iconfont icon-arrLeft icon20"></i></li>
       </ul>
     </div>
     <div class="flexarea">
        <transition name="slider-fade">
        <div class="right">
          <!-- <div class="content"> -->

            <el-card v-for="(item,index) in answer" :key="index" class="box-card" style="width:800px" shadow="always">
            <div slot="header" class="clearfix">
                <span>{{allquestion[item.index].problem}}</span>
            </div>
                <el-radio-group type="vertical" align="center">
                <el-radio :label="1" >{{allquestion[item.index].answerA}}</el-radio>
                <el-radio  :label="2" >{{allquestion[item.index].answerB}}</el-radio>
                <el-radio  :label="3" >{{allquestion[item.index].answerC}}</el-radio>
                <el-radio  :label="4" >{{allquestion[item.index].answerD}}</el-radio>
                </el-radio-group>
                <el-divider></el-divider>
                <div >
                  <li>正确答案:{{allquestion[item.index].rightAnswer}}</li>
                  <li>你的答案:{{item.val}}</li>

                </div>
                <el-divider></el-divider>
                <div v-if=" item.val == allquestion[item.index].rightAnswer  ">答案正确</div>
                <div v-else>答案错误</div>
                <el-divider></el-divider>
                <div>
                  解析:{{allquestion[item.index].analysis}}
                </div>
            </el-card>
          <!-- </div> -->
        </div>
        </transition>
     </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        
        radio: 0,
        allquestion:[],
        radioArray:[],
        index:0,
        val:0,
        map:[],
        userInfo: { //用户信息
        name: null,
        id: null,
        username:null,
        },
        answer:[],
        grade:0,
      };
    },
    created(){
      this.getAllExam();
      
    },
    mounted() {
        document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
    },
    
    methods:{
     
      getAllExam(){
        let examCode=this.$route.query.id //获取路由传递过来的试卷编号
        let username=this.$route.query.username //获取路由传递过来的试卷编号
        this.username=username
        let  data = {examCode:examCode,username:username}
        this.$http.post('checkexam',data).then(res => {
            this.allquestion=res.data.question
            this.answer=res.data.answer
            console.log(res)
            let num=0
            for(let i=0;i<this.answer.length;i++){
              // console.log(this.answer[i].val)
              // console.log(this.allquestion[this.answer[i].index].rightAnswer)

              if(this.answer[i].val == this.allquestion[this.answer[i].index].rightAnswer){
                num=num+this.allquestion[this.answer[i].index].score;

                console.log(num)
              }
            }
            this.grade=num
            this.$alert(this.grade, '成绩',{
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `action: ${ action }`
                });
              }
            })
          }).catch(error => {
        console.log(error)
      })
        
      },
       
        
      
    }
  }
</script>


<style lang="less">
// #app{
//     position: relative;
//     width: 100%;
//     height: 100vh;
//     display:flex;
//     justify-content: center;
//     align-items: center;
//     .right{
//         position: absolute;
//         top: 0;
//         left: 0;
//         right:0;
//         bottom: 0;
//         margin: auto;
//     }
// }
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
    margin-bottom:40px;
    
  }

.mark {
  position: absolute;
  width: 4px;
  height: 4px;
  content: "";
  background-color: red;
  border-radius: 50%;
  top: 0px;
  left: 22px;
}
.border {
  position: relative;
  border: 1px solid #FF90AA !important;
}
.bg {
  background-color: #0083f5 !important;
}
.fill .el-input {
  display: inline-flex;
  width: 150px;
  margin-left: 20px;
  .el-input__inner {
    border: 1px solid transparent;
    border-bottom: 1px solid #eee;
    padding-left: 20px;
  }
}
/* slider过渡效果 */
.slider-fade-enter-active {
  transition: all .3s ease;
}
.slider-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slider-fade-enter, .slider-fade-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}


.operation .end li {
    display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 100px;
}
.operation {
  background-color: #fff;
  border-radius: 4px;
  padding: 10px 0px;
  margin-right: 10px;
}
.operation .end {
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(39, 118, 223);
}
.content .number {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  background-color: rgb(39, 118, 223);
  border-radius: 4px;
  margin-right: 4px;
}
.content {
  padding: 20px 20px;
  padding-top:20px;
  padding-bottom:20px
  
}
.content .topic {
  padding: 20px 0px;
  padding-top: 30px; 
}
// .right  {
//   text-align: center;
  
// }
.content .el-radio-group label {
  color: #000;
  margin: 5px 0px;
}
.content .el-radio-group {
  display: flex;
  flex-direction:column;
}
.right .title p {
  margin-left: 20px;
}
.flexarea {
  display: flex;
}
.flexarea .right {
  flex: 1;
}
.auto-right {
  margin-left: auto;
  color: #2776df;
  margin-right: 10px;
}
.right .title {
  margin-right: 10px;
  padding-right: 30px;
  display: flex;
  margin-top: 10px;
  background-color: #fff;
  height: 50px;
  line-height: 50px;
}
.clearfix {
  clear: both;
}

#answer .top {
  background-color: rgb(39, 118, 223);
}
#answer .item {
  color: #fff;
  display: flex;
  padding: 20px;
  font-size: 20px;
}
#answer .top .item li:nth-child(1) {
  margin-right: 10px;
}
#answer .top .item li:nth-child(3) {
  position: relative;
  margin-left: auto;
}
#answer {
  padding-bottom: 30px;
}
.icon20 {
  font-size: 20px;
  font-weight: bold;
}
.item .msg {
  
  padding: 10px 15px;
  border-radius: 4px;
  top: 47px;
  right: -30px;
  color: #6c757d;
  position: absolute;
  border: 1px solid rgba(0,0,0,.15);
  background-color: #fff;
}
.item .msg p {
  font-size: 16px;
  width: 200px;
  text-align: left;
}
.righttop{
  position: relative;
}
</style>
