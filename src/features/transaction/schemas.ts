import { z } from 'zod'
import { TransactionTypeEnum } from './constants'

// Api schemas

export const transactionCategoryApiSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().optional().nullable(),
	user_id: z.string(),
})

export const transactionApiSchema = z.object({
	id: z.string(),
	date: z.string().date(),
	amount: z.number().int(),
	description: z.string().optional().nullable(),
	transaction_type: z.string(),

	user_id: z.string(),
	transaction_category_id: z.string(),
	account_id: z.string(),
})

// Form Schemas

export const transactionCategoryCreateSchema = z.object({
	name: z
		.string()
		.min(1, { message: 'Name is required' })
		.max(50, { message: 'Must be 50 or fewer characters long' }),
	description: z.string().optional(),
})

export const transactionCreateSchema = z.object({
	date: z.string().min(1, { message: 'Date is required' }).date(),
	amount: z.coerce
		.number({ required_error: 'Balance is required' })
		.positive({
			message: 'Balance must be positive',
		})
		.transform(val => window.Math.round(val * 100)),
	description: z.string().optional(),
	transactionType: TransactionTypeEnum,

	transactionCategoryId: z.string().min(1, { message: 'Transaction category is required' }),
	accountId: z.string().min(1, { message: 'Account is required' }),
})
