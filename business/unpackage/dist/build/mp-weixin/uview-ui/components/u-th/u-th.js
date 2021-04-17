(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-th/u-th"],{"1fa0":function(t,n,e){"use strict";e.r(n);var r=e("32346"),a=e.n(r);for(var i in r)"default"!==i&&function(t){e.d(n,t,(function(){return r[t]}))}(i);n["default"]=a.a},32346:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r={name:"u-th",props:{width:{type:[Number,String],default:""}},data:function(){return{thStyle:{}}},created:function(){this.parent=!1},mounted:function(){if(this.parent=this.$u.$parent.call(this,"u-table"),this.parent){var t={};this.width&&(t.flex="0 0 ".concat(this.width)),t.textAlign=this.parent.align,t.padding=this.parent.padding,t.borderBottom="solid 1px ".concat(this.parent.borderColor),t.borderRight="solid 1px ".concat(this.parent.borderColor),Object.assign(t,this.parent.style),this.thStyle=t}}};n.default=r},"35e5":function(t,n,e){"use strict";e.r(n);var r=e("d5be"),a=e("1fa0");for(var i in a)"default"!==i&&function(t){e.d(n,t,(function(){return a[t]}))}(i);e("8e58");var u,o=e("f0c5"),c=Object(o["a"])(a["default"],r["b"],r["c"],!1,null,"c491c436",null,!1,r["a"],u);n["default"]=c.exports},"8e58":function(t,n,e){"use strict";var r=e("d097"),a=e.n(r);a.a},d097:function(t,n,e){},d5be:function(t,n,e){"use strict";var r;e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return r}));var a=function(){var t=this,n=t.$createElement,e=(t._self._c,t.__get_style([t.thStyle]));t.$mp.data=Object.assign({},{$root:{s0:e}})},i=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-th/u-th-create-component',
    {
        'uview-ui/components/u-th/u-th-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("35e5"))
        })
    },
    [['uview-ui/components/u-th/u-th-create-component']]
]);
