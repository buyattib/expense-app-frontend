import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const textVariants = cva('', {
	variants: {
		size: {
			xs: 'text-xs',
			sm: 'text-sm',
			md: 'text-md',
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
			bold: 'font-bold',
		},
	},
	defaultVariants: {
		size: 'md',
		alignment: 'left',
		weight: 'bold',
	},
})

export interface TextProps
	extends React.HTMLAttributes<HTMLParagraphElement>,
		VariantProps<typeof textVariants> {}

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
	({ className, size, alignment, ...props }, ref) => {
		return (
			<p ref={ref} className={cn(textVariants({ size, alignment, className }))} {...props} />
		)
	},
)

Text.displayName = 'Text'
