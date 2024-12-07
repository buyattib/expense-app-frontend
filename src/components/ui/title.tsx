import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const titleVariants = cva('', {
	variants: {
		size: {
			sm: 'text-lg tracking-tight',
			md: 'text-xl tracking-normal',
			lg: 'text-2xl tracking-wide',
			xl: 'text-3xl tracking-wider',
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
		size: 'lg',
		alignment: 'left',
		weight: 'bold',
	},
})

export interface TitleProps
	extends React.HTMLAttributes<HTMLHeadingElement>,
		VariantProps<typeof titleVariants> {
	level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
	({ className, size, alignment, level, ...props }, ref) => {
		const Comp = level
		return (
			<Comp
				ref={ref}
				className={cn(titleVariants({ size, alignment, className }))}
				{...props}
			/>
		)
	},
)

Title.displayName = 'Title'
