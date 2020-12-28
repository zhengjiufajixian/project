import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import tool from 'common/tool.js'

Vue.config.productionTip = false
Vue.prototype.tool = tool

App.mpType = 'app'

Vue.use(uView);

const app = new Vue({
    ...App
})

// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app)

// http接口API集中管理引入部分
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)

// import api from '@/common/vmeitime-http/'

// // 全局挂载后使用
// Vue.prototype.$api = api

app.$mount()
