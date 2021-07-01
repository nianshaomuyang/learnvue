<template>

  <el-carousel :interval="4000" type="card" height="800px" width="700px" autoplay="">
    <!-- <el-carousel-item v-for="item in 6" :key="item">
      <h3 class="medium">{{ item }}</h3>
    </el-carousel-item> -->
    <el-carousel-item style="width:600px;padding:20px"  align="center">
       <div style="width:480px"> 
        <template style="width:480px">
            <el-table
                align="center"
                :data="tableData"
                stripe
                height="700px"
                :row-style="{height:'20px'}"
                :cell-style="{padding:'20px'}"
                style="font-size: 10px"
                >
                <el-table-column
                prop="name"
                label="姓名"
                width="200">
                </el-table-column>
                <el-table-column
                prop="grade"
                label="成绩"
                width="280">
                </el-table-column>
            </el-table>
        </template>
       </div>  
    </el-carousel-item>
    <el-carousel-item >
      <div
              id="zhuzhuangtu"
              style="width: 600px; height: 400px;padding:50px"
            ></div>
    </el-carousel-item>
    <el-carousel-item >
      <h3 class="medium">r5uh</h3>
    </el-carousel-item>
    <el-carousel-item >
      <h3 class="medium">4634</h3>
    </el-carousel-item>
    <el-carousel-item >
      <h3 class="medium">j5h6uh</h3>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import echarts from "echarts";
  export default {
    data() {
      return {
        tableData: [{
          grade: '92',
          name: '王小虎',
        }, {
          grade: '82',
          name: '王一',
        }, {
          grade: '72',
          name: '王二',
        }, {
          grade: '62',
          name: '王三',
        }]
      }
    },
    name: "Dashboard",
    mounted() {
    var myChart = echarts.init(document.getElementById("zhuzhuangtu"));
    var option = {
      title: {
        text: "班级成绩",
      },
      tooltip: {},
      legend: {
        data: ["人数"],
      },
      xAxis: {
        data: ["不及格", "60分以上", "70分以上", "80分以上", "90分以上"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    };
    myChart.setOption(option);
  },
  }
</script>

<style>

    .form{
        height: 600px;
        text-align: center;
        
    }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    /*设置table的背景色*/
    .el-table, .el-table__expanded-cell {background-color: transparent !important;}
    .el-table th, .el-table tr, .el-table td {background-color: transparent !important;}

    /* 去掉中间数据的分割线 */
    .el-table__row>td{border: none;}
    /* 去掉上面的线 */
    .el-table th.is-leaf{border: none;}
    /* 去掉最下面的那一条线 */
    .el-table::before {height: 0px;}
</style>