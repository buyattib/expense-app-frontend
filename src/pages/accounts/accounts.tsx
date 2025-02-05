import { AlertCircleIcon, ChevronDown } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import { useGlobalStore } from '@/store'
import { currencyFormatter } from '@/lib/utils'

import { getAccounts } from '@/features/account'

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Title } from '@/components/ui/title'
import { Text } from '@/components/ui/text'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

import { CreateAccountModal } from '@/components/create-account-modal'

type Props = {
	isCreateOpen: boolean
	onCreateOpenChange: (value: boolean) => void
}

export function Accounts({ isCreateOpen, onCreateOpenChange }: Props) {
	const {
		isPending,
		isError,
		data: accounts,
		refetch,
	} = useQuery({
		queryKey: ['accounts'],
		queryFn: () => getAccounts(), // paginate
	})

	const currencies = useGlobalStore(state => state.currencies)

	if (isPending) {
		return (
			<>
				{[...Array(5).keys()].map(i => {
					return <Skeleton key={i} className='w-full h-14 rounded-md' />
				})}
			</>
		)
	}

	if (isError || !accounts) {
		return (
			<Alert variant='destructive'>
				<AlertCircleIcon className='w-4 h-4' />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>
					There was an unexpected error retrieving the accounts data
				</AlertDescription>
			</Alert>
		)
	}

	return (
		<>
			<CreateAccountModal
				open={isCreateOpen}
				onOpenChange={onCreateOpenChange}
				onSuccess={async () => {
					await refetch()
					onCreateOpenChange(false)
				}}
			/>
			{accounts.length > 0 &&
				accounts.map(account => {
					// TODO: enable account edition and deletion
					return (
						<Collapsible key={account.id} className='space-y-2'>
							<CollapsibleTrigger asChild className='w-full'>
								<Button
									theme='secondary'
									variant='outline'
									className='justify-between'
								>
									{account.name}
									<ChevronDown />
								</Button>
							</CollapsibleTrigger>
							<CollapsibleContent className='space-y-2'>
								{account.subAccounts.map(subAccount => {
									// TODO: add currency to schema
									const currency = currencies.find(
										c => c.id === subAccount.currencyId,
									)

									// TODO: enable sub account deletion
									return (
										<Card key={subAccount.id} className='w-full'>
											<CardHeader className='flex p-3'>
												{currency && (
													<>
														<CardTitle size='xs'>
															{currency.name}
														</CardTitle>
														<CardDescription>
															Balance: {subAccount.balance / 100}{' '}
															{currency.code}
														</CardDescription>
													</>
												)}
											</CardHeader>
										</Card>
									)
								})}
							</CollapsibleContent>
						</Collapsible>
					)
				})}

			{accounts.length === 0 && (
				<Text alignment='center'>
					You have not created any accounts yet.{' '}
					<Button variant='link' onClick={() => onCreateOpenChange(true)}>
						Create now
					</Button>
				</Text>
			)}
		</>
	)
}
