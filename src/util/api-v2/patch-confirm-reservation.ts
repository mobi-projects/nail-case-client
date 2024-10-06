import { axiosInstance } from "@/config/axios"

export const patchConfrimReservation = async (
	shopId: number,
	reservationId: number,
	reqbody: TReqConfrimReservation,
) => {
	const response = await axiosInstance().patch(
		`/shops/${shopId}/reservations/${reservationId}/confirm`,
		reqbody,
	)
	return response
}

export type TReqConfrimReservation = {
	endTime: number
	price: string
}
