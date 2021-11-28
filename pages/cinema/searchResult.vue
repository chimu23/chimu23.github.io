<template>
	<div>
		<div v-for="(item,index) in list" @click="goDetail(item)">{{item.vod_name}}</div>
		<Dialog >
			<div class="btn btn-info">click</div>
		</Dialog>
	</div>
</template>

<script>
import { searchByWD } from '../../api/cinema/index.js';
import Dialog from '../../components/Dialog/index.vue'
export default {
	onLoad({ wd }) {
		searchByWD(wd).then(({result})=>{
			this.list = result
		});
	},
	data(){
		return {
			list:[],
			isShowItems:false
		}
	},
	methods:{
		goDetail(cinema){
			let item = cinema.vod_play_url.split('#')
			let list = []
			item = item.map(cinema=>{
				const label = cinema.split('$')[0]
				const value = cinema.split('$')[1]
				return {
					label,
					value
				}
			})
			this.isShowItems = true
			console.log(item);
		}
	}
};
</script>