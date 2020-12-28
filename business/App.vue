<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			if(uni.getStorageSync('token')&&uni.getStorageSync('merchantId')){
				console.log('已登录')
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
	
	@import "uview-ui/index.scss";
	// @import "static/iconfont/iconfont.css"
</style>
