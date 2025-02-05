import {
	AccountTypeApi,
	AccountType,
	AccountApi,
	Account,
	Currency,
	CurrencyApi,
	AccountExtendedApi,
	AccountExtended,
	SubAccountApi,
	SubAccount,
	SubAccountExtendedApi,
	SubAccountExtended,
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

export function subAccountAdapter(a: SubAccountApi): SubAccount {
	return {
		id: a.id,
		balance: a.balance,
		accountId: a.account_id,
		currencyId: a.currency_id,
	}
}

export function accountAdapter(a: AccountApi): Account {
	return {
		id: a.id,
		name: a.name,
		description: a.description,
		userId: a.user_id,
		accountTypeId: a.account_type_id,
	}
}

export function subAccountExtendedAdapter(a: SubAccountExtendedApi): SubAccountExtended {
	return {
		...subAccountAdapter(a),
		currency: currencyAdapter(a.currency),
	}
}

export function accountExtendedAdapter(a: AccountExtendedApi): AccountExtended {
	return {
		...accountAdapter(a),
		accountType: accountTypeAdapter(a.account_type),
		subAccounts: a.sub_accounts.map(subAccountAdapter),
	}
}
