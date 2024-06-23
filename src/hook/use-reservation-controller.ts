import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { LIST_RESERVATION_QUERY } from "@/constant"
import type { TReqBodyPostRegisterReservation } from "@/type"
import {
	getListReservation,
	postRegisterReservation,
} from "@/util/api/reservation-controller"

/** 예약 목록조회 */
export const useListReservationQuery = (
	shopId: number,
	startTime: number,
	endTime: number,
) => {
	const { data: reservationArr, ...rest } = useQuery({
		queryKey: [LIST_RESERVATION_QUERY, shopId, startTime, endTime],
		queryFn: async () => await getListReservation(shopId, startTime, endTime),
	})
	return { reservationArr, ...rest }
}
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
