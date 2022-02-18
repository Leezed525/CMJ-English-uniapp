import Request from './Request.js'
import baseURL from './baseUrl.js'

const getRequestWords = data => {
	return Request({
		url: baseURL + 'word/getWordsByNumber',
		data: data
	})
}

const getWordOptions = data => {
	return Request({
		url: baseURL + 'word/getWordOptions',
		data: data
	})
}

const learnComplete = data => {
	return Request({
		url: baseURL + 'word/learnComplete',
		method: "POST",
		data: data
	})
}

const getCompleteWordList = data => {
	return Request({
		url: baseURL + 'word/getAllCompleteWord',
		method: "POST",
		header: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		data: data
	})
}

const forgetWord = data => {
	return Request({
		url: baseURL + 'word/forgetWord',
		method: "POST",
		data: data
	})
}

const getRequestReviewWords = data => {
	return Request({
		url: baseURL + 'word/getReviewWordsByNumber',
		data: data
	})
}

const reviewComplete = data => {
	return Request({
		url: baseURL + 'word/reviewComplete',
		method: "POST",
		header: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		data: data
	})
}

const getRecentWeekCompleteWordCount = data => {
	return Request({
		url: baseURL + 'word/getRecentWeekCompleteWordCount'
	})
}

const getSumWeekCompleteWordCount = data => {
	return Request({
		url: baseURL + 'word/getSumWeekCompleteWordCount'
	})
}

const getRecentWeekReviewWordCount = data => {
	return Request({
		url: baseURL + 'word/getRecentWeekReviewWordCount'
	})
}

const getSumWeekReviewCount = data => {
	return Request({
		url: baseURL + 'word/getSumWeekReviewCount'
	})
}


const getAllCompleteWordCount = data => {
	return Request({
		url: baseURL + "word/getCompleteWordCount"
	})
}

const getTodayCompleteWordCount = data => {
	return Request({
		url: baseURL + "word/getTodayCompleteWordCount"
	})
}

const getLearnTimeToday = data => {
	return Request({
		url: baseURL + "word/getLearnTimeToday"
	})
}

const getAllLearnTime = data => {
	return Request({
		url: baseURL + "word/getAllLearnTime"
	})
}



const WordApi = {
	getRequestWords,
	getRequestReviewWords,
	getWordOptions,
	learnComplete,
	getCompleteWordList,
	forgetWord,
	reviewComplete,
	getRecentWeekCompleteWordCount,
	getSumWeekCompleteWordCount,
	getRecentWeekReviewWordCount,
	getSumWeekReviewCount,
	getAllCompleteWordCount,
	getTodayCompleteWordCount,
	getLearnTimeToday,
	getAllLearnTime
}
export default WordApi
