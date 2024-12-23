import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'

export function PrivateLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider className=''>
			<AppSidebar />
			<main className='mx-auto container py-8 px-4'>{children}</main>
		</SidebarProvider>
	)
}
