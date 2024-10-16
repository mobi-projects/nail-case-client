import axios from "axios"

import type { TResponseData } from "@/type/response"

export const getTopPopularShops = async (
	page: number = 0,
	size: number = 6,
): Promise<TResponseData<TResGetPopularShops, "data">> => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_BACKEND_APP}/main/shopsList?size=${size}&page=${page}`,
	)
	return response.data
}

export type TResGetPopularShops = {
	shopList: Array<TPopularShop>
	pageNumber: number
	pageSize: number
	totalElements: number
	totalPages: number
	last: true
}

export type TPopularShop = {
	shopId: number
	shopName: string
	shopImageUrl: string | null
	likedByUser: boolean
}
