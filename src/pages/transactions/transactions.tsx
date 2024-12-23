import { Plus as PlusIcon, AlertCircleIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import { currencyFormatter, title } from '@/lib/utils'
import { getTransactions } from '@/features/transaction'

import { Title } from '@/components/ui/title'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

import { CreateTransactionModal } from '@/components/create-transaction-modal'
import { CreateTransactionCategoryModal } from '@/components/create-transaction-category-modal'

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
				<div className='flex sm:flex-row flex-col items-center sm:gap-2 gap-4'>
					<CreateTransactionCategoryModal>
						<Button variant='secondary' full>
							<PlusIcon />
							Category
						</Button>
					</CreateTransactionCategoryModal>
					<CreateTransactionModal onSuccess={refetch}>
						<Button full>
							<PlusIcon />
							Transaction
						</Button>
					</CreateTransactionModal>
				</div>
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
				{transactions && transactions.length > 0 && (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Date</TableHead>
								<TableHead>Type</TableHead>
								<TableHead>Category</TableHead>
								<TableHead>Account</TableHead>
								<TableHead className='text-right'>Amount</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{transactions.map(t => {
								const date = t.date.split('T')[0]
								return (
									<TableRow key={t.id}>
										<TableCell>{date}</TableCell>
										<TableCell>{title(t.transactionType)}</TableCell>
										<TableCell>{t.transactionCategory.name}</TableCell>
										<TableCell>{t.account.name}</TableCell>
										<TableCell className='text-right'>
											{currencyFormatter('ARS').format(t.amount / 100)}
										</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				)}
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
