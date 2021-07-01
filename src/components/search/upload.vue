<template>
    <div>
        <div>
          <el-upload
            :multiple="multiple"
            action="/uploadPics"
            list-type="picture-card"
            :auto-upload="false"
            :http-request="uploadFile"
            ref="uploadPic"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
        <div>
          <center>
                  <span slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisibleAddSomePicsInfo = false">取 消</el-button>
                      <el-button type="primary" @click="addSomePeoplePicsForm">下一步</el-button>
                  </span>
          </center>
        </div>
        <img src="http://localhost:9000/FILM/downloadfile.jpeg">
    </div>

</template>


<script>
  export default {
    data() {
      return {
        formPicsData: "",
        multiple: true,
        photo:"http://localhost:9000/FILM/question1.jpg",
        res:""
      }
    },
    methods: {
      uploadFile(file) {
        this.formPicsData.append('file', file.file);
      },
      addSomePeoplePicsForm: function () {
        let self = this;
        this.formPicsData = new FormData();
        this.$refs.uploadPic.submit();
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        this.$http.post("/uploadPics", this.formPicsData, config).then(res => {
          this.photo=res.data
          console.log(res.data)
        }).catch(res => {
          this.$message.info("服务器走丢了!");
        });
        this.$http.post("/ocr", this.photo).then(res => {
          this.res=res.data
          console.log(res.data)
          
        }).catch(res => {
          this.$message.info("服务器走丢了!");
        });
      },
    }
  }
</script>

<style scoped lang="less">
</style>

