import { z } from 'zod'

export const loginSchema = z.object({
	email: z.string().email('Email is not valid'),
})

export const loginInitialValules = {
	email: '',
}

export type LoginSchema = z.infer<typeof loginSchema>
