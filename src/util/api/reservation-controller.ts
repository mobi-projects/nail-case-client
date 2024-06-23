import { axiosInstance } from "@/config/axios"
import type {
	TReqBodyPostRegisterReservation,
	TResGetListReservation,
	TResPostRegisterReservation,
} from "@/type"
import type { TResponseData } from "@/type/response"

/**
 * @컨트롤러 [Reservation Controller]
 * @API명세 https://mobi-projects.github.io/nail-case-server/#api-ReservationController
 * @함수목록
 *   - getListReservation()
 *   - postRegisterReservation()
 */

/** [GET] 예약 목록 조회 api 호출 */
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
/** [POST] 예약 등록 api 호출 */
export const postRegisterReservation = async (
	shopId: number,
	reqBody: TReqBodyPostRegisterReservation,
): Promise<TResponseData<TResPostRegisterReservation, "data">> => {
	const response = await axiosInstance().post(
		`/shops/${shopId}/reservations`,
		reqBody,
	)
	return response.data
}
