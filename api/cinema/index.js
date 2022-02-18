import {
	clound
} from "../../utils/request.js"
export const searchByWD = function(wd) {
	return clound('cinema/search', {
		wd
	})
	// return cloundRequest('https://api.apibdzy.com/api.php/provide/vod', {
	// 	mehtod: 'get',
	// 	params: {
	// 		ac: 'detail',
	// 		wd
	// 	}
	// })
}
