import { Route, Redirect, RouteProps } from 'wouter'
import { PUBLIC_ROUTES } from '../routes'

export function ProtectedRoute({ children, ...rest }: RouteProps) {
	const isLoggedIn = true

	if (!isLoggedIn) {
		return <Redirect to={PUBLIC_ROUTES.LOGIN} />
	}

	return <Route {...rest}>{children}</Route>
}
