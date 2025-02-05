import { lazy, Suspense } from 'react'
import { Switch, Route } from 'wouter'
import { LoaderCircleIcon } from 'lucide-react'

import { PUBLIC_ROUTES, PRIVATE_ROUTES } from './routes'

// Public Pages
import { Login, Confirm, EmailSent, AuthType } from '@/pages/auth'
import { NotFound } from '@/pages/not-found'

// Protected Pages
const Dashboard = lazy(async () => ({ default: (await import('@/pages/dashboard')).Dashboard })) // or export default
const Settings = lazy(async () => ({ default: (await import('@/pages/settings')).Settings }))
const Accounts = lazy(async () => ({ default: (await import('@/pages/accounts')).Accounts }))
const Transactions = lazy(async () => ({
	default: (await import('@/pages/transactions')).Transactions,
}))

export function Router() {
	return (
		<Switch>
			<Route path={PUBLIC_ROUTES.LOGIN} component={Login} />
			<Route path={PUBLIC_ROUTES.EMAIL_SENT} component={EmailSent} />
			<Route
				path={PUBLIC_ROUTES.CONFIRM}
				component={props => {
					return <Confirm authType={props.params.authType as AuthType} />
				}}
			/>

			<Suspense
				fallback={
					<div className='flex justify-center items-center h-full'>
						<LoaderCircleIcon className='w-10 h-10 animate-spin' />
					</div>
				}
			>
				<Route path={PRIVATE_ROUTES.INDEX} component={Dashboard} />
				<Route path={PRIVATE_ROUTES.DASHBOARD} component={Dashboard} />
				<Route path={PRIVATE_ROUTES.ACCOUNTS} component={Accounts} />
				<Route path={PRIVATE_ROUTES.TRANSACTIONS} component={Transactions} />
				<Route path={PRIVATE_ROUTES.SETTINGS} component={Settings} />
			</Suspense>

			<Route component={NotFound} />
		</Switch>
	)
}
