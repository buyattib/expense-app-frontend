import { z } from 'zod'
import {
	currencyApiSchema,
	accountTypeApiSchema,
	accountApiSchema,
	accountCreateSchema,
	accountExtendedApiSchema,
	subAccountApiSchema,
	subAccountExtendedApiSchema,
} from './schemas'

// Api types

export type CurrencyApi = z.infer<typeof currencyApiSchema>
export type AccountTypeApi = z.infer<typeof accountTypeApiSchema>
export type AccountApi = z.infer<typeof accountApiSchema>
export type SubAccountApi = z.infer<typeof subAccountApiSchema>

export type SubAccountExtendedApi = z.infer<typeof subAccountExtendedApiSchema>
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
	userId: AccountApi['user_id']
	accountTypeId: AccountApi['account_type_id']
}

export type SubAccount = {
	id: SubAccountApi['id']
	balance: SubAccountApi['balance']
	accountId: SubAccountApi['account_id']
	currencyId: SubAccountApi['currency_id']
}

export type SubAccountExtended = SubAccount & {
	currency: Currency
}

export type AccountExtended = Account & {
	accountType: AccountType
	subAccounts: SubAccountExtended[]
}

// Form types

export type AccountCreate = z.infer<typeof accountCreateSchema>
