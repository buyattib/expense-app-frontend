import { create } from 'zustand'
import { User } from '@/features/user'

type UserStoreState = {
	user: User | null
}

type UserStoreActions = {
	update: (user: User) => void
	remove: () => void
}

type UserStore = UserStoreState & UserStoreActions

const initialState: UserStoreState = {
	user: null,
}

export const useUserStore = create<UserStore>()(set => ({
	...initialState,
	update: user =>
		set(() => ({
			user: user,
		})),
	remove: () => set(() => ({ ...initialState })),
}))
