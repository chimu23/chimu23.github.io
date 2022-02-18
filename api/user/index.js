import {
	clound
} from '/utils/request'

const DB = uniCloud.database()


export async function login(username, password) {
	return clound('user/login', {
		username,
		password
	})
}
