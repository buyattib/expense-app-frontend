import { create } from 'zustand'
import { type AccountType } from '@/features/account'

import { type Currency } from '@/features/account'

type StoreState = {
	accountTypes: AccountType[]
	currencies: Currency[]
}

type StoreActions = {
	setAll: (data: StoreState) => void
}

type Store = StoreState & StoreActions

const initialState: StoreState = {
	currencies: [],
	accountTypes: [],
}

export const useGlobalStore = create<Store>()(set => ({
	...initialState,
	setAll: data =>
		set(() => ({
			...data,
		})),
}))
