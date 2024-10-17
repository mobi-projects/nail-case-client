import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

import ManagerBanner from "@/component/custom/manager/(with-layout)/(home)/banner"
import ShopInformaion from "@/component/custom/manager/(with-layout)/(home)/shop-information"
import { getCacheClient } from "@/config/tanstack-query"
import { QUERY_SHOP_INFO_QUERY } from "@/constant"
import { getShopById } from "@/util/api/get-shop-by-id"

type HomePT = { params: { shopId: string } }

export default async function Home({ params }: HomePT) {
	const shopId = parseInt(params.shopId)
	const queryClient = getCacheClient()

	await queryClient.prefetchQuery({
		queryKey: [QUERY_SHOP_INFO_QUERY, shopId],
		queryFn: async () => await getShopById(shopId),
	})
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ManagerBanner shopId={shopId} />
			<ShopInformaion shopId={shopId} />
		</HydrationBoundary>
	)
}
