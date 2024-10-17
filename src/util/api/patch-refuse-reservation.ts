import { axiosInstance } from "@/config/axios"

export const patchRefuseReservation = async (
	shopId: number,
	reservationId: number,
	reqBody: TReqRefuseReservation,
) => {
	const response = await axiosInstance().patch(
		`/shops/${shopId}/reservations/${reservationId}/reject`,
		reqBody,
	)
	return response
}

export type TReqRefuseReservation = {
	rejectReason: string
}
