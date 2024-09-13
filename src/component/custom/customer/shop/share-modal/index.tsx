import { NTButton } from "@/component/common/atom/nt-button"
import {
	ModalBody,
	ModalContent,
	ModalHeader,
} from "@/component/common/nt-modal"

type ShareAddressModalPT = {
	data: string
	text: string
}
export function ShareAddressModal({ data, text }: ShareAddressModalPT) {
	const handleCopyUrl = () => {
		navigator.clipboard.writeText(data).then(() => {
			alert(`${text} 복사되었습니다.`)
		})
	}

	return (
		<ModalContent>
			<ModalHeader className="mb-4 flex h-16 w-full items-center justify-center border-b-2 px-[15px]">
				<p className="text-Headline02">클립보드</p>
			</ModalHeader>
			<ModalBody className="mb-[15px] flex items-center">
				<div className="flex w-full items-center">
					<input
						type="text"
						value={data}
						readOnly
						className="mr-[8px] h-[56px] w-full rounded-[12px] border p-[8px] text-center"
					/>
					<NTButton onClick={handleCopyUrl}>복 사</NTButton>
				</div>
			</ModalBody>
		</ModalContent>
	)
}
