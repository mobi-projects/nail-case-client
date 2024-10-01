import type { TStatusExcludeCanceled } from "@/component/custom/manager/(with-layout)/reservations/reservations.type"
import { axiosInstance } from "@/config/axios"
import type { TRemoveOption } from "@/type/union-option/remove-option"

import type { TconditionOption, TTreatmentOption } from "./get-main-page-data"

export const getReservationDetail = async (
	shopId: number,
	reservationId: number,
): Promise<TResViewReservation> => {
	const response = await axiosInstance().get(
		`/shops/${shopId}/reservations/${reservationId}`,
	)
	return response.data.data
}

export type TResViewReservation = {
	reservationId: number
	remove: TRemoveOption
	extend: boolean
	status: TStatusExcludeCanceled
	startTime: number
	endTime: number | null
	price: string | null
	customerName: string
	conditionList: Array<{
		option: TconditionOption
	}>
	treatment: {
		option: TTreatmentOption
		imageId?: number
		imageUrl?: string
	}
	workHourInfo: {
		isOpen: boolean
		openTime: number
		closeTime: number
	}
	rejectReason: string | null
}
