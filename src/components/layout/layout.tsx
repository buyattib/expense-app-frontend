import { usePrivateRoute } from '@/router'

import { PrivateLayout } from './private-layout'
import { PublicLayout } from './public-layout'

export function Layout({ children }: { children: React.ReactNode }) {
	const isPrivateRoute = usePrivateRoute()

	const LayoutComponent = isPrivateRoute ? PrivateLayout : PublicLayout

	return <LayoutComponent>{children}</LayoutComponent>
}
