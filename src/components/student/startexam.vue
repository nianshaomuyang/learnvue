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
             <el-button type="primary" @click="submit">提交试卷</el-button>
           </div>
         </li>
         <li><i class="iconfont icon-arrLeft icon20"></i></li>
       </ul>
     </div>
     <div class="flexarea">
        <transition name="slider-fade">
        <div class="right">
          <div class="content">

            <el-card v-for="(item,index) in allquestion" :key="index" class="box-card" style="width:800px" shadow="always">
            <div slot="header" class="clearfix">
                <span>{{item.problem}}</span>
            </div>
                <el-radio-group type="vertical" align="left" v-model="radioArray[index]" @change="getAnswer(index)" >
                <el-radio :label="1" @change="getchoice">{{item.answerA}}</el-radio>
                <el-radio :label="2" @change="getchoice">{{item.answerB}}</el-radio>
                <el-radio :label="3" @change="getchoice">{{item.answerC}}</el-radio>
                <el-radio :label="4" @change="getchoice">{{item.answerD}}</el-radio>
                </el-radio-group>
            </el-card>
          </div>
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
      };
    },
    created(){
      this.getAllExam();
      // this.map[0]=0
    },
    methods:{
      getAllExam(){
        let examCode=this.$route.query.id //获取路由传递过来的试卷编号
        this.username=this.$cookies.get('username') 
        console.log(this.username)
        let  data = {examCode:examCode}
        this.$http.post('exam',data).then(res => {
            this.allquestion=res.data
          }).catch(error => {
        console.log(error)
      })
      },
      getAnswer(id){
        // console.log(id)
        // console.log(this.val)
        // this.map.set(id,this.val)
        this.map[id]=this.val
        console.log(this.map)
      },
      getchoice(val){
        this.val=val
        // console.log(val)
      },
      submit(){
        let examCode=this.$route.query.id 
        let  data ={list:JSON.stringify(this.map),examid:examCode,stunumber:this.username}
        this.$http.post('addanswer',data).then(res => {
            this.allquestion=res.data
          }).catch(error => {
        console.log(error)
        })
        this.$router.push({path: '/myexam'})
      }
  }
  }
</script>


<style lang="less">
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
  background-color: #5188b8 !important;
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
.right .content {
  background-color: #fff;
  margin: 10px;
  margin-left: 20px;
  height: 470px;
}
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
