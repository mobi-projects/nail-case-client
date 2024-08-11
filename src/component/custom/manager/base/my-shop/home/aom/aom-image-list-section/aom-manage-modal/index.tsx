import { useState } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import {
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@/component/common/nt-modal"

import { getAOMModalBtnText } from "./aom-manage-modal.util"
import { EditAOM } from "./edit-aom"
import { RegisterGuide } from "./register-guide"

export default function AOMManageModal() {
	const [isGuideVisible, setIsGuideVisible] = useState(true)
	const modalBtnText = getAOMModalBtnText(isGuideVisible)
	return (
		<ModalContent className="flex flex-col gap-y-3">
			<ModalHeader className="flex w-full items-center justify-center text-Title01 font-Bold text-Gray80">
				이달의 아트
			</ModalHeader>
			<div className="relative h-full w-full">
				<RegisterGuide isGuideVisible={isGuideVisible} />
				<EditAOM isGuideVisible={!isGuideVisible} />
			</div>
			<ModalFooter className="flex w-full items-center justify-center">
				<NTButton
					flexible={"fit"}
					onClick={() => {
						if (isGuideVisible) return setIsGuideVisible(false)
					}}
				>
					{modalBtnText}
				</NTButton>
			</ModalFooter>
		</ModalContent>
	)
}
