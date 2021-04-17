import Vue from 'vue'
import App from './App'
import uView from "uview-ui";

Vue.config.productionTip = false

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

let mpShare = require('uview-ui/libs/mixin/mpShare.js');
Vue.mixin(mpShare)

app.$mount()
