import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { useModal } from "@/component/common/nt-modal/nt-modal.context"
import {
	LIST_RESERVATION_QUERY,
	QUERY_LIST_RESERVATIONS,
	VIEW_RESERVATION_QUERY,
} from "@/constant"
import type { TReqBodyUpdateReservation } from "@/type"
import {
	getListReservation,
	type TReqListReservationPT,
} from "@/util/api/get-list-reservation"
import { getReservationDetail } from "@/util/api/get-reservation-detail"
import {
	patchConfrimReservation,
	type TReqConfrimReservation,
} from "@/util/api/patch-confirm-reservation"
import {
	patchRefuseReservation,
	type TReqRefuseReservation,
} from "@/util/api/patch-refuse-reservation"
import { patchUpdateReservation } from "@/util/api/pathch-update-reservation"
import {
	postRegisterReservation,
	type TReqReservationForm,
} from "@/util/api/post-register-reservation"

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
		staleTime: 0, // 데이터를 stale 상태로 빠르게 만듦
		gcTime: 1000 * 60 * 10, // 캐시 보관 시간 (5분)
	})

/** 예약 등록 */

export const useRegisterReservationMutation = () =>
	useMutation({
		mutationFn: ({ newReservation }: { newReservation: TReqReservationForm }) =>
			postRegisterReservation(newReservation),
	})

/** 예약 상세 조회 */
export const useViewReservationDetail = (
	shopId: number,
	reservationId: number,
) =>
	useQuery({
		queryKey: [VIEW_RESERVATION_QUERY, shopId, reservationId],
		queryFn: () => getReservationDetail(shopId, reservationId),
		enabled: reservationId !== -1,
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

/** 예약 승인 */
export const useMutateConfirmReservation = (
	shopId: number,
	reservationId: number,
) => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (reqBody: TReqConfrimReservation) =>
			patchConfrimReservation(shopId, reservationId, reqBody),
		onSuccess: () => {
			queryClient.invalidateQueries({
				predicate: (query) => {
					const queryKey = query.queryKey
					return (
						queryKey[0] === QUERY_LIST_RESERVATIONS &&
						queryKey[1] === shopId &&
						(queryKey[3] === "PENDING" || queryKey[3] === "CONFIRMED")
					)
				},
			}),
				queryClient.invalidateQueries({
					queryKey: [VIEW_RESERVATION_QUERY, shopId, reservationId],
				})
		},
		onError: () => {
			toast.error("요청이 실패했습니다. 문제가 지속되면 문의해주세요.")
		},
	})
}

/**예약 거절 */
export const useMutateRefuseReservation = (
	shopId: number,
	reservationId: number,
) => {
	const { onCloseModal } = useModal()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (reqBody: TReqRefuseReservation) =>
			patchRefuseReservation(shopId, reservationId, reqBody),
		onSuccess: () => {
			queryClient.invalidateQueries({
				predicate: (query) => {
					const queryKey = query.queryKey
					return (
						queryKey[0] === QUERY_LIST_RESERVATIONS &&
						queryKey[1] === shopId &&
						(queryKey[3] === "PENDING" || queryKey[3] === "REJECTED")
					)
				},
			}),
				queryClient.invalidateQueries({
					queryKey: [VIEW_RESERVATION_QUERY, shopId, reservationId],
				})
		},

		onError: () => {
			toast.error("요청이 실패했습니다. 문제가 지속되면 문의해주세요.")
		},

		onSettled: () => {
			onCloseModal()
		},
	})
}
