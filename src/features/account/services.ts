import { api, requestWrapper } from '@/services'

import {
	type CurrencyApi,
	type AccountExtendedApi,
	type AccountTypeApi,
	type AccountCreate,
	type AccountApi,
} from './types'
import {
	currencyAdapter,
	accountTypeAdapter,
	accountExtendedAdapter,
	accountAdapter,
} from './adapters'
import { accountTypeApiSchema, currencyApiSchema, accountExtendedApiSchema } from './schemas'

// currency

export const getCurrencies = () =>
	requestWrapper(async () => {
		return api
			.get<CurrencyApi[]>('/currencies')
			.then(result => result.data.map(c => currencyAdapter(currencyApiSchema.parse(c))))
	})

// account type

export const getAccountTypes = () =>
	requestWrapper(async () => {
		return api
			.get<AccountTypeApi[]>('/account-types')
			.then(result =>
				result.data.map(at => accountTypeAdapter(accountTypeApiSchema.parse(at))),
			)
	})

// account

export const getAccounts = () =>
	requestWrapper(async () => {
		return api
			.get<AccountExtendedApi[]>('/accounts')
			.then(result =>
				result.data.map(a => accountExtendedAdapter(accountExtendedApiSchema.parse(a))),
			)
	})

export async function createAccount({
	name,
	description,
	accountTypeId,
	subAccounts,
}: AccountCreate) {
	return api
		.post<AccountApi>('/accounts', {
			name,
			description,
			account_type_id: accountTypeId,
			sub_accounts: subAccounts.map(sa => ({
				currency_id: sa.currencyId,
				balance: sa.balance,
			})),
		})
		.then(r => accountAdapter(r.data))
}
