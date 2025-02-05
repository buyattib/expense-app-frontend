import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
	{
		variants: {
			variant: {
				default: '',
				outline: '',
				ghost: '',
				link: '',
			},
			theme: {
				primary: '',
				secondary: '',
				destructive: '',
			},
			size: {
				default: 'h-9 px-4 py-2',
				sm: 'h-8 rounded-md px-3 text-xs',
				lg: 'h-10 rounded-md px-8',
				icon: 'h-9 w-9',
			},
			full: {
				true: 'w-full',
			},
		},
		compoundVariants: [
			{
				variant: 'default',
				theme: 'primary',
				class: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
			},
			{
				variant: 'default',
				theme: 'secondary',
				class: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
			},
			{
				variant: 'default',
				theme: 'destructive',
				class: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
			},
			{
				variant: 'outline',
				theme: ['primary', 'secondary'],
				class: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
			},
			{
				variant: 'outline',
				theme: 'destructive',
				class: 'border border-destructive bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
			},
			{
				variant: 'ghost',
				theme: ['primary', 'secondary', 'destructive'],
				class: 'hover:bg-accent hover:text-accent-foreground',
			},
			{
				variant: 'link',
				theme: ['primary', 'secondary', 'destructive'],
				class: 'text-primary underline-offset-4 hover:underline text-link',
			},
		],
		defaultVariants: {
			variant: 'default',
			theme: 'primary',
			size: 'default',
			full: false,
		},
	},
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, theme, size, full, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				className={cn(buttonVariants({ variant, theme, size, full, className }))}
				ref={ref}
				{...props}
			/>
		)
	},
)
Button.displayName = 'Button'

export { Button, buttonVariants }
