import http from '/utils/request'
const db = uniCloud.database()

export function getList() {
	return http('todolist')
}

export function addTodo({
	title,
	note
}) {
	return http('todolist', {
		method: 'add',
		title
	})
}

export function updateTodo(_id, title, note) {
	return http('todolist', {
		method: 'put',
		_id,
		title,
		note
	})
	// return http({
	// 	method: 'PUT',
	// 	url: '/proxy/todo',
	// 	data: {
	// 		_id,
	// 		title,
	// 		note,
	// 	},
	// })
}

export function deleteTodo(_id) {
	return http('todolist', {
		method: 'delete',
		_id
	})
}
