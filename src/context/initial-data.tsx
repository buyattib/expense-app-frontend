import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { usePrivateRoute } from '@/router'
import { useGlobalStore } from '@/store'

import { getCurrencies, getAccountTypes } from '@/features/account'

export function InitialData({ children }: { children: React.ReactNode }) {
	const isPrivateRoute = usePrivateRoute()
	const setData = useGlobalStore(state => state.setAll)

	useQuery({
		queryKey: ['initial-data'],
		enabled: isPrivateRoute,
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

	return children
}
