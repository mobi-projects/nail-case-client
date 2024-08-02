import Image from "next/image"

import NTIcon from "@/component/common/nt-icon"
import {
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@/component/common/nt-modal"
import { cn } from "@/config/tailwind"
import type { TInfoImages } from "@/util/api_v2/get-shop-Info"

import { useModalHook } from "./price.hook"
import { getPriceImageProps } from "./price.util"

type PriceImageModalPT = { priceImages: Array<TInfoImages> }

export default function PriceImageModal({ priceImages }: PriceImageModalPT) {
	const imageArray = getPriceImageProps(priceImages)
	const { currentIdx, handlePrev, handleNext, prevDisabled, nextDisabled } =
		useModalHook(imageArray)
	return (
		<div className="flex flex-col py-2">
			<ModalContent>
				<ModalHeader className="flex h-[74.5px] w-full justify-between px-[15px]">
					<div className="pb-2 text-Headline02 text-Gray80">가격</div>
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
		</div>
	)
}
