import { Redirect, useSearch } from 'wouter'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '@/router/routes'
import { useAuthStore, useUserStore } from '@/store'

import { AUTH_TYPE, auth, type AuthType } from '@/features/auth'

type Props = {
	authType: AuthType
}

export function Confirm({ authType }: Props) {
	const updateAuthStore = useAuthStore(state => state.update)
	const updateUserStore = useUserStore(state => state.update)

	const searchString = useSearch()
	const searchParams = new URLSearchParams(searchString)
	const token = searchParams.get('token') ?? ''

	const enabled = Object.values(AUTH_TYPE).includes(authType) && !!token

	const { isPending, isError } = useQuery({
		queryKey: ['auth'],
		queryFn: () =>
			auth({ authType, token })
				.then(data => {
					updateAuthStore(data)
					updateUserStore(data.info)
					return data
				})
				.catch(error => {
					console.log(error)
					toast.error('There was an error loging in')
				}),
		enabled,
	})

	if (!Object.values(AUTH_TYPE).includes(authType)) {
		return <>Invalid URL</>
	}

	if (!isPending && !isError) {
		return <Redirect to={PRIVATE_ROUTES.DASHBOARD} />
	}

	if (isError) {
		return <Redirect to={PUBLIC_ROUTES.LOGIN} />
	}

	return <></>
}
