export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='h-full grid grid-rows-[auto_1fr_auto] gap-2'>
			<header>Header</header>
			<section className='flex flex-row'>
				<nav className='w-20'>nav</nav>
				<main className='w-full'>{children}</main>
			</section>
			<footer>footer</footer>
		</div>
	)
}
