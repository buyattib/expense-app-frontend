import { useState } from 'react'
import { toast } from 'sonner'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'

import { handleError } from '@/services'
import { title } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { CustomFormInput } from '@/components/custom-form-input'
import { CustomFormSelect } from '@/components/custom-form-select'

import {
	transactionCreateSchema,
	TransactionCreate,
	createTransaction,
	getTransactionCategories,
	TRANSACTION_TYPE,
} from '@/features/transaction'
import { getAccounts } from '@/features/account'

const transactionCreateInitialValues = {
	date: '',
	amount: 0,
	description: '',
	transactionType: TRANSACTION_TYPE.EXPENSE,
	transactionCategoryId: '',
	accountId: '',
}

export type CreateTransactionFormProps = {
	onSuccess: () => Promise<any> | any
}

export function CreateTransactionForm({ onSuccess }: CreateTransactionFormProps) {
	const [isSubmiting, setIsSubmiting] = useState(false)

	const {
		isPending: isAccountsPending,
		isError: isAccountsError,
		data: accounts,
	} = useQuery({
		queryKey: ['accounts'],
		queryFn: () => getAccounts(),
	})

	const {
		isPending: isTransactionCategoriesPending,
		isError: isTransactionCategoriesError,
		data: transactionCategories,
	} = useQuery({
		queryKey: ['transaction-categories'],
		queryFn: () => getTransactionCategories(),
	})

	const form = useForm<TransactionCreate>({
		resolver: zodResolver(transactionCreateSchema),
		defaultValues: transactionCreateInitialValues,
		mode: 'onSubmit',
	})

	const onSubmit: SubmitHandler<TransactionCreate> = async values => {
		setIsSubmiting(true)
		try {
			await createTransaction(values)
			toast.success('Success', { description: 'Category created' })
			await onSuccess()
		} catch (error) {
			console.log(error)
			toast.error('Error', { description: handleError(error) })
			setIsSubmiting(false)
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-6 justify-between'
			>
				<div className='grid md:grid-cols-2 grid-cols-1 gap-x-4'>
					<CustomFormInput
						control={form.control}
						name='date'
						label='Date'
						placeholder='Transaction date'
						disabled={isSubmiting}
					/>
					<CustomFormInput
						type='number'
						control={form.control}
						name='amount'
						label='Amount'
						placeholder='The transaction amount'
						disabled={isSubmiting}
					/>
					<CustomFormInput
						control={form.control}
						name='description'
						label='Description (optional)'
						placeholder='A description for the transaction'
						disabled={isSubmiting}
					/>
					<CustomFormSelect
						control={form.control}
						name='transactionType'
						label='Type of transaction'
						placeholder='Select'
						options={Object.values(TRANSACTION_TYPE).map(txType => ({
							label: title(txType),
							value: txType,
						}))}
						disabled={isSubmiting}
					/>
					{!isTransactionCategoriesError && (
						<CustomFormSelect
							control={form.control}
							name='transactionCategoryId'
							label='Transaction category'
							placeholder='Select'
							options={
								transactionCategories?.map(a => ({
									label: a.name,
									value: a.id,
								})) ?? []
							}
							disabled={isSubmiting || isTransactionCategoriesPending}
						/>
					)}
					{!isAccountsError && (
						<CustomFormSelect
							control={form.control}
							name='accountId'
							label='Account for the transaction'
							placeholder='Select'
							options={
								accounts?.map(a => ({
									label: `${a.name} (${a.currency.code})`,
									value: a.id,
								})) ?? []
							}
							disabled={isSubmiting || isAccountsPending}
						/>
					)}
				</div>

				<Button full type='submit' disabled={isSubmiting}>
					Submit
				</Button>
			</form>
		</Form>
	)
}
