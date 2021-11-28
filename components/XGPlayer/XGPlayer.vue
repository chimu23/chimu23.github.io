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
	const videoType =  url.slice(-6).match(/\.(.+)/)[1]
	if(!videoType){ throw new Error('格式不对')}
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
