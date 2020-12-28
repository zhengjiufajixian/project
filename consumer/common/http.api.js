let postfix = '/'
let loginUrl = '/user/wx/getOpenId/';
let saveUnionIdUrl = '/user/wx/saveUnionId';
let refreshTokenUrl = '/auth/oauth/token';

let getBannerUrl = '/news/getLunBo';
let getMerchatShopListUrl = '/merchant/shop/list/';
let getUserInfoUrl = '/user/getUserInfo';
let bindPhoneUrl = '/user/bindPhone';
let uploadImageUrl = '/file/upload';
let upUserUrl = '/user/upUser'

let getAddressListUrl = '/user/getAddressList'
let addAddressUrl = '/user/addAddress'
let updateAddressUrl = '/user/updateAddress'
let delAddressUrl = '/user/delAddress'

let rechargeUrl = '/user/wallet/recharge'

let getTypeListUrl = '/commodity/type/list'
let getCommodityListUrl = '/commodity/getCommdityList'
let createOrderUrl = '/order/createOrder'

let getWaletDetailUrl = '/user/wallet/detail'
let getOrderListUrl = '/order/list/user/'
let getOrderDetailUrl = '/order/detail'
let setOrderStatusUrl = '/order/upOrder'

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	// 此处没有使用传入的params参数
	let login = (params = {}) => vm.$u.get(loginUrl + params.code + postfix);
	let refreshToken = (params = {}) => vm.$u.post(refreshTokenUrl, {
		grant_type: 'refresh_token',
		client_id: 'client-app',
		refresh_token: uni.getStorageSync('refreshToken')
	});
	let saveUnionId = (params = {}) => vm.$u.post(saveUnionIdUrl,params);
	
	let getBanner = (params = {}) => vm.$u.get(getBannerUrl);
	let getMerchatShopList = (params = {}) => vm.$u.get(getMerchatShopListUrl + params.page);
	let getUserInfo = (params = {}) => vm.$u.get(getUserInfoUrl + "?userId=" + uni.getStorageSync('userId') );
	let bindPhone = (params = {}) => vm.$u.post(bindPhoneUrl,params);
	let uploadImage = (params = {}) => vm.$u.post(uploadImageUrl,params);
	let upUser = (params = {}) => vm.$u.post(upUserUrl,params);
	let getAddressList = (params = {}) => vm.$u.get(getAddressListUrl+"?userId=" + uni.getStorageSync('userId'));
	let addAddress = (params = {}) => vm.$u.post(addAddressUrl,params);
	let updateAddress = (params = {}) => vm.$u.post(updateAddressUrl,params);
	let delAddress = (params = {}) => vm.$u.post(delAddressUrl,params);
	let recharge = (params = {}) => vm.$u.post(rechargeUrl,params);
	let getTypeList = (params = {}) => vm.$u.get(getTypeListUrl);
	let getCommodityList = (params = {}) => vm.$u.get(getCommodityListUrl + "?shopId=" + params.shopId +
		"&commodityType=" + params.commodityType + "&page=" + params.page);
		
	let createOrder = (params = {}) => vm.$u.post(createOrderUrl,params);
	let getWaletDetail = (params = {}) => vm.$u.get(getWaletDetailUrl + "?userId=" + uni.getStorageSync('userId'));
	let getOrderList = (params = {}) => vm.$u.get(getOrderListUrl + uni.getStorageSync('userId')+ postfix +params.page + postfix + params.status)
	let getOrderDetail = (params = {}) => vm.$u.get(getOrderDetailUrl + "?orderId=" + params.orderId)
	let setOrderStatus = (params = {}) => vm.$u.post(setOrderStatusUrl + postfix +params.orderId + postfix + params.status)
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		login,
		saveUnionId,
		refreshToken,
		getBanner,
		getMerchatShopList,
		getUserInfo,
		bindPhone,
		uploadImage,
		upUser,
		getAddressList,
		addAddress,
		updateAddress,
		delAddress,
		recharge,
		getTypeList,
		getCommodityList,
		createOrder,
		getWaletDetail,
		getOrderList,
		getOrderDetail,
		setOrderStatus
	};
}

export default {
	install
}
