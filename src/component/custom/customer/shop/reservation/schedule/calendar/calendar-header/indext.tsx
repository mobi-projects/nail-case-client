import dayjs from "dayjs"
import type { Dispatch, SetStateAction } from "react"

import NTIcon from "@/component/common/nt-icon"
import { cn } from "@/config/tailwind"
import {
	getMonthFromStamp,
	getNowStamp,
	getYearFromStamp,
	padStartToPrinting,
} from "@/util/common"

type CalendarHeaderPT = {
	isThisMonth: boolean
	setIsThisMonth: Dispatch<SetStateAction<boolean>>
}
export default function CalendarHeader({
	isThisMonth,
	setIsThisMonth,
}: CalendarHeaderPT) {
	const { paddedFocusedMonth, paddedFocusedYear } =
		getCalendarHeaderDate(isThisMonth)

	return (
		<div className="flex h-[28px] w-full items-center justify-center gap-x-3">
			<NTIcon
				icon="expandLeft"
				className={cn(
					"h-6 w-6 transition-all hover:scale-105",
					!isThisMonth
						? "cursor-pointer text-PB100 opacity-100"
						: "cursor-default opacity-0",
				)}
				onClick={() => {
					if (!isThisMonth) {
						setIsThisMonth(true) // '>'로 가기 위한 상태 전환 (9월로 돌아옴)
					}
				}}
			/>

			<p className="font-Semibold w-[120px] text-center text-Headline02 text-[18px]">
				{paddedFocusedYear} 년 {paddedFocusedMonth} 월
			</p>
			<NTIcon
				icon="expandRight"
				className={cn(
					"h-6 w-6 transition-all hover:scale-105",
					isThisMonth
						? "cursor-pointer text-PB100 opacity-100"
						: "cursor-default opacity-0",
				)}
				onClick={() => {
					if (isThisMonth) {
						setIsThisMonth(false) // '<'로 가기 위한 상태 전환 (10월로 이동)
					}
				}}
			/>
		</div>
	)
}

const getCalendarHeaderDate = (isThisMonth: boolean) => {
	if (isThisMonth) {
		const nowTimeStamp = getNowStamp()
		const paddedFocusedYear = padStartToPrinting(
			"year",
			getYearFromStamp(nowTimeStamp),
		)
		const paddedFocusedMonth = padStartToPrinting(
			"month",
			getMonthFromStamp(nowTimeStamp),
		)

		return { paddedFocusedMonth, paddedFocusedYear }
	} else {
		const newMonthTimeStamp = dayjs().add(1, "month").unix()
		const paddedFocusedYear = padStartToPrinting(
			"year",
			getYearFromStamp(newMonthTimeStamp),
		)
		const paddedFocusedMonth = padStartToPrinting(
			"month",
			getMonthFromStamp(newMonthTimeStamp),
		)

		return { paddedFocusedMonth, paddedFocusedYear }
	}
}
