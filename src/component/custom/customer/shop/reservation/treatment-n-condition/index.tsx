import type { Dispatch, SetStateAction } from "react"

import NTOption from "@/component/common/nt-option"
import type { TNailCondition } from "@/type/union-option/nail-condition"
import type { TNailTreatment } from "@/type/union-option/nail-treatment"
import type { TRemoveOption } from "@/type/union-option/remove-option"

import SectionTitle from "./section-title"

type TreatmentNConditionPT = {
	reservationForm: TReservationForm
	setReservationForm: Dispatch<SetStateAction<TReservationForm>>
}

export default function TreatmentNCondition({
	reservationForm,
	setReservationForm,
}: TreatmentNConditionPT) {
	const onClickTreatmentOption = (idx: number) => {
		if (reservationForm.treatment.option === TREATMENT_OPTIONS.valueArr[idx])
			return
		setReservationForm((prevForm) => {
			const newForm: TReservationForm = JSON.parse(JSON.stringify(prevForm))
			newForm.treatment = {
				option: TREATMENT_OPTIONS.valueArr[idx],
				imageId: 12,
			}
			return newForm
		})
	}
	const onClickRemoveOption = (idx: number) => {
		if (reservationForm.remove === REMOVE_OPTIONS.valueArr[idx]) return
		setReservationForm((prevForm) => {
			const newForm = { ...prevForm }
			newForm.remove = REMOVE_OPTIONS.valueArr[idx]
			return newForm
		})
	}
	const onClickExtendOption = (idx: number) => {
		if (reservationForm.extend === EXTENSION_OPTIONS.valueArr[idx]) return
		setReservationForm((prevForm) => {
			const newForm = { ...prevForm }
			newForm.extend = EXTENSION_OPTIONS.valueArr[idx]
			return newForm
		})
	}
	const onClickConditionOption = (idx: number) => {
		setReservationForm((prevArr) => {
			const newForm: TReservationForm = JSON.parse(JSON.stringify(prevArr))
			const prevConditionList = newForm.conditionList
			const duplicatedIdx = prevConditionList.findIndex(
				({ option }) => option === CONDITION_OPTIONS.valueArr[idx],
			)
			if (duplicatedIdx === -1)
				newForm.conditionList.push({
					option: CONDITION_OPTIONS.valueArr[idx],
				})
			else
				newForm.conditionList = prevConditionList.filter(
					(_, idx) => idx !== duplicatedIdx,
				)
			return newForm
		})
	}
	const treatmentSelectedIdx = TREATMENT_OPTIONS.valueArr.findIndex(
		(value) => value === reservationForm.treatment.option,
	)
	const removeSelectedIdx = REMOVE_OPTIONS.valueArr.findIndex(
		(value) => value === reservationForm.remove,
	)
	const extendSelectedIdx = EXTENSION_OPTIONS.valueArr.findIndex(
		(value) => value === reservationForm.extend,
	)
	const conditionSelectedIdxArr = reservationForm.conditionList.map(
		({ option }) =>
			CONDITION_OPTIONS.valueArr.findIndex((value) => value === option),
	)
	return (
		<div className="flex h-fit w-full flex-col gap-[15px] pt-6">
			<div className="flex flex-col gap-[10px]">
				<SectionTitle title="시술 내용" isEssential={true} />
				<NTOption
					optionArr={TREATMENT_OPTIONS.labelArr}
					disabledIdxArr={[3]}
					selectedIdxArr={[treatmentSelectedIdx]}
					onSelect={onClickTreatmentOption}
				/>
			</div>
			<hr className="w-full border-[1px] border-Gray10" />
			<div className="flex flex-col gap-[8px]">
				<SectionTitle title="네일 제거 유무" isEssential={true} />
				<NTOption
					optionArr={REMOVE_OPTIONS.labelArr}
					selectedIdxArr={[removeSelectedIdx]}
					onSelect={onClickRemoveOption}
				/>
			</div>
			<hr className="w-full border-[1px] border-Gray10" />
			<div className="flex flex-col gap-[8px]">
				<SectionTitle title="연장 유무" isEssential={true} />
				<NTOption
					optionArr={EXTENSION_OPTIONS.labelArr}
					selectedIdxArr={[extendSelectedIdx]}
					onSelect={onClickExtendOption}
				/>
			</div>
			<hr className="w-full border-[1px] border-Gray10" />
			<div className="flex flex-col gap-[8px]">
				<SectionTitle title="컨디션" />
				<NTOption
					optionArr={CONDITION_OPTIONS.labelArr}
					selectedIdxArr={conditionSelectedIdxArr}
					onSelect={onClickConditionOption}
				/>
			</div>
		</div>
	)
}

export type TReservationForm = {
	shopId: number
	startTime: number
	remove: TRemoveOption
	extend: boolean
	conditionList: Array<{
		option: TNailCondition
	}>
	treatment: {
		option: TNailTreatment | null
		imageId?: number
	}
}

type TReservationOptions<T> = {
	labelArr: Array<string>
	valueArr: Array<T>
}
const TREATMENT_OPTIONS: TReservationOptions<TNailTreatment> = {
	labelArr: ["이달의 아트", "케어", "원 컬러", "사진등록"],
	valueArr: ["AOM", "CARE", "ONE", "MEMBER_IMAGE"],
} as const

const REMOVE_OPTIONS: TReservationOptions<TRemoveOption> = {
	labelArr: ["자샵 제거 필요", "타샵 제거 필요", "제거 필요 없음"],
	valueArr: ["IN_SHOP", "ELSE_WHERE", "NO_NEED"],
} as const
const EXTENSION_OPTIONS: TReservationOptions<boolean> = {
	labelArr: ["연장 필요", "연장 필요 없음"],
	valueArr: [true, false],
} as const
const CONDITION_OPTIONS: TReservationOptions<TNailCondition> = {
	labelArr: ["손톱 보수 필요", "A/S 필요", "상처 있음", "교정 필요"],
	valueArr: ["REPAIR", "AS", "WOUND_CARE", "CORRECTION"],
} as const
