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
			<ModalHeader className="flex w-full items-center justify-center border-b-[1.5px] border-b-Gray20 pb-5 max-lg:pb-2">
				<p className="text-center text-Title02 font-SemiBold text-Gray90 lg:text-[16px] max-md:text-[14px]">
					예약 내용 확인
				</p>
			</ModalHeader>

			<ModalBody className="scrollbar scrollbar-none grid max-h-[500px] w-full grid-rows-5 overflow-y-scroll border-b-Gray20">
				<TreatmentConfirm treatment={treatment} />
				<RemoveConfirm remove={remove} />
				<ExtensionConfirm extend={extend} />
				<ConditionListConfirm conditionList={conditionList} />
				<ReseravtionTimeConfirm startTime={startTime} />
			</ModalBody>

			<ModalFooter className="flex w-full flex-col items-center justify-evenly gap-4 max-md:gap-1">
				<ListInfo />
				<NTButton
					size="medium"
					flexible={"fit"}
					onClick={() => onClickPostReservationButton(reservationForm)}
				>
					<p className="text-Body01 max-md:text-[12px]">예약하기</p>
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
