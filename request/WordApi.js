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

const getCompleteWordList = data =>{
	return Request({
		url:baseURL + 'word/getAllCompleteWord',
		method:"POST",
		header:{
			"Content-Type":"application/x-www-form-urlencoded"
		},
		data:data
	})
}

const forgetWord = data =>{
	return Request({
		url:baseURL + 'word/forgetWord',
		method:"POST",
		data:data
	})
}

const WordApi = {
	getRequestWords,
	getWordOptions,
	learnComplete,
	getCompleteWordList,
	forgetWord
}
export default WordApi
