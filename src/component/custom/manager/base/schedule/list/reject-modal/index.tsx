import { NTButton } from "@/component/common/atom/nt-button"
import {
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@/component/common/nt-modal"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"

export default function RejectModal() {
	const { onCloseModal } = useModal()
	return (
		<ModalContent>
			<ModalHeader className="h-[50px] w-full items-center border-b-[1.5px] border-Gray20 text-center text-Body01 font-SemiBold text-Gray90">
				[예약 거절]
			</ModalHeader>
			<ModalBody className="flex flex-col gap-[10px] py-[25px]">
				<li className="break-keep text-Callout text-Gray50">
					예약자에게 거절 안내가 전달됩니다.
				</li>
				<li className="break-keep text-Callout text-Gray50">
					예약 거절은 가능한 빠르게 진행해주세요.
				</li>
				<li className="break-keep text-Callout text-Gray50">
					예약을 거절할 경우, 해당 예약을 되돌릴 수 없습니다.
				</li>
			</ModalBody>
			<ModalFooter className="flex items-center justify-center gap-[10px]">
				<NTButton
					size="small"
					flexible="fit"
					variant="secondary"
					onClick={onCloseModal}
				>
					돌아가기
				</NTButton>
				<NTButton size="small" flexible="fit" variant="alert">
					거절하기
				</NTButton>
			</ModalFooter>
		</ModalContent>
	)
}
