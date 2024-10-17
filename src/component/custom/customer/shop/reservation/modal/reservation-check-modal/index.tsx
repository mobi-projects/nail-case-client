"use client"

import { NTButton } from "@/component/common/atom/nt-button"
import {
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@/component/common/nt-modal"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"
import { useSheet } from "@/component/common/nt-sheet/nt-sheet.context"
import type { TReqReservationForm } from "@/util/api/post-register-reservation"

import ReservationResponseSheet from "../../rservation-response-sheet"

import ConditionListConfirm from "./condition-list-comfirm"
import ExtensionConfirm from "./extension-confirm"
import RemoveConfirm from "./remove-confirm"
import ReseravtionTimeConfirm from "./reservation-time-confirm"
import TreatmentConfirm from "./treatment-comfirm"

type ReservationCheckModalPT = {
	reservationForm: TReqReservationForm
}

export default function ReservationCheckModal({
	reservationForm,
}: ReservationCheckModalPT) {
	const { onOpenSheet } = useSheet()
	const { onCloseModal } = useModal()

	const onClickPostReservationButton = (
		reservationForm: TReqReservationForm,
	) => {
		onOpenSheet({
			children: <ReservationResponseSheet newReservation={reservationForm} />,
		})
		onCloseModal()
	}

	const treatment = reservationForm.treatment
	const remove = reservationForm.remove
	const extend = reservationForm.extend
	const conditionList = reservationForm.conditionList.map(
		({ option }) => option,
	)
	const startTime = reservationForm.startTime

	return (
		<ModalContent>
			<ModalHeader className="flex w-full items-center justify-center border-b-[1.5px] border-b-Gray20 pb-5">
				<p className="text-center text-Title02 font-SemiBold text-Gray90">
					예약 내용 확인
				</p>
			</ModalHeader>

			<ModalBody className="scrollbar grid h-full w-full grid-cols-1 overflow-y-scroll border-b-Gray20">
				<TreatmentConfirm treatment={treatment} />
				<RemoveConfirm remove={remove} />
				<ExtensionConfirm extend={extend} />
				<ConditionListConfirm conditionList={conditionList} />
				<ReseravtionTimeConfirm startTime={startTime} />
			</ModalBody>

			<ModalFooter className="flex min-h-36 w-full flex-col items-center justify-evenly">
				<ListInfo />
				<NTButton
					size="medium"
					onClick={() => onClickPostReservationButton(reservationForm)}
				>
					예약 요청하기
				</NTButton>
			</ModalFooter>
		</ModalContent>
	)
}

function ListInfo() {
	return (
		<ul className="flex list-inside flex-col gap-[2px] self-start text-Callout text-Gray60">
			<li>• 등록된 사진은 샵 검수를 거친 후 가능 여부를 안내해드립니다.</li>
			<li>• 샵 상황에 따라 예약 확정까지, 최대 1일 소요됩니다.</li>
		</ul>
	)
}
