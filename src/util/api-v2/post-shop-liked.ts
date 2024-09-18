import { axiosInstance } from "@/config/axios"
import type { TResponseData } from "@/type/response"

/** [POST] 상세 매장페이지 좋아요 on/off API 요청  */
export const postShopToggleLiked = async (
	shopId: number,
): Promise<TResponseData<boolean, "data">> => {
	const response = await axiosInstance().post(`/shops/${shopId}/toggle-liked`)
	return response.data.data
}
