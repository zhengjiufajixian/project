// uEnvDev
if (process.env.NODE_ENV === 'development') {
	exports.baseUrl = 'http://47.96.37.228:3001'
}
// uEnvProd
if (process.env.NODE_ENV === 'production') {
	exports.baseUrl = 'http://47.96.37.228:3001'
}

// 微信小程序相关配置
exports.getNum = () => {
	let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
		'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
		'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
	];
	let nums = "";
	for (let i = 0; i < 32; i++) {
		let id = parseInt(Math.random() * 61);
		nums += chars[id];
	}
	return nums;
}
exports.key = "21E4ACD4CD5D4619B063F40C5A454F7D"
exports.WX_appId = 'wxb3891f1596d7086e'
exports.WX_map_appId = 'wx50b5593e81dd937a'
