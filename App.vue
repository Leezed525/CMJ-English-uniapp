<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
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
		overflow: hidden;
	}
	.body{
		background-color: #f1f1f1;
	}
</style>
