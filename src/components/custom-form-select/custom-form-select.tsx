import { Control, FieldPath, FieldValues } from 'react-hook-form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	useFormField,
} from '@/components/ui/form'

type Option = { label: string; value: string }

type Props<TFieldValues extends FieldValues = FieldValues> = {
	control: Control<TFieldValues>
	name: FieldPath<TFieldValues>
	options: Option[]
	label?: React.ReactNode
	placeholder?: string
	description?: string
	hasMessage?: boolean
	disabled?: boolean
}

export function CustomFormSelect<TFieldValues extends FieldValues = FieldValues>({
	control,
	name,
	label,
	options,
	placeholder,
	description,
	disabled = false,
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
						<Select onValueChange={field.onChange} defaultValue={field.value}>
							<FormControl>
								<SelectTrigger
									disabled={disabled}
									className={`${isError ? 'border-2 border-destructive' : ''}`}
								>
									<SelectValue placeholder={placeholder} />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								{options.map(op => {
									return (
										<SelectItem key={op.value} value={op.value}>
											{op.label}
										</SelectItem>
									)
								})}
							</SelectContent>
						</Select>
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
