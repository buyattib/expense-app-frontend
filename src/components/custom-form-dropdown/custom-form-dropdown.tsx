import { Control, FieldPath, FieldValues } from 'react-hook-form'
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	useFormField,
} from '@/components/ui/form'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

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

export function CustomFormDropdown<TFieldValues extends FieldValues = FieldValues>({
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
						<DropdownMenu
						// onValueChange={field.onChange} defaultValue={field.value}
						>
							<FormControl>
								<DropdownMenuTrigger
									disabled={disabled}
									className={`${isError ? 'border-2 border-destructive' : ''}`}
								>
									<Button variant='ghost'>{placeholder}</Button>
								</DropdownMenuTrigger>
							</FormControl>
							<DropdownMenuContent>
								{options.map(op => {
									return (
										<DropdownMenuCheckboxItem
											key={op.value}
											// value={op.value}
										>
											{op.label}
										</DropdownMenuCheckboxItem>
									)
								})}
							</DropdownMenuContent>
						</DropdownMenu>
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
