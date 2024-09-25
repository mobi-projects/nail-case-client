"use client"

import { useShopById } from "@/hook/use-shop-controller"

import CustomerShopBanner from "../banner"
import CustomerShopContent from "../shop-content"
import ShopError from "../shop-error"

type CustomerShopPagePT = {
	shopId: number
}
export function CustomerShopPage({ shopId }: CustomerShopPagePT) {
	const { data: shopData } = useShopById(shopId)
	if (!shopData) return <ShopError />

	const { shopName, address, profileImages } = shopData

	return (
		<div>
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
