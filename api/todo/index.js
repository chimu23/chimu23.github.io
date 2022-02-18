import {
	db
} from '/utils/request'

export function getList() {
	return db('todolist')
}

export function addTodo({
	title,
	note
}) {
	return db('todolist', {
		method: 'add',
		title
	})
}

export function updateTodo(_id, title, note) {
	return db('todolist', {
		method: 'put',
		_id,
		title,
		note
	})
}

export function deleteTodo(_id) {
	return db('todolist', {
		method: 'delete',
		_id
	})
}
