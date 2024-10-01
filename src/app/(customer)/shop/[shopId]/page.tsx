import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import type { Metadata } from "next"

import { CustomerShopPage } from "@/component/custom/customer/shop/customer-shop"
import { getCacheClient } from "@/config/tanstack-query"
import { QUERY_SHOP_INFO } from "@/constant"
import { getShopById } from "@/util/api-v2/get-shop-by-id"

type CustomerShopPT = {
	params: {
		shopId: number
	}
}
export const generateMetadata = async ({
	params,
}: CustomerShopPT): Promise<Metadata> => {
	const shopData = await getShopById(params.shopId)
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

	await queryClient.prefetchQuery({
		queryKey: [QUERY_SHOP_INFO, params.shopId],
		queryFn: async () => await getShopById(params.shopId),
	})

	const dehydratedState = dehydrate(queryClient)

	return (
		<HydrationBoundary state={dehydratedState}>
			<CustomerShopPage shopId={params.shopId} />
		</HydrationBoundary>
	)
}
