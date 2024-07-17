import type { Dispatch, SetStateAction } from "react"
import { useEffect, useState } from "react"

import NTOption from "@/component/common/nt-option"
import Pagination from "@/component/common/nt-pagination"
import type { TReservationForm } from "@/type"
import type { TNailCondition } from "@/type/union-option/nail-condition"
import type { TNailTreatment } from "@/type/union-option/nail-treatment"
import type { TRemoveOption } from "@/type/union-option/remove-option"

import SectionTitle from "./section-title"

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

type TreatmentNConditionPT = {
	companion: number
	artistIdArr: number[]
	reservationFormArr: TReservationForm[]
	setReservationFormArr: Dispatch<SetStateAction<TReservationForm[]>>
}
export default function TreatmentNCondition({
	companion,
	artistIdArr,
	reservationFormArr,
	setReservationFormArr,
}: TreatmentNConditionPT) {
	const [curFormIdx, setCurFormIdx] = useState(0)

	useEffect(() => {
		if (companion <= curFormIdx) setCurFormIdx(companion - 1)
	}, [companion, curFormIdx])
	useEffect(() => {
		setReservationFormArr((prev) => {
			const _prev: TReservationForm[] = JSON.parse(JSON.stringify(prev))
			if (artistIdArr.length <= curFormIdx)
				_prev[curFormIdx].nailArtistId = null
			else _prev[curFormIdx].nailArtistId = artistIdArr[curFormIdx]
			return _prev
		})
	}, [curFormIdx, artistIdArr, setReservationFormArr])

	const curForm = reservationFormArr[curFormIdx]
	const treatmentSelectedIdxArr = curForm.treatmentList.map(({ option }) =>
		TREATMENT_OPTIONS.valueArr.findIndex((value) => value === option),
	)
	const removeSelectedIdxArr = REMOVE_OPTIONS.valueArr.findIndex(
		(value) => value === curForm.remove,
	)
	const extendSelectedIdxArr = EXTENSION_OPTIONS.valueArr.findIndex(
		(value) => value === curForm.extend,
	)
	const conditionSelectedIdxArr = curForm.conditionList.map(({ option }) =>
		CONDITION_OPTIONS.valueArr.findIndex((value) => value === option),
	)

	const onClickFormPagination = (page: number) => {
		setCurFormIdx(page - 1)
	}
	const onClickRemoveOption = (idx: number) => {
		setReservationFormArr((prevArr) => {
			const _prevArr: TReservationForm[] = JSON.parse(JSON.stringify(prevArr))
			_prevArr[curFormIdx].remove = REMOVE_OPTIONS.valueArr[idx]
			return _prevArr
		})
	}
	const onClickExtendOption = (idx: number) => {
		setReservationFormArr((prevArr) => {
			const _prevArr: TReservationForm[] = JSON.parse(JSON.stringify(prevArr))
			_prevArr[curFormIdx].extend = EXTENSION_OPTIONS.valueArr[idx]
			return _prevArr
		})
	}
	const onClickTreatmentOption = (idx: number) => {
		setReservationFormArr((prevArr) => {
			const _prevArr: TReservationForm[] = JSON.parse(JSON.stringify(prevArr))
			const prevTreatmentList = _prevArr[curFormIdx].treatmentList
			const duplicatedIdx = prevTreatmentList.findIndex(
				({ option }) => option === TREATMENT_OPTIONS.valueArr[idx],
			)
			if (duplicatedIdx === -1)
				_prevArr[curFormIdx].treatmentList.push({
					option: TREATMENT_OPTIONS.valueArr[idx],
					imageId: -1,
					imageUrl: "",
				})
			else
				_prevArr[curFormIdx].treatmentList = prevTreatmentList.filter(
					(_, idx) => idx !== duplicatedIdx,
				)
			return _prevArr
		})
	}
	const onClickConditionOption = (idx: number) => {
		setReservationFormArr((prevArr) => {
			const _prevArr: TReservationForm[] = JSON.parse(JSON.stringify(prevArr))
			const prevConditionList = _prevArr[curFormIdx].conditionList
			const duplicatedIdx = prevConditionList.findIndex(
				({ option }) => option === CONDITION_OPTIONS.valueArr[idx],
			)
			if (duplicatedIdx === -1)
				_prevArr[curFormIdx].conditionList.push({
					option: CONDITION_OPTIONS.valueArr[idx],
				})
			else
				_prevArr[curFormIdx].conditionList = prevConditionList.filter(
					(_, idx) => idx !== duplicatedIdx,
				)
			return _prevArr
		})
	}

	return (
		<div className="flex h-fit w-full flex-col gap-[15px] pt-6">
			<div className="flex flex-col gap-[10px]">
				<SectionTitle title="시술 내용" isEssential={true} />
				<NTOption
					optionArr={TREATMENT_OPTIONS.labelArr}
					disabledIdxArr={[3]}
					selectedIdxArr={treatmentSelectedIdxArr}
					onSelect={onClickTreatmentOption}
				/>
			</div>
			<hr className="w-full border-[1px] border-Gray10" />
			<div className="flex flex-col gap-[8px]">
				<SectionTitle title="네일 제거 유무" isEssential={true} />
				<NTOption
					optionArr={REMOVE_OPTIONS.labelArr}
					selectedIdxArr={[removeSelectedIdxArr]}
					onSelect={onClickRemoveOption}
				/>
			</div>
			<hr className="w-full border-[1px] border-Gray10" />
			<div className="flex flex-col gap-[8px]">
				<SectionTitle title="연장 유무" isEssential={true} />
				<NTOption
					optionArr={EXTENSION_OPTIONS.labelArr}
					selectedIdxArr={[extendSelectedIdxArr]}
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
			<div className="h-[35px] self-end">
				{companion !== 1 && (
					<div className="flex h-full w-fit items-center gap-[5px]">
						<Pagination
							curPage={curFormIdx + 1}
							totPage={companion}
							perPage={5}
							onChangePage={onClickFormPagination}
						/>
					</div>
				)}
			</div>
		</div>
	)
}
