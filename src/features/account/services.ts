import { api } from '@/services/api'

import { Pagination, PaginationResponse } from '@/models/pagination'
import { paginationApiAdapter } from '@/adapters/pagination'

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
	api
		.get<CurrencyApi[]>('/currencies')
		.then(result => result.data.map(c => currencyAdapter(currencyApiSchema.parse(c))))

// account type

export const getAccountTypes = () =>
	api
		.get<AccountTypeApi[]>('/account-types')
		.then(result => result.data.map(at => accountTypeAdapter(accountTypeApiSchema.parse(at))))

// account

export const getAccounts = ({ page, perPage }: Pagination) =>
	api
		.get<
			PaginationResponse<AccountExtendedApi>
		>('/accounts', { params: { ...paginationApiAdapter({ page, perPage }) } })
		.then(result => ({
			total: result.data.total,
			items: result.data.items.map(a =>
				accountExtendedAdapter(accountExtendedApiSchema.parse(a)),
			),
		}))

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
