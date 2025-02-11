import { useState } from 'react'
import { toast } from 'sonner'
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { InfoIcon, PlusIcon, XIcon } from 'lucide-react'

import { useGlobalStore } from '@/store'

import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Title } from '@/components/ui/title'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Text } from '@/components/ui/text'

import { CustomFormInput } from '@/components/custom-form-input'
import { CustomFormSelect } from '@/components/custom-form-select'

import { accountCreateSchema, type AccountCreate, createAccount } from '@/features/account'

const subAccountCreateInitialValues = {
	balance: 0,
	currencyId: '',
}

const accountCreateInitialValues = {
	name: '',
	description: '',
	accountTypeId: '',
	subAccounts: [subAccountCreateInitialValues],
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
		console.log(values)
		setIsSubmiting(true)
		try {
			await createAccount(values)
			toast.success('Success', { description: 'Account created' })
			await onSuccess()
		} catch (error) {
			console.log(error)
			toast.error('Error', { description: 'There was an error creating the account' })
			setIsSubmiting(false)
		}
	}

	const { fields, append, remove } = useFieldArray({
		name: 'subAccounts',
		control: form.control,
		rules: { minLength: 1 },
	})

	const handleAppend = () => {
		if (fields.length === currencies.length) return
		append(subAccountCreateInitialValues)
	}

	const handleRemove = (index: number) => {
		if (fields.length === 1) return
		remove(index)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-2 justify-between'
			>
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

				<div className='flex flex-col gap-2'>
					<div className='flex justify-between'>
						<div className='flex items-center gap-2'>
							<Title level='h6' size='sm' weight='medium'>
								Account currencies
							</Title>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<InfoIcon className='w-5 h-5' />
									</TooltipTrigger>
									<TooltipContent className='max-w-60'>
										<Text size='sm'>
											Account's supported currencies with their current
											balances
										</Text>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
						<Button
							type='button'
							variant='outline'
							size='sm'
							onClick={handleAppend}
							disabled={isSubmiting}
						>
							<PlusIcon /> Add
						</Button>
					</div>

					{fields.map((field, index) => {
						return (
							<div key={field.id} className='flex items-center gap-2 relative'>
								<div className='grid md:grid-cols-2 grid-cols-1 gap-x-4 w-full my-3'>
									<CustomFormInput
										inputProps={{ type: 'number' }}
										control={form.control}
										name={`subAccounts.${index}.balance`}
										label='Balance'
										placeholder='Your current account balance'
										disabled={isSubmiting}
									/>
									<CustomFormSelect
										control={form.control}
										name={`subAccounts.${index}.currencyId`}
										label='Currency'
										placeholder='Select'
										options={currencies.map(c => ({
											label: `${c.code} - ${c.name}`,
											value: c.id,
										}))}
										disabled={isSubmiting}
									/>
								</div>
								<Button
									size='icon'
									variant='ghost'
									className='absolute right-0 top-0'
									type='button'
									disabled={isSubmiting}
									onClick={() => handleRemove(index)}
								>
									<XIcon />
								</Button>
							</div>
						)
					})}
				</div>

				<Button full type='submit' disabled={isSubmiting}>
					Submit
				</Button>
			</form>
		</Form>
	)
}
