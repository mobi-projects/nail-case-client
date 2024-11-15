import React, {
	memo,
	useState,
	type Dispatch,
	type SetStateAction,
} from "react"

import { cn } from "@/config/tailwind"
import {
	getDateFromStamp,
	getDayOfWeekFromStamp,
	getMonthFromStamp,
} from "@/util/common"

import Calendar from "./calendar"

export type SchedulePT = {
	selectedStamp: number
	setSelectedStamp: Dispatch<SetStateAction<number>>
	shopId: number
}

function Schedule({ selectedStamp, setSelectedStamp }: SchedulePT) {
	const printedTime = getPrintedTime(selectedStamp)
	const [isThisMonth, setIsThisMonth] = useState(true)
	return (
		<div className="relative flex h-[500px] w-full flex-col gap-[20px] max-md:h-[400px]">
			<span className="absolute left-2 top-1 z-10 w-fit text-[22px] font-SemiBold text-Gray100 lg:text-[18px] xl:text-[20px] max-md:hidden">
				{printedTime}
			</span>
			<Calendar
				selectedStamp={selectedStamp}
				setSelectedStamp={setSelectedStamp}
				isThisMonth={true}
				setIsThisMonth={setIsThisMonth}
				className={cn(
					"absolute left-0 top-2 overflow-hidden transition-all duration-700",
					isThisMonth
						? "translate-x-0 opacity-100"
						: "-translate-x-full opacity-0",
				)}
			/>
			<Calendar
				selectedStamp={selectedStamp}
				setSelectedStamp={setSelectedStamp}
				isThisMonth={false}
				setIsThisMonth={setIsThisMonth}
				className={cn(
					"absolute left-0 top-2 transition-all duration-700",
					!isThisMonth
						? "translate-x-0 opacity-100"
						: "translate-x-full opacity-0",
				)}
			/>
		</div>
	)
}

const MemoizedSchedule = memo(Schedule)

export default MemoizedSchedule

const getPrintedTime = (timestamp: number) => {
	const month = getMonthFromStamp(timestamp)
	const date = getDateFromStamp(timestamp)
	const dayOfWeek = getDayOfWeekFromStamp(timestamp)

	return [`${month}월`, `${date}일`, `(${dayOfWeek})`].join(" ")
}
