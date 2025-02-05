import { cn } from '@/lib/utils'

export function PublicLayout({
	className,
	children,
}: {
	children: React.ReactNode
	className?: string
}) {
	return <main className={cn('h-screen px-4 py-8 bg-muted', className)}>{children}</main>
}
