import type { TStatusExcludeCanceled } from "@/component/custom/manager/(with-layout)/reservations/reservations.type"
import { axiosInstance } from "@/config/axios"
import type { TRemoveOption } from "@/type/union-option/remove-option"

import type { TconditionOption, TTreatmentOption } from "./get-main-page-data"

/** [GET] 예약 목록 조회 api 호출 */
export const getListReservation = async ({
	shopId,
	endDate,
	startDate,
	status,
	page = 0,
	size = 10,
}: TReqListReservationPT): Promise<TResListReservation> => {
	const response = await axiosInstance().get(
		`/shops/${shopId}/reservations?startDate=${startDate}&endDate=${endDate}&status=${status}&page=${page}&size=${size}`,
	)
	return response.data.data
}

export type TReqListReservationPT = {
	shopId: number
	startDate?: number
	endDate?: number
	status?: TStatusExcludeCanceled
	page?: number
	size?: number
}

export type TResListReservation = {
	reservationList: Array<TReservationListPagination>
	pageNumber: number
	pageSize: number
	totalElements: number
	totalPages: number
	last: boolean
}

export type TReservationListPagination = {
	reservationId: number
	remove: TRemoveOption
	extend: boolean
	customerName: string
	status: TStatusExcludeCanceled
	startTime: number
	endTime: number | null
	conditionList: Array<TconditionOption>
	treatment: {
		option: TTreatmentOption
		imageId?: number | null
		imageUrl?: string | null
	}
}
