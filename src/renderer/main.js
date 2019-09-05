import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import web_config from './config/web_config'



if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.axios = Vue.prototype.$axios = axios
//项目自定义陪着
Vue.WebConfig=Vue.prototype.$webConfig=web_config;

axios.defaults.baseURL = 'sys'

Vue.config.productionTip = false

import 'font-awesome/css/font-awesome.min.css'

import ElementUI from 'element-ui'
//原始风格
import 'element-ui/lib/theme-chalk/index.css'
//自定义风格
// import './assets/theme/element-#09345f/index.css'
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  components: {
    App
  },
  router,
  store,
  template: '<App/>'
}).$mount('#app');

axios.interceptors.response.use(function (res) {
  if (res.data.state==-1){
    ElementUI.Message.info("未登录")
    this.$router.push("/login")

  }
  return res;
},function (error) {
  ElementUI.Message.error("网络失败")
  return Promise.reject(error)
})