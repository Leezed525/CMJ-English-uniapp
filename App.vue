<script>
	import businessApi from "./request/BusinessApi.js"
	import socketURL from "./request/webSocketURL.js"
	import NoticeApi from "./request/NoticeApi.js"
	export default {
		onLaunch: function() {
			let _this = this
			uni.getStorageInfo({
				complete(res) {
					if (res.keys.indexOf("AccessToken") != -1) {
						let token = uni.getStorageSync("AccessToken")
						_this.$store.dispatch("login", token)
					} else {
						_this.$store.dispatch("logout")
						uni.showModal({
							content: "您需要先登录才能使用本小程序",
							showCancel: false,
							success(res) {
								uni.switchTab({
									url: "/pages/user/user",
								})
							}
						})
					}
				}
			})
		},
		onShow: function() {},
		onHide: function() {},
		methods: {
			getMessage(msg) {
				let _this = this
				let data = JSON.parse(msg.data)
				if (data.operation === "publish") {
					_this.publishNotice(data)
				} else {
					_this.cancelNotice(data)
				}
			},
			publishNotice(data) {
				let _this = this
				console.log("publish")
				_this.$store.dispatch("publishNotice",data)
			},
			cancelNotice(data) {
				let _this = this
				console.log("cancel")
				_this.$store.dispatch("cancelNotice",data)
			},
			onOpen() {
				let _this = this
				console.log("连接成功")
				_this.$store.dispatch("getNoticeList")
			}
		},
		watch: {
			"$store.state.userInfo": {
				deep: true,
				handler(val) {
					let _this = this
					var socketTask = null
					if (val !== null) {
						if (socketTask !== null) {
							socketTask.close()
						}
						socketTask = uni.connectSocket({
							url: socketURL + _this.$store.state.userInfo.id,
							success: () => {},
							fail: () => {},
							complete: () => {}
						});
						socketTask.onOpen(_this.onOpen())
						socketTask.onError(function(err) {
							console.log(err)
							console.log("webSocket连接错误")
						})
						socketTask.onMessage((msg) => _this.getMessage(msg))
						socketTask.onClose(() => console.log("socket连接关闭"))
						console.log(socketTask)
					} else {
						if (socketTask !== null) {
							//失去登陆状态断开连接
							socketTask.close()
						}
					}
				}
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* 引入iconfont */
	@import "@/static/css/iconfont.css";
	@import '@/static/css/quill.bubble.css';
	@import '@/static/css/quill.core.css';
	@import '@/static/css/quill.snow.css';

	page {
		height: 100%;
		/* overflow: hidden; */
	}

	.body {
		background-color: #f1f1f1;
	}
</style>
