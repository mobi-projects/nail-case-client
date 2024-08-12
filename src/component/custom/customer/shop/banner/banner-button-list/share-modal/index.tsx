import { NTButton } from "@/component/common/atom/nt-button"
import {
	ModalBody,
	ModalContent,
	ModalHeader,
} from "@/component/common/nt-modal"

export function ShareAddressModal() {
	const handleCopyUrl = () => {
		navigator.clipboard.writeText(window.location.href).then(() => {
			alert("URL이 복사되었습니다.")
		})
	}

	return (
		<ModalContent>
			<ModalHeader className="mb-4 flex h-16 w-full items-center justify-center border-b-2 px-[15px]">
				<p className="text-Headline02">공유하기</p>
			</ModalHeader>
			<ModalBody className="mb-[15px] flex items-center">
				<div className="flex w-full items-center">
					<input
						type="text"
						value={window.location.href}
						readOnly
						className="mr-[8px] h-[56px] w-full rounded-[12px] border p-[8px]"
					/>
					<NTButton onClick={handleCopyUrl}>복사</NTButton>
				</div>
			</ModalBody>
		</ModalContent>
	)
}
