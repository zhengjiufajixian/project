(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["subPackages/info/address/addNewAddress/addNewAddress"],{"0212":function(t,n,e){"use strict";e.r(n);var u=e("e7ea"),i=e("df89");for(var s in i)"default"!==s&&function(t){e.d(n,t,(function(){return i[t]}))}(s);e("e608");var o,a=e("f0c5"),r=Object(a["a"])(i["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],o);n["default"]=r.exports},"471b":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{userName:"",phone:"",address:"",status:1}},methods:{saveAddress:function(){this.$u.api.addAddress({userId:t.getStorageSync("userId"),userName:this.userName,phone:this.phone,address:this.address,status:this.status?1:0}).then((function(n){n?(t.showToast({title:"添加成功"}),setTimeout((function(){t.navigateBack()}),1500)):t.showToast({title:"添加失败，请重试",icon:"none"})}))}}};n.default=e}).call(this,e("543d")["default"])},"59b3":function(t,n,e){"use strict";(function(t){e("921c");u(e("66fd"));var n=u(e("0212"));function u(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"6bc1":function(t,n,e){},df89:function(t,n,e){"use strict";e.r(n);var u=e("471b"),i=e.n(u);for(var s in u)"default"!==s&&function(t){e.d(n,t,(function(){return u[t]}))}(s);n["default"]=i.a},e608:function(t,n,e){"use strict";var u=e("6bc1"),i=e.n(u);i.a},e7ea:function(t,n,e){"use strict";e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return s})),e.d(n,"a",(function(){return u}));var u={uGap:function(){return e.e("uview-ui/components/u-gap/u-gap").then(e.bind(null,"0d4b"))},uField:function(){return e.e("uview-ui/components/u-field/u-field").then(e.bind(null,"6009"))},uSwitch:function(){return e.e("uview-ui/components/u-switch/u-switch").then(e.bind(null,"eff5"))},uButton:function(){return e.e("uview-ui/components/u-button/u-button").then(e.bind(null,"cf37"))}},i=function(){var t=this,n=t.$createElement;t._self._c},s=[]}},[["59b3","common/runtime","common/vendor"]]]);