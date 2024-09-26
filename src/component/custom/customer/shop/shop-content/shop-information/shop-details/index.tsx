import type { TResGetShop } from "@/util/api-v2/get-shop-by-id"

import Loaction from "./location"
import Price from "./price"
import WeeklyHoursDisplay from "./weekly-hours-display"

type ShopDetails = {
	shopInfoData: TResGetShop
}
export default function ShopDetails({ shopInfoData }: ShopDetails) {
	const { workHours, address, priceImages } = shopInfoData
	return (
		<div className="flex h-full w-[550px] flex-col justify-start rounded-[26px] px-5 py-2 shadow-customGray70">
			<WeeklyHoursDisplay workHours={workHours} />
			<Loaction address={address} />
			<Price priceImages={priceImages} />
		</div>
	)
}
