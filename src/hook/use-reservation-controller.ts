import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
	LIST_RESERVATION_QUERY,
	QUERY_LIST_AVAILABLE_TIME,
	VIEW_RESERVATION_QUERY,
} from "@/constant"
import type {
	TReqBodyRegisterReservation,
	TReqBodyUpdateReservation,
} from "@/type"
import {
	getAvailableTime,
	getListReservation,
	getViewReservation,
	patchUpdateReservation,
	postRegisterReservation,
} from "@/util/api/reservation-controller"

/** 예약 목록조회 */
export const useListReservationQuery = (
	shopId: number,
	startTime: number,
	endTime: number,
) =>
	useQuery({
		queryKey: [LIST_RESERVATION_QUERY, shopId, startTime, endTime],
		queryFn: async () => await getListReservation(shopId, startTime, endTime),
	})

/** 예약 등록 */
type RegisterReservationPT = {
	newReservation: TReqBodyRegisterReservation
}
export const useRegisterReservationMutation = (shopId: number) => {
	return useMutation({
		mutationFn: async ({ newReservation }: RegisterReservationPT) =>
			await postRegisterReservation(shopId, newReservation),
		onSuccess: (data) => {
			alert(JSON.stringify(data))
		},
		onError: (error) => {
			alert(JSON.stringify(error))
		},
	})
}
/** 예약 상세 조회 */
export const useViewReservationQuery = (
	shopId: number,
	reservationId: number,
) =>
	useQuery({
		queryKey: [VIEW_RESERVATION_QUERY],
		queryFn: async () => await getViewReservation(shopId, reservationId),
	})

/** 예약 수정 */
type UpdateReservationPT = {
	reservationId: number
	updated: TReqBodyUpdateReservation
}
export const useUpdateReservationMutation = (shopId: number) => {
	const queryClient = useQueryClient()
	const { mutateAsync: updateReservation, ...rest } = useMutation({
		mutationFn: async ({ reservationId, updated }: UpdateReservationPT) =>
			await patchUpdateReservation(shopId, reservationId, updated),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: [LIST_RESERVATION_QUERY, shopId],
			}),
	})
	return { updateReservation, ...rest }
}
/** 예약 중, "예약 가능 시간" & "아티스트" 조회 */
export const useAvailableTimeQuery = (
	shopId: number,
	artistIds: number[],
	timestamp: number,
) =>
	useQuery({
		queryKey: [QUERY_LIST_AVAILABLE_TIME, artistIds.length, shopId, timestamp],
		queryFn: async () => await getAvailableTime(shopId, artistIds, timestamp),
	})
