"use client"

import { useShopInfo } from "@/hook/use-shop-controller"
import type { TResGetShopInfo } from "@/util/api_v2/get-shop-Info"

import { CardForm } from "./card-form"
import { LocationForm } from "./card-form/location-form"
import { PriceForm } from "./card-form/price-form"
import { WorkingTimeForm } from "./card-form/working-time-form"

export default function InfoCardList() {
	const { data, isLoading } = useShopInfo(1)

	if (isLoading) {
		return <div>...Loding</div>
	}
	const InfoData = data as TResGetShopInfo

	return (
		<div className="flex justify-between">
			<CardForm title="영업시간">
				<WorkingTimeForm InfoData={InfoData} />
			</CardForm>
			<CardForm title="위치">
				<LocationForm InfoData={InfoData} />
			</CardForm>
			<CardForm title="가격">
				<PriceForm />
			</CardForm>
		</div>
	)
}
