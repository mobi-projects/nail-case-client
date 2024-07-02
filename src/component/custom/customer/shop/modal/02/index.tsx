import { NTButton } from "@/component/common/atom/nt-button"
import {
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@/component/common/nt-modal"
import NTOption from "@/component/common/nt-option"
import type { TNailCondition } from "@/type/union-option/nail-condition"
import type { TNailTreatment } from "@/type/union-option/nail-treatment"
import type { TRemoveOption } from "@/type/union-option/remove-option"

type ReservationConfirmModalPT = {
	startTime: number
	endTime: number
	treatment: TNailTreatment
	remove: TRemoveOption
	extension: boolean
	conditionArr: Array<TNailCondition>
}

export default function ReservationConfirmModal({
	startTime,
	endTime,
	treatment,
	remove,
	extension,
	conditionArr,
}: ReservationConfirmModalPT) {
	return (
		<ModalContent>
			<ModalHeader className="flex h-[55px] w-full items-center justify-center border-b-[1.5px] border-b-Gray20 p-[24px]">
				<p className="text-center text-Body01 font-SemiBold text-Gray90">
					예약 내용 확인
				</p>
			</ModalHeader>

			<ModalBody className="flex h-[55px] w-full flex-col border-b-Gray20">
				<TreatmentConfirm treatment="AOM" />
				<RemoveConfirm remove="IN-SHOP" />
				<ExtensionConfirm extension={true} />
				<ListInfo />
			</ModalBody>

			<ModalFooter className="flex h-[105px] w-full items-start justify-center">
				<NTButton size="medium">예약 요청하기</NTButton>
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
	"IN-SHOP": "자샵 제거 필요",
	"ELSE-WHERE": "타샵 제거 필요",
	"NO-NEED": "제거 필요 없음",
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
