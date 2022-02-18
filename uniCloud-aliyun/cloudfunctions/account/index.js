'use strict';
// 获取账号
const uniID = require('uni-id')
const db = uniCloud.database();
const dbCmd = db.command
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		uniIdToken,
		method,
		query
	} = event
	// uid 用户注册唯一ID
	const {
		uid
	} = await uniID.checkToken(uniIdToken)
	if (!uid) return {
		code: 301,
		msg: '非法用户'
	}
	const result = await eval(method)(uid,query)
	return {
		code: 0,
		result
	}

	// switch (action) {
	// 	case 'add': {
	// 		result = await addAccount(form, uid)
	// 		break
	// 	}
	// 	case 'delete': {
	// 		console.log(accountID);
	// 		result = await deleteAccuntByID(accountID, uid)
	// 		break
	// 	}
	// 	case 'update': {
	// 		result = await updateAccountByID(form)
	// 		break
	// 	}
	// }
	// return {
	// 	code: 0,
	// 	data: result
	// }

};
async function deleteAccountByID(uid, query) {
	const res = await db.collection('accounts').doc(query._id).remove()
	if (res.deleted === 1) {
		// const res2 = await db.collection('uni-id-users').doc(uid).update({
		// 	account_list: dbCmd.pull(id)
		// })
		// return res2
		return true
	}
}

// 增加账户
async function addAccount(uid,query) {
	query.desc = '描述'
	query.uid = uid
	const {
		id
	} = await db.collection('accounts').add(query)
	return {_id:id}
}
// 获取全部账户
async function getAccounts(uid) {
	const {data} = await db
		.collection('accounts')
		.where({
			uid:uid
		})
		.get();
		return data
}

// 更新创建账号数据
async function updateAccount(uid,query) {
	const docID = query._id
	delete query['_id']
	let res = await db.collection('accounts').doc(docID).update(query);
	if(res.updated === 1) return true
}
