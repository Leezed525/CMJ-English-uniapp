<template>
	<view class="bodystyle">
		<view class="content">
			<view class="info-item-chart">
				<view class="learing-title">
					<text>学习图表</text>
				</view>
				<view class="learning-chart">
					<learningChart></learningChart>
				</view>
			</view>
			<view class="info-item-data">
				<view class="learing-title">
					<text>学习数据</text>
				</view>
				<view class="learning-data">
					<uni-grid :column="2" :square="false" style="height: 100%; width: 100%;">
						<uni-grid-item>
							<view class="learning-data-item">
								<view class="learning-data-item-title">
									<span class="iconfont icon-today"></span>
									<text>\t今日学习</text>
								</view>
								<view class="learning-data-item-content">
									<text class="learning-data-item-content-number">
										{{todayCompleteWordCount}}
									</text>
									<text class="learning-data-item-content-unit">词</text>
								</view>
							</view>
						</uni-grid-item>
						<uni-grid-item>
							<view class="learning-data-item">
								<view class="learning-data-item-title">
									<span class="iconfont icon-quxian"></span>
									<text>\t累计学习</text>
								</view>
								<view class="learning-data-item-content">
									<text class="learning-data-item-content-number">
										{{allCompleteWordCount}}
									</text>
									<text class="learning-data-item-content-unit">词</text>
								</view>
							</view>
						</uni-grid-item>
						<uni-grid-item>
							<view class="learning-data-item">
								<view class="learning-data-item-title">
									<span class="iconfont icon-time"></span>
									<text>\t今日学习时长</text>
								</view>
								<view class="learning-data-item-content">
									<text class="learning-data-item-content-number">
										{{todayLearnTime}}
									</text>
									<text class="learning-data-item-content-unit">分钟</text>
								</view>
							</view>
						</uni-grid-item>
						<uni-grid-item>
							<view class="learning-data-item">
								<view class="learning-data-item-title">
									<span class="iconfont icon-responsetime"></span>
									<text>\t累计学习时长</text>
								</view>
								<view class="learning-data-item-content">
									<text class="learning-data-item-content-number">
										{{allLearnTime}}
									</text>
									<text class="learning-data-item-content-unit">分钟</text>
								</view>
							</view>
						</uni-grid-item>
					</uni-grid>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import learningChart from "../../components/learningChart/learningChart.vue"
	import WordApi from "../../request/WordApi.js"
	export default {
		data() {
			return {
				allCompleteWordCount: 0,
				todayCompleteWordCount:0,
				todayLearnTime:0,
				allLearnTime:0
			};
		},
		components: {
			learningChart
		},
		methods: {

		},
		onLoad() {
			let _this = this
			uni.showLoading({
				mask: true,
				title: "加载中"
			})
			Promise.all([WordApi.getTodayCompleteWordCount(),WordApi.getAllCompleteWordCount(),WordApi.getLearnTimeToday(),WordApi.getAllLearnTime()]).then(values =>{
				console.log(values)
				let res0 = values[0]
				if(res0.data.code === 200){
					_this.todayCompleteWordCount = res0.data.data
				}
				
				let res1 = values[1]
				if(res1.data.code === 200){
					_this.allCompleteWordCount = res1.data.data
				}
				let res2 = values[2]
				if(res2.data.code === 200){
					_this.todayLearnTime = res2.data.data
				}
				let res3 = values[3]
				if(res3.data.code === 200){
					_this.allLearnTime = res3.data.data
				}
				uni.hideLoading()
			})
		}
	}
</script>

<style lang="scss" scoped>
	.bodystyle {
		width: calc(100% - 40rpx);
		height: calc(100% - 40rpx);

		padding: 20rpx;

		background-color: #f2f2f2;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-attachment: fixed;


	}

	.content {
		height: 100%;
		width: 100%;

		.info-item-chart {
			height: 50%;

			background-color: #FFFFFF;
			box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.20);

			.learning-chart {
				height: calc(100% - 50rpx);
				width: 100%;
			}

			.learing-title {
				height: 50rpx;
				padding-top: 10rpx;
				padding-left: 20rpx;

				border-bottom: 1px solid #000000;
			}


		}



		.info-item-data {
			// height: 30%;

			margin-top: 50rpx;
			background-color: #FFFFFF;
			box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.20);

			.learing-title {
				height: 50rpx;
				padding-top: 10rpx;
				padding-left: 20rpx;
			}

			.learning-data {
				height: calc(100% - 50rpx);
				width: 100%;

				uni-grid-item {
					height: 50%;
					width: 50%;
				}

				.learning-data-item {
					height: 100%;
					width: 100%;
					margin: 15rpx;

					.learning-data-item-title {
						font-size: 25rpx;
						height: 50rpx;
					}

					.learning-data-item-content {
						height: 75rpx;
						padding-left: 30rpx;

						.learning-data-item-content-number {
							font-size: 40rpx;
							font-weight: bold;
						}

						.learning-data-item-content-unit {
							color: #888888;
							font-size: 25rpx;
						}
					}
				}
			}


		}


	}
</style>
