import { MOCK_DATA } from "@/app/(manager)/manager/base/(base)/my-shop/(home)/mock"
import { tmpFetch } from "@/mock"
//import { axiosInstance } from "@/config/axios"

/** 추후 수정 : 가상데이터 환경에서 shopInfo api호출  */
export const getShopInfo = async (shopId: number): Promise<TResGetShopInfo> => {
	console.log(shopId) // 현재 사용하지 않아서 수정시 삭제될 예정
	const response = await tmpFetch(MOCK_DATA)
	return response
}

export type TResGetShopInfo = {
	workHours: Array<TWorkHours>
	profileImages: Array<TInfoImages>
	shopName: string
	address: string
	priceImages: Array<TInfoImages>
}

export type TWorkHours = {
	closeTime: number
	openTime: number
	isOpen: boolean
	dayOfWeek: number
}

export type TInfoImages = { imageId: number; imageUrl: string }
