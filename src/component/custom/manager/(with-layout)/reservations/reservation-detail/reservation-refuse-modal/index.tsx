import type { Dispatch, SetStateAction } from "react"

import NTIcon from "@/component/common/nt-icon"
import { ModalBody, ModalHeader } from "@/component/common/nt-modal"

import RefuseReasonForm from "./refuse-reason-form"

type ReservationRefuseModalPT = {
	shopId: number
	reservationId: number
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function ReservationRefuseModal({
	reservationId,
	shopId,
	setIsOpen,
}: ReservationRefuseModalPT) {
	return (
		<div className="grid h-full w-full grid-rows-[auto_1fr_auto]">
			<ModalHeader className="w-full border-b border-b-Gray20 bg-White pb-4 text-center text-Title01 font-SemiBold text-Gray70 max-md:text-[18px] max-lg:pb-2">
				예약 거절
			</ModalHeader>
			<ModalBody className="scrollbar-none grid h-full w-full grid-rows-[1fr_4fr] overflow-y-auto py-0.5">
				<div className="grid h-full w-full grid-rows-[1.5fr_1fr_1fr] max-md:grid-rows-3">
					<p className="pt-2 text-Title03 font-SemiBold text-Gray70 max-md:text-[14px]">
						안내 사항
					</p>
					<div className="flex items-center gap-x-1 pl-3 text-Callout text-Gray50 max-md:pl-1">
						<NTIcon icon="dot" />
						<p>
							아래 사유 중 하나를 선택하시면, 고객님에게 해당 내용이 전달됩니다.
						</p>
					</div>
					<div className="flex items-center gap-x-1 pl-3 text-Callout text-Gray50 max-md:pl-1">
						<NTIcon icon="dot" />
						<p>
							특별한 사유가 있는 경우 직접 입력해주시면, 고객님에게
							안내해드리겠습니다.
						</p>
					</div>
				</div>
				<div className="grid h-full w-full grid-rows-[auto_1fr] pt-4 max-md:pt-2">
					<p className="pt-2 text-Title03 font-SemiBold text-Gray70 max-md:text-[14px]">
						거절 사유
					</p>
					<RefuseReasonForm
						reservationId={reservationId}
						shopId={shopId}
						setIsOpen={setIsOpen}
					/>
				</div>
			</ModalBody>
		</div>
	)
}
