import http from './interface'
/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 */
module.exports = {
	api: {
		userDetail: '/user', //用户详情
		//...    
	},
	request: (url, data, method) => {
		http.config.baseUrl = "http://47.96.37.228:3001"
		//设置请求前拦截器
		http.interceptor.request = (config) => {
			let token = uni.getStorageSync("token")
			delete config.header['Authorization']
			if (token) {
				config.header['Authorization'] = 'Bearer ' + token
			}
		}

		//设置请求结束后拦截器
		http.interceptor.response = async (response) => {
			const statusCode = response.statusCode
			if (statusCode === 401) { //返回401，即token需刷新
				return response.data = await doRequest(response, url)
			}
			if (statusCode === 422) {
				uni.hideLoading()
				//业务代码...return
			} // 不能再刷新时，服务器返回状态码500时,判断是不是刷新token的接口
			if (response.statusCode === 500) {
				if (response.config.url.indexOf("current") == -1) {
					uni.showToast({
						icon: "none",
						title: "网络错误"
					})
				}
				return
			}
			if (response.statusCode === 200 || response.statusCode === 201 || response.statusCode === 204) { //成功
				uni.hideLoading()
				return response.data
			} else {
				uni.hideLoading()
				uni.showToast({
					title: response.data.message,
					icon: 'none',
					duration: 1000
				})
				return
			}
		}
		return http.request({
			url: url,
			data,
			method: method
		})

	},
} //刷新token并继续之前请求
async function doRequest(response, url) {
	const res = await module.exports.request('/authorizations/current', {}, 'PUT')
	if (res && res.access_token) {
		let config = response.config
		uni.setStorageSync("token", res.access_token);
		config.header['Authorization'] = 'Bearer ' + res.access_token
		const resold = await module.exports.request(url, { ...config.data
		}, config.method)
		uni.hideLoading()
		return resold
	} else { //这个时候状态码是 500
		console.log("重新登陆");
		uni.removeStorageSync("token")
		uni.removeStorageSync("password")
		uni.showToast({
			title: "身份信息过期，请重新登陆",
			duration: 1000,
			success() {
				uni.reLaunch({
					url: '/pages/login/login'
				})
			}
		})
		return false
	}
}
