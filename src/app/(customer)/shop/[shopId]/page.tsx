import type { Metadata } from "next"

import CustomerShopBanner from "@/component/custom/customer/shop/banner"
import CustomerShopContent from "@/component/custom/customer/shop/shop-content"
import ShopError from "@/component/custom/customer/shop/shop-error"
import { getShopById } from "@/util/api-v2/get-shop-by-id"
import { convertStringToInteger } from "@/util/common"

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
	const shopData = await getShopById(params.shopId)

	if (!shopData) return <ShopError />

	const { shopName, address, profileImages } = shopData

	return (
		<div>
			<CustomerShopBanner
				shopName={shopName}
				shopAddress={address}
				profileImages={profileImages}
				shopId={convertStringToInteger(params.shopId)}
			/>
			<CustomerShopContent
				shopId={convertStringToInteger(params.shopId)}
				data={shopData}
			/>
		</div>
	)
}
