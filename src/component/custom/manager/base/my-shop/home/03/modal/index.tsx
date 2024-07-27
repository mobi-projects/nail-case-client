import Image from "next/image"
import type { Dispatch, SetStateAction } from "react"
import { useState } from "react"

import NTIcon from "@/component/common/nt-icon"
import NTModal, {
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@/component/common/nt-modal"

import { PriceImage } from "../priceImage"

type PriceImageModalPT = {
	setIsModalOpen: Dispatch<SetStateAction<boolean>>
}
export function PriceImageModal({ setIsModalOpen }: PriceImageModalPT) {
	const [currentIdx, setCurrentIdx] = useState(0)
	const handlePrev = () => {
		if (currentIdx > 0) {
			setCurrentIdx(currentIdx - 1)
		}
	}
	const handleNext = () => {
		if (currentIdx < PriceImage.length - 1) {
			setCurrentIdx(currentIdx + 1)
		}
	}
	const closeModal = () => {
		setIsModalOpen(false)
	}

	const prevDisabled = currentIdx === 0
	const nextDisabled = currentIdx === PriceImage.length - 1
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
						onClick={closeModal}
					/>
				</ModalHeader>
				<ModalBody className="flex h-full w-full items-center justify-center">
					<NTIcon
						icon="expandLeftLight"
						className={`h-[120px] w-[60px] cursor-pointer ${prevDisabled ? "text-Gray20" : "text-Gray20 hover:text-Gray80"}`}
						onClick={handlePrev}
					/>
					<div className="relative h-[570px] w-[456px]">
						<Image
							src={PriceImage[currentIdx]}
							alt={currentIdx.toString()}
							fill
							priority
							sizes="456px"
						/>
					</div>
					<NTIcon
						icon="expandRightLight"
						className={`h-[120px] w-[60px] cursor-pointer ${nextDisabled ? "text-Gray20" : "text-Gray20 hover:text-Gray80"}`}
						onClick={handleNext}
					/>
				</ModalBody>
				<ModalFooter className="h-[50px]" />
			</ModalContent>
		</NTModal>
	)
}
