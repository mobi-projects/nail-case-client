import Image from "next/image"

import NTIcon from "@/component/common/nt-icon"
import {
	ModalBody,
	ModalContent,
	ModalHeader,
} from "@/component/common/nt-modal"
import { cn } from "@/config/tailwind"
import type { TInfoImages } from "@/util/api-v2/get-shop-info"

import { useModalHook } from "./price-image-modal.hook"

type PriceImageModalPT = {
	priceImages: Array<TInfoImages>
}
export function PriceImageModal({ priceImages }: PriceImageModalPT) {
	const { currentIdx, handlePrev, handleNext, prevDisabled, nextDisabled } =
		useModalHook({ priceImages })

	return (
		<ModalContent>
			<ModalHeader className="mb-2 flex h-16 w-full justify-between border-b-2 px-[15px]">
				<div className="flex flex-1 justify-center text-2xl text-Body01">
					<span>가격표 이미지</span>
				</div>
			</ModalHeader>
			<ModalBody className="relative my-5 flex h-full w-full items-center justify-center">
				<div className="absolute right-8 top-3 z-10 text-Gray10 opacity-60">{`${currentIdx + 1} / ${priceImages.length}`}</div>
				<NTIcon
					icon="expandLeftLight"
					className={cn(
						"absolute left-0 top-48 z-10 h-[120px] w-[60px] text-Gray10 opacity-30",
						prevDisabled || "cursor-pointer hover:text-Gray60 hover:opacity-80",
					)}
					onClick={handlePrev}
				/>
				<NTIcon
					icon="expandRightLight"
					className={cn(
						"absolute right-0 top-48 z-10 h-[120px] w-[60px] text-Gray10 opacity-30",
						nextDisabled || "cursor-pointer hover:text-Gray60 hover:opacity-80",
					)}
					onClick={handleNext}
				/>
				<div className="relative h-full w-full rounded-[26px]">
					<Image
						src={priceImages[currentIdx].imageUrl}
						alt="가격표 이미지"
						fill
						priority
						sizes="456px "
						className="rounded-[26px]"
					/>
				</div>
			</ModalBody>
		</ModalContent>
	)
}
