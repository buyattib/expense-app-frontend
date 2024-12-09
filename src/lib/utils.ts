import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function currencyFormatter(currency: string) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
	})
}

export function numberFormatter() {
	return new Intl.NumberFormat('en-US', {
		style: 'decimal',
	})
}

export function title(s: string) {
	return s
		.split(' ')
		.map(w => w.at(0)?.toUpperCase() + w.slice(1))
		.join(' ')
}
