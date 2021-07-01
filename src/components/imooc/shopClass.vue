<template>

    <el-card :body-style="{ padding: '0px' }" class="elCard"  >
      <img :src="shopClassImgUrl" class="image">
      <div style="padding: 14px;">
        <span>好吃的汉堡</span>
        <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
          <el-button type="text" class="button" @click="gotolink">观看</el-button>
        </div>
      </div>
    </el-card>

</template>

<script>
export default {
  //https://video.shipin520.com/videos/10/34/06/a_UiNcQFdzQJf31593103406.mp4
  name: 'shopClass',
  props: ['shopClassImgUrl'],
  data () {
    return {
      currentDate: new Date()
    }
  },
  methods:{
    gotolink(){

      //点击跳转至上次浏览页面
      // this.$router.go(-1)

      //指定跳转地址
      this.$router.replace('/video')
    }
  }
}
</script>

<style scoped>

.elCard{
  width: 280px;
  height: 300px;
  display: block;
  float: left;
  margin-right: 5px;
  border-radius: 10px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
