<template>
	<view class="bodystyle">
		<!-- 头部设置和单词学习个数 -->
		<view class="header">
			<view class="options"></view>
			<view class="learn_count">
				<view>
					<text>{{completeWords.length}}/{{requestWords.length}}</text>
				</view>
			</view>
		</view>
		<!-- 学习主页面 -->
		<view class="content">
			<view class="word">
				<view class="main">
					<view class="word-text" @click="playCurrentWordSound()">
						<text>{{currentWord.word}}</text>
						<button class="soundBtn" bindtap='symbol_play'>
							<span class="iconfont icon-sound"></span>
							<text>{{currentWord.symbols}}</text>
						</button>
						<span v-for="(item) in currentWord.learnCount" :key="item"
							class="iconfont icon-wancheng complete"></span>
					</view>
				</view>
			</view>
			<view class="answer">
				<view v-for="(item,index) in options" class="answer-item" :key="index" @click="choseOptions(index)">
					<button class="answerBtn" :type="item.type">
						<text>{{item.mean}}</text>
					</button>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="operations">
				<view class="operation-item back" @click="setRequestNumber()">
					<!-- 设置按钮 -->
					<button size="mini" class="setBtn">
						<span class="iconfont icon-Settingscontroloptions"></span>
					</button>
				</view>
				<!-- 下拉框滑出 -->
				<view class="operation-item up" :style="rightFlag? '':'display:none'" @click="openCurrentWordInfo()">
					<button size="mini" class="upBtn">
						<span class="iconfont icon-direction-up"></span>
					</button>
				</view>
				<view class="operation-item delete" @click="deleteWord()">
					<!-- 已掌握 -->
					<button size="mini" class="deleteBtn">
						<span class="iconfont icon-delete"></span>
					</button>
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
				<view class='nextWord' @click="nextWord()">
					<text>下一单词</text>
					<span class="iconfont icon-right"></span>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import WordApi from "../../request/WordApi.js"
	const innerAudioContext = uni.createInnerAudioContext();

	//洗牌算法
	function shuffle(array) {
		let m = array.length
		let t, i
		while (m) {
			i = Math.floor(Math.random() * m--)
			t = array[m]
			array[m] = array[i]
			array[i] = t
		}
		return array
	}
	export default {
		data() {
			return {
				//请求的单词数
				requestNumber: 10,
				//请求的单词
				requestWords: [],
				//现在正在学习的单词下标
				learningIndex: 0,
				//当前正在学习的单词的选项
				options: [{}, {}, {}, {}],
				//当前单词是否已经选择正确选项
				rightFlag: false,
				//已经学习完成的单词
				completeWords: []

			};
		},
		computed: {
			currentWord() {
				return this.requestWords[this.learningIndex]
			}
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
			//发送请求获取单词
			getRequestWords() {
				let _this = this
				let number = _this.requestNumber
				WordApi.getRequestWords({
					number
				}).then(res => {
					if (res.data.code === 200) {
						let result = res.data.data
						result.forEach(item => {
							item.learnCount = 0
						})
						_this.requestWords = result
						_this.learningIndex = 0
						_this.playCurrentWordSound()
						_this.getWordOptions(_this.currentWord.id)
						_this.$nextTick(function() {
							uni.hideLoading()
						})
					} else {
						//服务器错误
						uni.navigateBack({})
					}
				})
			},
			//获取单词释义选项
			getWordOptions(wordId) {
				let _this = this
				WordApi.getWordOptions({
					wordId
				}).then(res => {
					if (res.data.code === 200) {
						let result = res.data.data
						//将选项打乱（打乱前正确的在第四个）
						result = shuffle(result)
						result.forEach(item => {
							item.type = 'default'
						})
						_this.options = result
					}
				})
			},
			//用户选择选项后触发函数
			choseOptions(index) {
				let _this = this;
				let options = _this.options
				if (options[index].right) {
					options[index].type = "primary"
					let currentWord = _this.currentWord
					currentWord.learnCount += 1
					_this.rightFlag = true
					_this.openCurrentWordInfo()
				} else {
					options[index].type = "warn"
					//选择错误将现在学习的单词的学习次数清空
					_this.currentWord.learnCount = 0
				}
			},
			//下一单词触发事件
			nextWord() {
				let _this = this
				_this.closeCurrentWordInfo()
				_this.incrIndex()
			},
			//掌握单词
			deleteWord() {
				let _this = this
				uni.showModal({
					content: '您确定已经掌握该单词了嘛',
					success(res) {
						if (res.confirm) {
							let currentWord = _this.currentWord
							currentWord.learnCount = 3
							_this.closeCurrentWordInfo()
							_this.incrIndex()
						}
					}
				})
			},
			//增加当前单词的索引
			incrIndex() {
				let _this = this;
				let currentWord = _this.currentWord
				//如果当前单词已经选择正确了三次，就将这个单词放入完成单词中
				if (currentWord.learnCount === 3) {
					_this.completeWords.push(currentWord)
				}
				//如果当前完成单词总数已达请求单词数
				if (_this.completeWords.length === _this.requestWords.length) {
					uni.showLoading({
						mask: true,
						title: '加载中'
					})
					_this.learnComplete()
					return
				} else { //没有的话增加下标
					let learningIndex = _this.learningIndex
					//增加index
					do {
						learningIndex += 1
						learningIndex %= _this.requestWords.length
					} while (_this.requestWords[learningIndex].learnCount === 3)
					_this.learningIndex = learningIndex
					//获取选项，播放声音
					_this.getWordOptions(_this.currentWord.id)
					_this.playCurrentWordSound()
					_this.rightFlag = false
				}
			},
			//单词学习完成
			learnComplete() {
				console.log('学习完成了')
				let _this = this
				let completeWords = _this.completeWords
				WordApi.learnComplete(completeWords).then(res => {
					if (res.data.code === 200) {
						uni.redirectTo({
							url: "../learnComplete/learnComplete"
						})
					} else {
						uni.navigateBack()
					}
				})
			},
			//设置单词请求数
			setRequestNumber() {
				let _this = this
				uni.showModal({
					editable: true,
					title: "请输入想要学习的单词个数",
					content: "10",
					success(res) {
						if (res.confirm) {
							let number = res.content
							let r = /^\+?[1-9][0-9]*$/
							if (r.test(number)) {
								number = parseInt(number)
								if (number >= 5 && number <= 80) {
									_this.requestNumber = number
									_this.getRequestWords()
									uni.showModal({
										content: "修改成功",
										showCancel: false
									})
									return
								}
							}
							uni.showModal({
								content: "请输入5~80之间的整数",
								showCancel: false
							})
						}

					}
				})
			}
		},
		onLoad() {
			let _this = this
			uni.showLoading({
				title: "加载中",
				mask: true
			})
			_this.getRequestWords()
		}
	}
</script>

<style lang="scss">
	.bodystyle {
		width: 100%;
		height: 100%;
		position: absolute;
		background: url("https://z3.ax1x.com/2021/06/27/RJbBee.png");
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-attachment: fixed;
	}

	.header {
		height: 10%;
		padding-left: 20rpx;
		padding-right: 20rpx;
	}

	.options {
		height: 100%;
		float: left;
	}

	.learn_count {
		height: 100%;
		float: right;
	}

	.learn_count view {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 50rpx;
	}

	.content {
		height: 80%;
		background-color: transparent;
	}

	.word {
		height: 30%;
		width: 100%;
		/* background-color: #c573ac; */
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.main {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.word-text {
		align-items: center;
		height: 180rpx;
		text-align: center;
	}

	.word-text>text {
		font-size: 100rpx;
	}

	.soundBtn {
		display: flex;
		padding: 0;
		background-color: transparent;
		justify-content: center;
		align-items: center;

		font-size: 25rpx;
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

	.complete {
		color: greenyellow;
	}

	.answer {
		height: 70%;
		/* background-color: greenyellow; */
		padding: 10rpx;
		padding-top: 40rpx;
	}

	.answer-item {
		height: 25%;
	}

	.answerBtn {
		height: 90%;
		background-color: rgba(255, 255, 255, 0.7);

		display: flex;
		padding: 0;
		justify-content: center;
		align-items: center;

		font-size: 35rpx;
		line-height: 45rpx;
	}

	.footer {
		height: 10%;
	}

	.operations {
		width: 100%;
		/* padding-left: 20rpx;
	  padding-right: 20rpx; */
	}

	.operation-item {
		display: inline-block;
		height: 100%;
		border-radius: 5px;
	}

	.back {
		float: left;
		width: 15%;
	}

	.setBtn {
		display: flex;
		height: 100%;
		padding: 0;
		background-color: transparent;
		justify-content: center;
		align-items: center;
	}

	.setBtn::after {
		border: none;
	}

	.setBtn span {
		font-size: 50rpx;
	}

	.up {
		/* position: absolute; */
		width: 70%;
		text-align: center;
	}

	.upBtn {
		display: flex;
		height: 100%;
		padding: 0;
		background-color: transparent;
		justify-content: center;
		align-items: center;
	}

	.upBtn::after {
		border: none;
	}

	.upBtn span {
		font-size: 50rpx;
	}

	.delete {
		float: right;
		width: 15%;
	}

	.deleteBtn {
		display: flex;
		height: 100%;
		padding: 0;
		background-color: transparent;

		justify-content: center;
		align-items: center;
	}

	.deleteBtn span {
		font-size: 50rpx;
	}

	.deleteBtn::after {
		border: none;
	}

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
</style>
