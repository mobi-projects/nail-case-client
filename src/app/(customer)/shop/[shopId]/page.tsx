"use client"

import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import CustomerShopBanner from "@/component/custom/customer/shop/01"
import ReservationSchedule from "@/component/custom/customer/shop/02"
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

const validShopIds = [1]

export default function CustomerShop({ params }: CustomerShopPT) {
	const router = useRouter()
	const [isValidShop, setIsValidShop] = useState(true)

	useEffect(() => {
		const shopId = convertStringToInteger(params.shopId)
		if (!validShopIds.includes(shopId)) {
			setIsValidShop(false)
			router.push("/no-results")
		}
	}, [params.shopId, router])

	if (!isValidShop) {
		return null
	}

	return (
		<div className="h-full w-full">
			<CustomerShopBanner />
			<div className="mt-[32px] flex w-full flex-col gap-[32px]">
				<div className="flex w-full flex-col gap-[20px]">
					<p className="text-Title02">예약 일시</p>
					<ReservationSchedule shopId={convertStringToInteger(params.shopId)} />
				</div>
				<CustomerShopContent />
			</div>
		</div>
	)
}
