import { NTButton } from "@/component/common/atom/nt-button"
import {
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@/component/common/nt-modal"
import NTOption from "@/component/common/nt-option"
import Pagination from "@/component/common/nt-pagination"
import { REMOVE_LIST, TREATMENT_LIST } from "@/constant/tagList"
import type { TNailTreatment } from "@/type/union-option/nail-treatment"
import type { TRemoveOption } from "@/type/union-option/remove-option"

export default function ReservationCheckModal() {
	return (
		<ModalContent>
			<ModalHeader className="flex h-[55px] w-full items-center justify-center border-b-[1.5px] border-b-Gray20 p-[24px]">
				<p className="text-center text-Body01 font-SemiBold text-Gray90">
					예약 내용 확인
				</p>
			</ModalHeader>

			<ModalBody className="flex h-[55px] w-full flex-col border-b-Gray20">
				<TreatmentConfirm treatment={"AOM"} />
				<RemoveConfirm remove={"IN_SHOP"} />
				<ExtensionConfirm extend={true} />
				<div className="m-auto w-full">
					<Pagination totPage={3} curPage={1} perPage={5} />
				</div>
			</ModalBody>

			<ModalFooter className="flex h-[115px] w-full flex-col items-center justify-between">
				<ListInfo />
				<NTButton disabled size="medium">
					예약 요청하기
				</NTButton>
			</ModalFooter>
		</ModalContent>
	)
}

function TreatmentConfirm({ treatment }: { treatment: TNailTreatment }) {
	return (
		<div className="flex h-fit min-h-[92px] items-center gap-[16px] border-b-[2px] border-b-Gray10">
			<p className="text-Body02 font-SemiBold text-Gray80">시술 내용</p>
			<NTOption optionArr={[TREATMENT_LIST[treatment]]} />
		</div>
	)
}
function RemoveConfirm({ remove }: { remove: TRemoveOption }) {
	return (
		<div className="flex h-fit min-h-[92px] items-center gap-[16px] border-b-[2px] border-b-Gray10">
			<p className="text-Body02 font-SemiBold text-Gray80">네일 제거 유무</p>
			<NTOption optionArr={[REMOVE_LIST[remove]]} />
		</div>
	)
}
function ExtensionConfirm({ extend }: { extend: boolean }) {
	return (
		<div className="flex h-fit min-h-[92px] items-center gap-[16px] border-b-[2px] border-b-Gray10">
			<p className="text-Body02 font-SemiBold text-Gray80">연장 유무</p>
			<NTOption optionArr={[extend ? "연장 필요" : "연장 필요 없음"]} />
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
