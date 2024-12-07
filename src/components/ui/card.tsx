import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn('rounded-xl border bg-card text-card-foreground shadow', className)}
			{...props}
		/>
	),
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
	),
)
CardHeader.displayName = 'CardHeader'

const cardTitleVariants = cva('font-semibold leading-none tracking-tight', {
	variants: {
		size: {
			sm: 'text-lg',
			md: 'text-xl',
			lg: 'text-2xl',
		},
		alignment: {
			left: 'text-left',
			center: 'text-center',
			right: 'text-right',
		},
	},
	defaultVariants: {
		size: 'md',
		alignment: 'left',
	},
})

export interface CardTitleProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof cardTitleVariants> {}

const CardTitle = React.forwardRef<HTMLDivElement, CardTitleProps>(
	({ className, size, alignment, ...props }, ref) => (
		<div
			ref={ref}
			className={cn(cardTitleVariants({ size, alignment, className }))}
			{...props}
		/>
	),
)
CardTitle.displayName = 'CardTitle'

const cardDescriptionVariants = cva('text-muted-foreground', {
	variants: {
		size: {
			sm: 'text-sm',
			md: 'text-base',
			lg: 'text-lg',
		},
		alignment: {
			left: 'text-left',
			center: 'text-center',
			right: 'text-right',
		},
	},
	defaultVariants: {
		size: 'md',
		alignment: 'left',
	},
})

export interface CardDescriptionProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof cardDescriptionVariants> {}

const CardDescription = React.forwardRef<HTMLDivElement, CardDescriptionProps>(
	({ className, size, alignment, ...props }, ref) => (
		<div
			ref={ref}
			className={cn(cardDescriptionVariants({ size, alignment, className }))}
			{...props}
		/>
	),
)
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
	),
)
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
	),
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
