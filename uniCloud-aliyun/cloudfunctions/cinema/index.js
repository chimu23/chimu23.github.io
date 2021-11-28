'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event : ', event)
	const {
		action,
		params
	} = event
	const result = await eval(action)(params)
	//返回数据给客户端
	return result
};

const search = async function({
	wd
}) {
	const {
		data: {
			list = []
		}
	} = await uniCloud.httpclient.request('https://api.apibdzy.com/api.php/provide/vod', {
		method: 'get',
		data: {
			ac: 'detail',
			wd
		},
		// contentType: 'json', // 指定以application/json发送data内的数据
		dataType: 'json' // 指定返回值为json格式，自动进行parse
	})
	return list
}
