import Request from './Request.js'
import baseURL from './baseUrl.js'

const getRequestWords = data => {
	return Request({
		url: baseURL + 'word/getWordsByNumber',
		data: data
	})
}

const getWordOptions = data =>{
	return Request({
		url:baseURL + 'word/getWordOptions',
		data: data
	})
}

const learnComplete = data =>{
	return Request({
		url:baseURL + 'word/learnComplete',
		method:"POST",
		data:data
	})
}

const WordApi = {
	getRequestWords,
	getWordOptions,
	learnComplete
}
export default WordApi
