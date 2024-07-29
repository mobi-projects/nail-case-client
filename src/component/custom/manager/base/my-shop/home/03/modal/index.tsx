import Image from "next/image"
import { useState } from "react"

import NTIcon from "@/component/common/nt-icon"
import NTModal, {
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@/component/common/nt-modal"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"
import { cn } from "@/config/tailwind"

import { PRICE_IMAGE } from "../price_image"

export function PriceImageModal() {
	const { onCloseModal } = useModal()
	const [currentIdx, setCurrentIdx] = useState(0)
	const handlePrev = () => {
		if (currentIdx > 0) {
			setCurrentIdx(currentIdx - 1)
		}
	}
	const handleNext = () => {
		if (currentIdx < PRICE_IMAGE.length - 1) {
			setCurrentIdx(currentIdx + 1)
		}
	}

	const prevDisabled = currentIdx === 0
	const nextDisabled = currentIdx === PRICE_IMAGE.length - 1
	return (
		<NTModal size="small" isX={false}>
			<ModalContent>
				<ModalHeader className="flex h-[74.5px] w-full items-center justify-between px-[15px]">
					<div className="flex flex-1 justify-center pl-[36px] text-2xl text-Title01">
						<span>가격표 이미지</span>
					</div>
					<NTIcon
						icon="delete"
						className="cursor-pointer text-Gray20 hover:text-Gray80"
						onClick={onCloseModal}
					/>
				</ModalHeader>
				<ModalBody className="flex h-full w-full items-center justify-center">
					<NTIcon
						icon="expandLeftLight"
						className={cn(
							"h-[120px] w-[60px] cursor-pointer text-Gray20",
							prevDisabled || "hover:text-Gray80",
						)}
						onClick={handlePrev}
					/>
					<div className="relative h-[570px] w-[456px]">
						<Image
							src={PRICE_IMAGE[currentIdx]}
							alt={PRICE_IMAGE[currentIdx]}
							fill
							priority
							sizes="456px"
						/>
					</div>
					<NTIcon
						icon="expandRightLight"
						className={cn(
							"h-[120px] w-[60px] cursor-pointer text-Gray20",
							nextDisabled || "hover:text-Gray80",
						)}
						onClick={handleNext}
					/>
				</ModalBody>
				<ModalFooter className="h-[50px]" />
			</ModalContent>
		</NTModal>
	)
}
