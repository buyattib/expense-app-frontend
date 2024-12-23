import { accountAdapter } from '@/features/account'
import {
	TransactionCategoryApi,
	TransactionCategory,
	TransactionApi,
	Transaction,
	TransactionExtendedApi,
	TransactionExtended,
} from './types'

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

export function transactionExtendedAdapter(a: TransactionExtendedApi): TransactionExtended {
	return {
		...transactionAdapter(a),
		transactionCategory: transactionCategoryAdapter(a.transaction_category),
		account: accountAdapter(a.account),
	}
}
