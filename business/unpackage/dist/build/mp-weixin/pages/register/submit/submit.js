(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/register/submit/submit"],{"0348":function(e,t,n){"use strict";var o=n("85a3"),r=n.n(o);r.a},"5c11":function(e,t,n){"use strict";(function(e){n("5396");o(n("66fd"));var t=o(n("e1a7"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"85a3":function(e,t,n){},"966f":function(e,t,n){"use strict";n.r(t);var o=n("a96e"),r=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=r.a},a1c5:function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return o}));var o={uForm:function(){return n.e("uview-ui/components/u-form/u-form").then(n.bind(null,"2532"))},uFormItem:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-form-item/u-form-item")]).then(n.bind(null,"ac6f"))},uInput:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-input/u-input")]).then(n.bind(null,"4b6c"))},uButton:function(){return n.e("uview-ui/components/u-button/u-button").then(n.bind(null,"07ab"))},uUpload:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-upload/u-upload")]).then(n.bind(null,"fde0"))}},r=function(){var e=this,t=e.$createElement;e._self._c},i=[]},a96e:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(n("19ea"));function r(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return r=function(){return e},e}function i(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=r();if(t&&t.has(e))return t.get(e);var n={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var u=o?Object.getOwnPropertyDescriptor(e,i):null;u&&(u.get||u.set)?Object.defineProperty(n,i,u):n[i]=e[i]}return n.default=e,t&&t.set(e,n),n}var u={data:function(){return{action:o.baseUrl+"/file/upload",haeder:{Authorization:e.getStorageSync("tokenHead")+e.getStorageSync("token")},formData:{type:"commodity",id:e.getStorageSync("shopId")},name:"file",form:{merchantId:e.getStorageSync("merchantId"),shopName:"",shopAddress:"",merchantName:"",merchantPhone:"",merchantPassword:"",confirmMerchantPassword:"",longitude:"",latitude:"",shopImg:"",shopImgList:[],shopProfile:""},rules:{shopName:{required:!0,message:"请输入店铺名称",trigger:["blur","change"]},shopAddress:{required:!0,message:"请输入店铺地址",trigger:["blur","change"]},merchantName:{required:!0,message:"请输入账号名称",trigger:["blur","change"]},merchantPhone:{required:!0,message:"请输入11位电话号码",trigger:["blur","change"]},merchantPassword:{required:!0,message:"请输入账号密码",trigger:["blur","change"]},confirmMerchantPassword:{required:!0,message:"请确认输入密码是否一致",trigger:["blur","change"]},shopProfile:{required:!0,message:"请输入店铺地址",trigger:["blur","change"]}}}},onReady:function(){this.$refs.uForm.setRules(this.rules)},methods:{choseLocation:function(){var e=this,t=this;wx.chooseLocation({success:function(t){t.name&&(e.form.shopAddress=t.address,e.form.shopName=t.name,e.form.latitude=t.latitude,e.form.longitude=t.longitude)},fail:function(){wx.getSetting({success:function(e){var n=e.authSetting;console.log(n),n["scope.userLocation"]||wx.showModal({title:"是否授权当前位置",content:"需要获取您的地理位置，请确认授权，否则地图功能将无法使用",success:function(e){e.confirm?wx.openSetting({success:function(e){!0===e.authSetting["scope.userLocation"]&&(wx.showToast({title:"授权成功",icon:"success",duration:1e3}),setTimeout((function(){t.choseLocation()}),1e3))}}):wx.showToast({title:"授权失败",icon:"none",duration:1e3})}})}})}})},addShopImg:function(e,t,n,o){this.form.shopImg=e},removeShopImg:function(e,t,n){this.form.shopImg=""},addShopImgList:function(e,t,n,o){this.form.shopImgList.push(e)},removeShopImgList:function(e,t,n){var o=this.form.shopImgList;o.splice(e,1),console.log(o),this.form.shopImgList=o},submit:function(){var t=this;this.$refs.uForm.validate((function(n){t.form.merchantPassword==t.form.confirmMerchantPassword&&t.form.merchantPassword>5?n?(console.log("验证通过"),t.form.shopImgList=JSON.stringify(t.form.shopImgList),console.log(t.form),t.$u.api.register(t.form).then((function(t){e.redirectTo({url:"../wait/wait"})}))):console.log("验证失败"):e.showToast({title:"请确认密码是否一致，并且密码长度大于六位",mask:!0,icon:"none",duration:2e3})}))}}};t.default=u}).call(this,n("543d")["default"])},e1a7:function(e,t,n){"use strict";n.r(t);var o=n("a1c5"),r=n("966f");for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);n("0348");var u,s=n("f0c5"),a=Object(s["a"])(r["default"],o["b"],o["c"],!1,null,"7a0f10cc",null,!1,o["a"],u);t["default"]=a.exports}},[["5c11","common/runtime","common/vendor"]]]);