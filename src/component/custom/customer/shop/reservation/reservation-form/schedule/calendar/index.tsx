"use client"
import type { Dispatch, SetStateAction } from "react"
import { useCallback, useState } from "react"

import NTIcon from "@/component/common/nt-icon"
import {
	getCalendarArr,
	getMonthFromStamp,
	getNextMonthFirstDate,
	getPrevMonthLastDate,
	getYearFromStamp,
	invalidateTime,
	padStartToPrinting,
} from "@/util/common"

import CalendarBody from "./calendar-body"

type CalendarPT = {
	selectedStamp: number
	setSelectedStamp: Dispatch<SetStateAction<number>>
	setIsTimeSelected: Dispatch<SetStateAction<boolean>>
}

export default function Calendar({
	selectedStamp,
	setSelectedStamp,
	setIsTimeSelected,
}: CalendarPT) {
	const [focusedYear, setFocusedYear] = useState(
		getYearFromStamp(selectedStamp),
	)
	const [focusedMonth, setFocusedMonth] = useState(
		getMonthFromStamp(selectedStamp),
	)

	const CalendarHeader = useCallback(() => {
		const paddedFocusedYear = padStartToPrinting("year", focusedYear)
		const paddedFocusedMonth = padStartToPrinting("month", focusedMonth)
		const onClickPrevButton = () => {
			const prevMonthLastDay = getPrevMonthLastDate(focusedYear, focusedMonth)
			const prevYear = getYearFromStamp(prevMonthLastDay)
			const prevMonth = getMonthFromStamp(prevMonthLastDay)
			setFocusedYear(prevYear)
			setFocusedMonth(prevMonth)
		}
		const onClickNextButton = () => {
			const prevMonthLastDay = getNextMonthFirstDate(focusedYear, focusedMonth)
			const prevYear = getYearFromStamp(prevMonthLastDay)
			const prevMonth = getMonthFromStamp(prevMonthLastDay)
			setFocusedYear(prevYear)
			setFocusedMonth(prevMonth)
		}
		return (
			<div className="flex h-[28px] w-full items-center justify-center gap-x-3">
				<NTIcon
					icon="expandLeft"
					className="h-6 w-6 cursor-pointer text-Gray30 transition-all hover:scale-105"
					onClick={onClickPrevButton}
				/>
				<p className="font-Semibold w-[120px] text-center text-Headline02 text-[18px]">
					{paddedFocusedYear} 년 {paddedFocusedMonth} 월
				</p>
				<NTIcon
					icon="expandRight"
					className="h-6 w-6 cursor-pointer text-Gray30 transition-all hover:scale-105"
					onClick={onClickNextButton}
				/>
			</div>
		)
	}, [focusedYear, focusedMonth])
	const DayOfWeeks = useCallback(() => {
		return (
			<tr className="grid w-full grid-cols-7 text-center text-Headline02 text-Gray60">
				<th>일</th>
				<th>월</th>
				<th>화</th>
				<th>수</th>
				<th>목</th>
				<th>금</th>
				<th>토</th>
			</tr>
		)
	}, [])

	return (
		<div className="grid h-full w-full grid-rows-[28px_1fr] gap-10">
			<CalendarHeader />
			<table className="grid h-full w-full grid-rows-[1fr_10fr] items-center gap-6">
				<thead className="flex h-full w-full items-center">
					<DayOfWeeks />
				</thead>
				<tbody className="flex h-full w-full flex-col">
					<CalendarBody
						selectedStamp={invalidateTime(selectedStamp)}
						setSelectedStamp={setSelectedStamp}
						focusedStampArr={getCalendarArr(focusedYear, focusedMonth)}
						setIsTimeSelected={setIsTimeSelected}
					/>
				</tbody>
			</table>
		</div>
	)
}
