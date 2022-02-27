import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import businessApi from "../request/BusinessApi.js"
import UserApi from "../request/UserApi.js"
import NoticeApi from "../request/NoticeApi.js"


//存放数据的位置
const state = {
	test: "213",
	isLogin: false,
	token: "",
	userInfo: null,
	noticeList: [],
}

//存放异步请求的位置
const actions = {
	//登录
	login(context, token) {
		uni.setStorageSync('AccessToken', token);
		context.commit("LOGIN", token)
		this.dispatch("getUserInfo")
	},
	//获取用户信息
	getUserInfo(context) {
		let _this = this;
		UserApi.getUserInfo().then(res => {
			let userInfo = res.data.data
			uni.setStorageSync("userInfo", JSON.stringify(userInfo))
			context.commit("SETUSERINFO", userInfo)
		})
	},
	//登出
	logout(context) {
		// console.log("logout")
		//移除token缓存
		uni.removeStorageSync("AccessToken")
		//移除userInfo缓存
		uni.removeStorageSync("userInfo")
		//修改登陆状态
		context.commit("LOGOUT")
	},
	//获取公告列表
	getNoticeList(context) {
		NoticeApi.getUserNoticeVoListById().then(res => {
			if (res.data.code === 200) {
				context.commit("WRITENOTICELIST", res.data.data);
			}
		})
	},
	//websocket收到发布公告消息
	publishNotice(context, notice) {
		let data = {
			status: 0,
			id: notice.id,
			publishTime: notice.publishTime,
			title: notice.title,
			content: notice.content,
			author: notice.author,
		};
		context.commit("PUBLISHNOTICE", data);
	},
	//websocket收到撤销公告消息
	cancelNotice(context, notice) {
		let list = context.state.noticeList
		for (let i = 0; i < list.length; i += 1){
			if(list[i].id === notice.id){
				context.commit("CANCELNOTICE",i)
				break;
			}
		}
	}
}

//写入state的位置
const mutations = {
	LOGIN(state, token) {
		state.isLogin = true
		state.token = token
	},
	LOGOUT(state) {
		state.isLogin = false
		state.token = ""
		state.userInfo = null
	},
	SETUSERINFO(state, userInfo) {
		// console.log(userInfo)
		// console.log("SETUSERINFO")
		state.userInfo = userInfo
	},
	WRITENOTICELIST(state, noticeList) {
		state.noticeList = noticeList
	},
	PUBLISHNOTICE(state, data) {
		state.noticeList.unshift(data);
	},
	CANCELNOTICE(state,index){
		state.noticeList.splice(index,1)
	}
}

const store = new Vuex.Store({
	state,
	mutations,
	actions
})
export default store
