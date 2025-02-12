import { lazy, Suspense } from 'react'
import { Switch, Route } from 'wouter'
import { LoaderCircleIcon } from 'lucide-react'

import { PUBLIC_ROUTES, PRIVATE_ROUTES } from './routes'

import { PublicLayout } from '@/components/layout/public-layout'
import { PrivateLayout } from '@/components/layout/private-layout'

// Public Pages
import { Login } from '@/pages/auth/login'
import { EmailSent } from '@/pages/auth/email-sent'
import { ConfirmContainer as Confirm } from '@/pages/auth/confirm'
import { NotFound } from '@/pages/not-found/not-found'

// Protected Pages
const Dashboard = lazy(async () => ({
	default: (await import('@/pages/dashboard/dashboard')).Dashboard,
})) // or export default
const Settings = lazy(async () => ({
	default: (await import('@/pages/settings/settings')).Settings,
}))
const Accounts = lazy(async () => ({
	default: (await import('@/pages/accounts/accounts')).Accounts,
}))
const Transactions = lazy(async () => ({
	default: (await import('@/pages/transactions/transactions')).Transactions,
}))

const publicRoutes = [
	{ path: PUBLIC_ROUTES.LOGIN, component: Login },
	{ path: PUBLIC_ROUTES.EMAIL_SENT, component: EmailSent },
	{
		path: PUBLIC_ROUTES.CONFIRM,
		component: Confirm,
	},
]

const protectedRoutes = [
	{ path: PRIVATE_ROUTES.INDEX, component: Dashboard },
	{ path: PRIVATE_ROUTES.DASHBOARD, component: Dashboard },
	{ path: PRIVATE_ROUTES.ACCOUNTS, component: Accounts },
	{ path: PRIVATE_ROUTES.TRANSACTIONS, component: Transactions },
	{ path: PRIVATE_ROUTES.SETTINGS, component: Settings },
]

export function Router() {
	return (
		<Switch>
			{publicRoutes.map(route => {
				const Component = route.component
				return (
					<Route path={route.path} key={route.path}>
						<PublicLayout>
							<Component />
						</PublicLayout>
					</Route>
				)
			})}

			<Suspense
				fallback={
					<div className='flex justify-center items-center h-full'>
						<LoaderCircleIcon className='w-10 h-10 animate-spin' />
					</div>
				}
			>
				{protectedRoutes.map(route => {
					const Component = route.component
					return (
						<Route path={route.path} key={route.path}>
							<PrivateLayout>
								<Component />
							</PrivateLayout>
						</Route>
					)
				})}
			</Suspense>

			<Route component={NotFound} />
		</Switch>
	)
}
