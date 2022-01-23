<template>
	<view class="body">
		<uni-search-bar placeholder="搜索" @confirm="confirm()"/>
		<view class="head">
			<view class="head-item">
				1
			</view>
			<view class="head-item"> 
				2
			</view>
			<view class="head-item">
				3
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			confirm(val){
				console.log(val)
				console.log("confirm")
			}
		}
	}
</script>

<style>
	.head{
		display: flex;
		flex-direction: row;
		height: 30%;
	}
	.head-item{
		width: 100%;
	}
</style>
