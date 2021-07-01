<!--
 * @description: 
 * @author: 小羽
 * @github: https://github.com/lyff1006
 * @lastEditors: 小羽
 * @Date: 2020-01-28 21:33:07
 * @LastEditTime: 2020-09-12 22:27:35
 * @Copyright: 1.0.0
-->
<template>
    <div class="barrage">
        <h3>弹幕列表</h3>
        <div class="live-line"></div>
        <section class="barrage-body" id="barrageList" ref="barrageList">
            <div v-for="(battage,battageIndex) in barrageMsgList" :key="battageIndex">
                {{battage.user}}:{{battage.msg}}
            </div>
        </section>
        <div class="live-line"></div>
        <section class="barrage-msg">
            <Input v-model="battageMsg" maxlength="20" show-word-limit placeholder="请输入弹幕" style="width: 200px" @on-enter="chatLiveRoom"/>
            <Button type="primary" style="margin-left:20px;width:80px" @click="chatLiveRoom">发送</Button>
        </section>
    </div>
</template>
<script>

export default {
    data(){
        return {
            battageMsg:"",
            livingRoom:"",
            barrageMsgList:[]
        }
    },
    mounted(){
        //this.livingRoom=common.getUrlParam("room")
    },
    methods:{
        //发送弹幕
        chatLiveRoom(){
            console.log(this.currentUser)
        }
    }
}
</script>

<style lang="less">
.barrage{
    height: 100%;
    h3{
        padding: 0 10px;
    }
    &-body{
        height: calc(100% - 60px);
        overflow-y: auto;
        padding: 0 20px;
        box-sizing: border-box;
    }
    &-msg{
        margin-top: 10px;
        padding: 0 20px;
        box-sizing: border-box;
    }
}

</style>
