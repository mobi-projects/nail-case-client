"use client"
import type { Dispatch, SetStateAction } from "react"
import { useCallback, useState } from "react"

import NTIcon from "@/component/common/nt-icon"
import { cn } from "@/config/tailwind"
import {
	getCalendarArr,
	getDateFromStamp,
	getMonthFromStamp,
	getNextMonthFirstDate,
	getNowStamp,
	getPrevMonthLastDate,
	getYearFromStamp,
	isAfter,
	isBefore,
	isSame,
	padStartToPrinting,
} from "@/util/common"

type CalendarPT = {
	selectedStamp: number
	setSelectedStamp: Dispatch<SetStateAction<number>>
}

export default function Calendar({
	selectedStamp,
	setSelectedStamp,
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
		<div className="grid h-full w-full grid-rows-[28px_1fr] gap-10 rounded-[26px] border border-Gray10 p-[30px] shadow-customGray60">
			<CalendarHeader />
			<table className="grid h-full w-full grid-rows-[1fr_10fr] items-center gap-6">
				<thead className="flex h-full w-full items-center">
					<DayOfWeeks />
				</thead>
				<tbody className="flex h-full w-full flex-col">
					<CalendarBody
						selectedStamp={selectedStamp}
						setSelectedStamp={setSelectedStamp}
						focusedStampArr={getCalendarArr(focusedYear, focusedMonth)}
					/>
				</tbody>
			</table>
		</div>
	)
}

type CalendarBodyPT = CalendarPT & {
	focusedStampArr?: number[]
}

function CalendarBody({
	focusedStampArr = [],
	selectedStamp,
	setSelectedStamp,
}: CalendarBodyPT) {
	return (
		<tr className="grid h-full w-full grid-cols-7">
			{focusedStampArr.map((stamp) => {
				const nowStamp = getNowStamp()
				const isPrevDay = isBefore(stamp, nowStamp)
				const isToday = isSame(stamp, nowStamp)
				const isNextMonth = isAfter(stamp, nowStamp, "month")
				const isFocused = isSame(stamp, selectedStamp)
				return (
					<th
						className="flex h-full w-full items-center justify-center"
						onClick={() => {
							setSelectedStamp(stamp)
						}}
						key={stamp}
					>
						<p
							className={cn(
								"flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-[3px] border-transparent text-center text-Body02 text-Gray100 transition-all hover:scale-150",
								isToday && "text-[16px] text-PB100",
								isFocused && "bg-PY100",
								isNextMonth && "text-Gray60",
								isPrevDay &&
									"cursor-default bg-White text-Gray40 hover:scale-100",
							)}
						>
							{getDateFromStamp(stamp)}
						</p>
					</th>
				)
			})}
		</tr>
	)
}
