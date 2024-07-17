import type { Dispatch, SetStateAction } from "react"

import {
	getDateFromStamp,
	getDayDivisionInKor,
	getDayOfWeekFromStamp,
	getHourFromStamp,
	getMinFromStamp,
	getMonthFromStamp,
	invalidateTime,
} from "@/util/common"

import Calendar from "./calendar"
import DesiredTime from "./desired-time"

export type SchedulePT = {
	shopId: number
	selectedStamp: number
	artistIdArr: Array<number>
	setSelectedStamp: Dispatch<SetStateAction<number>>
	setIsTimeSelected: Dispatch<SetStateAction<boolean>>
}

export default function Schedule({
	shopId,
	selectedStamp,
	artistIdArr,
	setSelectedStamp,
	setIsTimeSelected,
}: SchedulePT) {
	const printedTime = getPrintedTime(selectedStamp)

	return (
		<div className="flex h-full w-full flex-col gap-[20px]">
			<p className="w-full text-[22px] font-SemiBold text-Gray100">
				{printedTime}
			</p>
			<Calendar {...{ selectedStamp, setSelectedStamp, setIsTimeSelected }} />
			<hr className="w-full border-[1.5px] border-Gray20" />
			<DesiredTime
				{...{
					artistIdArr,
					shopId,
					selectedStamp,
					setSelectedStamp,
					setIsTimeSelected,
				}}
			/>
		</div>
	)
}

const getPrintedTime = (timestamp: number) => {
	const isOnlyDate = timestamp === invalidateTime(timestamp)

	const month = getMonthFromStamp(timestamp)
	const date = getDateFromStamp(timestamp)
	const dayOfWeek = getDayOfWeekFromStamp(timestamp)
	const dayDivision = getDayDivisionInKor(timestamp)
	const hour = getHourFromStamp(timestamp)
	const min = getMinFromStamp(timestamp)

	if (isOnlyDate) return [`${month}월`, `${date}일`, `(${dayOfWeek})`].join(" ")
	return [
		`${month}월`,
		`${date}일`,
		`(${dayOfWeek})`,
		dayDivision,
		`${hour}시`,
		`${min}분`,
	].join(" ")
}
