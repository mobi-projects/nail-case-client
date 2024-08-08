"use client"

import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"

import CustomerShopBanner from "@/component/custom/customer/shop/01"
import { useShopById } from "@/hook/use-shop-controller"
import { convertStringToInteger } from "@/util/common"

const CustomerShopContent = dynamic(
	() => import("@/component/custom/customer/shop/shop-content/index"),
	{ ssr: false },
)

type CustomerShopPT = {
	params: {
		shopId: number
	}
}

export default function CustomerShop({ params }: CustomerShopPT) {
	const router = useRouter()
	const shopId = params.shopId
	const {
		data: shopInfo,
		error,
		isLoading,
	} = useShopById(convertStringToInteger(shopId))

	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<div className="flex items-center space-x-2">
					<div className="h-6 w-6 animate-spin rounded-full border-4 border-solid border-PB100 border-t-transparent"></div>
					<p className="font-medium text-lg">Loading...</p>
				</div>
				<CustomerShopContent shopId={convertStringToInteger(params.shopId)} />
			</div>
		)
	}

	if (!error && shopInfo && shopInfo.success) {
		return (
			<div className="h-full w-full">
				<CustomerShopBanner shopId={convertStringToInteger(params.shopId)} />
				<CustomerShopContent shopId={convertStringToInteger(params.shopId)} />
			</div>
		)
	} else {
		if (typeof window !== "undefined") {
			router.push("/404")
		}
		return null
	}
}
