import { api, requestWrapper } from '@/services'

import {
	type TransactionCategoryApi,
	type TransactionApi,
	type TransactionCategoryCreate,
	TransactionCreate,
} from './types'
import { transactionCategoryAdapter, transactionAdapter } from './adapters'
import { transactionCategoryApiSchema, transactionApiSchema } from './schemas'

// transaction cateogry

export const getTransactionCategories = () =>
	requestWrapper(async () => {
		return api
			.get<TransactionCategoryApi[]>('/transaction-categories')
			.then(result =>
				result.data.map(tc =>
					transactionCategoryAdapter(transactionCategoryApiSchema.parse(tc)),
				),
			)
	})

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
	requestWrapper(async () => {
		return api
			.get<TransactionApi[]>('/transactions')
			.then(result => result.data.map(t => transactionAdapter(transactionApiSchema.parse(t))))
	})

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
