import type { Dispatch, SetStateAction } from "react"

import { NTButton } from "@/component/common/atom/nt-button"

type ChatHeaderPT = {
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
}
export default function ChatButton({ isOpen, setIsOpen }: ChatHeaderPT) {
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
