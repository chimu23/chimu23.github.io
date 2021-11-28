<script setup>
	import {ref} from 'vue'
	import EInput from '../../components/E/Form/EInput.vue'
	import ETab from '../../components/E/Tab/index.vue'
	
	const tabList = ref(["喜欢","看过"])
	const searchInput = ref('')
	
	const goSearch = ()=>{
		const {value: seatchValue} = searchInput
		if(!seatchValue.trim()) return uni.showToast({
			icon:'none',
			title:'关键词不能为空'
		})
		uni.navigateTo({
			url:`/pages/cinema/searchResult?wd=${seatchValue}`
		})
	}
</script>

<template>
	<div data-desc="搜索" class=" flex justify-between items-center px-5">
		<EInput v-model="searchInput" @confirm="goSearch()"></EInput>
		<svgIcon icon="icon-faxian" class=" w-10 h-10 ml-3"></svgIcon>
	</div>
	<ETab :list="tabList"></ETab>
</template>


