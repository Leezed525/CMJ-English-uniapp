<template>
	<view class="bodystyle">
		<!-- 最上方查单词功能 -->
		<view>
			<uni-search-bar placeholder="搜索单词" v-model="inputWord" cancelButton="none" @confirm="confirmInputWord"
				@clear="clearInputWord"></uni-search-bar>
		</view>
		<view class="header">
			<text class="">当前学习了{{total}}个单词</text>
		</view>
		<view class="wordlist">
			<view class="worditem" v-for="(item,index) in completeWordList" :key="index">
				<view class="word-info">
					<text class="word-info-main">{{item.word}}</text>
					<text>\n{{item.symbols}}</text>
				</view>
				<view class="operations">
					<view class="operation-item" @click="showWordInfo(index)">
						<button size="mini" type="primary" class="operation-btn">
							<text class="">查看</text>
							<span class="iconfont icon-right"></span>
						</button>
					</view>
					<view class="operation-item" @click="forgetWord(index)">
						<button size="mini" type="warn" class="operation-btn">
							<text class="">遗忘</text>
							<span class="iconfont icon-wangjimima"></span>
						</button>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="popup-body">
				<view class="word-text" style="height: 20%;">
					<text>{{currentWord.word}}</text>
					<button class="soundBtn" @click="playCurrentWordSound()">
						<span class="iconfont icon-sound"></span>
						<text>{{currentWord.symbols}}</text>
					</button>
				</view>
				<view class="wordInfo">
					<view>
						<view class="wordInfo-content">
							<view class="wordInfo-content-part">
								<button size="mini" class="soundBtn wordInfo-content-title-btn">
									<text>词 性：</text>
								</button>
								<view class="wordInfo-content-item">
									<text>{{currentWord.part}}</text>
								</view>
							</view>
							<view class="wordInfo-content-mean">
								<button size="mini" class="soundBtn wordInfo-content-title-btn">
									<text>释 义:</text>
								</button>
								<view class="wordInfo-content-item">
									<text>{{currentWord.mean}}</text>
								</view>
							</view>
							<view class="wordInfo-content-ex" @click="playCurrentWordEx()">
								<button size="mini" class="soundBtn wordInfo-content-title-btn">
									<text>例 句:</text>
									<span class="iconfont icon-sound"></span>
								</button>
								<view class="wordInfo-content-item">
									<text>{{currentWord.ex}}\n</text>
									<text>\n{{currentWord.tran}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class='nextWord' @click="closeCurrentWordInfo()">
					<text>关闭</text>
					<span class="iconfont icon-close"></span>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import WordApi from "../../request/WordApi.js"
	const innerAudioContext = uni.createInnerAudioContext()
	export default {
		data() {
			return {
				completeWordList: [],
				inputWord: "",
				queryWord: "",
				limit: 15,
				page: 1,
				total: "",
				maxPage: 10,
				isLastPage: false,
				currentWord: {}
			};
		},
		methods: {
			//播放声音 s:需要播放的英语句子或单词
			playSound(s) {
				let url = "https://fanyi.baidu.com/gettts?lan=uk&text=" + s + "&spd=3&source=web";
				innerAudioContext.src = url
				innerAudioContext.play()
			},
			//播放现在单词的发音
			playCurrentWordSound() {
				this.playSound(this.currentWord.word)
			},
			//播放现在单词的例句
			playCurrentWordEx() {
				this.playSound(this.currentWord.ex)
			},
			//单词具体信息弹出框打开
			openCurrentWordInfo() {
				this.$refs.popup.open()
			},
			//单词具体信息弹出框关闭
			closeCurrentWordInfo() {
				this.$refs.popup.close()
			},
			showWordInfo(index) {
				let _this = this
				_this.currentWord = _this.completeWordList[index]
				_this.openCurrentWordInfo()
			},
			confirmInputWord(e) {
				let _this = this
				_this.queryWord = _this.inputWord
				_this.completeWordList = []
				_this.page = 1
				_this.getCompleteWordList()
			},
			clearInputWord() {
				let _this = this
				_this.queryWord = ""
				_this.completeWordList = []
				_this.page = 1
				_this.getCompleteWordList()
			},
			forgetWord(index) {
				let _this = this
				uni.showModal({
					title: "警告",
					content: "您确定要删除这个单词吗？该单词会重新添加进你的学习计划中",
					success(e) {
						console.log(e)
						if (e.confirm) {
							let word = _this.completeWordList[index]
							WordApi.forgetWord(word).then(res => {
								uni.showToast({
									title: res.data.msg
								})
								_this.completeWordList = []
								_this.page = 1
								_this.getCompleteWordList()
							})
						}
					}
				})

			},
			getCompleteWordList() {
				let _this = this
				//是否是最后一页
				if (_this.isLastPage && _this.page === 0) {
					uni.showModal({
						content: "拉到底了,再去学习新的单词吧",
						showCancel: false
					})
				} else {
					uni.showLoading({
						mask: true,
						title: "加载中"
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
							result.list.forEach(item => {
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

	.popup-body {
		background-color: #FFFFFF;
		height: calc(66vh);
		display: block;

		.wordInfo {
			height: 70%;

			.wordInfo-content {
				.wordInfo-content-title-btn {
					color: #7dbaed;

					text {
						font-size: 30rpx;
					}

					span {
						font-size: 30rpx;
					}
				}

				.wordInfo-content-item {
					padding: 0 2em;
				}
			}


		}

		.nextWord {
			height: 10%;
			padding-right: 20rpx;
			float: right;
		}
	}

	.soundBtn {
		background-color: transparent;
		justify-content: center;
		align-items: center;
	}

	.soundBtn span {
		font-size: 25rpx;
	}

	.soundBtn text {
		font-size: 25rpx;
	}

	.soundBtn::after {
		border: none;
	}

	.word-text {
		align-items: center;
		height: 180rpx;
		text-align: center;
	}

	.word-text>text {
		font-size: 100rpx;
	}
</style>
