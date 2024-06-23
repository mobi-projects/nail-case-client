import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { LIST_RESERVATION_QUERY, VIEW_RESERVATION_QUERY } from "@/constant"
import type { TReqBodyPostRegisterReservation } from "@/type"
import {
	getListReservation,
	getViewReservation,
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
export const useRegisterReservationMutation = (shopId: number) => {
	const queryClient = useQueryClient()
	const { mutateAsync: register, ...rest } = useMutation({
		mutationFn: async (reservationArr: TReqBodyPostRegisterReservation) =>
			await postRegisterReservation(shopId, reservationArr),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: [LIST_RESERVATION_QUERY, shopId],
			}),
	})
	return { register, ...rest }
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
