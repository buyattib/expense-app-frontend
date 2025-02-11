import { z } from 'zod'
import axios from 'axios'

export function handleAxiosError(error: unknown) {
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

export function handleZodError(error: unknown) {
	if (error instanceof z.ZodError) {
		console.log(error)
		throw new Error('Error validating data')
	}
	throw error
}
