import type { Dispatch, SetStateAction } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import NTIcon from "@/component/common/nt-icon"
type ShareAddressModalPT = {
	isModalOpen: boolean
	setIsModalOpen: Dispatch<SetStateAction<boolean>>
}
export function ShareAddressModal({
	isModalOpen,
	setIsModalOpen,
}: ShareAddressModalPT) {
	const handleCloseModal = () => {
		setIsModalOpen(false)
	}

	const handleCopyUrl = () => {
		navigator.clipboard.writeText(window.location.href).then(() => {
			alert("URL이 복사되었습니다.")
		})
	}

	return (
		isModalOpen && (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
				<div className="w-[500px] rounded bg-white p-[16px] shadow-lg">
					<div className="mb-[15px] flex items-center justify-between">
						<p className="text-Headline02">공유하기</p>

						<NTIcon
							icon="closeRoundLight"
							onClick={handleCloseModal}
							className="cursor-pointer"
						/>
					</div>
					<div className="flex items-center">
						<input
							type="text"
							value={window.location.href}
							readOnly
							className="mr-[8px] h-[56px] w-full rounded-[12px] border p-[8px]"
						/>
						<NTButton onClick={handleCopyUrl}>복사</NTButton>
					</div>
				</div>
			</div>
		)
	)
}
