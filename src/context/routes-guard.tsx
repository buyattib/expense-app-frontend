import { Redirect } from 'wouter'

import { useAuthStore } from '@/store/auth'
import { useUserStore } from '@/store/user'

import { PUBLIC_ROUTES } from '@/router/routes'
import { usePrivateRoute } from '@/router/hooks'

export function RoutesGuard({ children }: { children: React.ReactNode }) {
	const auth = useAuthStore()
	const user = useUserStore(store => store.user)

	const isPrivateRoute = usePrivateRoute()

	const isLoggedIn = !!auth.accessToken && !!auth.refreshToken && !!user?.id && !!user?.email

	if (!isLoggedIn && isPrivateRoute) {
		return <Redirect to={PUBLIC_ROUTES.LOGIN} />
	}

	return children
}
