<template>
	<view class="u-avatar" :style="[wrapStyle]" @tap="click">
		<image
			@error="loadError"
			:style="[imgStyle]"
			class="u-avatar__img"
			v-if="!uText && avatar"
			:src="avatar" 
			:mode="imgMode"
		></image>
		<text class="u-line-1" v-else-if="uText" :style="{
			fontSize: '38rpx'
		}">{{uText}}</text>
		<slot v-else></slot>
		<view class="u-avatar__sex" v-if="showSex" :class="['u-avatar__sex--' + sexIcon]" :style="[uSexStyle]">
			<u-icon :name="sexIcon" size="20"></u-icon>
		</view>
		<view class="u-avatar__level" v-if="showLevel" :style="[uLevelStyle]">
			<u-icon :name="levelIcon" size="20"></u-icon>
		</view>
	</view>
</template>

<script>
	let base64Avatar = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RUI2MTVFQTY4NTY0MTFFQjlFMTM4MDk4MjREQTZFNzgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RUI2MTVFQTc4NTY0MTFFQjlFMTM4MDk4MjREQTZFNzgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFQjYxNUVBNDg1NjQxMUVCOUUxMzgwOTgyNERBNkU3OCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFQjYxNUVBNTg1NjQxMUVCOUUxMzgwOTgyNERBNkU3OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PiRxkUMAAAhVSURBVHja3FwJUJVV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";
	/**
	 * avatar 头像
	 * @description 本组件一般用于展示头像的地方，如个人中心，或者评论列表页的用户头像展示等场所。
	 * @tutorial https://www.uviewui.com/components/avatar.html
	 * @property {String} bg-color 背景颜色，一般显示文字时用（默认#ffffff）
	 * @property {String} src 头像路径，如加载失败，将会显示默认头像
	 * @property {String Number} size 头像尺寸，可以为指定字符串(large, default, mini)，或者数值，单位rpx（默认default）
	 * @property {String} mode 显示类型，见上方说明（默认circle）
	 * @property {String} sex-icon 性别图标，man-男，woman-女（默认man）
	 * @property {String} level-icon 等级图标（默认level）
	 * @property {String} sex-bg-color 性别图标背景颜色
	 * @property {String} level-bg-color 等级图标背景颜色
	 * @property {String} show-sex 是否显示性别图标（默认false）
	 * @property {String} show-level 是否显示等级图标（默认false）
	 * @property {String} img-mode 头像图片的裁剪类型，与uni的image组件的mode参数一致，如效果达不到需求，可尝试传widthFix值（默认aspectFill）
	 * @property {String} index 用户传递的标识符值，如果是列表循环，可穿v-for的index值
	 * @event {Function} click 头像被点击
	 * @example <u-avatar :src="src"></u-avatar>
	 */
	export default {
		name: 'u-avatar',
		props: {
			// 背景颜色
			bgColor: {
				type: String,
				default: 'transparent'
			},
			// 头像路径
			src: {
				type: String,
				default: ''
			},
			// 尺寸，large-大，default-中等，mini-小，如果为数值，则单位为rpx
			// 宽度等于高度
			size: {
				type: [String, Number],
				default: 'default'
			},
			// 头像模型，square-带圆角方形，circle-圆形
			mode: {
				type: String,
				default: 'circle'
			},
			// 文字内容
			text: {
				type: String,
				default: ''
			},
			// 图片的裁剪模型
			imgMode: {
				type: String,
				default: 'aspectFill'
			},
			// 标识符
			index: {
				type: [String, Number],
				default: ''
			},
			// 右上角性别角标，man-男，woman-女
			sexIcon: {
				type: String,
				default: 'man'
			},
			// 右下角的等级图标
			levelIcon: {
				type: String,
				default: 'level'
			},
			// 右下角等级图标背景颜色
			levelBgColor: {
				type: String,
				default: ''
			},
			// 右上角性别图标的背景颜色
			sexBgColor: {
				type: String,
				default: ''
			},
			// 是否显示性别图标
			showSex: {
				type: Boolean,
				default: false
			},
			// 是否显示等级图标
			showLevel: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				error: false,
				// 头像的地址，因为如果加载错误，需要赋值为默认图片，props值无法修改，所以需要一个中间值
                avatar: this.src ? this.src : base64Avatar, 
			}
		},
        watch: {
            src(n) {
                // 用户可能会在头像加载失败时，再次修改头像值，所以需要重新赋值
                if(!n) {
					// 如果传入null或者''，或者undefined，显示默认头像
					this.avatar = base64Avatar;
					this.error = true;
				} else {
					this.avatar = n;
					this.error = false;
				}
            }
        },
		computed: {
			wrapStyle() {
				let style = {};  
				style.height = this.size == 'large' ? '120rpx' : this.size == 'default' ?
				'90rpx' : this.size == 'mini' ? '70rpx' : this.size + 'rpx';
				style.width = style.height;
				style.flex = `0 0 ${style.height}`;
				style.backgroundColor = this.bgColor;
				style.borderRadius = this.mode == 'circle' ? '500px' : '5px';
				if(this.text) style.padding = `0 6rpx`;
				return style;
			},
			imgStyle() {
				let style = {};
				style.borderRadius = this.mode == 'circle' ? '500px' : '5px';
				return style;
			},
			// 取字符串的第一个字符
			uText() {
				return String(this.text)[0];
			},
			// 性别图标的自定义样式
			uSexStyle() {
				let style = {};
				if(this.sexBgColor) style.backgroundColor = this.sexBgColor;
				return style;
			},
			// 等级图标的自定义样式
			uLevelStyle() {
				let style = {};
				if(this.levelBgColor) style.backgroundColor = this.levelBgColor;
				return style;
			}
		},
		methods: {
			// 图片加载错误时，显示默认头像
			loadError() {
				this.error = true;
                this.avatar = base64Avatar;
			},
			click() {
				this.$emit('click', this.index);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";

	.u-avatar {
		/* #ifndef APP-NVUE */
		display: inline-flex;		
		/* #endif */
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		color: $u-content-color;
		border-radius: 10px;
		position: relative;
		
		&__img {
			width: 100%;
			height: 100%;
		}
		
		&__sex {
			position: absolute;
			width: 32rpx;
			color: #ffffff;
			height: 32rpx;
			@include vue-flex;
			justify-content: center;
			align-items: center;
			border-radius: 100rpx;
			top: 5%;
			z-index: 1;
			right: -7%;
			border: 1px #ffffff solid;
			
			&--man {
				background-color: $u-type-primary;
			}
			
			&--woman {
				background-color: $u-type-error;
			}
			
			&--none {
				background-color: $u-type-warning;
			}
		}
		
		&__level {
			position: absolute;
			width: 32rpx;
			color: #ffffff;
			height: 32rpx;
			@include vue-flex;
			justify-content: center;
			align-items: center;
			border-radius: 100rpx;
			bottom: 5%; 
			z-index: 1;
			right: -7%;
			border: 1px #ffffff solid;
			background-color: $u-type-warning;
		}
	}
</style>
