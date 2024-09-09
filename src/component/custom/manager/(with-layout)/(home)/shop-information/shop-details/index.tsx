"use client"

import { useShopById } from "@/hook/use-shop-controller"
import { isUndefined } from "@/util/common/type-guard"

import Loaction from "./location"
import Price from "./price"
import WeeklyHoursDisplay from "./weekly-hours-display"

type ShopDetailsPT = {
	shopId: number
}

export default function ShopDetails({ shopId }: ShopDetailsPT) {
	const { data: shopInfo } = useShopById(shopId)
	if (isUndefined(shopInfo)) return
	const { address, priceImages, workHours } = shopInfo
	return (
		<div className="flex h-full w-[550px] flex-col justify-start rounded-[26px] px-5 py-2 shadow-customGray70">
			<WeeklyHoursDisplay workHours={workHours} />
			<Loaction address={address} />
			<Price priceImages={priceImages} />
		</div>
	)
}
