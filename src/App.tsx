import { Toaster } from '@/components/ui/sonner'

import { ErrorBoundary } from '@/components/error-boundary'

import { ProviderComposer } from './context'
import { Router } from './router'

function App() {
	return (
		<ErrorBoundary>
			<ProviderComposer>
				<Router />
				<Toaster richColors={true} />
			</ProviderComposer>
		</ErrorBoundary>
	)
}

export default App
