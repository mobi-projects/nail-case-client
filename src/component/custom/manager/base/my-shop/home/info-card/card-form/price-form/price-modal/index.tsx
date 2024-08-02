import Image from "next/image"

import NTIcon from "@/component/common/nt-icon"
import {
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@/component/common/nt-modal"
import { cn } from "@/config/tailwind"
import type { TResGetShopInfo } from "@/util/api_v2/get-shop-info"

import { useModalHook } from "./modal-hook"
import { getPriceImageProps } from "./price-modal.util"
type PriceImageModalPT = {
	infoData: TResGetShopInfo
}
export function PriceImageModal({ infoData }: PriceImageModalPT) {
	const imageArray = getPriceImageProps(infoData.profileImages)
	const { currentIdx, handlePrev, handleNext, prevDisabled, nextDisabled } =
		useModalHook(imageArray)

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
