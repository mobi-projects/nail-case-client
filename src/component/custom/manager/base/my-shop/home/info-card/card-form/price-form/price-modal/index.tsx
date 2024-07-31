import Image from "next/image"
import { useState } from "react"

import NTIcon from "@/component/common/nt-icon"
import {
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@/component/common/nt-modal"
import { cn } from "@/config/tailwind"
import type { TResGetShopInfo } from "@/util/api_v2/get-shop-Info"

import { getPriceImageProps } from "./price-modal.util"
type PriceImageModalPT = {
	InfoData: TResGetShopInfo
}
export function PriceImageModal({ InfoData }: PriceImageModalPT) {
	const [currentIdx, setCurrentIdx] = useState(0)
	const imageArray = getPriceImageProps(InfoData.profileImages)
	const handlePrev = () => {
		if (currentIdx > 0) {
			setCurrentIdx(currentIdx - 1)
		}
	}
	const handleNext = () => {
		if (currentIdx < imageArray.length - 1) {
			setCurrentIdx(currentIdx + 1)
		}
	}

	const prevDisabled = currentIdx === 0
	const nextDisabled = currentIdx === imageArray.length - 1
	return (
		<ModalContent>
			<ModalHeader className="flex h-[74.5px] w-full justify-between px-[15px]">
				<div className="flex flex-1 justify-center text-2xl text-Title01">
					<span>가격표 이미지</span>
				</div>
			</ModalHeader>
			<ModalBody className="flex h-full w-full items-center justify-center">
				<NTIcon
					icon="expandLeftLight"
					className={cn(
						"h-[120px] w-[60px] text-Gray20",
						prevDisabled || "cursor-pointer hover:text-Gray80",
					)}
					onClick={handlePrev}
				/>
				<div className="relative h-[570px] w-[456px]">
					<Image
						src={imageArray[currentIdx].src}
						alt={imageArray[currentIdx].alt}
						fill
						priority
						sizes="456px"
					/>
				</div>
				<NTIcon
					icon="expandRightLight"
					className={cn(
						"h-[120px] w-[60px] text-Gray20",
						nextDisabled || "cursor-pointer hover:text-Gray80",
					)}
					onClick={handleNext}
				/>
			</ModalBody>
			<ModalFooter className="h-[50px]" />
		</ModalContent>
	)
}
