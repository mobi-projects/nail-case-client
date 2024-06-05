import { useQuery } from "@tanstack/react-query"

import { getShopInfo } from "@/api"
import { QUERY_SHOP_INFO } from "@/constant"

export const useShopInfo = () => {
	const { data: shopInfo } = useQuery({
		queryKey: [QUERY_SHOP_INFO],
		queryFn: getShopInfo,
	})
	return { shopInfo }
}
