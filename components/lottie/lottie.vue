<template>
	<view>
		<lottie-player :src="src"  background="transparent"  speed="1"  :style="{width,height}"  loop autoplay></lottie-player>
	</view>
</template>

<script>
	export default {
		name:"lottie",
		props:{
			src:{
				type:String,
				default:'https://assets2.lottiefiles.com/packages/lf20_ca0xjdgv.json'
			},
			width:{
				type:String,
				default:'200px'
			},
			height:{
				type:String,
				default:'200px'
			}
		}
	}
</script>
