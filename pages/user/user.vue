<template>
	<view class="body">
		<view class="userinfo-box" @click="login()">
			<view class="userinfo-face">
				<image :src="isLogin?userInfo.avatarUrl:'../../static/image/face.jpg'" mode="widthFix">
				</image>
			</view>
			<view class="userinfo-name">
				<!-- <text>您还没有登录，点击登录</text> -->
				<text>{{isLogin?userInfo.nickname:"您还没有登录，点击登录"}}</text>
			</view>
		</view>
		<view class="userinfo-operations" v-if="isLogin">
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
					<view class="userinfo-operation-item" @click="toCompleteWordList">
						<text style="font-size: 60rpx;">{{completeWordCount}}\n</text>
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
				<uni-list-item title="关于我们" link="reLaunch" to="/pages/vue/index/index" @click="onClick($event,1)">
				</uni-list-item>
			</uni-list>
		</view>
		<uni-popup ref="popup" type="message">
			<uni-popup-message :type="msgType" :message="message" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import businessApi from "../../request/BusinessApi.js"
	import UserApi from "../../request/UserApi.js"

	export default {
		data() {
			return {
				message: "",
				msgType: "success",
				completeWordCount:0
			}
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo
			},
			isLogin() {
				return this.$store.state.isLogin
			}
		},
		methods: {
			//弹出消息
			popMessage(type, msg) {
				this.msgType = type
				this.message = msg
				this.$refs.popup.open("top")
			},
			//登录
			login() {
				let _this = this;
				//获取用户信息
				uni.getUserProfile({
					desc: "登陆您的账号(新用户自动注册)",
					success(res) {
						uni.showLoading({
							mask: true,
							title: "加载中"
						})
						let userInfo = res.userInfo
						uni.login({
							success(res) {
								if (res.errMsg === "login:ok") {
									let code = res.code
									userInfo.openId = code
									userInfo.nickname = userInfo.nickName
									businessApi.login(userInfo).then(res => {
										let result = res.data
										if (result.code === 200) { //登陆成功
											_this.$store.dispatch("login", res.data.data)
											_this.getUserExtraInfo()
											_this.popMessage("success", "登陆成功")
											uni.hideLoading()
										} else {
											_this.popMessage("error", "登陆失败")
											uni.hideLoading()
										}
									})
								} else {
									uni.hideLoading()
									uni.showModal({
										title: "抱歉",
										content: "服务器错误，请稍后再试",
										showCancel: false
									})
								}

							}
						})
					},
					fail(err) {
						uni.showModal({
							title: "抱歉",
							content: "本小程序需要授权才能正常使用",
							showCancel: false
						})
					}
				})
			},
			getUserExtraInfo(){
				let _this = this
				UserApi.getCompleteWordCount().then(res =>{
					if(res.data.code === 200){
						_this.completeWordCount = res.data.data
					}
				})
			},
			//跳转到单词列表
			toCompleteWordList(){
				uni.navigateTo({
					url:"../completeWordList/completeWordList"
				})
			}

		},
		onLoad: function() {},
		onShow(){
			let _this = this
			if(_this.isLogin){
				_this.getUserExtraInfo()
			}
		}
	}
</script>

<style lang="scss" scoped>
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

		.other {
			margin-top: 20rpx;
		}
	}
</style>
