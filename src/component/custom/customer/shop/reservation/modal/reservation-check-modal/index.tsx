"use client"

import {
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@/component/common/nt-modal"
import NTOption from "@/component/common/nt-option"
import { CONDITION_LIST, REMOVE_LIST, TREATMENT_LIST } from "@/constant/tagList"
import type { TNailTreatment } from "@/type/union-option/nail-treatment"
import type { TRemoveOption } from "@/type/union-option/remove-option"
import type { TconditionOption } from "@/util/api-v2/get-main-page-data"

import type { TReservationForm } from "../../treatment-n-condition"

type ReservationCheckModalPT = {
	shopId?: number
	reservationForm: TReservationForm
	reservationTimestamp?: number
}

export default function ReservationCheckModal({
	// shopId,
	reservationForm,
	// reservationTimestamp,
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

	const treatment = reservationForm.treatment.option as TNailTreatment
	const remove = reservationForm.remove
	const extend = reservationForm.extend
	const conditionList = reservationForm.conditionList.map(
		({ option }) => option,
	)
	return (
		<ModalContent>
			<ModalHeader className="flex w-full items-center justify-center border-b-[1.5px] border-b-Gray20 pb-5">
				<p className="text-center text-Title02 font-SemiBold text-Gray90">
					예약 내용 확인
				</p>
			</ModalHeader>
			<ModalBody className="flex h-[55px] w-full flex-col border-b-Gray20">
				<TreatmentConfirm treatment={treatment} />
				<RemoveConfirm remove={remove} />
				<ExtensionConfirm extend={extend} />
				<ConditionListConfirm conditionList={conditionList} />
			</ModalBody>

			<ModalFooter className="flex h-[115px] w-full flex-col items-center justify-between">
				<ListInfo />
				{/* <NTButton onClick={onClickPostReservationButton} size="medium">
					예약 요청하기
				</NTButton> */}
			</ModalFooter>
		</ModalContent>
	)
}

function TreatmentConfirm({ treatment }: { treatment: TNailTreatment }) {
	return (
		<div className="grid h-fit min-h-[110px] w-full grid-cols-[1fr_3fr] items-center border-b-[2px] border-b-Gray10 py-2">
			<p className="text-Body02 font-SemiBold text-Gray80">시술 내용</p>
			<NTOption
				optionArr={[TREATMENT_LIST[treatment]]}
				className="gap-x-[8px] gap-y-[4px]"
			/>
		</div>
	)
}
function RemoveConfirm({ remove }: { remove: TRemoveOption }) {
	return (
		<div className="grid h-fit min-h-[92px] w-full grid-cols-[1fr_3fr] items-center border-b-[2px] border-b-Gray10 py-2">
			<p className="text-Body02 font-SemiBold text-Gray80">네일 제거 유무</p>
			<NTOption
				optionArr={[REMOVE_LIST[remove]]}
				className="gap-x-[8px] gap-y-[4px]"
			/>
		</div>
	)
}
function ExtensionConfirm({ extend }: { extend: boolean }) {
	return (
		<div className="grid h-fit min-h-[92px] w-full grid-cols-[1fr_3fr] items-center border-b-[2px] border-b-Gray10 py-2">
			<p className="text-Body02 font-SemiBold text-Gray80">연장 유무</p>
			<NTOption
				optionArr={[extend ? "연장 필요" : "연장 필요 없음"]}
				className="gap-x-[8px] gap-y-[4px]"
			/>
		</div>
	)
}

function ConditionListConfirm({
	conditionList,
}: {
	conditionList: Array<TconditionOption>
}) {
	const conditionListArr = conditionList.map((option) => CONDITION_LIST[option])
	return (
		<div className="grid h-fit min-h-[92px] grid-cols-[1fr_3fr] items-center border-b-[2px] border-b-Gray10 py-2">
			<p className="text-Body02 font-SemiBold text-Gray80">컨디션</p>
			<NTOption
				optionArr={conditionListArr}
				className="gap-x-[8px] gap-y-[4px]"
			/>
		</div>
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
