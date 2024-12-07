import {
	AccountTypeApi,
	AccountType,
	AccountApi,
	Account,
	Currency,
	CurrencyApi,
	AccountExtendedApi,
	AccountExtended,
} from './types'

export function currencyAdapter(c: CurrencyApi): Currency {
	return {
		...c,
	}
}

export function accountTypeAdapter(at: AccountTypeApi): AccountType {
	return {
		...at,
	}
}

export function accountAdapter(a: AccountApi): Account {
	return {
		id: a.id,
		name: a.name,
		description: a.description,
		balance: a.balance,
		userId: a.user_id,
		currencyId: a.currency_id,
		accountTypeId: a.account_type_id,
	}
}

export function accountExtendedAdapter(a: AccountExtendedApi): AccountExtended {
	return {
		...accountAdapter(a),
		currency: currencyAdapter(a.currency),
		accountType: accountTypeAdapter(a.account_type),
	}
}
