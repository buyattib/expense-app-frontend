import { z } from 'zod'
import axios, { AxiosError } from 'axios'
import { getAccessToken } from './utils'

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
	error => {
		return Promise.reject(error)
	},
)
