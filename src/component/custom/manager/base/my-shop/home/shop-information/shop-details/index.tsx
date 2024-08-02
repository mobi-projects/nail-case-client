"use client"

import { useShopInfo } from "@/hook/use-shop-controller"
import { isUndefined } from "@/util/common/type-guard"

import Loaction from "./location"
import OpeningHours from "./opening-hours"
import Price from "./price"

export default function ShopDetails() {
	const { data } = useShopInfo(1)
	if (isUndefined(data)) return

	return (
		<div className="flex h-full w-[550px] flex-col justify-start rounded-[26px] px-5 py-2 shadow-customGray70">
			<OpeningHours {...data} />
			<div className="flex h-full flex-col justify-end">
				<Loaction {...data} />
				<Price {...data} />
			</div>
		</div>
	)
}
