import { axiosInstance } from "@/config/axios"
import type { TResGetListReservation } from "@/type"
import type { TResponseData } from "@/type/response"

/**
 * @컨트롤러 [Reservation Controller]
 * @API명세 https://mobi-projects.github.io/nail-case-server/#api-ReservationController
 * @함수목록
 *   - getListReservation()
 */

/** 예약 목록 조회  */
export const getListReservation = async (
	shopId: number,
	startTime: number,
	endTime: number,
): Promise<TResponseData<TResGetListReservation, "dataList">> => {
	const response = await axiosInstance().get(`/shops/${shopId}/reservations`, {
		params: { startTime, endTime },
	})
	return response.data
}
