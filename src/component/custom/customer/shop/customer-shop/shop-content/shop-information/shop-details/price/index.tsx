import { useModal } from "@/component/common/nt-modal/nt-modal.context"
import type { TInfoImages } from "@/util/api-v2/get-shop-info"

import InfoCard from "../info-card"

import PriceImageModal from "./price-image-modal"

type PriceCardPT = { priceImages: Array<TInfoImages> }

export default function PriceCard({ priceImages }: PriceCardPT) {
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
		<InfoCard
			title="가격표"
			content={"가격표 확인하기"}
			isClickable={true}
			onClick={handleArtClick}
			isContentClickable={true}
			contentOnClick={handleArtClick}
		/>
	)
}
