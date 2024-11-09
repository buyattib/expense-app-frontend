import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form'

import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

type Props<T extends FieldValues = FieldValues, N extends FieldPath<T> = FieldPath<T>> = {
	control: ControllerProps<T, N>['control']
	name: ControllerProps<T, N>['name']
	label: string
	placeholder?: string
	description: string
	error: boolean
	hasMessage?: boolean
}

// TODO: improve the typing

export function CustomFormInput({
	control,
	name,
	label,
	placeholder,
	description,
	error,
	hasMessage = true,
}: Props) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<Input
							placeholder={placeholder}
							{...field}
							className={`${error ? 'border-destructive' : ''}`}
						/>
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					{hasMessage && <FormMessage />}
				</FormItem>
			)}
		/>
	)
}
