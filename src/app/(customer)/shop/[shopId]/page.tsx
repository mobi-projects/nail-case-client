"use client"

import CustomerShopBanner from "@/component/custom/customer/shop/banner"
import CustomerShopContent from "@/component/custom/customer/shop/shop-content"
import ShopError from "@/component/custom/customer/shop/shop-error"
import ShopLoading from "@/component/custom/customer/shop/shop-loading"
import { useShopById } from "@/hook/use-shop-controller"
import { convertStringToInteger } from "@/util/common"
import { isUndefined } from "@/util/common/type-guard"

type CustomerShopPT = {
	params: {
		shopId: number
	}
}

export default function CustomerShop({ params }: CustomerShopPT) {
	const shopId = params.shopId

	const { data, isLoading, isError } = useShopById(shopId)

	if (isLoading) return <ShopLoading />

	if (isError || isUndefined(data)) return <ShopError />
	const { shopName, address, profileImages } = data
	return (
		<div className="h-full w-full">
			<CustomerShopBanner
				shopName={shopName}
				shopAddress={address}
				profileImages={profileImages}
			/>
			<CustomerShopContent
				shopId={convertStringToInteger(params.shopId)}
				data={data}
			/>
		</div>
	)
}
