import { useQuery } from "@tanstack/react-query"

import { QUERY_LIST_SHOP_NAIL_ARTIST } from "@/constant"
import { getListShopNailArtist } from "@/util/api/shop-controller"

/** 매장 아티스트 목록조회 */
export const useListShopNailArtist = (shopId: number) =>
	useQuery({
		queryKey: [QUERY_LIST_SHOP_NAIL_ARTIST, shopId],
		queryFn: async () => await getListShopNailArtist(shopId),
	})
