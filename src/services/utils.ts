export function getAccessToken() {
	try {
		const authStoreString = window.localStorage.getItem('authStore')
		if (!authStoreString) return null

		const authStore = window.JSON.parse(authStoreString)
		return authStore.state.accessToken as string
	} catch (e) {
		console.log(e)
		return null
	}
}
