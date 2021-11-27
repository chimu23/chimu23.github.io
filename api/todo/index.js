import cloundHttp from '/utils/request'

export function getList() {
	return cloundHttp('todolist')
}

export function addTodo({
	title,
	note
}) {
	return cloundHttp('todolist', {
		method: 'add',
		title
	})
}

export function updateTodo(_id, title, note) {
	return cloundHttp('todolist', {
		method: 'put',
		_id,
		title,
		note
	})
}

export function deleteTodo(_id) {
	return cloundHttp('todolist', {
		method: 'delete',
		_id
	})
}
