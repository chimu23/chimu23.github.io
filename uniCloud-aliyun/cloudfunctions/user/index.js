'use strict';
// 用户注册、登录
const uniID = require('uni-id')
const db = uniCloud.database();
exports.main = async function(event, context) {
	const {
		action,
		params
	} = event
	return eval(action)(params)
}

async function login({
	username,
	password
}) {
	let {
		affectedDocs
	} = await db.collection('uni-id-users').where({
		username
	}).get()
	if (affectedDocs) {
		return await uniID.login({ //支持传入任何值，比如可以直接传入mobile即可设置手机号码，切勿直接传入event否则这是一个极大的安全问题
			username,
			password
		})
	} else {
		return await uniID.register({ //支持传入任何值，比如可以直接传入mobile即可设置手机号码，切勿直接传入event否则这是一个极大的安全问题
			username,
			password
		})
	}
}

function getToken(unionid, password) {
	return new Promise(resolve => {
		const db = uniCloud.database();
		db.collection('uni-id-users').where({
			unionid
		}).get().then(async res => {
			const result = {}
			if (res.data.length === 0) {
				result.token = await register(unionid, password)
			} else {
				const {
					token
				} = await uniID.login({
					username: unionid,
					password,
				})
				result.token = token
			}
			resolve(result.token)
		})
	})
}
