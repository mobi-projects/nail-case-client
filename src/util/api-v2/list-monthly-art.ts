import { axiosInstance } from "@/config/axios"
import type { TResponseData } from "@/type/response"

/** [GET] 판매자 등록 이달의 아트 조회 API 요청 */
export const getMonthlyArtList = async (
	shopId: number,
): Promise<TResponseData<TResAOM, "dataList">> => {
	const response = await axiosInstance().get(
		`/shops/${shopId}/monthly-art/images`,
	)
	return response.data
}

export type TResAOM = Array<AOMImage>

export type AOMImage = { imageUrl: string; imageId: number }
