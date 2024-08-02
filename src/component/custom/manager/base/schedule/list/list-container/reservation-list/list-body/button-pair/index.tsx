import { NTButton } from "@/component/common/atom/nt-button"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"

import RejectModal from "../../../../reject-modal"

export function ButtonPair() {
	const { onOpenModal } = useModal()

	const onOpenRejectModal = () => {
		onOpenModal({
			children: <RejectModal />,
		})
	}
	return (
		<div className="flex flex-col items-center justify-center gap-[20px]">
			<NTButton variant="secondary" size="small">
				수락
			</NTButton>
			<NTButton variant="alert" size="small" onClick={onOpenRejectModal}>
				거절
			</NTButton>
		</div>
	)
}
