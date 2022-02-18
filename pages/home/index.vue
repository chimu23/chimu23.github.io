<template>
	<navigator url="/pages/index/index" class="btn btn-info mr-3">todo</navigator>
	<navigator url="/pages/cinema/index" class="btn btn-info mr-3">cinema</navigator>
	<navigator url="/pages/account/index" class="btn btn-info mr-3">account</navigator>
</template>
<script>
import { reactive } from 'vue';
export default {
	data() {
		return {
			isVisible: false,
			value: '',
			desc: '这是一段描述信息',
			menuItems: [
				{
					name: '选项一',
					value: 0
				},
				{
					name: '选项二',
					value: 1
				},
				{
					name: '选项三',
					value: 2
				}
			]
		};
	},
	methods: {
		switchActionSheet() {
			this.isVisible = true;
		},
		chooseItem(item, index) {
			console.log(item, index);
		}
	}
};
// export default {
// 	components: {
// 		ActionSheet,
// 		Popup
// 	}
// 	data(){
// 		return {
// 			isVisible: false,
// 			value: '',
// 			desc: '这是一段描述信息',
// 			menuItems:  [
// 		{
// 			name: '选项一',
// 			value: 0
// 		},
// 		{
// 			name: '选项二',
// 			value: 1
// 		},
// 		{
// 			name: '选项三',
// 			value: 2
// 		}
// 	]
// 		}
// 	},

// 	methods:{
// 	switchActionSheet(){
// 		this.isVisible = true;
// 	}
// 	chooseItem(item, index){
// 		console.log(item, index);

// }
// }
</script>
