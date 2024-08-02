import NTIcon from "@/component/common/nt-icon"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"
import type { TResGetShopInfo } from "@/util/api_v2/get-shop-Info"

import PriceImageModal from "./price-image-modal"

type PricePT = TResGetShopInfo

export default function Price({ priceImages }: PricePT) {
	const { onOpenModal } = useModal()
	const handleArtClick = () => {
		onOpenModal({
			children: <PriceImageModal priceImages={priceImages} />,
			size: "small",
			isX: false,
		})
	}

	return (
		<div className="flex flex-col py-2">
			<div className="pb-2 text-Headline02 text-Gray80">가격</div>
			<div className="flex items-center gap-x-1">
				<NTIcon icon="dot" className="h-7 w-7" />
				<p
					className="cursor-pointer text-Gray70 transition-all hover:text-PB70 hover:underline"
					onClick={handleArtClick}
				>
					가격표 확인하기!
				</p>
			</div>
		</div>
	)
}
