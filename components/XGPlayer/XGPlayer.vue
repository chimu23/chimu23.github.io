<template>
	<div id="xg-player"></div>
</template>

<script setup>
import { defineProps, onMounted } from 'vue';
const props = defineProps({
	url: {
		type: String,
		required: true
	}
});
onMounted(() => {
	const { url } = props
	console.log('url',url);
	const videoType =  url.slice(-6).match(/\.(.+)/)?.[1]
	
	if(!videoType){ 
		Window.open(videoType)
		return uni.showToast({
			title:'该视频可能不是正确格式',
			icon:'error'
		})
	}
	const playOptoins = {
		id: 'xg-player',
		url,
		fluid: true
	}
	if(videoType === 'mp4'){
		let player = new Player(playOptoins);
	}else if(videoType === 'm3u8'){
		let player = new HlsJsPlayer(playOptoins);
	}

});
</script>

<style lang="scss"></style>
