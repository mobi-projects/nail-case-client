import { useQuery } from "@tanstack/react-query"

import {
	QUERY_POST_ARR,
	QUERY_RESERVATION_ARR,
	QUERY_SHOP_INFO,
} from "@/constant"
import type { TNTTime } from "@/type"
import { getPostArr, getReservationArr, getShopInfo } from "@/util/api"
import { transToTimestamp } from "@/util/common/transform"

export const useShopInfo = () => {
	const { data: shopInfo } = useQuery({
		queryKey: [QUERY_SHOP_INFO],
		queryFn: getShopInfo,
	})
	return { shopInfo }
}
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
