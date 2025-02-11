import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useGlobalStore, useUserStore, useAuthStore } from '@/store'

import { getCurrencies, getAccountTypes } from '@/features/account'

export function InitialData() {
	const store = useAuthStore()
	const user = useUserStore(store => store.user)

	const setData = useGlobalStore(state => state.setAll)

	const isLoggedIn = !!store.accessToken && !!store.refreshToken && !!user?.id && !!user?.email

	useQuery({
		queryKey: ['initial-data'],
		enabled: isLoggedIn,
		queryFn: () =>
			Promise.all([getCurrencies(), getAccountTypes()])
				.then(([currencies, accountTypes]) => {
					setData({ currencies, accountTypes })
					return true
				})
				.catch(error => {
					console.log(error)
					toast.error('Error', {
						description: 'There was an error loading initial data',
					})
					return false
				}),
	})

	return <></>
}
