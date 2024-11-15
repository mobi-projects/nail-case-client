import { axiosInstance } from "@/config/axios"

export const patchCancelReservation = async (
	shopId: number,
	reservationId: number,
) => {
	const response = await axiosInstance().patch(
		`/shops/${shopId}/reservations/${reservationId}/cancel`,
	)
	return response
}
