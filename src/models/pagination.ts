export type PaginationApi = {
	page: number
	per_page: number
}

export type Pagination = {
	page: PaginationApi['page']
	perPage: PaginationApi['per_page']
}

export type PaginationResponse<T> = {
	total: number
	items: T[]
}
