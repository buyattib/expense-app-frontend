import { useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { LoaderCircleIcon } from 'lucide-react'

import { useAuthStore, useUserStore } from '@/store'
import { refresh } from '@/features/auth'

export function AuthWrapper({ children }: { children: React.ReactNode }) {
	// on app mount, it will get the token from local storage
	const refreshToken = useAuthStore(state => state.refreshToken)

	const updateAuthStore = useAuthStore(state => state.update)
	const removeAuthStore = useAuthStore(state => state.remove)

	const updateUserStore = useUserStore(state => state.update)
	const removeUserStore = useUserStore(state => state.remove)

	// to avoid re-fetching when refreshToken is updated
	const isFirstRender = useRef(true)
	const enabled = !!refreshToken && isFirstRender.current

	// TODO: instead of refreshing the token could check if the current access token is still valid making a request to user/me
	const { isPending } = useQuery({
		queryKey: ['refresh'],
		queryFn: () =>
			refresh({ token: refreshToken as string })
				.then(response => {
					updateAuthStore(response)
					updateUserStore(response.info)
					return response
				})
				.catch(() => {
					removeAuthStore()
					removeUserStore()
					return false
				})
				.finally(() => {
					isFirstRender.current = false
				}),
		enabled,
	})

	if (!enabled) {
		isFirstRender.current = false
	}

	// isPending = true even when enabled = false
	if (enabled && isPending) {
		return (
			<div className='flex items-center justify-center h-full'>
				<LoaderCircleIcon className='w-10 h-10 animate-spin' />
			</div>
		)
	}

	return children
}
