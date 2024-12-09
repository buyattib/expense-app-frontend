import { useState } from 'react'
import { toast } from 'sonner'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useGlobalStore } from '@/store'
import { handleError } from '@/services'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { CustomFormInput } from '@/components/custom-form-input'
import { CustomFormSelect } from '@/components/custom-form-select'

import { accountCreateSchema, AccountCreate, createAccount } from '@/features/account'

const accountCreateInitialValues = {
	name: '',
	description: '',
	balance: 0,
	currencyId: '',
	accountTypeId: '',
}

export type CreateAccountFormProps = {
	onSuccess: () => Promise<any> | any
}

export function CreateAccountForm({ onSuccess }: CreateAccountFormProps) {
	const [isSubmiting, setIsSubmiting] = useState(false)

	const currencies = useGlobalStore(state => state.currencies)
	const accountTypes = useGlobalStore(state => state.accountTypes)

	const form = useForm<AccountCreate>({
		resolver: zodResolver(accountCreateSchema),
		defaultValues: accountCreateInitialValues,
		mode: 'onSubmit',
	})

	const onSubmit: SubmitHandler<AccountCreate> = async values => {
		setIsSubmiting(true)
		try {
			await createAccount(values)
			toast.success('Success', { description: 'Account created' })
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
						placeholder='A name for the account'
						disabled={isSubmiting}
					/>
					<CustomFormInput
						control={form.control}
						name='description'
						label='Description (optional)'
						placeholder='A description for the account'
						disabled={isSubmiting}
					/>
					<CustomFormInput
						type='number'
						control={form.control}
						name='balance'
						label='Balance'
						placeholder='Your current account balance'
						disabled={isSubmiting}
					/>
					<CustomFormSelect
						control={form.control}
						name='currencyId'
						label='Currency'
						placeholder='Select'
						options={currencies.map(c => ({
							label: `${c.code} - ${c.name}`,
							value: c.id,
						}))}
						disabled={isSubmiting}
					/>
					<CustomFormSelect
						control={form.control}
						name='accountTypeId'
						label='Account type'
						placeholder='Select'
						options={accountTypes.map(at => ({
							label: at.name,
							value: at.id,
						}))}
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
