"use client"

import { NTButton } from "@/component/common/atom/nt-button"
import {
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@/component/common/nt-modal"

import type { TReservationForm } from "../../memorized-options"

import ConditionListConfirm from "./condition-list-comfirm"
import ExtensionConfirm from "./extension-confirm"
import RemoveConfirm from "./remove-confirm"
import ReseravtionTimeConfirm from "./reservation-time-confirm"
import TreatmentConfirm from "./treatment-comfirm"

type ReservationCheckModalPT = {
	reservationForm: TReservationForm
}

export default function ReservationCheckModal({
	reservationForm,
}: ReservationCheckModalPT) {
	// const { onOpenSheet } = useSheet()
	// const { onCloseModal } = useModal()

	// const onClickPostReservationButton = async () => {
	// 	const newReservation = createNewReservation(
	// 		shopId,
	// 		reservationForm,
	// 		reservationTimestamp,
	// 	)
	// 	onOpenSheet({
	// 		children: <ReservationResponseSheet {...{ shopId, newReservation }} />,
	// 	})
	// 	onCloseModal()
	// }

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
				<TreatmentConfirm
					treatment={treatment}
					shopId={reservationForm.shopId}
				/>
				<RemoveConfirm remove={remove} />
				<ExtensionConfirm extend={extend} />
				<ConditionListConfirm conditionList={conditionList} />
				<ReseravtionTimeConfirm startTime={startTime} />
			</ModalBody>

			<ModalFooter className="flex min-h-36 w-full flex-col items-center justify-evenly">
				<ListInfo />
				<NTButton size="medium">예약 요청하기</NTButton>
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
// const createNewReservation = (
// 	shopId: number,
// 	reservationForm: TReservationForm,
// 	reservationTimestamp: number,
// ): TReqBodyRegisterReservation => {
// 	const adjustedFormArr = adjustShopIdNReservationTime(
// 		shopId,
// 		reservationForm,
// 		reservationTimestamp,
// 	)
// 	const newReservation: TReqBodyRegisterReservation = {
// 		reservationDetailList: adjustedFormArr,
// 	}
// 	return newReservation
// }

/** 모든 form 에 "매장 id" 과 "예약시간" 을 통일 */
// const adjustShopIdNReservationTime = (
// 	shopId: number,
// 	reservationFormArr: TReservationForm[],
// 	reservationTimestamp: number,
// ) => {
// 	return reservationFormArr.map((reservationForm) => {
// 		const _reservationForm = { ...reservationForm }
// 		_reservationForm.shopId = shopId
// 		_reservationForm.startTime = reservationTimestamp
// 		return _reservationForm
// 	})
// }
