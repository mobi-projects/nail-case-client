import { axiosInstance } from "@/config/axios"

export const getShopById = async (shopId: number): Promise<TResGetShop> => {
	const response = await axiosInstance().get(`shops/${shopId}`)
	return response.data.data
}

export type TResGetShop = {
	shopName: string
	phone: string
	address: string
	likedByUser: boolean
	profileImages: Array<TShopImage>
	workHours: Array<TWorkHour>
	priceImages: Array<TShopImage>
}

export type TShopImage = { imageId: number; imageUrl: string }

export type TWorkHour = {
	dayOfWeek: number
	isOpen: boolean
	openTime: number
	closeTime: number
}
