import {
	db
} from '/utils/request.js'

export function getAccount(form) {
	return db('account')
}

export function addAccount(form) {
	return db('account', {
		method: 'add',
		...form
	})
}
