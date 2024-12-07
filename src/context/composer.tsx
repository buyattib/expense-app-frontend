import { Layout } from '@/components/layout'

import { QueryProvider } from './query-provider'
import { ThemeProvider } from './theme-provider'
import { AuthWrapper } from './auth-wrapper'
import { RoutesGuard } from './routes-guard'
import { InitialData } from './initial-data'

type Children = { children: React.ReactNode }

const providers = [
	({ children }: Children) => <QueryProvider>{children}</QueryProvider>,
	({ children }: Children) => (
		<ThemeProvider defaultTheme='light' storageKey='ui-theme'>
			{children}
		</ThemeProvider>
	),
	({ children }: Children) => <AuthWrapper>{children}</AuthWrapper>,
	({ children }: Children) => <RoutesGuard>{children}</RoutesGuard>,
	({ children }: Children) => <InitialData>{children}</InitialData>,
	({ children }: Children) => <Layout>{children}</Layout>,
]

export const ProviderComposer = ({ children }: Children) => {
	return providers.reduceRight(
		(accumulatedElements, CurrentProvider) => (
			<CurrentProvider>{accumulatedElements}</CurrentProvider>
		),
		children,
	)
}
