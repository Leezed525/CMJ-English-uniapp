<script>
	import businessApi from "./request/BusinessApi.js"
	export default {
		onLaunch: function() {
			let _this = this
			console.log(this)
			uni.getStorageInfo({
				complete(res) {
					console.log(res)
					if(res.keys.indexOf("AccessToken") != -1){
						let token = uni.getStorageSync("AccessToken")
						_this.$store.dispatch("login",token)
					}else{
						_this.$store.dispatch("logout")
						uni.showModal({
							content:"您需要先登录才能使用本小程序",
							showCancel:false,
							success(res) {
								console.log(res)
								uni.switchTab({
									url:"/pages/user/user",
								})
							}
						})
					}
				}
			})
		},
		onShow: function() {
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	
	/* 引入iconfont */
	@import "@/static/css/iconfont.css";
	page{
		height: 100%;
		/* overflow: hidden; */
	}
	.body{
		background-color: #f1f1f1;
	}
</style>
