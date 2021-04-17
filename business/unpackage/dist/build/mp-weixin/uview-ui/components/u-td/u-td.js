(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-td/u-td"],{"0dcf":function(t,n,e){"use strict";var r=e("9ea0"),a=e.n(r);a.a},"893e":function(t,n,e){"use strict";var r;e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return r}));var a=function(){var t=this,n=t.$createElement,e=(t._self._c,t.__get_style([t.tdStyle]));t.$mp.data=Object.assign({},{$root:{s0:e}})},i=[]},"944f":function(t,n,e){"use strict";e.r(n);var r=e("893e"),a=e("a451");for(var i in a)"default"!==i&&function(t){e.d(n,t,(function(){return a[t]}))}(i);e("0dcf");var o,u=e("f0c5"),c=Object(u["a"])(a["default"],r["b"],r["c"],!1,null,"ce277154",null,!1,r["a"],o);n["default"]=c.exports},9751:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r={name:"u-td",props:{width:{type:[Number,String],default:"auto"}},data:function(){return{tdStyle:{}}},created:function(){this.parent=!1},mounted:function(){if(this.parent=this.$u.$parent.call(this,"u-table"),this.parent){var t={};"auto"!=this.width&&(t.flex="0 0 ".concat(this.width)),t.textAlign=this.parent.align,t.fontSize=this.parent.fontSize+"rpx",t.padding=this.parent.padding,t.borderBottom="solid 1px ".concat(this.parent.borderColor),t.borderRight="solid 1px ".concat(this.parent.borderColor),t.color=this.parent.color,this.tdStyle=t}}};n.default=r},"9ea0":function(t,n,e){},a451:function(t,n,e){"use strict";e.r(n);var r=e("9751"),a=e.n(r);for(var i in r)"default"!==i&&function(t){e.d(n,t,(function(){return r[t]}))}(i);n["default"]=a.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-td/u-td-create-component',
    {
        'uview-ui/components/u-td/u-td-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("944f"))
        })
    },
    [['uview-ui/components/u-td/u-td-create-component']]
]);
