import { z } from 'zod'

// Api schemas

export const currencyApiSchema = z.object({
	id: z.string(),
	name: z.string(),
	code: z.string(),
})

export const accountTypeApiSchema = z.object({
	id: z.string(),
	name: z.string(),
	code: z.string(),
	description: z.string().optional().nullable(),
})

export const accountApiSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().optional().nullable(),

	user_id: z.string(),
	account_type_id: z.string(),
})

export const subAccountApiSchema = z.object({
	id: z.string(),
	balance: z.number().int(),

	account_id: z.string(),
	currency_id: z.string(),
})

// Extended

export const subAccountExtendedApiSchema = subAccountApiSchema.extend({
	currency: currencyApiSchema,
})

export const accountExtendedApiSchema = accountApiSchema.extend({
	account_type: accountTypeApiSchema,
	sub_accounts: subAccountExtendedApiSchema.array(),
})

// Form Schemas

export const subAccountCreateSchema = z.object({
	balance: z.coerce
		.number({ required_error: 'Balance is required' })
		.nonnegative({
			message: 'Balance must be 0 or greater',
		})
		.transform(val => window.Math.round(val * 100)),
	currencyId: z.string().min(1, { message: 'Currency is required' }),
})

export const accountCreateSchema = z.object({
	name: z
		.string()
		.min(1, { message: 'Name is required' })
		.max(50, { message: 'Must be 50 or fewer characters long' }),
	description: z.string().optional(),
	accountTypeId: z.string().min(1, { message: 'Account type is required' }),
	subAccounts: subAccountCreateSchema
		.array()
		.min(1, { message: 'At least one supported currency is required' }),
})
