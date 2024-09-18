import { type Dispatch, type SetStateAction } from "react"

import NTOption from "@/component/common/nt-option"
import type { TWorkHour } from "@/util/api-v2/get-shop-by-id"
import { getHourFromStamp } from "@/util/common"

import {
	generate30MinIntervalsArr,
	generateFromattedTimeOptionArr,
	getDisabledIdxArr,
	getPMSelectedIdx,
	getPMStartIdx,
} from "./availale-times.util"

type AvailableTimesPT = {
	selectedDate: TWorkHour
	selectedStamp: number
	selectedTime: number
	setSelectedTime: Dispatch<SetStateAction<number>>
}

export default function AvailableTimes({
	selectedDate,
	selectedStamp,
	selectedTime,
	setSelectedTime,
}: AvailableTimesPT) {
	const { closeTime, openTime } = selectedDate

	// 시간 범위를 30분 단위로 배열화
	const timeRangeArr = generate30MinIntervalsArr(openTime, closeTime)
	const timeOptionArr = generateFromattedTimeOptionArr(timeRangeArr)
	const hourArr = timeRangeArr.map((time) => getHourFromStamp(time))

	// 오전/오후로 나누기 (24시간 기준)
	const amOptions = timeOptionArr.filter((_, idx) => hourArr[idx] < 12) // 오전 (12시 미만)
	const pmOptions = timeOptionArr.filter((_, idx) => hourArr[idx] >= 12) // 오후 (12시 이상)

	const pmStartIdx = getPMStartIdx(amOptions)

	// 클릭불가 idxArr관련
	const disabledIdxArr = getDisabledIdxArr(selectedStamp, timeRangeArr)
	const disabledAMIdxArr = disabledIdxArr.filter(
		(_, idx) => idx < amOptions.length,
	)
	const disabledPMIdxArr = disabledIdxArr
		.filter((_, idx) => idx >= amOptions.length)
		.map((idx) => idx - pmStartIdx)

	// 선택된 idx 관련
	const selectedIdx = timeRangeArr.findIndex((time) => time === selectedTime)
	const selectedIdxPM = getPMSelectedIdx(selectedIdx, amOptions)

	// 클릭 eventhandler 함수
	const onClickAM = (idx: number) => {
		setSelectedTime(timeRangeArr[idx])
	}
	const onClickPM = (idx: number) => {
		setSelectedTime(timeRangeArr[pmStartIdx + idx])
	}

	return (
		<div className="grid h-[400px] w-full grid-rows-[1fr_1fr_1fr_3fr] pl-3">
			<div className="text-Title03 font-SemiBold text-Gray70">오전</div>
			{amOptions.length > 0 ? (
				<NTOption
					optionArr={amOptions}
					onSelect={onClickAM}
					selectedIdxArr={[selectedIdx]}
					disabledIdxArr={disabledAMIdxArr}
					optionClassName="min-w-[6rem]"
					className="w-[80%]"
				/>
			) : (
				<UnavailableTimesMessage />
			)}

			<div className="text-Title03 font-SemiBold text-Gray70">오후</div>
			{pmOptions.length > 0 ? (
				<NTOption
					optionArr={pmOptions}
					onSelect={onClickPM}
					selectedIdxArr={[selectedIdxPM]}
					disabledIdxArr={disabledPMIdxArr}
					optionClassName="min-w-[6rem] my-2"
					className="w-[80%]"
				/>
			) : (
				<UnavailableTimesMessage />
			)}
		</div>
	)
}

export function UnavailableTimesMessage() {
	return (
		<div className="flex h-full w-full items-center justify-center text-Title02 font-SemiBold text-Gray50">
			선택 가능한 시간이 없습니다.
		</div>
	)
}
