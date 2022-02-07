import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import businessApi from "../request/BusinessApi.js"
import UserApi from "../request/UserApi.js"



//存放数据的位置
const state = {
	test: "213",
	isLogin:false,
	token:"",
	userInfo:null
}

//存放异步请求的位置
const actions = {
	login(context,token){		
		uni.setStorageSync('AccessToken', token);
		context.commit("LOGIN",token)
		console.log(this)
		this.dispatch("getUserInfo")
	},
	//获取用户信息
	getUserInfo(context) {
		let _this = this;
		UserApi.getUserInfo().then(res =>{
			let userInfo = res.data.data
			uni.setStorageSync("userInfo",JSON.stringify(userInfo))
			context.commit("SETUSERINFO",userInfo)
		})
	},
	logout(context){
		console.log("logout")
		//移除token缓存
		uni.removeStorageSync("AccessToken")
		//移除userInfo缓存
		uni.removeStorageSync("userInfo")
		//修改登陆状态
		context.commit("LOGOUT")
	}
}

//写入state的位置
const mutations = {
	LOGIN(state,token){
		state.isLogin = true
		state.token = token
	},
	LOGOUT(state){
		state.isLogin = false
		state.token = ""
	},
	SETUSERINFO(state,userInfo){
		console.log(userInfo)
		console.log("SETUSERINFO")
		state.userInfo = userInfo	
	}
}

const store = new Vuex.Store({
	state,
	mutations,
	actions
})
export default store
