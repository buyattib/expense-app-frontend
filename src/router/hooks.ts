import { useLocation } from 'wouter'
import { PRIVATE_ROUTES } from './routes'

export function usePrivateRoute() {
	const [location, _] = useLocation()

	const privateRoutes = Object.values(PRIVATE_ROUTES) as string[]

	return privateRoutes.includes(location)
}
