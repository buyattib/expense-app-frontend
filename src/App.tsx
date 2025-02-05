import { Toaster } from '@/components/ui/sonner'

import { ErrorBoundary } from '@/components/error-boundary'

import { QueryProvider, ThemeProvider, AuthWrapper, RoutesGuard, InitialData } from './context'
import { Router } from './router'
import { Layout } from './components/layout'

function App() {
	return (
		<ErrorBoundary>
			<QueryProvider>
				<ThemeProvider defaultTheme='light' storageKey='ui-theme'>
					<AuthWrapper>
						<RoutesGuard>
							<InitialData>
								<Layout>
									<Router />
									<Toaster richColors={true} />
								</Layout>
							</InitialData>
						</RoutesGuard>
					</AuthWrapper>
				</ThemeProvider>
			</QueryProvider>
		</ErrorBoundary>
	)
}

export default App
