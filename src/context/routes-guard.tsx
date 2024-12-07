import { Redirect } from 'wouter'

import { useUserStore, useAuthStore } from '@/store'

import { PUBLIC_ROUTES, usePrivateRoute } from '@/router'

export function RoutesGuard({ children }: { children: React.ReactNode }) {
	const store = useAuthStore()
	const user = useUserStore(store => store.user)

	const isPrivateRoute = usePrivateRoute()

	const isLoggedIn = !!store.accessToken && !!store.refreshToken && !!user?.id && !!user?.email

	if (!isLoggedIn && isPrivateRoute) {
		return <Redirect to={PUBLIC_ROUTES.LOGIN} />
	}

	return children
}
