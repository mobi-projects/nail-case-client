import { axiosInstance } from "@/config/axios"
import type {
	TReqBodyRegisterReservation,
	TReqBodyUpdateReservation,
	TResGetListAvailableTime,
	TResGetListReservation,
	TResGetViewReservation,
	TResPostRegisterReservation,
	TResUpdateReservation,
} from "@/type"
import type { TResponseData } from "@/type/response"

/**
 * @컨트롤러 [Reservation Controller]
 * @검샘필터 #예약 #예약컨트롤러 #예약조회 #예약상세조회 #예약수정 #예약등록
 * @API명세 https://mobi-projects.github.io/nail-case-server/#api-ReservationController
 * @함수목록
 *   - getListReservation()
 *   - postRegisterReservation()
 *   - patchUpdateReservation()
 *   - getViewReservation()
 */

/** [GET] 예약 목록 조회 api 호출 */
export const getListReservation = async (
	shopId: number,
	startTime: number,
	endTime: number,
): Promise<TResponseData<TResGetListReservation[], "dataList">> => {
	const response = await axiosInstance().get(`/shops/${shopId}/reservations`, {
		params: { startTime, endTime },
	})
	return response.data
}
/** [POST] 예약 등록 api 호출 */
export const postRegisterReservation = async (
	shopId: number,
	reqBody: TReqBodyRegisterReservation,
): Promise<TResponseData<TResPostRegisterReservation, "data">> => {
	const response = await axiosInstance().post(
		`/shops/${shopId}/reservations`,
		reqBody,
	)
	return response.data
}
/** [GET] 예약 상세 조회 api 호출 */
export const getViewReservation = async (
	shopId: number,
	reservationId: number,
): Promise<TResponseData<TResGetViewReservation, "data">> => {
	const response = await axiosInstance().get(
		`/shops/${shopId}/reservations/${reservationId}`,
	)
	return response.data
}
/** [PATCH] 예약 수정 api 호출 */
export const patchUpdateReservation = async (
	shopId: number,
	reservationId: number,
	reqBody: TReqBodyUpdateReservation,
): Promise<TResponseData<TResUpdateReservation, "data">> => {
	const response = await axiosInstance().patch(
		`/shops/${shopId}/reservations/${reservationId}`,
		reqBody,
	)
	return response.data
}
/** [GET] 예약 중, "예약 가능 시간" & "아티스트" api 호출 */
export const getAvailableTime = async (
	shopId: number,
	artistIds: number[],
	date: number,
): Promise<TResponseData<TResGetListAvailableTime[], "dataList">> => {
	const response = await axiosInstance().get(
		`/shops/${shopId}/reservations/time`,
		{ params: { artistIds, date } },
	)
	return response.data
}
