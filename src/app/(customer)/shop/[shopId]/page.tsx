"use client"

import { useRouter } from "next/navigation"

import CustomerShopBanner from "@/component/custom/customer/shop/banner"
import CustomerShopContent from "@/component/custom/customer/shop/shop-content"
import { useShopById } from "@/hook/use-shop-controller"
import { convertStringToInteger } from "@/util/common"

type CustomerShopPT = {
	params: {
		shopId: number
	}
}

export default function CustomerShop({ params }: CustomerShopPT) {
	const router = useRouter()
	const shopId = params.shopId

	const { data, error, isLoading } = useShopById(shopId)
	console.log(data)
	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<div className="flex items-center space-x-2">
					<div className="h-6 w-6 animate-spin rounded-full border-4 border-solid border-PB100 border-t-transparent"></div>
					<p className="font-medium text-lg">Loading...</p>
				</div>
			</div>
		)
	}

	if (!error && data) {
		return (
			<div className="h-full w-full">
				<CustomerShopBanner
					shopName={data.shopName}
					shopAddress={data.address}
				/>
				<CustomerShopContent
					shopId={convertStringToInteger(params.shopId)}
					data={data}
				/>
			</div>
		)
	} else {
		if (typeof window !== "undefined") {
			router.push("/404")
		}
		return null
	}
}
