<template>
	<view class="body">
		<view class="userinfo-box">
			<view class="userinfo-face">
				<image src="../../static/image/face.jpg" mode="widthFix">

				</image>
			</view>
			<view class="userinfo-name">
				<text>理智点</text>
			</view>
		</view>
		<view class="userinfo-operations">
			<uni-grid :column="2" :square="false" style="height: 100%;">
				<uni-grid-item style="height: 100%;">
					<view class="userinfo-operation-item">
						<text style="font-size: 60rpx;">12\n</text>
						<view class="">
							<span class="iconfont icon-qiandao"></span>
							<text style="font-size: 40rpx;">
								签到天数
							</text>
						</view>
					</view>
				</uni-grid-item>
				<uni-grid-item style="height: 100%;">
					<view class="userinfo-operation-item">
						<text style="font-size: 60rpx;">12\n</text>
						<view class="">
							<span class="iconfont icon-qiandao"></span>
							<text style="font-size: 40rpx;">
								已背单词
							</text>
						</view>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>

		<view class="other">
			<uni-list>
				<uni-list-item title="分享" clickable @click="onClick" link>
				</uni-list-item>
				<uni-list-item title="反馈" link to="/pages/vue/index/index" @click="onClick($event,1)">
				</uni-list-item>
				<uni-list-item title="关于我们" link="reLaunch" to="/pages/vue/index/index"
					@click="onClick($event,1)"></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin: false,
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.body {
		height: 100%;
		width: calc(100%-10rpx);
		background-color: #f1f1f1;
		padding: 10rpx;
		overflow: hidden;

		.userinfo-box {
			height: 20%;
			width: 100%;
			background-color: #FFFFFF;

			.userinfo-face {
				height: 70%;
				width: 100%;

				image {
					width: 20%;
					height: 20%;
					position: relative;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					border-radius: 50%;
				}
			}

			.userinfo-name {
				height: 30%;
				text-align: center;
				font-size: 40rpx;
			}
		}

		.userinfo-operations {
			// height: 10%;
			width: 100%;

			margin-top: 20rpx;

			text-align: center;
			background-color: #FFFFFF;

			.userinfo-operation-item {
				height: 100%;
				font-size: 50rpx;

				span {
					font-size: 50rpx;
				}
			}
		}
		.other{
			margin-top: 20rpx;
		}
	}
</style>
