let postfix = '/'
let loginUrl = 'merchant/wx/login/';
let saveUnionIdUrl = '/merchant/wx/saveUnionId';
let refreshTokenUrl = '/auth/oauth/token';

let getUserInfoUrl = '/merchant/getMerchantInfo';
let bindPhoneUrl = '/user/bindPhone';
let uploadImageUrl = '/file/upload';
let updateMerchantUrl = '/merchant/updateMerchant'

let getAddressListUrl = '/user/getAddressList'
let addAddressUrl = '/user/addAddress'
let updateAddressUrl = '/user/updateAddress'
let delAddressUrl = '/user/delAddress'

let registerUrl = '/merchant/merchant/regiest'
let getTypeListUrl = '/commodity/type/list'
let addCommodityUrl = '/commodity/add'
let getCommodityListUrl = '/commodity/list'
let setCommodityStatusUrl = '/commodity'
let updateCommodityUrl = '/update'

let changShopStatusUrl = '/merchant/shop'

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
	let saveUnionId = (params = {}) => vm.$u.post(saveUnionIdUrl, params);

	let getBanner = (params = {}) => vm.$u.get(getBannerUrl);
	let getMerchatShopList = (params = {}) => vm.$u.get(getMerchatShopListUrl + params.page);
	let getUserInfo = (params = {}) => vm.$u.get(getUserInfoUrl + "?merchantId=" + uni.getStorageSync('merchantId'));
	let bindPhone = (params = {}) => vm.$u.post(bindPhoneUrl, params);
	let uploadImage = (params = {}) => vm.$u.post(uploadImageUrl, params);
	let updateMerchant = (params = {}) => vm.$u.post(updateMerchantUrl, params);
	let getAddressList = (params = {}) => vm.$u.get(getAddressListUrl + "?merchantId=" + uni.getStorageSync('merchantId'));
	let addAddress = (params = {}) => vm.$u.post(addAddressUrl, params);
	let updateAddress = (params = {}) => vm.$u.post(updateAddressUrl, params);
	let delAddress = (params = {}) => vm.$u.post(delAddressUrl, params);

	let register = (params = {}) => vm.$u.post(registerUrl, params);
	let getTypeList = (params = {}) => vm.$u.get(getTypeListUrl);
	let addCommodity = (params = {}) => vm.$u.post(addCommodityUrl, params);
	let getCommodityList = (params = {}) => vm.$u.get(getCommodityListUrl + "?shopId=" + uni.getStorageSync('shopId') +
		"&status=" + params.status + "&page=" + params.page);
	let setCommodityStatus = (params = {}) => vm.$u.post(setCommodityStatusUrl + postfix + params.commodityId + postfix + params.status);

	let changShopStatus = (params = {}) => vm.$u.post(changShopStatusUrl + postfix + uni.getStorageSync('merchantId') + postfix +
		uni.getStorageSync('shopId') + '/' + params.status + postfix);

	let updateCommodity = (params = {}) => vm.$u.post(updateCommodityUrl + postfix + paras.commodityId,params)
	
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
		updateMerchant,
		getAddressList,
		addAddress,
		updateAddress,
		delAddress,
		register,
		getTypeList,
		addCommodity,
		getCommodityList,
		setCommodityStatus,
		changShopStatus,
		updateCommodity
	};
}

export default {
	install
}
