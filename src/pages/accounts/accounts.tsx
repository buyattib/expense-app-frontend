import { ReactNode, useMemo, useState } from 'react'
import { Plus as PlusIcon, AlertCircleIcon, ChevronDown, TrashIcon } from 'lucide-react'

import { Title } from '@/components/ui/title'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Text } from '@/components/ui/text'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'

import { CreateAccountModal } from '@/components/create-account-modal'

import { useAccounts } from '@/features/account/hooks'
import { numberFormatter } from '@/lib/formatters'

function AccountsLayout({
	children,
	onAccountClick,
}: {
	onAccountClick?: () => void
	children: ReactNode
}) {
	return (
		<section className='flex flex-col gap-4 min-h-full'>
			<div className='flex flex-row justify-between items-center'>
				<Title level='h1'>Accounts</Title>
				<Button {...(!!onAccountClick && { onClick: onAccountClick })}>
					<PlusIcon />
					Account
				</Button>
			</div>

			{children}
		</section>
	)
}

export function Accounts() {
	const [isCreateOpen, setIsCreateOpen] = useState(false)
	const [page, setPage] = useState(1)
	const perPage = useMemo(() => 10, [])

	const { isError, data, refetch } = useAccounts({ page, perPage })

	if (!!data) {
		const totalPages = window.Math.floor(data.total / perPage) + 1
		return (
			<AccountsLayout onAccountClick={() => setIsCreateOpen(true)}>
				<CreateAccountModal
					open={isCreateOpen}
					onOpenChange={setIsCreateOpen}
					onSuccess={async () => {
						await refetch()
						setIsCreateOpen(false)
					}}
				/>

				{data.items.length === 0 && (
					<Text alignment='center'>
						You have not created any accounts yet.{' '}
						<Button variant='link' onClick={() => setIsCreateOpen(true)}>
							Create now
						</Button>
					</Text>
				)}

				{data.items.length > 0 &&
					data.items.map(account => {
						// TODO: enable account edition and deletion
						return (
							<Collapsible key={account.id} className='space-y-2'>
								<div className='flex items-center border border-border rounded-md'>
									<CollapsibleTrigger asChild>
										<Button
											variant='ghost'
											className='justify-between w-full px-4'
										>
											{account.name}
											<ChevronDown />
										</Button>
									</CollapsibleTrigger>
									<Button size='icon' variant='ghost' className='px-4 mr-4'>
										<TrashIcon />
									</Button>
								</div>
								<CollapsibleContent className='space-y-2'>
									{account.subAccounts.map(subAccount => {
										// TODO: enable sub account deletion
										return (
											<Card key={subAccount.id} className='w-full'>
												<CardHeader className='flex px-4 py-3'>
													<CardTitle
														size='xs'
														className='flex flex-row justify-between items-center'
													>
														{subAccount.currency.name}
														<Button size='icon' variant='ghost'>
															<TrashIcon />
														</Button>
													</CardTitle>
													<CardDescription>
														Balance:{' '}
														{numberFormatter(subAccount.balance / 100)}{' '}
														{subAccount.currency.code}
													</CardDescription>
												</CardHeader>
											</Card>
										)
									})}
								</CollapsibleContent>
							</Collapsible>
						)
					})}

				{data.total > 10 && (
					<Pagination className='mt-auto'>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									onClick={() => {
										if (page !== 1) {
											setPage(page - 1)
										}
									}}
								/>
							</PaginationItem>

							{Array.from(Array(totalPages).keys()).map(i => {
								const _page = i + 1
								return (
									<PaginationItem key={_page}>
										<PaginationLink
											isActive={page === _page}
											onClick={() => {
												setPage(_page)
											}}
										>
											{_page}
										</PaginationLink>
									</PaginationItem>
								)
							})}

							<PaginationItem>
								<PaginationNext
									onClick={() => {
										if (page !== totalPages) {
											setPage(page + 1)
										}
									}}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				)}
			</AccountsLayout>
		)
	}

	if (isError) {
		return (
			<AccountsLayout>
				<Alert variant='destructive'>
					<AlertCircleIcon className='w-4 h-4' />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>
						There was an unexpected error retrieving the accounts data
					</AlertDescription>
				</Alert>
			</AccountsLayout>
		)
	}

	return (
		<AccountsLayout>
			{[...Array(5).keys()].map(i => {
				return <Skeleton key={i} className='w-full h-10 rounded-md' />
			})}
		</AccountsLayout>
	)
}
