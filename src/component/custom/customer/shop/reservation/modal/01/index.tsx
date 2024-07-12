import { useCallback, useState } from "react"

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
import type { TReservationForm } from "@/type"
import type { TNailTreatment } from "@/type/union-option/nail-treatment"
import type { TRemoveOption } from "@/type/union-option/remove-option"

type ReservationCheckModalPT = {
	companion: number
	reservationFormArr: TReservationForm[]
	reservationTimestamp: number
}

export default function ReservationCheckModal({
	companion,
	reservationFormArr,
	reservationTimestamp,
}: ReservationCheckModalPT) {
	const [curFormIdx, setCurFormIdx] = useState(0)
	const ListInfo = useCallback(() => {
		return (
			<ul className="flex list-inside flex-col gap-[2px] self-start text-Callout text-Gray60">
				<li>• 등록된 사진은 샵 검수를 거친 후 가능 여부를 안내해드립니다.</li>
				<li>• 샵 상황에 따라 예약 확정까지, 최대 1일 소요됩니다.</li>
			</ul>
		)
	}, [])

	const onClickPagination = (page: number) => {
		setCurFormIdx(page - 1)
	}

	const curForm = reservationFormArr[curFormIdx]

	const treatmentArr = curForm.treatmentList.map(({ option }) => option)
	const remove = curForm.remove
	const extend = curForm.extend

	return (
		<ModalContent>
			<ModalHeader className="flex h-[55px] w-full items-center justify-center border-b-[1.5px] border-b-Gray20 p-[24px]">
				<p className="text-center text-Body01 font-SemiBold text-Gray90">
					예약 내용 확인
				</p>
			</ModalHeader>

			<ModalBody className="flex h-[55px] w-full flex-col border-b-Gray20">
				<TreatmentConfirm {...{ treatmentArr }} />
				<RemoveConfirm {...{ remove }} />
				<ExtensionConfirm {...{ extend }} />
				<div className="m-auto w-full">
					<Pagination
						totPage={companion}
						curPage={curFormIdx + 1}
						perPage={5}
						onChangePage={onClickPagination}
					/>
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

function TreatmentConfirm({
	treatmentArr,
}: {
	treatmentArr: TNailTreatment[]
}) {
	const printedOptionArr = treatmentArr.map(
		(treatmentValue) => TREATMENT_LIST[treatmentValue],
	)
	return (
		<div className="grid h-fit min-h-[110px] w-full grid-cols-[2fr_4fr] items-center border-b-[2px] border-b-Gray10 py-2">
			<p className="text-Body02 font-SemiBold text-Gray80">시술 내용</p>
			<NTOption
				optionArr={printedOptionArr}
				className="gap-x-[8px] gap-y-[4px]"
			/>
		</div>
	)
}
function RemoveConfirm({ remove }: { remove: TRemoveOption }) {
	return (
		<div className="grid h-fit min-h-[92px] w-full grid-cols-[2fr_4fr] items-center border-b-[2px] border-b-Gray10 py-2">
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
		<div className="grid h-fit min-h-[92px] w-full grid-cols-[2fr_4fr] items-center border-b-[2px] border-b-Gray10 py-2">
			<p className="text-Body02 font-SemiBold text-Gray80">연장 유무</p>
			<NTOption
				optionArr={[extend ? "연장 필요" : "연장 필요 없음"]}
				className="gap-x-[8px] gap-y-[4px]"
			/>
		</div>
	)
}
