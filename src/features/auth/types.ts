import { z } from 'zod'

import { User, UserApi } from '@/features/user'
import { AUTH_TYPE } from './constants'
import { loginSchema } from './schemas'

export type LoginSchema = z.infer<typeof loginSchema>

export type AuthType = (typeof AUTH_TYPE)[keyof typeof AUTH_TYPE]

export type EmailLinkBody = {
	email: string
}

export type EmailLinkResponse = {
	message: string
}

export type TokenBody = {
	token: string
}

export type AuthBody = {
	authType: AuthType
} & TokenBody

export type AuthResponseApi = {
	access_token: string
	refresh_token: string
	expires_in: number
	uid: string
	info: UserApi
}

export type AuthResponse = {
	accessToken: AuthResponseApi['access_token']
	refreshToken: AuthResponseApi['refresh_token']
	expiresIn: AuthResponseApi['expires_in']
	uid: AuthResponseApi['uid']
	info: User
}
