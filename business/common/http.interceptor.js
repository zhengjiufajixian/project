// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token
// 同时，我们也可以在此使用getApp().globalData，如果你把token放在getApp().globalData的话，也是可以使用的
import * as config from './config.js'
const install = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig({
		baseUrl: config.baseUrl
	});
	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		const token = uni.getStorageSync('token');
		const tokenHead = uni.getStorageSync('tokenHead');
		if (token && tokenHead) {
			config.header.Authorization = tokenHead + token;
		}
		config.header['Content-Type'] = 'application/x-www-form-urlencoded'
		return config;
	}
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = async (res) => {
		console.log(res);
		// 如果把originalData设置为了true，这里得到将会是服务器返回的所有的原始数据
		// 判断可能变成了res.statueCode，或者res.data.code之类的，请打印查看结果
		if (res.code == 200) {
			// 如果把originalData设置为了true，这里return回什么，this.$u.post的then回调中就会得到什么
			return res.data;
		} else if (res.code == 401) {
			console.log(vm.$u.http.options.url)
			// uni.showToast({
			// 	title: "登录过期了，请重新登录",
			// 	icon: "none",
			// 	duration: 2000,
			// 	mask: true,
			// 	success: function() {
			// 		setTimeout(() => {
			// 			uni.clearStorage()
			// 			uni.redirectTo({
			// 				url: '/pages/login/login'
			// 			})
			// 		}, 1000)
			// 	}
			// })
			// token 过期
			// let http = vm.$u.http
			// vm.$u[options.method](options.url,options.params)
			// let refreshTokenUrl = 'http://47.96.37.228:3001/auth/oauth/token'
			// vm.$u.post(refreshTokenUrl, {
			// 	grant_type: 'refresh_token',
			// 	client_id: 'client-app',
			// 	client_secret: '123456',
			// 	refresh_token: uni.getStorageSync('refreshToken')
			// }).then(res=>{
			// 	uni.setStorageSync('tokenHead', res.tokenHead)
			// 	uni.setStorageSync('token', res.token)
			// 	uni.setStorageSync('refreshToken', res.refreshToken)
			// 	console.log(http)
			// });h_token: uni.getStorageSync('refreshToken')
			// });

			// console.log(result)
			} else if (res.code == 500) {
				console.log(res);
				// uni.showToast({
				// 	title: res.message,
				// 	icon: 'none'
				// })
				return res
		} else return res;
	}
}

export default {
	install
}
