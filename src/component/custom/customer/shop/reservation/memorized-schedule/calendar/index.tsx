"use client"
import dayjs from "dayjs"
import type { Dispatch, SetStateAction } from "react"

import { cn } from "@/config/tailwind"
import {
	getCalendarArr,
	getMonthFromStamp,
	getNowStamp,
	getYearFromStamp,
	invalidateTime,
} from "@/util/common"

import CalendarBody from "./calendar-body"
import CalendarHeader from "./calendar-header/indext"
import DayOfWeeks from "./day-of-weeks"

type CalendarPT = {
	selectedStamp: number
	setSelectedStamp: Dispatch<SetStateAction<number>>
	isThisMonth: boolean
	setIsThisMonth: Dispatch<SetStateAction<boolean>>
	className?: string
}

export default function Calendar({
	selectedStamp,
	setSelectedStamp,
	isThisMonth,
	setIsThisMonth,
	className,
}: CalendarPT) {
	const { month, year } = getInitDate(isThisMonth)
	return (
		<div
			className={cn(
				"grid h-full w-full grid-rows-[28px_1fr] gap-10",
				className,
			)}
		>
			<CalendarHeader
				isThisMonth={isThisMonth}
				setIsThisMonth={setIsThisMonth}
			/>
			<table className="grid h-full w-full grid-rows-[1fr_10fr] items-center gap-6">
				<thead className="flex h-full w-full items-center">
					<DayOfWeeks />
				</thead>
				<tbody className="relative flex h-full w-full flex-col">
					<CalendarBody
						selectedStamp={invalidateTime(selectedStamp)}
						setSelectedStamp={setSelectedStamp}
						focusedStampArr={getCalendarArr(year, month)}
					/>
				</tbody>
			</table>
		</div>
	)
}

const getInitDate = (isThisMonth: boolean) => {
	let year = 0
	let month = 0
	if (isThisMonth) {
		year = getYearFromStamp(getNowStamp())
		month = getMonthFromStamp(getNowStamp())
	} else {
		const nextMonthDate = dayjs().add(1, "month").unix()
		year = getYearFromStamp(nextMonthDate)
		month = getMonthFromStamp(nextMonthDate)
	}
	return { year, month }
}
