import { useModal } from "@/component/common/nt-modal/nt-modal.context"
import type { TInfoImages } from "@/util/api-v2/get-shop-info"

import CardForm from "../card-form"

import PriceImageModal from "./price-image-modal"

type PricePT = { priceImages: Array<TInfoImages> }

export default function PriceForm({ priceImages }: PricePT) {
	const { onOpenModal } = useModal()
	const handleArtClick = () => {
		if (priceImages.length > 0) {
			onOpenModal({
				children: <PriceImageModal priceImages={priceImages} />,
				size: "small",
				isX: false,
			})
		}
	}

	return (
		<CardForm
			title="가격"
			content={"가격표 확인하기"}
			isClickable={true}
			onClick={handleArtClick}
		/>
	)
}
