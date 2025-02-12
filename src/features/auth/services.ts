import { api } from '@/services/api'

import { AuthBody, AuthResponseApi, EmailLinkBody, EmailLinkResponse, TokenBody } from './types'
import { authResponseAdapter } from './adapters'

export async function emailLink({ email }: EmailLinkBody) {
	return api.post<EmailLinkResponse>('/auth/email-link', { email }).then(r => r.data)
}

export async function auth({ authType, token }: AuthBody) {
	return api.post<AuthResponseApi>(`/auth/${authType}`, { magic_token: token }).then(r => {
		return authResponseAdapter(r.data)
	})
}

export async function refresh({ token }: TokenBody) {
	return api.post<AuthResponseApi>('/auth/refresh', { refresh_token: token }).then(r => {
		return authResponseAdapter(r.data)
	})
}
