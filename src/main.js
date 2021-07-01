import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import App from './App.vue'
import router from './router'
import './assets/css/global.css'
//导入video
import Video from 'video.js'
import 'video.js/dist/video-js.css'
// 导入iconfront
import './assets/font/iconfont.css'
// 导入axios
import axios from 'axios'
// 挂载axios 到Vue的原型prototype的$http
Vue.prototype.$http = axios
// 设置请求的根路径
axios.defaults.baseURL = "http://localhost:9000/"
axios.defaults.headers.post['Content-Type']='application/json'
Vue.config.productionTip = false
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

import echarts from "echarts";
Vue.prototype.$echarts = echarts;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

