<template>
  <div class="appp" style="background-color: transparent;">
    <navMenu></navMenu>
    <bannerCard></bannerCard>
    <segmenttation :segmentText = 'segmenttation_1'></segmenttation>

    <el-row style="margin: 20px 145px;display: block">
      <shopClass v-for="(shopClassUrl,index) of shopClassUrls" :shopClassImgUrl="shopClassUrl" :key = 'index'></shopClass>
    </el-row>

    <segmenttation :segmentText = 'segmenttation_2'></segmenttation>

    <el-row style="margin: 20px 145px;display: block">
      <shopClass v-for="(shopClassUrl,index) of shizhanShopClassUrls" :shopClassImgUrl="shopClassUrl" :key = 'index'></shopClass>
      <shopClass v-for="(shopClassUrl,index) of shizhanShopClassUrls2" :shopClassImgUrl="shopClassUrl" :key = 'index'></shopClass>
    </el-row>

    <!-- <div class="block">
      <span class="demonstration">{{valueLenth}}%</span>
      <el-slider v-model="valueLenth"></el-slider>
    </div>

    <el-row :gutter="20">
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <el-input v-model="inputText" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-button type="primary" @click='add'>添加</el-button>
          <el-button type="success" @click="random(inputText)" >添加诗词</el-button>
        </div>
      </el-col>
      <ul>
        <todoItem   v-for="(item,index) of textList" :key="index" :index="index" :content = "item" @delete = 'delete0' ></todoItem>
      </ul>
    </el-row> -->
  </div>
</template>
<!--'./assets/logo.png'-->
<script>
import todoItem from './imooc/todoList'
import bannerCard from './imooc/bannerCard'
import navMenu from './imooc/navMenu'
import segmenttation from './imooc/segmentation'
import shopClass from './imooc/shopClass'
import axios from 'axios'

export default {
//   name: 'App',
  components: { todoItem, bannerCard, navMenu, segmenttation, shopClass },
  data: function () {
    return {
      segmenttation_1: '新 / 手 / 课 / 程',
      segmenttation_2: '实 / 战 / 推 / 荐',
      valueLenth: 50,
      inputText: '',
      textList: [],
      shopClassUrls: ['https://webimg.quanjing.com/Recommend/1617212177739.jpg',
        'https://webimg.quanjing.com/Recommend/1617212177739.jpg', 'https://webimg.quanjing.com/Recommend/1617212177739.jpg',
        'https://webimg.quanjing.com/Recommend/1617212177739.jpg'],
      shizhanShopClassUrls: ['http://www.news.cn/photo/titlepic/112733/1127332090_1618449118376_title0h.jpg', 'http://www.news.cn/photo/titlepic/112733/1127332090_1618449118376_title0h.jpg',
        'http://www.news.cn/photo/titlepic/112733/1127332090_1618449118376_title0h.jpg', 'http://www.news.cn/photo/titlepic/112733/1127332090_1618449118376_title0h.jpg'],
      shizhanShopClassUrls2: ['https://webimg.quanjing.com/Recommend/1617212177739.jpg', 'https://webimg.quanjing.com/Recommend/1617212177739.jpg',
        'https://webimg.quanjing.com/Recommend/1617212177739.jpg', 'https://webimg.quanjing.com/Recommend/1617212177739.jpg']
    }
  },
  methods: {
    add: function () {
      this.textList.push(this.inputText)
      this.inputText = ''
    },
    random: function () {
      var _this = this
      axios.get('https://v1.hitokoto.cn')
        .then(function (response) {
            console.log(response)
          _this.inputText = response.hitokoto
        })
        .catch(function (error) {
          console.log(error)
          alert(error)
        })
    },
    delete0: function (index) {
      this.textList.splice(index, 1)
    }
  }
}
</script>

<style>
  .appp {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    /*color: #ff0e11;*/
    background-color: #ffffff;
    height: 100%;
    /*margin-top: 60px;*/
  }

  body{
    /*padding: 0px;*/
    margin: 0px;
  }
  .elbutton{
    background-color:#2a333b;
    margin-top: 10px;
    width: 200px;
    border-radius: 0px;
  }
  /*.el-container{*/
    /*margin-top: 100px;*/
  /*}*/
  .box-card{
    /*padding-top: 0px;*/
    /*margin-top: 0px;*/
    width: 80%;
    /*上下，左右*/
    margin: 10px 145px;
    padding: 0px 0px;
  }

</style>
