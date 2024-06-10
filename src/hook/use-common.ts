import { useQuery } from "@tanstack/react-query"

import { QUERY_RESERVATION_ARR, QUERY_SHOP_INFO } from "@/constant"
import { getReservationArr, getShopInfo } from "@/util/api"

export const useShopInfo = () => {
	const { data: shopInfo } = useQuery({
		queryKey: [QUERY_SHOP_INFO],
		queryFn: getShopInfo,
	})
	return { shopInfo }
}

export const useReservationArr = () => {
	const { data: reservationArr } = useQuery({
		queryKey: [QUERY_RESERVATION_ARR],
		queryFn: getReservationArr,
	})
	return { reservationArr }
}
