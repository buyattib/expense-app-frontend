export function currencyFormatter(currency: string) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
	})
}

const decimalNumberFormatter = new Intl.NumberFormat('en-US', {
	style: 'decimal',
})

export function numberFormatter(number: number) {
	return decimalNumberFormatter.format(number)
}
