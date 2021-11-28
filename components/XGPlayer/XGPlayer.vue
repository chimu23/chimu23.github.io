<template>
	<div id="xg-player"></div>
</template>

<script setup>
import { defineProps, onMounted, watch, ref } from 'vue';
const props = defineProps({
	url: {
		type: String,
		required: true
	}
});
const player = ref(null)
onMounted(() => {
	const { url } = props
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
		fluid: true,
		closeVideoTouch:true,
		enableVideoDbltouch:true,
		autoplay: true
	}
	if(videoType === 'mp4'){
		player.value = new Player(playOptoins);
	}else if(videoType === 'm3u8'){
	    player.value = new HlsJsPlayer(playOptoins);
	}
});
watch(()=>props.url,(newVal)=>{
	player.value.src = newVal.value
	uni.showToast({
		icon:'none',
		title:'切换成过'
	})
})
</script>