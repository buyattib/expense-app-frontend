import { userAdapter } from '@/features/user'

import { AuthResponse, AuthResponseApi } from './types'

export function authResponseAdapter(r: AuthResponseApi): AuthResponse {
	return {
		accessToken: r.access_token,
		refreshToken: r.refresh_token,
		expiresIn: r.expires_in,
		uid: r.uid,
		info: userAdapter(r.info),
	}
}
