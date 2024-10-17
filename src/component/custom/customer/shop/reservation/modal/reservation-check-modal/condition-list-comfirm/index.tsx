import NTOption from "@/component/common/nt-option"
import { CONDITION_LIST } from "@/constant/tagList"
import { type TconditionOption } from "@/util/api/get-main-page-data"

type ConditionListConfirmPT = {
	conditionList: Array<TconditionOption>
}

export default function ConditionListConfirm({
	conditionList,
}: ConditionListConfirmPT) {
	const conditionListArr = conditionList.map((option) => CONDITION_LIST[option])
	return (
		<div className="grid h-full w-full grid-cols-[1fr_3.5fr] items-center border-b-[1px] border-b-Gray10">
			<p className="text-Body02 font-SemiBold text-Gray80">컨디션</p>
			<NTOption
				optionArr={conditionListArr}
				className="gap-y-4"
				optionClassName="font-Bold text-PB100"
			/>
		</div>
	)
}
