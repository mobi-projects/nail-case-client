import type { QueryClient } from "@tanstack/react-query"

import type { TStatusExcludeCanceled } from "@/component/custom/manager/(with-layout)/reservations/reservations.type"
import { axiosInstance } from "@/config/axios"
import { VIEW_RESERVATION_QUERY } from "@/constant"
import type { TRemoveOption } from "@/type/union-option/remove-option"

import type { TconditionOption, TTreatmentOption } from "./get-main-page-data"

/** 예약 상세보기 조회 */
export const getReservationDetail = async (
	shopId: number,
	reservationId: number,
): Promise<TResViewReservation> => {
	const response = await axiosInstance().get(
		`/shops/${shopId}/reservations/${reservationId}`,
	)
	return response.data.data
}

/** 예약 상세보기 prefetch */
export const prefetchResercationDetail = async (
	queryClient: QueryClient,
	shopId: number,
	reservationId: number,
) => {
	await queryClient.prefetchQuery({
		queryKey: [VIEW_RESERVATION_QUERY, shopId, reservationId],
		queryFn: () => getReservationDetail(shopId, reservationId),
		staleTime: 0,
		gcTime: 1000 * 60 * 10, // 보관시간 10분 설정
	})
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
