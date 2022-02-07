import Request from './Request.js'
import baseURL from './baseUrl.js'

const getUserInfo = data => {
	return Request({
		url: baseURL + "user/getUserInfo",
	})
}

const getCompleteWordCount = data =>{
	return Request({
		url:baseURL + "word/getCompleteWordCount"
	})
}


const UserApi = {
	getUserInfo,
	getCompleteWordCount
}
export default UserApi