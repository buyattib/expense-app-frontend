import React from 'react'
import { Control, FieldPath, FieldValues } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	useFormField,
} from '@/components/ui/form'

type Props<TFieldValues extends FieldValues = FieldValues> = {
	control: Control<TFieldValues>
	name: FieldPath<TFieldValues>
	label?: string
	placeholder?: string
	description?: string
	hasMessage?: boolean
	type?: React.ComponentProps<'input'>['type']
	disabled?: boolean
}

export function CustomFormInput<TFieldValues extends FieldValues = FieldValues>({
	control,
	name,
	label,
	placeholder,
	description,
	disabled = false,
	type = 'text',
	hasMessage = true,
	...rest
}: Props<TFieldValues>) {
	return (
		<FormField
			{...rest}
			control={control}
			name={name}
			render={({ field }) => {
				const { error } = useFormField()
				const isError = !!error?.message

				return (
					<FormItem>
						{label && <FormLabel>{label}</FormLabel>}
						<FormControl>
							<Input
								type={type}
								placeholder={placeholder}
								{...field}
								disabled={disabled}
								className={`${isError ? 'border-2 border-destructive' : ''}`}
							/>
						</FormControl>
						{description && <FormDescription>{description}</FormDescription>}
						{hasMessage && (
							<div className='h-5'>
								<FormMessage />
							</div>
						)}
					</FormItem>
				)
			}}
		/>
	)
}
