import type { Dispatch, SetStateAction } from "react"

import { NTButton } from "@/component/common/atom/nt-button"

type StartChatBtnPT = {
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
}
export default function StartChatBtn({ isOpen, setIsOpen }: StartChatBtnPT) {
	return (
		<NTButton
			variant="tertiary"
			flexible="full"
			size="small"
			onClick={(e) => {
				e.preventDefault()
				if (!isOpen) {
					setIsOpen(true)
				}
			}}
		>
			채팅하기
		</NTButton>
	)
}
