'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event.params)
	const {
		action,
		params
	} = event
	return await eval(action)(params)
};

const getList = ({name}) => new Promise(resolve => {
	resolve({
		items: [{
				title: name,
				value: 1,
				checked: true
			},
			{
				title: '123',
				value: 123,
				checked: false
			},
		]
	})
})
