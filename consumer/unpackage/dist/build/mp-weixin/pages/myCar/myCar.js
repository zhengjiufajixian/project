(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/myCar/myCar"],{"1f9b":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{userName:"",phone:"",address:"",status:1}},methods:{saveAddress:function(){var n=this;this.$u.api.addAddress({userId:t.getStorageSync("userId"),userName:this.userName,phone:this.phone,address:this.address,status:this.status?1:0}).then((function(e){n.$refs.uToast.show({title:"操作成功"}),setTimeout((function(){t.navigateBack()}),500)}))}}};n.default=e}).call(this,e("543d")["default"])},"29e9":function(t,n,e){"use strict";e.r(n);var u=e("ce86"),a=e("848b");for(var i in a)"default"!==i&&function(t){e.d(n,t,(function(){return a[t]}))}(i);e("e35e");var o,r=e("f0c5"),s=Object(r["a"])(a["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],o);n["default"]=s.exports},"848b":function(t,n,e){"use strict";e.r(n);var u=e("1f9b"),a=e.n(u);for(var i in u)"default"!==i&&function(t){e.d(n,t,(function(){return u[t]}))}(i);n["default"]=a.a},ac1a:function(t,n,e){},c385:function(t,n,e){"use strict";(function(t){e("a739");u(e("66fd"));var n=u(e("29e9"));function u(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},ce86:function(t,n,e){"use strict";e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return u}));var u={uGap:function(){return e.e("uview-ui/components/u-gap/u-gap").then(e.bind(null,"936d"))},uField:function(){return e.e("uview-ui/components/u-field/u-field").then(e.bind(null,"8806"))},uButton:function(){return e.e("uview-ui/components/u-button/u-button").then(e.bind(null,"45ba"))},uToast:function(){return e.e("uview-ui/components/u-toast/u-toast").then(e.bind(null,"692a"))}},a=function(){var t=this,n=t.$createElement;t._self._c},i=[]},e35e:function(t,n,e){"use strict";var u=e("ac1a"),a=e.n(u);a.a}},[["c385","common/runtime","common/vendor"]]]);