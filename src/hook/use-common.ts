import { useQuery } from "@tanstack/react-query"

import { QUERY_POST_ARR, QUERY_RESERVATION_ARR } from "@/constant"
import type { TNTTime } from "@/type"
import { getPostArr, getReservationArr } from "@/util/api"
import { transToTimestamp } from "@/util/common/transform"

export const usePostArr = () => {
	const { data: postArr } = useQuery({
		queryKey: [QUERY_POST_ARR],
		queryFn: getPostArr,
	})
	return { postArr }
}
type UseReservationArrPT = {
	from: TNTTime
	to: TNTTime
}
export const useReservationArr = ({ from, to }: UseReservationArrPT) => {
	const { data: reservationArr } = useQuery({
		queryKey: [QUERY_RESERVATION_ARR],
		queryFn: () => {
			const timeStampFrom = transToTimestamp(from)
			const timestampTo = transToTimestamp(to)
			return getReservationArr(timeStampFrom, timestampTo)
		},
	})
	return { reservationArr }
}
