import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)



//存放数据的位置
const state = {
	test: "213",
	isLogin:false
}

//存放异步请求的位置
const actions = {
}

//写入state的位置
const mutations = {

}

const store = new Vuex.Store({
	state,
	mutations,
	actions
})
export default store
