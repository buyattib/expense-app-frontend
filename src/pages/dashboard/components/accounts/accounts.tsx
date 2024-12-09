import { AlertCircleIcon, Plus as PlusIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import { currencyFormatter } from '@/lib/utils'
import { getAccounts } from '@/features/account'

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Title } from '@/components/ui/title'
import { Text } from '@/components/ui/text'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'

import { CreateAccountModal } from '@/components/create-account-modal'

export function Accounts() {
	const {
		isPending,
		isError,
		data: accounts,
		refetch,
	} = useQuery({
		queryKey: ['accounts'],
		queryFn: () => getAccounts(), // paginate
	})

	return (
		<section className='space-y-4 min-h-72'>
			<div className='flex flex-row justify-between items-center sm:px-2'>
				<Title level='h1'>Accounts</Title>
				<CreateAccountModal onSuccess={refetch}>
					<Button variant='ghost'>
						<PlusIcon />
						New
					</Button>
				</CreateAccountModal>
			</div>
			{isError && (
				<Alert variant='destructive'>
					<AlertCircleIcon className='w-4 h-4' />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>
						There was an unexpected error retrieving the accounts data
					</AlertDescription>
				</Alert>
			)}
			<div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4'>
				{isPending &&
					[...Array(8).keys()].map(i => {
						return <Skeleton key={i} className='w-full h-32 rounded-md' />
					})}
				{accounts &&
					accounts.length > 0 &&
					accounts.map(account => {
						return (
							<Card key={account.id} className='w-full'>
								<CardHeader>
									<CardTitle>{account.name}</CardTitle>
									<CardDescription>Balance:</CardDescription>
									<CardDescription>
										{currencyFormatter(account.currency.code).format(
											account.balance,
										)}
									</CardDescription>
								</CardHeader>
							</Card>
						)
					})}
				{accounts && accounts.length === 0 && (
					<Text alignment='center'>
						You have not created any accounts yet.{' '}
						<CreateAccountModal onSuccess={refetch}>
							<Button variant='link' className='text-link'>
								Create now
							</Button>
						</CreateAccountModal>
					</Text>
				)}
			</div>
		</section>
	)
}
