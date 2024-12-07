import { z } from 'zod'
import {
	currencyApiSchema,
	accountTypeApiSchema,
	accountApiSchema,
	accountCreateSchema,
	accountExtendedApiSchema,
} from './schemas'

// Api types

export type CurrencyApi = z.infer<typeof currencyApiSchema>
export type AccountTypeApi = z.infer<typeof accountTypeApiSchema>
export type AccountApi = z.infer<typeof accountApiSchema>
export type AccountExtendedApi = z.infer<typeof accountExtendedApiSchema>

// Api adapted types

export type Currency = {
	id: CurrencyApi['id']
	name: CurrencyApi['name']
	code: CurrencyApi['code']
}

export type AccountType = {
	id: AccountTypeApi['id']
	name: AccountTypeApi['name']
	code: AccountTypeApi['code']
	description?: AccountTypeApi['description']
}

export type Account = {
	id: AccountApi['id']
	name: AccountApi['name']
	description?: AccountApi['description']
	balance: AccountApi['balance']
	userId: AccountApi['user_id']
	currencyId: AccountApi['currency_id']
	accountTypeId: AccountApi['account_type_id']
}

export type AccountExtended = Account & {
	currency: Currency
	accountType: AccountType
}

// Form types

export type AccountCreate = z.infer<typeof accountCreateSchema>
