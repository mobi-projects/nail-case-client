"use client"
import { useShopById } from "@/hook/use-shop-controller"
import { isUndefined } from "@/util/common/type-guard"

import CustomerShopBanner from "./banner"
import CustomerShopContent from "./shop-content"

type CustomerShopPagePT = {
	shopId: number
}
export function ShopDetail({ shopId }: CustomerShopPagePT) {
	const { data: shopData } = useShopById(shopId)
	if (isUndefined(shopData)) return null

	const { shopName, address, profileImages } = shopData
	return (
		<div className="h-full">
			<CustomerShopBanner
				shopName={shopName}
				shopAddress={address}
				profileImages={profileImages}
				shopId={shopId}
			/>
			<CustomerShopContent shopId={shopId} data={shopData} />
		</div>
	)
}
