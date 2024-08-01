"use client"

import { useModal } from "@/component/common/nt-modal/nt-modal.context"
import { useShopInfo } from "@/hook/use-shop-controller"
import type { TResGetShopInfo } from "@/util/api_v2/get-shop-Info"

import { CardForm } from "./card-form"
import { LocationForm } from "./card-form/location-form"
import { PriceForm } from "./card-form/price-form"
import { PriceImageModal } from "./card-form/price-form/price-modal"
import { WorkingTime } from "./card-form/working-time-form"

export default function InfoCardList() {
	const { data, isLoading } = useShopInfo(1)
	const { onOpenModal } = useModal()

	if (isLoading) {
		return <div>...Loding</div>
	}
	const infoData = data as TResGetShopInfo

	const handleArtClick = () => {
		onOpenModal({
			children: <PriceImageModal infoData={infoData} />,
			size: "small",
			isX: false,
		})
	}
	return (
		<div className="flex justify-between">
			<CardForm title="영업시간">
				<WorkingTime />
			</CardForm>
			<CardForm title="위치">
				<LocationForm infoData={infoData} />
			</CardForm>
			<CardForm title="가격" onClick={handleArtClick}>
				<PriceForm />
			</CardForm>
		</div>
	)
}
