import { useQuery } from '@tanstack/react-query'
import { getAccounts } from './services'

export function useAccounts({ page, perPage }: { page: number; perPage: number }) {
	return useQuery({
		queryKey: ['accounts', page, perPage],
		queryFn: () => getAccounts({ page, perPage }),
	})
}
