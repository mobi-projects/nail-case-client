import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
	LIST_RESERVATION_QUERY,
	QUERY_LIST_RESERVATIONS,
	VIEW_RESERVATION_QUERY,
} from "@/constant"
import type { TReqBodyUpdateReservation } from "@/type"
import {
	getViewReservation,
	patchUpdateReservation,
} from "@/util/api/reservation-controller"
import {
	getListReservation,
	type TReqListReservationPT,
} from "@/util/api-v2/get-list-reservation"
import {
	postRegisterReservation,
	type TReqReservationForm,
} from "@/util/api-v2/post-register-reservation"

/** 예약 목록조회 */
export const useListReservation = ({
	shopId,
	endDate,
	startDate,
	status,
	page,
	size,
}: TReqListReservationPT) =>
	useQuery({
		queryKey: [QUERY_LIST_RESERVATIONS, shopId, page, status],
		queryFn: () =>
			getListReservation({ shopId, status, endDate, startDate, page, size }),
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
