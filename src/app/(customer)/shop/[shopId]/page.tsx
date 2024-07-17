"use client"

import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"

import { NTButton } from "@/component/common/atom/nt-button"
import CustomerShopBanner from "@/component/custom/customer/shop/01"
import { useShopById } from "@/hook/use-shop-controller"
import { convertStringToInteger } from "@/util/common"

const CustomerShopContent = dynamic(
	() => import("@/component/custom/customer/shop/05/index"),
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

	const onClickReservationButton = () => {
		router.push(`/shop/${shopId}/reservation`)
	}

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
				<CustomerShopBanner />
				<div className="mt-[32px] flex w-full flex-col gap-[32px]">
					<div className="flex w-full flex-col gap-[20px]">
						<NTButton flexible="full" onClick={onClickReservationButton}>
							예약하기
						</NTButton>
					</div>
					<CustomerShopContent shopId={convertStringToInteger(params.shopId)} />
				</div>
			</div>
		)
	} else {
		if (typeof window !== "undefined") {
			router.push("/404")
		}
		return null
	}
}
