import { useModal } from "@/component/common/nt-modal/nt-modal.context"
import type { TInfoImages } from "@/util/api/get-shop-info"

import PriceImageModal from "./price-image-modal"

type PricePT = { priceImages: Array<TInfoImages> }

export default function Price({ priceImages }: PricePT) {
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
		<div className="flex flex-col py-2">
			<div className="pb-2 text-Headline02 text-Gray80">가격</div>
			<div className="flex items-center gap-x-3 pl-3">
				<div className="h-2 w-2 rounded-full bg-PB100 ring-2 ring-PB50 max-md:h-1 max-md:w-1" />
				<p
					className="cursor-pointer pl-5 text-Gray70 transition-all hover:text-PB70 hover:underline max-md:text-[14px]"
					onClick={handleArtClick}
				>
					가격표 확인하기!
				</p>
			</div>
		</div>
	)
}
