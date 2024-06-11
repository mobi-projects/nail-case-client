import { useQuery } from "@tanstack/react-query"

import { QUERY_POST_ARR, QUERY_SHOP_INFO } from "@/constant"
import { getPostArr, getShopInfo } from "@/util/api"

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
