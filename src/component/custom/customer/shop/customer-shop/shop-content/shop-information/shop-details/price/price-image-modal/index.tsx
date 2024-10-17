import { useState } from "react"

import NTBannerImageCarousel from "@/component/common/nt-banner-image-carousel"
import NTContent from "@/component/common/nt-content"
import {
	ModalBody,
	ModalContent,
	ModalHeader,
} from "@/component/common/nt-modal"
import type { TInfoImages } from "@/util/api/get-shop-info"

type PriceImageModalPT = { priceImages: Array<TInfoImages> }

export default function PriceImageModal({ priceImages }: PriceImageModalPT) {
	const [currentIndex, setCurrentIndex] = useState(0)
	const handleImageSelect = (idx: number) => {
		setCurrentIndex(idx)
	}
	const imagePropArr = priceImages.map((info) => {
		return { src: info.imageUrl, alt: "가격표" }
	})

	return (
		<div className="flex flex-col justify-center">
			<ModalContent className="flex-col justify-center">
				<ModalHeader className="flex w-full items-center justify-center pb-5 text-Title01">
					가격표
					<NTContent mode="dark" className="absolute right-10">
						{`${currentIndex + 1}/${imagePropArr.length.toString()}`}
					</NTContent>
				</ModalHeader>
				<ModalBody className="relative flex h-[650px] w-[490px]">
					<NTBannerImageCarousel
						className="h-full w-full rounded-xl"
						essentialImagePropArr={imagePropArr}
						accessSelected={handleImageSelect}
					/>
				</ModalBody>
			</ModalContent>
		</div>
	)
}
