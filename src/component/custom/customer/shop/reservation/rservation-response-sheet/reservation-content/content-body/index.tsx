import { CONDITION_LIST, REMOVE_LIST, TREATMENT_LIST } from "@/constant/tagList"
import type { TNailTreatment } from "@/type/union-option/nail-treatment"
import type { TReqReservationForm } from "@/util/api/post-register-reservation"

import DetailInfo from "../detail-info"

type ContentBodyPT = { newReservation: TReqReservationForm }

export default function ContentBody({ newReservation }: ContentBodyPT) {
	const { conditionList, extend, remove, treatment } = newReservation

	const printedTreatment = TREATMENT_LIST[treatment.option as TNailTreatment]
	const printedRemove = REMOVE_LIST[remove]
	const printedExtend = extend ? "연장 필요" : "연장 필요없음"
	const printedCondition = conditionList
		.map(({ option }) => CONDITION_LIST[option])
		.join(" , ")

	return (
		<div className="flex h-full w-full flex-col justify-center gap-[15px]">
			<DetailInfo title="시술 내용" info={printedTreatment} />
			<hr className="h-[2px] w-full border-Gray80" />
			<DetailInfo title="네일 제거 유무" info={printedRemove} />
			<hr className="h-[2px] w-full border-Gray80" />
			<DetailInfo title="연장 유무" info={printedExtend} />
			<hr className="h-[2px] w-full border-Gray80" />
			<DetailInfo title="컨디션" info={printedCondition} />
		</div>
	)
}
