
const upload = (params={})=>{
	uni.uploadFile({
		url: 'http://47.96.37.228:3001/file/upload',
		filePath: params.filePath,
		name: 'file',
		header: {
			Authorization: uni.getStorageSync('tokenHead') + uni.getStorageSync('token')
		},
		formData: {
			// shop,head
			'type': params.type
		},
		success: (uploadFileRes) => {
			params.success(uploadFileRes)
		}
	});
}
const upload2 = (params={})=>{
	console.log(params)
}
module.exports = {
	upload,
	upload2
}