"use client"

import { useShopInfo } from "@/hook/use-shop-controller"
import { isUndefined } from "@/util/common/type-guard"

import Loaction from "./location"
import Price from "./price"
import WeeklyHoursDisplay from "./weekly-hours-display"

export default function ShopDetails() {
	const { data } = useShopInfo(1)
	if (isUndefined(data)) return
	const { address, priceImages, workHours } = data
	return (
		<div className="flex h-full w-[550px] flex-col justify-start rounded-[26px] px-5 py-2 shadow-customGray70">
			<WeeklyHoursDisplay workHours={workHours} />
			<Loaction address={address} />
			<Price priceImages={priceImages} />
		</div>
	)
}
