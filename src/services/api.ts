import axios from 'axios'

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
})

api.interceptors.request.use(
	config => {
		const token = localStorage.getItem('access_token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => Promise.reject(error),
)

api.interceptors.response.use(
	response => response,
	error => {
		if (error.response) {
			// Handle known errors, like 401 or 403 for auth issues
			if (error.response.status === 401) {
				// Redirect to login page or handle token refresh
			}
		}
		return Promise.reject(error)
	},
)
