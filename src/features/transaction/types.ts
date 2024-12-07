import { z } from 'zod'
import {
	transactionApiSchema,
	transactionCategoryApiSchema,
	transactionCategoryCreateSchema,
	transactionCreateSchema,
} from './schemas'
import { TransactionTypeEnum } from './constants'

// Api types

export type TransactionType = z.infer<typeof TransactionTypeEnum>

export type TransactionCategoryApi = z.infer<typeof transactionCategoryApiSchema>
export type TransactionApi = z.infer<typeof transactionApiSchema>

// Api adapted types

export type TransactionCategory = {
	id: TransactionCategoryApi['id']
	name: TransactionCategoryApi['name']
	description?: TransactionCategoryApi['description']
	userId: TransactionCategoryApi['user_id']
}

export type Transaction = {
	id: TransactionApi['id']
	date: TransactionApi['date']
	amount: TransactionApi['amount']
	description?: TransactionApi['description']
	transactionType: TransactionApi['transaction_type']

	userId: TransactionApi['user_id']
	transactionCategoryId: TransactionApi['transaction_category_id']
	accountId: TransactionApi['account_id']
}

// Form types

export type TransactionCreate = z.infer<typeof transactionCreateSchema>
export type TransactionCategoryCreate = z.infer<typeof transactionCategoryCreateSchema>
