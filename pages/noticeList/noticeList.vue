<template>
	<view>
		<uni-list>
			<uni-list-item v-for="(item,index) in noticeList" :title="item.title" :note="item.publishTime"
				:rightText="item.status > 0?'':'未读'" link :to="'../noticeInfo/noticeInfo?index=' + index" :key="index">
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		computed: {
			noticeList() {
				return this.$store.state.noticeList
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
