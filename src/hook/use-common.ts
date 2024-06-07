import { useQuery } from "@tanstack/react-query"

import { QUERY_SHOP_INFO } from "@/constant"
import { getShopInfo } from "@/util/api"

export const useShopInfo = () => {
	const { data: shopInfo } = useQuery({
		queryKey: [QUERY_SHOP_INFO],
		queryFn: getShopInfo,
	})
	return { shopInfo }
}
