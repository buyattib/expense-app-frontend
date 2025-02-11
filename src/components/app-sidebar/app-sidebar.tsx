import { Link, useLocation } from 'wouter'
import { ArrowLeftRightIcon, BookIcon, LogOutIcon, SettingsIcon } from 'lucide-react'

import { PRIVATE_ROUTES } from '@/router'
import { useAuthStore, useUserStore } from '@/store'

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Title } from '@/components/ui/title'
import { Button } from '@/components/ui/button'

export function AppSidebar() {
	const [location, _] = useLocation()

	const removeAuthStore = useAuthStore(state => state.remove)
	const removeUserStore = useUserStore(state => state.remove)

	const logout = () => {
		removeAuthStore()
		removeUserStore()
	}

	return (
		<Sidebar>
			<SidebarHeader className='flex flex-row gap-2 items-center justify-center'>
				<Title level='h6' size='sm'>
					<Link to={PRIVATE_ROUTES.INDEX}>Personal Finance App</Link>
				</Title>
			</SidebarHeader>
			<SidebarContent className='flex flex-col justify-between px-2'>
				<SidebarGroup className='py-4'>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton
									asChild
									size='lg'
									isActive={location === PRIVATE_ROUTES.ACCOUNTS}
								>
									<Link to={PRIVATE_ROUTES.ACCOUNTS}>
										<BookIcon />
										Accounts
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton
									asChild
									size='lg'
									isActive={location === PRIVATE_ROUTES.TRANSACTIONS}
								>
									<Link to={PRIVATE_ROUTES.TRANSACTIONS}>
										<ArrowLeftRightIcon />
										Transactions
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link to={PRIVATE_ROUTES.SETTINGS}>
										<SettingsIcon />
										Settings
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<Button variant='outline' onClick={logout}>
					<LogOutIcon />
					Logout
				</Button>
			</SidebarFooter>
		</Sidebar>
	)
}
