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
						<uni-countdown color="#FFFFFF" background-color="#00B26A" border-color="#00B26A" :day="1"
							:hour="2" :minute="30" :second="0"></uni-countdown>
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
					},
				]
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

		},
		onShow() {
			let _this = this
			let selectedDays = _this.selectedDays
			UserApi.getSignInfo().then(res => {
				if(res.data.code === 200){
					let list = res.data.data
					selectedDays = []
					list.forEach(item =>{
						let tmp ={
							date:item.signInDate,
							info:"已签到",
							data:{}
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
