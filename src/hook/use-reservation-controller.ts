import { useQuery } from "@tanstack/react-query"

import { LIST_RESERVATION_QUERY } from "@/constant"
import { getListReservation } from "@/util/api/reservation-controller"

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
