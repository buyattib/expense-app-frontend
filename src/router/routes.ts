export const PUBLIC_ROUTES = {
	LOGIN: '/login',
	EMAIL_SENT: '/email-sent',
	CONFIRM: '/confirm/:authType',
} as const

export const PRIVATE_ROUTES = {
	INDEX: '/',
	DASHBOARD: '/dashboard',
	SETTINGS: '/settings',
} as const
