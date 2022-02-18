<template>
	<view class="content">
		<uni-ec-canvas class="uni-ec-canvas" id="uni-ec-canvas" ref="canvas" canvas-id="uni-ec-canvas" :ec="ec">
		</uni-ec-canvas>
	</view>
</template>

<script>
	import uniEcCanvas from "../../js_sdk/yanhao-echarts-for-wx/uni-ec-canvas/uni-ec-canvas.vue"
	import * as echarts from "../../js_sdk/yanhao-echarts-for-wx/uni-ec-canvas/echarts.js"
	import WordApi from "../../request/WordApi.js"
	let chart = null
	export default {
		name: "learningChart",
		data() {
			return {
				ec: {
					lazyLoad: true
				},
				option: {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					legend: {},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
					}],
					yAxis: [{
						type: 'value'
					}],
					series: [{
							name: '复习',
							type: 'bar',
							stack: 'learn',
							barWidth: 10,
							emphasis: {
								focus: 'series'
							},
							itemStyle: {
								normal: {
									color: "#fac858",
									barBorderRadius: [20, 20, 20, 20]
								}
							},
							data: [120, 132, 101, 134, 90, 230, 210]
						},
						{
							name: '学习',
							type: 'bar',
							stack: 'learn',
							barWidth: 10,
							emphasis: {
								focus: 'series'
							},
							itemStyle: {
								normal: {
									color: "#9ecf8e",
									barBorderRadius: [20, 20, 20, 20]
								}
							},
							data: [150, 232, 201, 154, 190, 330, 410]
						}
					]
				}
			};
		},
		computed: {
			Xdate: {
				get() {
					return this.option.xAxis[0].data
				},
				set(val) {
					this.option.xAxis[0].data = val
				}
			},
			reviewData: {
				get() {
					return this.option.series[0].data
				},
				set(val) {
					this.option.series[0].data = val
				}
			},
			learnData: {
				get() {
					return this.option.series[1].data
				},
				set(val) {
					this.option.series[1].data = val
				}
			}
		},
		components: {
			uniEcCanvas
		},
		methods: {
			initChart(canvas, width, height, canvasDpr) {
				console.log(canvas, width, height, canvasDpr)
				chart = echarts.init(canvas, null, {
					width: width,
					height: height,
					devicePixelRatio: canvasDpr
				})
				canvas.setChart(chart)
				chart.setOption(this.option)
				return chart
			},
		},
		mounted() {
			
			console.log("onshow")
			let _this = this
			let result1, result2
			let date = []
			let learnData = []
			let reviewData = []
			Promise.all([WordApi.getRecentWeekCompleteWordCount(), WordApi.getRecentWeekReviewWordCount()]).then(res => {
				console.log(res)
				if (res[0].data.code === 200) {
					let result1 = res[0].data.data
					result1.forEach(item => {
						date.push(item.date.slice(5))
						learnData.push(item.count)
					})
					_this.Xdate = date
					_this.reviewData = reviewData
				}
				if (res[1].data.code === 200) {
					let result2 = res[1].data.data
					result2.forEach(item => {
						reviewData.push(item.count)
					})
					_this.learnData = learnData
				}
				console.log(_this.Xdate)
				this.$refs.canvas.init(this.initChart)
			})

		}
	}
</script>

<style lang="scss" scoped>
	.content {
		height: 100%;
		width: 100%;
	}

	.uni-ec-canvas {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
