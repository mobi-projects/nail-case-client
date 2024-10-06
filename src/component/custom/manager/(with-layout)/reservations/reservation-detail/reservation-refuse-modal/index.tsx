import NTIcon from "@/component/common/nt-icon"
import { ModalBody, ModalHeader } from "@/component/common/nt-modal"

import RefuseReasonForm from "./refuse-reason-form"

type ReservationRefuseModalPT = {
	shopId: number
	reservationId: number
}

export default function ReservationRefuseModal({
	reservationId,
	shopId,
}: ReservationRefuseModalPT) {
	return (
		<div className="scrollbar grid h-full w-full grid-rows-[auto_1fr_auto]">
			<ModalHeader className="w-full border-b border-b-Gray20 bg-White pb-4 text-center text-Title01 font-SemiBold text-Gray70">
				예약 거절
			</ModalHeader>
			<ModalBody className="scrollbar grid h-full w-full grid-rows-[1fr_4fr] overflow-y-auto overflow-x-hidden py-5">
				<div className="grid h-full w-full grid-rows-[1.5fr_1fr_1fr]">
					<p className="pt-2 text-Title03 font-SemiBold text-Gray70">
						안내 사항
					</p>
					<div className="flex items-center gap-x-1 pl-3 text-Callout text-Gray50">
						<NTIcon icon="dot" />
						<p>
							아래 사유 중 하나를 선택하시면, 고객님에게 해당 내용이 전달됩니다.
						</p>
					</div>
					<div className="flex items-center gap-x-1 pl-3 text-Callout text-Gray50">
						<NTIcon icon="dot" />
						<p>
							특별한 사유가 있는 경우 직접 입력해주시면, 고객님에게
							안내해드리겠습니다.
						</p>
					</div>
				</div>
				<div className="grid h-full w-full grid-rows-[auto_1fr] pt-4">
					<p className="pt-2 text-Title03 font-SemiBold text-Gray70">
						거절 사유
					</p>
					<RefuseReasonForm reservationId={reservationId} shopId={shopId} />
				</div>
			</ModalBody>
		</div>
	)
}
