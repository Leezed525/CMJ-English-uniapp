import Request from './Request.js'
import baseURL from './baseUrl.js'


const getUserNoticeVoListById = data => {
	return Request({
		url: baseURL + "notice/getUserNoticeVoListById"
	})
}

const confirmNotice = data => {
	return Request({
		url: baseURL + "notice/confirmNotice",
		method: "POST",
		data: data
	})
}


const NoticeApi = {
	getUserNoticeVoListById,
	confirmNotice
}

export default NoticeApi
