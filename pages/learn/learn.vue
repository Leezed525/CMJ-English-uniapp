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
			<view class="button-box" @click="toLearn">
				<button class="btn">
					<view>
						<text>\nlearn</text>
					</view>
				</button>
			</view>
			<view class="button-box" @click="toReview">
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
	import BusinessApi from "../../request/BusinessApi.js"
	const innerAudioContext = uni.createInnerAudioContext();
	
	//获取时区时间
	function getLocalTime(i) {
		if (typeof i !== "number") {
			return new Date();
		}
		var d = new Date();
		var len = d.getTime();
		var offset = d.getTimezoneOffset() * 60000;
		var utcTime = len + offset;
		return new Date(utcTime + 3600000 * i);
	}

	//将数字转成指定位数
	function fix(num, length) {
		return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
	}
	export default {
		data() {
			return {
				sentence: "",
				translated: "",
				soundUrl: "",
				isSignIn: false
			}
		},
		methods: {
			playSentence(){
				innerAudioContext.src = this.soundUrl
				innerAudioContext.play()
			},
			getDaliySentence() {
				return new Promise((resolve, reject) => {
					let _this = this
					//获取每日一句
					let time = getLocalTime(8)
					var year = time.getFullYear()
					var month = time.getMonth() + 1
					var day = time.getDate()
					let data = {
						c: "dailysentence",
						m: "getdetail",
						title: year + "-" + fix(month, 2) + "-" + fix(day, 2)
					}
					BusinessApi.getDailySentence(data).then(res => {
						if (res.statusCode === 200) {
							let result = res.data
							_this.sentence = result.content
							_this.translated = result.note
							_this.soundUrl = result.tts
						}
					})
				})
			},
			toLearn(){
				//判断
				let _this = this;
				if(_this.$store.state.isLogin == true){
					uni.navigateTo({
						url:"../words/words"
					})
				}else{
					uni.showModal({
						content:"请先登录",
						showCancel:false,
						success(){
							uni.switchTab({
								url:"../user/user"
							})
						}
					})
				}
			},
			toReview(){
				//判断
				let _this = this;
				if(_this.$store.state.isLogin == true){
					uni.navigateTo({
						url:"../review/review"
					})
				}else{
					uni.showModal({
						content:"请先登录",
						showCancel:false,
						success(){
							uni.switchTab({
								url:"../user/user"
							})
						}
					})
				}
			}
		},
		onLoad() {
			console.log("learn页面加载")
			let _this = this
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			_this.getDaliySentence()
			uni.hideLoading()
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
				height: 100%;
				display: inline-block;

				.btn {
					height: 100%;
					background-color: rgba(255, 255, 255, 0.5);
					font-size: 50rpx; 
					line-height: 70rpx;
				}
			}
		}
	}
</style>
