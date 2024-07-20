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
	reservationId: number
	shopId: number
	reservationDetailIdArr: number[]
}
export default function ButtonPair({
	status,
	startTime,
	optionArr,
	companion,
	shopId,
	reservationId,
	reservationDetailIdArr,
}: ButtonPairPT) {
	const { onOpenModal } = useModal()
	if (status !== "PENDING") return

	const onClickDeclineButton = () => {
		onOpenModal({
			children: <DeclineModal {...{ shopId, reservationId }} />,
		})
	}
	const onClickApprovalButton = () => {
		onOpenModal({
			children: (
				<ApprovalModal
					{...{
						shopId,
						reservationId,
						startTime,
						optionArr,
						companion,
						reservationDetailIdArr,
					}}
				/>
			),
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
