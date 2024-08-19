import { toast } from "sonner"

import { NTButton } from "@/component/common/atom/nt-button"
import {
	ModalBody,
	ModalContent,
	ModalHeader,
} from "@/component/common/nt-modal"

import { customerPhoneNumber } from "./phone-number.util"
type NumberModalPT = { phoneNumber: string }
export function NumberModal({ phoneNumber }: NumberModalPT) {
	const customNumber = customerPhoneNumber(phoneNumber)
	const handleCopyUrl = () => {
		navigator.clipboard.writeText(customNumber).then(() => {
			toast.message(" 클립보드에 복사 되었습니다 ")
		})
	}

	return (
		<ModalContent>
			<ModalHeader className="flex h-10 w-full items-center justify-center border-b-2 px-[15px] pb-3">
				<p className="text-Headline02">전화번호</p>
			</ModalHeader>
			<ModalBody className="flex items-center">
				<input
					type="text"
					value={customNumber}
					readOnly
					className="mr-[8px] h-[56px] w-full rounded-[12px] border p-[8px] text-center"
				/>
				<NTButton onClick={handleCopyUrl}>복사</NTButton>
			</ModalBody>
		</ModalContent>
	)
}
