import { axiosInstance } from "@/config/axios"
import type { TResponseData } from "@/type/response"

export const getTopPopularShops = async ({
	page = 0,
	size,
}: TReqGetPopularShops): Promise<
	TResponseData<TResGetPopularShops, "data">
> => {
	const response = await axiosInstance().get(
		`/main/shopsList?size=${size}&page=${page}`,
	)
	return response.data
}

export type TReqGetPopularShops = {
	page?: number
	size?: number
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
