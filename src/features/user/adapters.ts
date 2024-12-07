import { User, UserApi } from './types'

export function userAdapter(u: UserApi): User {
	return {
		id: u.id,
		email: u.email,
		firstName: u.first_name,
		lastName: u.last_name,
	}
}
