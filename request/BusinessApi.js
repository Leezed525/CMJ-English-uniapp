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

const getTimeForCet = data =>{
	return Request({
		url: baseURL + "business/getTimeForCet",
	})
}

const BusinessApi = {
	getDailySentence,
	login,
	getTimeForCet
}

export default BusinessApi
