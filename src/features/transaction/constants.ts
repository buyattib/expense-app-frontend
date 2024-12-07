import { z } from 'zod'

export const TRANSACTION_TYPE = {
	EXPENSE: 'expense',
	INCOME: 'income',
} as const

export const TransactionTypeEnum = z.nativeEnum(TRANSACTION_TYPE)
