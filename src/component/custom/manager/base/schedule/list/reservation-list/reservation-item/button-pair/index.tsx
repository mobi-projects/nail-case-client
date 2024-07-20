import { NTButton } from "@/component/common/atom/nt-button"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"
import type { TReservationStatus } from "@/type/union-option/resesrvation-status"

import ApprovalModal from "./approval-modal"
import DeclineModal from "./decline-modal"

type ButtonPairPT = {
	status: TReservationStatus
	startTime: number
	optionArr: string[][]
	companion: number
}
export default function ButtonPair({
	status,
	startTime,
	optionArr,
	companion,
}: ButtonPairPT) {
	const { onOpenModal } = useModal()
	if (status !== "PENDING") return

	const onClickDeclineButton = () => {
		onOpenModal({
			children: <DeclineModal />,
		})
	}
	const onClickApprovalButton = () => {
		onOpenModal({
			children: <ApprovalModal {...{ startTime, optionArr, companion }} />,
		})
	}
	return (
		<div className="flex items-center justify-around gap-[10px]">
			<NTButton size="small" onClick={onClickApprovalButton}>
				수락
			</NTButton>
			<NTButton variant="alert" size="small" onClick={onClickDeclineButton}>
				거절
			</NTButton>
		</div>
	)
}
