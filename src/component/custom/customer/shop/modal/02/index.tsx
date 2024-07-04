import { NTButton } from "@/component/common/atom/nt-button"
import {
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@/component/common/nt-modal"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"
import NTOption from "@/component/common/nt-option"
import { useSheet } from "@/component/common/nt-sheet/nt-sheet.context"
import { useRegisterReservationMutation } from "@/hook/use-reservation-controller"
import type { TReqBodyPostRegisterReservation } from "@/type"
import type { TNailCondition } from "@/type/union-option/nail-condition"
import type { TNailTreatment } from "@/type/union-option/nail-treatment"
import type { TRemoveOption } from "@/type/union-option/remove-option"

import ReservationResponseReceptionSheet from "../../sheet/01"

type ReservationConfirmModalPT = {
	shopId: number
	startTime: number
	endTime: number
	treatment: TNailTreatment
	remove: TRemoveOption
	extension: boolean
	conditionArr: Array<TNailCondition>
}

export default function ReservationConfirmModal({
	shopId,
	startTime,
	endTime,
	treatment,
	remove,
	extension,
	conditionArr,
}: ReservationConfirmModalPT) {
	const { registerReservation } = useRegisterReservationMutation(shopId)
	const { onOpenSheet } = useSheet()
	const { onClearModal } = useModal()
	const onClickRequestReservationButton = async () => {
		const request = createRequestBody(
			shopId,
			startTime,
			endTime,
			remove,
			extension,
			conditionArr,
			treatment,
		)
		onClearModal()
		const response = await registerReservation({ newReservation: request })
		const resReservationData = response.data.reservationDetailList[0]
		const resStartTime = resReservationData.startTime
		const resEndTime = resReservationData.endTime
		const resTreatmentArr = resReservationData.treatmentList.map(
			(treatment) => treatment.option,
		)
		const resRemove = resReservationData.remove
		const resExtend = resReservationData.extend
		onOpenSheet({
			children: (
				<ReservationResponseReceptionSheet
					shopId={shopId}
					startTime={resStartTime}
					endTime={resEndTime}
					treatmentArr={resTreatmentArr}
					remove={resRemove}
					extend={resExtend}
				/>
			),
		})
	}
	return (
		<ModalContent>
			<ModalHeader className="flex h-[55px] w-full items-center justify-center border-b-[1.5px] border-b-Gray20 p-[24px]">
				<p className="text-center text-Body01 font-SemiBold text-Gray90">
					예약 내용 확인
				</p>
			</ModalHeader>

			<ModalBody className="flex h-[55px] w-full flex-col border-b-Gray20">
				<TreatmentConfirm treatment={treatment} />
				<RemoveConfirm remove={remove} />
				<ExtensionConfirm extension={extension} />
				<ListInfo />
			</ModalBody>

			<ModalFooter className="flex h-[105px] w-full items-start justify-center">
				<NTButton size="medium" onClick={onClickRequestReservationButton}>
					예약 요청하기
				</NTButton>
			</ModalFooter>
		</ModalContent>
	)
}

const TREATMENT_MAP: { [key in TNailTreatment]: string } = {
	AOM: "이달의 아트",
	CARE: "케어",
	ONE: "원 컬러",
	MEMBER_IMAGE: "사진등록",
}
const REMOVE_MAP: { [key in TRemoveOption]: string } = {
	IN_SHOP: "자샵 제거 필요",
	ELSE_WHERE: "타샵 제거 필요",
	NO_NEED: "제거 필요 없음",
}

function TreatmentConfirm({
	treatment,
}: Pick<ReservationConfirmModalPT, "treatment">) {
	return (
		<div className="flex h-fit min-h-[92px] items-center gap-[16px] border-b-[2px] border-b-Gray10">
			<p className="text-Body02 font-SemiBold text-Gray80">시술 내용</p>
			<NTOption optionArr={[TREATMENT_MAP[treatment]]} />
		</div>
	)
}
function RemoveConfirm({ remove }: Pick<ReservationConfirmModalPT, "remove">) {
	return (
		<div className="flex h-fit min-h-[92px] items-center gap-[16px] border-b-[2px] border-b-Gray10">
			<p className="text-Body02 font-SemiBold text-Gray80">네일 제거 유무</p>
			<NTOption optionArr={[REMOVE_MAP[remove]]} />
		</div>
	)
}
function ExtensionConfirm({
	extension,
}: Pick<ReservationConfirmModalPT, "extension">) {
	return (
		<div className="flex h-fit min-h-[92px] items-center gap-[16px] border-b-[2px] border-b-Gray10">
			<p className="text-Body02 font-SemiBold text-Gray80">연장 유무</p>
			<NTOption optionArr={[extension ? "연장 필요" : "연장 필요 없음"]} />
		</div>
	)
}

function ListInfo() {
	return (
		<ul className="flex list-inside flex-col gap-[2px] pt-[18px] text-Callout text-Gray60">
			<li>• 등록된 사진은 샵 검수를 거친 후 가능 여부를 안내해드립니다.</li>
			<li>• 샵 상황에 따라 예약 확정까지, 최대 1일 소요됩니다.</li>
		</ul>
	)
}
const createRequestBody = (
	shopId: number,
	startTime: number,
	endTime: number,
	remove: TRemoveOption,
	extension: boolean,
	conditionArr: TNailCondition[],
	treatment: TNailTreatment,
): TReqBodyPostRegisterReservation => {
	const requestBody = {
		shopId: shopId,
		reservationDetailList: [
			{
				shopId: shopId,
				startTime: startTime,
				endTime: endTime,
				remove: remove,
				extend: extension,
				conditionList: conditionArr.map((condition) => ({
					option: condition,
				})),
				treatmentList: [
					{
						option: treatment,
						imageId: -1,
						imageUrl: "",
					},
				],
			},
		],
		startTime: startTime,
		endTime: endTime,
	}
	return requestBody
}
