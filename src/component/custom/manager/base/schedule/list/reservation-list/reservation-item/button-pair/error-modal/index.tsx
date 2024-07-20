import { NTButton } from "@/component/common/atom/nt-button"
import {
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@/component/common/nt-modal"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"

import type { ErrorModalPT } from "./error-modal.type"

export default function ErrorModal({ bodyText }: ErrorModalPT) {
	const { onCloseModal } = useModal()
	return (
		<ModalContent>
			<ModalHeader className="h-[50px] w-full items-center border-b-[1.5px] border-Gray20 text-center text-Body01 font-SemiBold text-Gray90">
				[오류 발생]
			</ModalHeader>
			<ModalBody className="flex h-full w-full flex-col items-center justify-center">
				<p className="break-keep text-Callout text-Gray50">{bodyText}</p>
				<p className="break-keep text-Callout text-Gray50">
					다시 시도해주세요.
				</p>
			</ModalBody>
			<ModalFooter className="flex items-center justify-center">
				<NTButton size="small" flexible="fit" onClick={onCloseModal}>
					확인
				</NTButton>
			</ModalFooter>
		</ModalContent>
	)
}
