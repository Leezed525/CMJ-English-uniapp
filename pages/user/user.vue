<template>
	<view class="body">
		<view class="userinfo-box" @click="login()">
			<view class="userinfo-face">
				<image :src="isLogin?userInfo.avatarUrl:'https://s4.ax1x.com/2022/02/18/HThAFH.jpg'" mode="widthFix">
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
						<text style="font-size: 60rpx;">{{signInDays}}\n</text>
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
				<uni-list-item title="公告列表" :show-badge="true" :badge-text="noticeCount" badgeType="error" to="../noticeList/noticeList" link>
				</uni-list-item>
				<uni-list-item title="同步微信用户信息" clickable @click="updateUserInfo" link>
				</uni-list-item>
				<uni-list-item title="学习数据&图表" link to="../learnInfo/learnInfo">
				</uni-list-item>
				<uni-list-item title="意见反馈" link to="/pages/feedback/feedback">
				</uni-list-item>
				<uni-list-item title="关于我们" link="navigateTo" to="/pages/about/about">
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
	import WordApi from "../../request/WordApi.js"

	export default {
		data() {
			return {
				message: "",
				msgType: "success",
				completeWordCount: 0,
				signInDays: 0,
				noticeContent:'<p><br></p><p><span class="ql-size-huge">123</span></p><p class="ql-indent-2"><s class="ql-size-huge">123</s></p>'
			}
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo
			},
			isLogin() {
				return this.$store.state.isLogin
			},
			noticeCount(){
				let count = 0
				this.$store.state.noticeList.forEach(item=>{
					if(item.status === 0){
						count += 1
					}
				})
				return count
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
			//获取用户附加信息
			getUserExtraInfo() {
				let _this = this
				WordApi.getAllCompleteWordCount().then(res => {
					if (res.data.code === 200) {
						_this.completeWordCount = res.data.data
					}
				})
				UserApi.getSigninDays().then(res => {
					if (res.data.code === 200) {
						_this.signInDays = res.data.data
					}
				})
			},
			//更新用户信息
			updateUserInfo() {
				let _this = this
				uni.getUserProfile({
					desc: "获取您的信息以更新头像与用户名",
					success(res) {
						let data = res.userInfo
						UserApi.updateUserInfo(data).then(res => {
							if (res.data.code === 200) {
								uni.showToast({
									title: res.data.msg
								})
								_this.$store.dispatch("getUserInfo")
							}
						})
					},
					fail(err) {
						uni.showModal({
							title: "抱歉",
							content: "需要您的同意才能更新信息",
							showCancel: false
						})
					}
				})
			},
			//跳转到单词列表
			toCompleteWordList() {
				uni.navigateTo({
					url: "../completeWordList/completeWordList"
				})
			}

		},
		onLoad() {},
		onShow() {
			let _this = this
			if (_this.isLogin) {
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
