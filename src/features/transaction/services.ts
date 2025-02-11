import { api } from '@/services'

import {
	type TransactionCategoryApi,
	type TransactionApi,
	type TransactionCategoryCreate,
	type TransactionCreate,
	type TransactionExtended,
} from './types'
import {
	transactionCategoryAdapter,
	transactionAdapter,
	transactionExtendedAdapter,
} from './adapters'
import { transactionCategoryApiSchema, transactionExtendedApiSchema } from './schemas'

// transaction cateogry

export const getTransactionCategories = () =>
	api
		.get<TransactionCategoryApi[]>('/transaction-categories')
		.then(result =>
			result.data.map(tc =>
				transactionCategoryAdapter(transactionCategoryApiSchema.parse(tc)),
			),
		)

export async function createTransactionCategory({ name, description }: TransactionCategoryCreate) {
	return api
		.post<TransactionCategoryApi>('/transaction-categories', {
			name,
			description,
		})
		.then(r => transactionCategoryAdapter(r.data))
}

// transaction

export const getTransactions = () =>
	api
		.get<TransactionExtended[]>('/transactions')
		.then(result =>
			result.data.map(t => transactionExtendedAdapter(transactionExtendedApiSchema.parse(t))),
		)

export async function createTransaction({
	date,
	amount,
	transactionType,
	description,
	transactionCategoryId,
	accountId,
}: TransactionCreate) {
	return api
		.post<TransactionApi>('/transactions', {
			date,
			amount,
			transaction_type: transactionType,
			description,
			transaction_category_id: transactionCategoryId,
			account_id: accountId,
		})
		.then(r => transactionAdapter(r.data))
}
