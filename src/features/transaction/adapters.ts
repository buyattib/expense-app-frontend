import { TransactionCategoryApi, TransactionCategory, TransactionApi, Transaction } from './types'

export function transactionCategoryAdapter(tc: TransactionCategoryApi): TransactionCategory {
	return {
		id: tc.id,
		name: tc.name,
		description: tc.description,
		userId: tc.user_id,
	}
}

export function transactionAdapter(t: TransactionApi): Transaction {
	return {
		id: t.id,
		date: t.date,
		amount: t.amount,
		description: t.description,
		transactionType: t.transaction_type,

		userId: t.user_id,
		transactionCategoryId: t.transaction_category_id,
		accountId: t.account_id,
	}
}
