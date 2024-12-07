export type UserApi = {
	id: string
	email: string
	first_name: string
	last_name: string
}

export type User = {
	id: UserApi['id']
	email: UserApi['email']
	firstName: UserApi['first_name']
	lastName: UserApi['last_name']
}
