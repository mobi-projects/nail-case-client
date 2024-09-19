import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { LIST_RESERVATION_QUERY, VIEW_RESERVATION_QUERY } from "@/constant"
import type { TReqBodyUpdateReservation } from "@/type"
import type { TReservationStatus } from "@/type/union-option/resesrvation-status"
import {
	getListReservation,
	getViewReservation,
	patchUpdateReservation,
} from "@/util/api/reservation-controller"
import {
	postRegisterReservation,
	type TReqReservationForm,
} from "@/util/api-v2/post-register-reservation"

/** 예약 목록조회 */
export const useListReservationQuery = (
	shopId: number,
	startTime: number,
	endTime: number,
	status: TReservationStatus,
) =>
	useQuery({
		queryKey: [LIST_RESERVATION_QUERY, shopId, startTime, endTime, status],
		queryFn: async () =>
			await getListReservation(shopId, startTime, endTime, status),
	})

/** 예약 등록 */

export const useRegisterReservationMutation = () =>
	useMutation({
		mutationFn: ({ newReservation }: { newReservation: TReqReservationForm }) =>
			postRegisterReservation(newReservation),
	})

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
