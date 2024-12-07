import { useAuthStore, useUserStore } from '@/store'
import { Button } from '@/components/ui/button'

export function PrivateLayout({ children }: { children: React.ReactNode }) {
	const removeAuthStore = useAuthStore(state => state.remove)
	const removeUserStore = useUserStore(state => state.remove)

	const logout = () => {
		removeAuthStore()
		removeUserStore()
	}

	return (
		<div className='flex flex-col gap-2 h-full'>
			<header className='py-4 px-8'>
				<nav className='flex flex-row justify-between'>
					<div></div>
					<div>User</div>
				</nav>
			</header>
			<main className='mx-auto container px-4 py-8 flex-grow'>{children}</main>
			<footer className='flex flex-row items-center justify-end py-4 px-8'>
				<Button variant='outline' onClick={logout}>
					Logout
				</Button>
			</footer>
		</div>
	)
}
