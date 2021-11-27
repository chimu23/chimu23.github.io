let DB = uniCloud.database()

export default async function http(database, {
	method = 'get',
	...payload
} = {}) {
	let sql = `collection('${database}')`
	let promise = null
	let result = null
	switch (method.toLowerCase()) {
		case 'get':
			result = await DB.collection(database).get({
				getCount: true
			})
			break
		case 'add':
			result = await DB.collection(database).add(payload)
			break
		case 'put':
			const {
				_id, ...args
			} = payload
			result = await DB.collection(database).where({
				_id
			}).update(args)
			break
		case 'delete':
			result = await DB.collection(database).where(payload).remove()
			break

	}
	const {
		result: {
			code = 0,
			...resp
		}
	} = result
	if (code === 0) {
		return Promise.resolve(resp)
	}
}
