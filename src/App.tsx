import { Toaster } from '@/components/ui/sonner'

import { ThemeProvider } from './context'
import { Router } from './router'

function App() {
	return (
		<div className='h-[100dvh]'>
			<ThemeProvider defaultTheme='light' storageKey='ui-theme'>
				<Router />
				<Toaster />
			</ThemeProvider>
		</div>
	)
}

export default App
