<script>
export default {
	globalData: {
		uid: '61aca11acd02c30001f3279f'
	},
	watch: {
		'$route.fullPath'(n, o) {
			if (!uni.getStorageSync('uni_id') && n !== '/') {
				uni.redirectTo({
					url: '/pages/login/index'
				});
			}
		}
	}
};
</script>
<style>
@media screen and (min-width: 100px) {
	html {
		font-size: 16px !important;
	}
}
@media screen and (min-width: 600px) {
	html {
		font-size: 26px !important;
	}
}
</style>
