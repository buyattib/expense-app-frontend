import { z } from 'zod'
import axios, { AxiosError } from 'axios'

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
})

api.interceptors.request.use(
	config => {
		const token = getAccessToken()
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => Promise.reject(error),
)

api.interceptors.response.use(
	response => response,
	(error: AxiosError) => {
		if (error.response) {
			// Handle known errors, like 401 or 403 for auth issues

			if (error.response.status === 401) {
				// Redirect to login page or handle token refresh
			}
		}

		return Promise.reject(error)
	},
)

export const handleError = (error: unknown) => {
	if (axios.isAxiosError(error)) {
		if (error.response?.data) {
			const msg = error.response.data.detail || error.response.data.message
			if (msg) return msg
		}

		return error.message
	} else {
		return (error as Error).message
	}
}

function getAccessToken() {
	try {
		const authStoreString = window.localStorage.getItem('authStore')
		if (!authStoreString) return null

		const authStore = window.JSON.parse(authStoreString)
		return authStore.state.accessToken as string
	} catch (e) {
		console.log(e)
		return null
	}
}

export async function requestWrapper<T>(asyncFunction: () => Promise<T>) {
	try {
		return await asyncFunction()
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.log(error)
			throw new Error('Error validating data')
		}
		throw error
	}
}
