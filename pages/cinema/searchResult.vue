<template>
	<div>
		<div v-for="(item,index) in list" @click="showPlayList(item)">{{item.vod_name}}</div>
		<Dialog v-model:isShow="isShowItems" width="80%">
			<div class="btn btn-info" v-for="(item,index) in playList" @click="toPlay(item,index)">{{item.label}}</div>
		</Dialog>
	</div>
</template>

<script>
import { searchByWD } from '../../api/cinema/index.js';
import Dialog from '../../components/Dialog/index.vue'
export default {
	components:{Dialog},
	onLoad({ wd }) {
		searchByWD(wd).then(({result})=>{
			this.list = result
		});
	},
	data(){
		return {
			list:[],
			playList:[],
			isShowItems:false
		}
	},
	methods:{
		showPlayList(cinema){
			let item = cinema.vod_play_url.split('#')
			this.playList = item.map(cinema=>{
				const label = cinema.split('$')[0]
				const value = cinema.split('$')[1]
				return {
					label,
					value
				}
			})
			this.isShowItems = true
		},
		toPlay(item,index){
			let playList = encodeURIComponent(JSON.stringify(this.playList))
			// console.log(params);
			// console.log(decodeURIComponent(params));
			uni.navigateTo({
				url:`/pages/cinema/detail?playList=${playList}&index=${index}`,
			})
		}
	}
};
</script>