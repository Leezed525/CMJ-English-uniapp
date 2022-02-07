<template>
	<view class="bodystyle">
		<!-- 最上方查单词功能 -->
		<view>
			<uni-search-bar placeholder="自定placeholder" @confirm="search"></uni-search-bar>
		</view>
		<view class="header">
			<text class="">当前学习了{{total}}个单词</text>
		</view>
		<view class="wordlist">
			<view class="worditem" v-for="item in completeWordList">
				<view class="word-info">
					<text class="word-info-main">{{item.word}}</text>
					<text>\n{{item.symbols}}</text>
				</view>
				<view class="operations">
					<view class="operation-item" bindtap="getInfo">
						<button size="mini" type="primary" class="operation-btn">
							<text class="">查看</text>
							<span class="iconfont icon-right"></span>
						</button>
					</view>
					<view class="operation-item" bindtap="deleteWord">
						<button size="mini" type="warn" class="operation-btn">
							<text class="">遗忘</text>
							<span class="iconfont icon-wangjimima"></span>
						</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import WordApi from "../../request/WordApi.js"
	export default {
		data() {
			return {
				completeWordList:[],
				queryWord: "",
				limit: 15,
				page: 1,
				total: "",
				maxPage: 10,
				isLastPage: false
			};
		},
		methods: {
			getCompleteWordList() {
				
				let _this = this
				//是否是最后一页
				if (_this.isLastPage) {
					uni.showModal({
						content:"拉到底了,再去学习新的单词吧",
						showCancel:false
					})
				} else {
					uni.showLoading({
						mask: true,
						title:"加载中"
					})
					let data = {
						word: _this.queryWord,
						limit: _this.limit,
						page: _this.page
					}
					WordApi.getCompleteWordList(data).then(res => {
						console.log(res)
						if (res.data.code === 200) {
							let result = res.data.data
							_this.total = result.total
							_this.isLastPage = result.isLastPage
							_this.page = result.nextPage
							result.list.forEach(item =>{
								_this.completeWordList.push(item)
							})
							uni.hideLoading()
						}
					})
				}
			}
		},
		onLoad() {
			this.getCompleteWordList()
		},
		onReachBottom() {
			this.getCompleteWordList()
		}
	}
</script>

<style lang="scss" scoped>
	.bodystyle {
		width: 100%;
		height: 100%;
		position: absolute;
		background-color: transparent;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-attachment: fixed;
	}

	.header {
		width: 100%;
		height: 80rpx;
	}

	.header text {
		line-height: 80rpx;
		float: right;
		font-size: 30rpx;
	}

	.wordlist {
		width: calc(100% - 20rpx);
		padding-left: 10rpx;
		padding-right: 10rpx;
	}

	.worditem {
		width: calc(100% - 60rpx);
		height: 100rpx;
		background-color: #fff;
		border: 1px solid #000;
		padding-left: 30rpx;
		padding-right: 30rpx;
		border-radius: 10rpx;
		margin-top: 10rpx;
	}

	.word-info {
		margin-top: 10rpx;
		float: left;
		width: 40%;
		font-size: 25rpx;
	}

	.word-info-main {
		font-size: 35rpx;
	}

	.operations {
		float: right;
		height: 100%;
		width: 60%;
	}

	.operation-item {
		display: flex;
		flex-direction: column;
		background-color: white;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 40%;
		float: right;
		margin-left: 20rpx;
	}

	.operation-btn {
		width: 90%;
		height: 75%;

		padding: 0;

		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		line-height: 80rpx;

		span {
			font-size: 30rpx;
		}
	}

	.operation-btn text {}
</style>
