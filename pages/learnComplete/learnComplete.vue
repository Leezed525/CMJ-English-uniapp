<template>
	<view class="bodystyle">
		<view class="content">
			<view class="wanchengImg">
				<span class="iconfont icon-wancheng"></span>
			</view>
			<view class="congratulation">
				<text>恭喜你！{{type}}完了本组单词</text>
			</view>
			<view class="info">
				<view class="info-item">
					<view>{{type}}了{{count}}个单词</view>
				</view>
				<view class="info-item">
					<view>用户名：{{userInfo.nickname}}</view>
				</view>
				<view class="info-item">
					<view>用时：{{Math.floor(time / 60)}}:{{time % 60}}</view>
				</view>
			</view>
		</view>
		<view class="operations">
			<view class="operation-item" @click="toHome">
				<button class="btn" type="primary">
					<span class="iconfont icon-main"></span>
					<text>返回主界面</text>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count: 10,
				type: '学习',
				time: 0
			};
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo
			}
		},
		methods: {
			toHome() {
				uni.switchTab({
					url: "../learn/learn"
				})
			}
		},
		onLoad(option) {
			console.log(option)
			this.count = option.count || "10"
			this.type = option.type || "学习"
			this.time = option.time || 0
		}
	}
</script>

<style lang="scss">
	.bodystyle {
		width: 100%;
		height: 100%;
		position: absolute;
		background-color: #fff;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-attachment: fixed;
	}

	.content {
		width: 100%;
		height: 80%;
		display: flex;
		flex-direction: column;
		background-color: white;
		align-items: center;
		justify-content: center;
	}

	.wanchengImg span {
		font-size: 250rpx;
		color: greenyellow;
	}

	.congratulation text {
		font-size: 50rpx;
	}

	.info-item view {
		font-size: 40rpx;
	}
</style>
