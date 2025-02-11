export function title(s: string) {
	return s
		.split(' ')
		.map(w => w.at(0)?.toUpperCase() + w.slice(1))
		.join(' ')
}
