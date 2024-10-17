import { axiosInstance } from "@/config/axios"
import type { TReqBodyUpdateReservation, TResUpdateReservation } from "@/type"
import type { TResponseData } from "@/type/response"

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
