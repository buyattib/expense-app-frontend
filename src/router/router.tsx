import { lazy, Suspense } from 'react'
import { Switch } from 'wouter'

import { PUBLIC_ROUTES, PRIVATE_ROUTES } from './routes'
import { ProtectedRoute } from './components/protected-route'
import { PublicRoute } from './components/public-route'

// Public Pages
import { Login, Confirm } from '@/pages/auth'
import { Layout } from '@/components/layout'

// Protected Pages
const Home = lazy(async () => ({ default: (await import('@/pages/home')).Home })) // or export default
const Settings = lazy(async () => ({ default: (await import('@/pages/settings')).Settings }))

export function Router() {
	return (
		<Switch>
			<PublicRoute path={PUBLIC_ROUTES.LOGIN} component={Login}></PublicRoute>
			<PublicRoute path={PUBLIC_ROUTES.CONFIRM} component={Confirm}></PublicRoute>

			<Layout>
				<Suspense>
					<ProtectedRoute path={PRIVATE_ROUTES.INDEX}>
						<Home />
					</ProtectedRoute>
					<ProtectedRoute path={PRIVATE_ROUTES.HOME}>
						<Home />
					</ProtectedRoute>
					<ProtectedRoute path={PRIVATE_ROUTES.SETTINGS}>
						<Settings />
					</ProtectedRoute>
				</Suspense>
			</Layout>

			<PublicRoute component={() => <>404 not found</>}></PublicRoute>
		</Switch>
	)
}
