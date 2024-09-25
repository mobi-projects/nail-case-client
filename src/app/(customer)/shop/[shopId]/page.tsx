import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query"
import type { Metadata } from "next"

import { CustomerShopPage } from "@/component/custom/customer/shop/customer-shop"
import { QUERY_SHOP_INFO } from "@/constant"
import { getShopById } from "@/util/api-v2/get-shop-by-id"

type CustomerShopPT = {
	params: {
		shopId: number
	}
}
export async function Metadata({ params }: CustomerShopPT): Promise<Metadata> {
	const shopData = await getShopById(params.shopId)
	const { shopName, address, profileImages } = shopData
	return {
		title: `${shopName} - 상세 페이지`,
		description: `매장명은 ${shopName}이고 주소는 ${address}입니다`,
		openGraph: {
			title: shopName,
			description: `매장명은 ${shopName}이고 주소는 ${address}입니다`,
			images: profileImages[0].imageUrl,
		},
	}
}
export default async function CustomerShop({ params }: CustomerShopPT) {
	const queryClient = new QueryClient()

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
