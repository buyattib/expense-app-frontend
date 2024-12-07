import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { AuthResponse } from '@/pages/auth'

type AuthStoreState = {
	accessToken: AuthResponse['accessToken'] | null
	refreshToken: AuthResponse['refreshToken'] | null
	expiresIn: AuthResponse['expiresIn'] | null
	uid: AuthResponse['uid'] | null
}

type AuthStoreActions = {
	update: (data: AuthResponse) => void
	remove: () => void
}

type AuthStore = AuthStoreState & AuthStoreActions

const initialState: AuthStoreState = {
	accessToken: null,
	refreshToken: null,
	uid: null,
	expiresIn: null,
}

export const useAuthStore = create<AuthStore>()(
	persist(
		set => ({
			...initialState,
			update: data =>
				set(() => ({
					accessToken: data.accessToken,
					refreshToken: data.refreshToken,
					expiresIn: data.expiresIn,
					uid: data.uid,
				})),
			remove: () => set(() => ({ ...initialState })),
		}),
		{ name: 'authStore' },
	),
)
