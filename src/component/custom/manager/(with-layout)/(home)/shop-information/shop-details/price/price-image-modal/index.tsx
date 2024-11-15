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
				<ModalHeader className="flex w-full items-center justify-center pb-2 text-Title01 lg:text-[18px] max-md:text-[16px]">
					가격표
					<NTContent
						mode="dark"
						className="absolute right-10 min-w-[5rem] md:min-w-16 max-sm:min-w-14 max-lg:right-4"
					>
						{`${currentIndex + 1}/${imagePropArr.length.toString()}`}
					</NTContent>
				</ModalHeader>
				<ModalBody className="relative flex h-[650px] w-full items-center justify-center lg:w-[80dvw] max-lg:h-[70dvh] max-lg:w-full">
					<NTBannerImageCarousel
						className="h-full w-full rounded-xl max-xl:h-full"
						essentialImagePropArr={imagePropArr}
						accessSelected={handleImageSelect}
					/>
				</ModalBody>
			</ModalContent>
		</div>
	)
}
