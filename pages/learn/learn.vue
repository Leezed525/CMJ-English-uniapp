<template>
	<view class="body">
		<view class="sentence" @click="playSentence">
			<text class="original-sentence">
				{{sentence}}
			</text>
			<text class="translated-sentence">
				{{translated}}
			</text>
		</view>
		<view class="sign">
			<view class="button-box">
				<button class="btn btn-qiandao" plain="true">
					<view>
						<span class="iconfont icon-qiandao learn-icon"></span>
						<text>\n{{isSignIn?'已签到':'点击签到'}}</text>
					</view>
				</button>
			</view>
		</view>
		<view class="operations">
			<view class="button-box">
				<button class="btn">
					<view>
						<text>\nlearn</text>
					</view>
				</button>
			</view>
			<view class="button-box">
				<button class="btn">
					<view>
						<text>\nreview</text>
					</view>
				</button>
			</view>
		</view>
	</view>


</template>

<script>
	export default {
		data() {
			return {
				sentence: "You can't let someone else's opinion tear you down.",
				translated: "你不能被别人的看法打倒。",
				soundUrl: "",
				isSignIn: false
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.learn-icon {
		font-size: 50rpx;
	}

	.body {
		height: 100%;
		width: 100%;
		background: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fv1.qzone.cc%2Fskin%2F201606%2F17%2F01%2F33%2F5762e2cdb9f85870.jpg%21600x600.jpg&refer=http%3A%2F%2Fv1.qzone.cc&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645771669&t=da587da21f1cbf5a47c1f4d546434b79") no-repeat center 0;
		background-size: 100% 100%;

		overflow: hidden;

		.sentence {
			width: 100%;
			height: 20%;
			padding-top: 50rpx;
			font-size: 50rpx;
			display: block;
			text-align: center;

			.original-sentence {
				display: block;
			}

			.translated-sentence {
				display: block;
			}
		}

		.sign {
			width: 100%;
			height: 50%;

			.button-box {
				margin: 0 auto;
				margin-top: 100rpx;
				width: 30%;

				.btn-qiandao {
					background-color: rgba(255, 255, 255, 0.5);
					width: 100%;
					height: 100%;
				}
			}
		}

		.operations {
			width: 100%;
			height: 20%;

			.button-box {
				width: 50%;
				height: 50%;
				display: inline-block;

				.btn {
					background-color: rgba(255, 255, 255, 0.5);
					font-size: 50rpx;
				}
			}
		}
	}
</style>
