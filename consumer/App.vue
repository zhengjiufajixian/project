<script>
	export default {
		onLaunch: function() {
			if (uni.getStorageSync('token') && uni.getStorageSync('userId')) {
				console.log('已登录')
				// uni.redirectTo({
				//     url: '/pages/order/orderDetail/orderDetail'
				//     // url: '/pages/my/info/info'
				// })
				// uni.switchTab({
				//     url: '/pages/index/index'
				// })
			}
		}
	}
</script>

<style lang="scss">
	body {
		background-color: #f3f4f7;
	}

	.color-1672FF {
		color: #1672FF;
	}

	.color-333333 {
		color: #333333;
	}

	.color-FEFEFE {
		color: #FEFEFE;
	}
	.color-FFFFFF {
		color: #FFFFFF;
	}
	.color-FFBA09 {
		color: #FFBA09;
	}

	.color-4A4A4A {
		color: #4A4A4A;
	}

	.color-FF2828 {
		color: #FF2828;
	}

	.color-666666 {
		color: #666666;
	}

	.color-999999 {
		color: #999999;
	}

	.color-8C8C8C {
		color: #8C8C8C;
	}

	.color-13E3A5 {
		color: #13E3A5;
	}

	.bold {
		font-weight: bold;
	}

	.bg-white {
		background-color: #fff;
	}

	/* #ifdef APP-PLUS || MP-WEIXIN */
	// 多选框样式
	checkbox .wx-checkbox-input {
		border-radius: 50%;
	}

	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		background: #1672FF;
	}

	checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
		color: #fff;
	}

	// 单选框样式
	radio .wx-radio-input.wx-radio-input-checked {
		background: #1672FF;
	}

	radio .wx-radio-input.wx-radio-input-checked::before {
		color: #fff;
	}

	/* #endif */

	@import "uview-ui/index.scss";
	@import url("static/iconfont/iconfont.css")
</style>
