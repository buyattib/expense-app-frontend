import { Toaster } from '@/components/ui/sonner'

import { ErrorBoundary } from '@/components/error-boundary/error-boundary'

import { QueryProvider } from './context/query-provider'
import { ThemeProvider } from './context/theme-provider'
import { AuthWrapper } from './context/auth-wrapper'
import { RoutesGuard } from './context/routes-guard'
import { InitialData } from './context/initial-data'

import { Router } from './router/router'

function App() {
	return (
		<ErrorBoundary>
			<QueryProvider>
				<ThemeProvider defaultTheme='light' storageKey='ui-theme'>
					<AuthWrapper>
						<RoutesGuard>
							<InitialData />
							<Router />
							<Toaster richColors={true} />
						</RoutesGuard>
					</AuthWrapper>
				</ThemeProvider>
			</QueryProvider>
		</ErrorBoundary>
	)
}

export default App
