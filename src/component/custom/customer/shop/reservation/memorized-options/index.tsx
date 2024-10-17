import { memo, useState, type Dispatch, type SetStateAction } from "react"

import NTOption from "@/component/common/nt-option"
import type { TReqReservationForm } from "@/util/api/post-register-reservation"

import {
	CONDITION_OPTIONS,
	EXTENSION_OPTIONS,
	REMOVE_OPTIONS,
	TREATMENT_OPTIONS,
} from "../reservation.constant"

import AOMImageList from "./aom-image-list"
import SectionTitle from "./section-title"

type TreatmentNConditionPT = {
	shopId: number
	reservationForm: TReqReservationForm
	setReservationForm: Dispatch<SetStateAction<TReqReservationForm>>
}

function TreatmentNCondition({
	shopId,
	reservationForm,
	setReservationForm,
}: TreatmentNConditionPT) {
	const [isSelectedAOM, setIsSelectedAOM] = useState(false)
	const [clickedId, setClickedId] = useState(-1)
	const [disabledIdxArr, setDisabledIdxArr] = useState([3])

	/** 선택된 옵션들의 idx  */
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

	/** 선택사항 handler함수 */
	const onClickTreatmentOption = (idx: number) => {
		const clikedOption = TREATMENT_OPTIONS.valueArr[idx]

		if (reservationForm.treatment.option === clikedOption) return
		const isAOMSelected = clikedOption === "AOM"

		setIsSelectedAOM(isAOMSelected)
		setReservationForm((prevForm) => {
			return {
				...prevForm,
				treatment: { option: clikedOption },
			}
		})
	}

	const onClickRemoveOption = (idx: number) => {
		if (reservationForm.remove === REMOVE_OPTIONS.valueArr[idx]) return
		setReservationForm((prevForm) => ({
			...prevForm,
			remove: REMOVE_OPTIONS.valueArr[idx],
		}))
	}
	const onClickExtendOption = (idx: number) => {
		if (reservationForm.extend === EXTENSION_OPTIONS.valueArr[idx]) return
		setReservationForm((prevForm) => ({
			...prevForm,
			extend: EXTENSION_OPTIONS.valueArr[idx],
		}))
	}
	const onClickConditionOption = (idx: number) => {
		setReservationForm((prevForm) => {
			const { conditionList } = prevForm

			const option = CONDITION_OPTIONS.valueArr[idx]
			const duplicatedIdx = conditionList.findIndex(
				({ option: existingOption }) => existingOption === option,
			)
			const newConditionList =
				duplicatedIdx === -1
					? [...conditionList, { option }]
					: conditionList.filter((_, i) => i !== duplicatedIdx)

			return {
				...prevForm,
				conditionList: newConditionList,
			}
		})
	}

	return (
		<div className="flex h-fit w-full flex-col gap-[15px] pt-6">
			<div className="flex flex-col gap-2">
				<SectionTitle title="시술 내용" isEssential={true} />
				<NTOption
					optionArr={TREATMENT_OPTIONS.labelArr}
					disabledIdxArr={disabledIdxArr}
					selectedIdxArr={[treatmentSelectedIdx]}
					onSelect={onClickTreatmentOption}
				/>
			</div>
			<AOMImageList
				isSelectedAOM={isSelectedAOM}
				shopId={shopId}
				setDisabledIdxArr={setDisabledIdxArr}
				clickedId={clickedId}
				setClickedId={setClickedId}
				setReservationForm={setReservationForm}
			/>
			<hr className="w-full border-[1px] border-Gray10" />
			<div className="flex flex-col gap-2 pb-3">
				<SectionTitle title="네일 제거 유무" isEssential={true} />
				<NTOption
					optionArr={REMOVE_OPTIONS.labelArr}
					selectedIdxArr={[removeSelectedIdx]}
					onSelect={onClickRemoveOption}
				/>
			</div>
			<hr className="w-full border-[1px] border-Gray10" />
			<div className="flex flex-col gap-2 pb-3">
				<SectionTitle title="연장 유무" isEssential={true} />
				<NTOption
					optionArr={EXTENSION_OPTIONS.labelArr}
					selectedIdxArr={[extendSelectedIdx]}
					onSelect={onClickExtendOption}
				/>
			</div>
			<hr className="w-full border-[1px] border-Gray10" />
			<div className="flex flex-col gap-2">
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

const MemorizedOptions = memo(TreatmentNCondition)
export default MemorizedOptions
