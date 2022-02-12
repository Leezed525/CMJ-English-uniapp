<template>
	<view class="body">
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :circular="true">
			<swiper-item>
				<image mode="aspectFill" src="../../static/image/banner1.png"></image>
			</swiper-item>
			<swiper-item>
				<image mode="aspectFill" src="../../static/image/banner2.png"></image>
			</swiper-item>
			<swiper-item>
				<image mode="aspectFill" src="../../static/image/banner3.png"></image>
			</swiper-item>
		</swiper>
		<view>
			<view style="display: inline;">
				<uni-row>
					<uni-col :span="12">
						<text>距离四六级考试还有:</text>
					</uni-col>
					<uni-col :span="12">
						<uni-countdown ref="countDown" color="#FFFFFF" background-color="#00B26A" border-color="#00B26A"
							:day="countDownTime.day" :hour="countDownTime.hour" :minute="countDownTime.minute"
							:second="countDownTime.second"></uni-countdown>
					</uni-col>
				</uni-row>
			</view>
		</view>
		<uni-calendar :insert="true" :showMonth="false" :selected="selectedDays" :start-date="'2021-01-21'"
			:end-date="'2022-5-20'" @change="clickCalendar" />

	</view>
</template>

<script>
	import UserApi from "../../request/UserApi.js"
	import BusinessApi from "../../request/BusinessApi.js"
	export default {
		data() {
			return {
				title: 'Hello',
				selectedDays: [{
					date: '2022-01-22',
					info: '签到',
					data: {
						custom: '自定义信息',
						name: '自定义消息头',
					}
				}, ],
				countDownTime: {
					day: 0,
					hour: 0,
					minute: 0,
					second: 0
				}
			}
		},

		methods: {
			confirm(val) {
				console.log(val)
				console.log("confirm")
			},
			clickCalendar(e) {
				console.log(e)
			},
		},
		onLoad() {
			let _this = this
			BusinessApi.getTimeForCet().then(res => {
				if (res.data.code === 200) {
					let startTime = new Date(); // 开始时间
					let endTime = new Date(res.data.data); // 结束时间
					let usedTime = endTime - startTime; // 相差的毫秒数
					let days = Math.floor(usedTime / (24 * 3600 * 1000)); // 计算出天数
					let leavel = usedTime % (24 * 3600 * 1000); // 计算天数后剩余的时间
					let hours = Math.floor(leavel / (3600 * 1000)); // 计算剩余的小时数
					let leavel2 = leavel % (3600 * 1000); // 计算剩余小时后剩余的毫秒数
					let minutes = Math.floor(leavel2 / (60 * 1000)); // 计算剩余的分钟数
					let seconds = Math.floor(leavel2 % (60 * 1000))
					_this.countDownTime = {
						day: days,
						hour: hours,
						minute: minutes,
						second: seconds
					}
				}
			})
		},
		onShow() {
			let _this = this
			let selectedDays = _this.selectedDays
			UserApi.getSignInfo().then(res => {
				if (res.data.code === 200) {
					let list = res.data.data
					selectedDays = []
					list.forEach(item => {
						let tmp = {
							date: item.signInDate,
							info: "已签到",
							data: {}
						}
						selectedDays.push(tmp)
					})
					_this.selectedDays = selectedDays
				}
			})
		}
	}
</script>

<style scoped>
	.head {
		display: flex;
		flex-direction: row;
		height: 30%;
	}

	.head-item {
		width: 100%;
	}

	image {
		width: 100%;
		height: 100%;
	}
</style>
