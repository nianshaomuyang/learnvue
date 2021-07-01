<template>
  <div class="body">
    <el-card class="box-card detail">
      <el-page-header @back="goBack">
      </el-page-header>
      <el-divider></el-divider>
      <div v-html="blog">
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      blog: ''
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  },
  created () {
    const that = this
    let blogid=this.$route.query.blogid
    blogid=blogid.toString()
    console.log(blogid)
    this.$http.post('blog/detail',blogid).then(res => {
        that.blog=res.data.content
        console.log(res.data)
      })
  }
}
</script>
<style lang="less" scoped>
.body {
    background-color: #eee;
    padding: 20px;
}
.detail {
  width: 60%;
  margin: 0 auto;
  padding: 50px;
}
</style>