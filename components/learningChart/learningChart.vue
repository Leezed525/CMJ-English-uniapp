<template>
	<view class="content">
		<uni-ec-canvas class="uni-ec-canvas" id="uni-ec-canvas" ref="uni-ec-canvas" canvas-id="uni-ec-canvas" :ec="ec">
		</uni-ec-canvas>
	</view>
</template>

<script>
	import uniEcCanvas from "../../js_sdk/yanhao-echarts-for-wx/uni-ec-canvas/uni-ec-canvas.vue"
	export default {
		name: "learningChart",
		data() {
			return {
				ec: {
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

				}
			};
		},
		components: {
			uniEcCanvas
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
