(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["subPackages/share/share"],{"02e0":function(t,e,n){"use strict";var o=n("d794"),i=n.n(o);i.a},"73cb":function(t,e,n){"use strict";n.r(e);var o=n("b440"),i=n.n(o);for(var u in o)"default"!==u&&function(t){n.d(e,t,(function(){return o[t]}))}(u);e["default"]=i.a},b440:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=u(n("1e31"));function i(){if("function"!==typeof WeakMap)return null;var t=new WeakMap;return i=function(){return t},t}function u(t){if(t&&t.__esModule)return t;if(null===t||"object"!==typeof t&&"function"!==typeof t)return{default:t};var e=i();if(e&&e.has(t))return e.get(t);var n={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in t)if(Object.prototype.hasOwnProperty.call(t,u)){var a=o?Object.getOwnPropertyDescriptor(t,u):null;a&&(a.get||a.set)?Object.defineProperty(n,u,a):n[u]=t[u]}return n.default=t,e&&e.set(t,n),n}var a={data:function(){return{show:!1,show2:!1,show3:!1,timer:null,money:0,count:0,customStyle:{border:"none",background:"none"},isLogin:!1,list:[],page:0,status:"loading",filePath:"",popupStatus:!1,loading:!1}},onShow:function(){t.getStorageSync("token")&&this.getQRCode(),this.isLogin=!!t.getStorageSync("token"),this.$u.mpShare={title:"邀请注册",path:"/subPackages/share/share?inviteCode="+t.getStorageSync("userId")},this.isLogin&&(this.getTuijianAll(),this.page=0,this.status="loading",this.list=[],this.getTuijianList())},onLoad:function(e){if(console.log(e),e.inviteCode&&t.setStorageSync("inviteCode",e.inviteCode),e.q){var n=decodeURIComponent(e.q),o=n.split("/")[3].split("=")[1];console.log(o),t.setStorageSync("inviteCode",o)}if(e.scene){var i=decodeURIComponent(e.scene),u=i.split("=")[1];t.setStorageSync("inviteCode",u)}},methods:{onReachBottom:function(){"nomore"!=this.status&&(this.status="loading",this.getTuijianList())},getQRCode:function(){t.request({url:o.baseUrl+"/user/getQRCode?userId="+t.getStorageSync("userId"),header:{Authorization:t.getStorageSync("tokenHead")+t.getStorageSync("token")},success:function(e){var n=wx.getFileSystemManager(),o=(new Date).getTime(),i=wx.env.USER_DATA_PATH+"/"+o+".png";n.writeFile({filePath:i,data:e.data.data,encoding:"base64",success:function(e){var n=t.createCanvasContext("poster");n.drawImage("/subPackages/static/image/invite-code.png",0,0,340,460),n.drawImage(i,220,350,100,100),n.draw()}})}})},save:function(){t.canvasToTempFilePath({x:0,y:0,width:340,height:460,destWidth:340,destHeight:460,canvasId:"poster",success:function(e){t.createCanvasContext("poster");var n=e.tempFilePath;t.saveImageToPhotosAlbum({filePath:n,success:function(){console.log("save success"),t.showToast({title:"保存成功",icon:"success",duration:2e3})}})}})},showTip:function(){if(!this.timer){this.show=!0;var t=this;this.timer=setTimeout((function(){t.show=!1,t.timer=null}),1500)}},getTuijianAll:function(){var t=this;this.$u.api.getTuijianAll().then((function(e){t.money=e.money,t.count=e.count}))},getTuijianList:function(){var t=this;this.page++,this.$u.api.getTuijianList({page:this.page}).then((function(e){e.length<10&&(t.status="nomore"),t.list=e}))}}};e.default=a}).call(this,n("543d")["default"])},c3ab:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return o}));var o={uImage:function(){return n.e("uview-ui/components/u-image/u-image").then(n.bind(null,"7f81"))},uButton:function(){return n.e("uview-ui/components/u-button/u-button").then(n.bind(null,"cf37"))},uIcon:function(){return n.e("uview-ui/components/u-icon/u-icon").then(n.bind(null,"44ae"))},uLoadmore:function(){return n.e("uview-ui/components/u-loadmore/u-loadmore").then(n.bind(null,"8e50"))},uPopup:function(){return n.e("uview-ui/components/u-popup/u-popup").then(n.bind(null,"5010"))},uMask:function(){return n.e("uview-ui/components/u-mask/u-mask").then(n.bind(null,"2cb7"))}},i=function(){var t=this,e=t.$createElement,n=(t._self._c,t.isLogin?t.__map(t.list,(function(e,n){var o=t.__get_orig(e),i=t.$u.timeFormat(new Date(e.createTime).getTime(),"yyyy/mm/dd hh:MM:SS");return{$orig:o,g0:i}})):null);t._isMounted||(t.e0=function(e){t.show2=!0},t.e1=function(e){t.show3=!0},t.e2=function(e){t.show2=!1},t.e3=function(e){t.show3=!1},t.e4=function(e){t.show3=!1}),t.$mp.data=Object.assign({},{$root:{l0:n}})},u=[]},d794:function(t,e,n){},e632:function(t,e,n){"use strict";n.r(e);var o=n("c3ab"),i=n("73cb");for(var u in i)"default"!==u&&function(t){n.d(e,t,(function(){return i[t]}))}(u);n("02e0");var a,s=n("f0c5"),r=Object(s["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);e["default"]=r.exports},f0f7:function(t,e,n){"use strict";(function(t){n("921c");o(n("66fd"));var e=o(n("e632"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["f0f7","common/runtime","common/vendor"]]]);