<template>
	<view class="body">
		<view class="header">
			<text class="title">
				{{noticeInfo.title}}
			</text>
			<text class="author">
				{{noticeInfo.author.nickname}}
			</text>
			<text class="publish-time">
				发布于{{noticeInfo.publishTime}}
			</text>
		</view>
		<view class="notice-content">
			<rich-text class="rich-text ql-editor" :nodes="noticeInfo.content"></rich-text>
		</view>
		<view>
			<button v-if="noticeInfo.status === 0" @click="confirmNotice()" type="primary">我已确认</button>
			<button v-if="noticeInfo.status > 0" disabled="true" type="primary">您已确认</button>
		</view>
	</view>
</template>

<script>
	import NoticeApi from "../../request/NoticeApi.js"
	export default {
		data() {
			return {
				index: 0
			}
		},
		computed: {
			noticeList() {
				return this.$store.state.noticeList
			},
			noticeInfo() {
				return this.noticeList[this.index]
			}
		},
		methods: {
			confirmNotice() {
				let _this = this
				let data = _this.noticeInfo
				NoticeApi.confirmNotice(data).then(res => {
					// console.log(res)
					if (res.data.code === 200) {
						uni.showToast({
							title: res.data.msg,
							icon: "success",
							complete() {
								_this.$store.dispatch("getNoticeList")
								
								uni.navigateBack()
								
							}
						})
					}else{
						uni.showToast({
							title: res.data.msg,
							icon: "error",
						})
					}
				})
			}
		},
		onLoad(options) {
			// console.log(options)
			this.index = options.index || 0
		}
	}
</script>

<style lang="scss" scoped>
	.body {
		height: calc(100% - 20rpx);
		width: calc(100% - 20rpx);
		background-color: #f1f1f1;
		padding: 10rpx;
		display: flex;
		flex-direction: column;
		// overflow: auto;


		// overflow-y: auto;
		.header {
			height: 15%;
			background-color: #FFFFFF;

			.title {
				height: 60%;
				font-size: 60rpx;
				text-align: center;
				display: block;
			}

			.publish-time {
				display: block;
				font-size: 30rpx;
			}

		}

		.notice-content {
			height: calc(75% - 40rpx);
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			overflow-y: auto;
			background-color: #FFFFFF;
		}

		.operations {
			height: 10%;
		}

	}
</style>
