import { axiosInstance } from "@/config/axios"
import type { TResponseData } from "@/type/response"

/** [GET] 판매자 등록 이달의 아트 조회 API 요청 */
export const postShopToggleLiked = async (
	shopId: number,
): Promise<TResponseData<boolean, "data">> => {
	const response = await axiosInstance().post(`/shops/${shopId}/toggle-like`)
	return response.data.data
}
