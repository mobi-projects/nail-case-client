"use client"

import { type Dispatch, type SetStateAction } from "react"

import NTOption from "@/component/common/nt-option"
import { useAvailableTimeQuery } from "@/hook/use-reservation-controller"
import type { TResGetListAvailableTime } from "@/type"
import {
	get12HourFromStamp,
	getDayDivisionInKor,
	getMinFromStamp,
	padStartToPrinting,
} from "@/util/common"
import { isUndefined } from "@/util/common/type-guard"

type DesiredTimePT = {
	setSelectedStamp: Dispatch<SetStateAction<number>>
	selectedStamp: number
	shopId: number
}

export default function DesiredTime({
	shopId,
	selectedStamp,
	setSelectedStamp,
}: DesiredTimePT) {
	const { data, isLoading, isError } = useAvailableTimeQuery(
		shopId,
		[1, 2, 3],
		selectedStamp,
	)

	if (isLoading) {
		return (
			<div className="flex h-fit w-full items-center justify-center p-[30px] shadow-customGray60">
				<p>로딩 중..</p>
			</div>
		)
	}
	const availableInfoArr = data?.dataList
	if (isError || isUndefined(availableInfoArr)) {
		return (
			<div className="flex h-fit w-full items-center justify-center p-[30px] shadow-customGray60">
				<p>데이터를 정상적으로 불러오지 못했습니다.</p>
			</div>
		)
	}
	const startTimeArr = availableInfoArr.map((info) => info.startTime)
	const onSelectedTime = (idx: number) => {
		setSelectedStamp(startTimeArr[idx])
	}
	const getSelectedIdx = () =>
		startTimeArr.findIndex((startTime) => selectedStamp === startTime)

	return (
		<div className="flex flex-col py-6">
			<NTOption
				optionArr={getFormattedStartTimeArr(startTimeArr)}
				selectedIdxArr={[getSelectedIdx()]}
				disabledIdxArr={getDisabledIdxArr(availableInfoArr, 2)}
				onSelect={onSelectedTime}
				className="w-full rounded-[26px] border border-Gray10 p-[30px] shadow-customGray60"
				size="large"
			/>
		</div>
	)
}
/** 매장의 모든 영업시간 출력 */
const getFormattedStartTimeArr = (startTimeArr: number[]) =>
	startTimeArr.map((startTime) => {
		const dayOfDivision = getDayDivisionInKor(startTime)
		const hour = get12HourFromStamp(startTime)
		const min = getMinFromStamp(startTime)
		const printedHour = padStartToPrinting("time", hour)
		const printedMin = padStartToPrinting("time", min)
		return [dayOfDivision, printedHour + ":" + printedMin].join(" ")
	})
/** 옵션 선택 불가 idx */
const getDisabledIdxArr = (
	availableInfoArr: TResGetListAvailableTime[],
	companion: number,
) => {
	const result: number[] = []
	availableInfoArr.forEach((availableInfo, idx) => {
		const { availableSeats, artists } = availableInfo
		/* 1. "동반인원" 이 "시술가능좌석" 보다 많을 경우, disabled */
		if (companion >= availableSeats) result.push(idx)
		/* 2. 선택된 아티스트 중 단 사람이라도 해당 시간대에 안된다면, disabled */
		const isAllImpassible = artists.some((artist) => !artist.enable)
		if (isAllImpassible) result.push(idx)
	})
	return result
}
