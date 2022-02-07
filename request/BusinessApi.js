import Request from './Request.js'
import baseURL from "./baseUrl.js"

const getDailySentence = data => {
	return Request({
		url: 'https://sentence.iciba.com/index.php?',
		data: data
	})
}

const login = data => {
	return Request({
		url: baseURL + "business/login",
		method: "POST",
		data: data,
	})
}

const getUserInfo = data => {
	return Request({
		url: baseURL + "user/getUserInfo",
	})
}


const BusinessApi = {
	getDailySentence,
	login,
	getUserInfo
}

export default BusinessApi
