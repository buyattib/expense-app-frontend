import { api } from '@/services'
import { EmailLinkBody, EmailLinkResponse } from './types'

export function emailLink({ email }: EmailLinkBody) {
	return api.post<EmailLinkResponse>('/email-link', { email })
}
