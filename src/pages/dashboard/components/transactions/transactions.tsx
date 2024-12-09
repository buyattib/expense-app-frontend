import { Plus as PlusIcon, AlertCircleIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import { getTransactions } from '@/features/transaction'

import { Title } from '@/components/ui/title'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'

import { CreateTransactionModal } from '@/components/create-transaction-modal'

export function Transactions() {
	const {
		isPending,
		isError,
		data: transactions,
		refetch,
	} = useQuery({
		queryKey: ['transactions'],
		queryFn: () => getTransactions(), // paginate
	})

	return (
		<section className='space-y-4 min-h-72'>
			<div className='flex flex-row justify-between items-center sm:px-2'>
				<Title level='h1'>Transactions</Title>
				<CreateTransactionModal onSuccess={refetch}>
					<Button variant='ghost'>
						<PlusIcon />
						Add
					</Button>
				</CreateTransactionModal>
			</div>
			{isError && (
				<Alert variant='destructive'>
					<AlertCircleIcon className='w-4 h-4' />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>
						There was an unexpected error retrieving the transactions data
					</AlertDescription>
				</Alert>
			)}

			<div className='flex flex-col gap-4'>
				{isPending &&
					[...Array(8).keys()].map(i => {
						return <Skeleton key={i} className='w-full h-32 rounded-md' />
					})}
				{transactions && transactions.length > 0 && <>tx</>}
				{transactions && transactions.length === 0 && (
					<Text alignment='center'>
						You have not created any transactions yet.{' '}
						<CreateTransactionModal onSuccess={refetch}>
							<Button variant='link' className='text-link'>
								Create now
							</Button>
						</CreateTransactionModal>
					</Text>
				)}
			</div>
		</section>
	)
}
