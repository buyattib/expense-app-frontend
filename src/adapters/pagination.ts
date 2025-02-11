import { Pagination, PaginationApi } from '@/models/pagination'

export function paginationAdapter(p: PaginationApi): Pagination {
	return {
		page: p.page,
		perPage: p.per_page,
	}
}

export function paginationApiAdapter(p: Pagination): PaginationApi {
	return {
		page: p.page,
		per_page: p.perPage,
	}
}
