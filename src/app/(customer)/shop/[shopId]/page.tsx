import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import type { Metadata } from "next"

import { ShopDetail } from "@/component/custom/customer/shop/customer-shop"
import { getCacheClient } from "@/config/tanstack-query"
import { QUERY_SHOP_INFO } from "@/constant"
import { getShopById } from "@/util/api-v2/get-shop-by-id"

type CustomerShopPT = {
	params: {
		shopId: string
	}
}
export const generateMetadata = async ({
	params,
}: CustomerShopPT): Promise<Metadata> => {
	const shopId = parseInt(params.shopId)
	const shopData = await getShopById(shopId)
	const { shopName, address, profileImages } = shopData
	const imageUrl =
		profileImages && profileImages.length > 0
			? profileImages[0].imageUrl
			: "/default-image.jpg"
	return {
		title: `${shopName} - 네일 예약페이지`,
		description: `매장명은 ${shopName}이고 주소는 ${address}입니다`,
		openGraph: {
			title: `${shopName} - 네일 예약페이지`,
			description: `매장명은 ${shopName}이고 주소는 ${address}입니다`,
			images: imageUrl,
		},
	}
}
export default async function CustomerShop({ params }: CustomerShopPT) {
	const queryClient = getCacheClient()
	const shopId = parseInt(params.shopId)
	await queryClient.prefetchQuery({
		queryKey: [QUERY_SHOP_INFO, shopId],
		queryFn: async () => await getShopById(shopId),
	})

	const dehydratedState = dehydrate(queryClient)

	return (
		<HydrationBoundary state={dehydratedState}>
			<ShopDetail shopId={shopId} />
		</HydrationBoundary>
	)
}
