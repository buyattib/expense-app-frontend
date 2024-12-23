import { useState } from 'react'
import { toast } from 'sonner'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { handleError } from '@/services'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { CustomFormInput } from '@/components/custom-form-input'

import {
	transactionCategoryCreateSchema,
	TransactionCategoryCreate,
	createTransactionCategory,
} from '@/features/transaction'

const transactionCategoryCreateInitialValues = {
	name: '',
	description: '',
}

export type CreateTransactionCategoryFormProps = {
	onSuccess: () => Promise<any> | any
}

export function CreateTransactionCategoryForm({ onSuccess }: CreateTransactionCategoryFormProps) {
	const [isSubmiting, setIsSubmiting] = useState(false)

	const form = useForm<TransactionCategoryCreate>({
		resolver: zodResolver(transactionCategoryCreateSchema),
		defaultValues: transactionCategoryCreateInitialValues,
		mode: 'onSubmit',
	})

	const onSubmit: SubmitHandler<TransactionCategoryCreate> = async values => {
		setIsSubmiting(true)
		try {
			await createTransactionCategory(values)
			toast.success('Success', { description: 'Transaction category created' })
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
						name='name'
						label='Name'
						placeholder='A name for the category'
						disabled={isSubmiting}
					/>
					<CustomFormInput
						control={form.control}
						name='description'
						label='Description (optional)'
						placeholder='A description for the category'
						disabled={isSubmiting}
					/>
				</div>

				<Button full type='submit' disabled={isSubmiting}>
					Submit
				</Button>
			</form>
		</Form>
	)
}
