import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

import ManagerBanner from "@/component/custom/manager/base/my-shop/home/banner"
import ShopInformaion from "@/component/custom/manager/base/my-shop/home/shop-information"
import { getCacheClient } from "@/config/tanstack-query"
import { QUERY_SHOP_INFO_QUERY } from "@/constant"
import { getShopInfo } from "@/util/api_v2/get-shop-Info"

export default async function Home() {
	const queryClient = getCacheClient()

	await queryClient.prefetchQuery({
		queryKey: [QUERY_SHOP_INFO_QUERY, 1],
		queryFn: async () => await getShopInfo(1),
	})
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ManagerBanner />
			<ShopInformaion />
		</HydrationBoundary>
	)
}
