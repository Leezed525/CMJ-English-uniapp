//引入vuex
import store from '../store'

uni.addInterceptor('request', {
	invoke(args) {
		console.log(args)
	},
	success(res) {
		console.log(res)
		if (res.statusCode === 403) {
			uni.showModal({
				title: "抱歉",
				content: res.data.msg,
				showCancel: false
			})
			store.dispatch("logout")
		}else if(res.data.code !== 200){
			uni.showModal({
				title: "抱歉",
				content: res.data.msg,
				showCancel: false
			})
		}
	},
	fail(err) {
		console.log(err)
		uni.showModal({
			title: "抱歉",
			content: "网络错误，请稍后重试",
			showCancel: false
		})
		store.dispatch("logout")
	},
	complete(res) {}
})
const Request = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: options.url, //接口地址：前缀+方法中传入的地址
			method: options.method || 'GET', //请求方法：传入的方法或者默认是“GET”
			data: options.data || {}, //传递参数：传入的参数或者默认传递空集合
			header: {
				...options.header,
				'AccessToken': uni.getStorageSync('AccessToken') //自定义请求头信息
			},
			success: (res) => {
				//返回的数据（不固定，看后端接口，这里是做了一个判断，如果不为true，用uni.showToast方法提示获取数据失败)
				// if (res.data.success != true) {
				// 	return uni.showToast({
				// 		title: '获取数据失败',
				// 		icon: 'none'
				// 	})
				// }
				// 如果不满足上述判断就输出数据
				resolve(res)
			},
			// 这里的接口请求，如果出现问题就输出接口请求失败
			fail: (err) => {
				reject(err)
			}
		})
	})
}
export default Request
