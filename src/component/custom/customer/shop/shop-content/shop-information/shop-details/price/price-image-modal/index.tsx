import Image from "next/image"

import NTIcon from "@/component/common/nt-icon"
import {
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@/component/common/nt-modal"
import { cn } from "@/config/tailwind"
import type { TInfoImages } from "@/util/api-v2/get-shop-info"

import { useModalHook } from "./price-image-modal.hook"

type PriceImageModalPT = { priceImages: Array<TInfoImages> }

export default function PriceImageModal({ priceImages }: PriceImageModalPT) {
	const { currentIdx, handlePrev, handleNext, prevDisabled, nextDisabled } =
		useModalHook({ priceImages })
	return (
		<div className="flex flex-col py-2">
			<ModalContent>
				<ModalHeader className="flex h-[74.5px] w-full justify-between px-[15px]">
					가격
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
							src={priceImages[currentIdx].imageUrl}
							alt="가격표 이미지"
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
