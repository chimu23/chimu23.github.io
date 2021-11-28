<template>
	<XGPlayer v-if="playUrl" :url="playUrl"></XGPlayer>
	<div class="btn btn-info" v-for="(item,index) in playList" @click="changePlay(item,index)">{{item.label}}</div>
</template>

<script>
import XGPlayer from '../../components/XGPlayer/XGPlayer.vue';
export default {
	comments: {
		XGPlayer
	},
	onLoad({ playList, index }) {
		this.playList = JSON.parse(decodeURIComponent(playList));
		this.currentIndex = Number(index)
		this.playUrl = (this.playList[this.currentIndex])['value']
	},
	data() {
		return {
			playList: [],
			currentIndex: 0,
			playUrl:'',
		};
	},
	methods:{
		changePlay(item,index){
			this.playUrl = item
			this.currentIndex = Number(index)
		}
	}
};
</script>

<style></style>
