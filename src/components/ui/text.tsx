import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const textVariants = cva('', {
	variants: {
		size: {
			xs: 'text-xs',
			sm: 'text-sm',
			md: 'text-base',
			lg: 'text-lg',
		},
		alignment: {
			left: 'text-left',
			center: 'text-center',
			right: 'text-right',
		},
		weight: {
			light: 'font-light',
			medium: 'font-medium',
			semi: 'font-semibold',
			bold: 'font-bold',
		},
	},
	defaultVariants: {
		size: 'md',
		alignment: 'left',
		weight: 'medium',
	},
})

export interface TextProps
	extends React.HTMLAttributes<HTMLParagraphElement>,
		VariantProps<typeof textVariants> {}

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
	({ className, size, alignment, weight, ...props }, ref) => {
		return (
			<p
				ref={ref}
				className={cn(textVariants({ size, alignment, weight, className }))}
				{...props}
			/>
		)
	},
)

Text.displayName = 'Text'
