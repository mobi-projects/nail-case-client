"use client"

import type { TResGetShop } from "@/util/api-v2/get-shop-by-id"

import Loaction from "./location"
import Price from "./price"
import WeeklyHoursDisplay from "./weekly-hours-display"

type ShopDetails = {
	shopInfoData: TResGetShop
}
export default function ShopDetails({ shopInfoData }: ShopDetails) {
	return (
		<div className="flex h-full w-[550px] flex-col justify-start rounded-[26px] px-5 py-2 shadow-customGray70">
			<WeeklyHoursDisplay workHours={shopInfoData.workHours} />
			<Loaction address={shopInfoData.address} />
			<Price priceImages={shopInfoData.priceImages} />
		</div>
	)
}
