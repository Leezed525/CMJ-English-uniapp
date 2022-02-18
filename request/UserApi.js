import Request from './Request.js'
import baseURL from './baseUrl.js'

const getUserInfo = data => {
	return Request({
		url: baseURL + "user/getUserInfo",
	})
}

const updateUserInfo = data => {
	return Request({
		url: baseURL + "user/updateUserInfo",
		method: "POST",
		data: data
	})
}

const getSigninDays = data => {
	return Request({
		url: baseURL + "signin/getSigninDays"
	})
}

const signinToday = data => {
	return Request({
		url: baseURL + "signin/signinToday"
	})
}

const getTodaySignInStatus = data => {
	return Request({
		url: baseURL + "signin/getTodaySignInStatus"
	})
}

const getSignInfo = data => {
	return Request({
		url: baseURL + "signin/getSignInfo"
	})
}



const UserApi = {
	getUserInfo,
	updateUserInfo,
	
	getSigninDays,
	signinToday,
	getTodaySignInStatus,
	getSignInfo
}
export default UserApi
