import { api } from '@/services/api'

import { UserApi } from './types'
import { userAdapter } from './adapters'

export async function getUserInfo() {
	return api.get<UserApi>(`/users/me`).then(r => {
		return userAdapter(r.data)
	})
}
