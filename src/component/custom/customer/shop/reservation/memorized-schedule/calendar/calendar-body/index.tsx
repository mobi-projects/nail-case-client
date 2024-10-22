import dayjs from "dayjs"
import type { Dispatch, SetStateAction } from "react"

import { cn } from "@/config/tailwind"
import {
	getDateFromStamp,
	getNowStamp,
	invalidateTime,
	isSame,
} from "@/util/common"

type CalendarBodyPT = {
	selectedStamp: number
	setSelectedStamp: Dispatch<SetStateAction<number>>
	focusedStampArr: number[]
}

export default function CalendarBody({
	focusedStampArr = [],
	selectedStamp,
	setSelectedStamp,
}: CalendarBodyPT) {
	const nowStamp = invalidateTime(getNowStamp())
	const nextMonthStamp = invalidateTime(dayjs().add(1, "month").unix())

	return (
		<tr className="grid h-full w-full grid-cols-7">
			{focusedStampArr.map((stamp: number) => {
				const isInRange = isInCurrentMonthRange(stamp, nowStamp, nextMonthStamp)
				const isToday = isSame(stamp, nowStamp)
				const isFocused = isSame(stamp, selectedStamp)
				return (
					<th
						className="flex h-full w-full items-center justify-center"
						onClick={() => {
							if (isInRange) {
								setSelectedStamp(stamp)
							}
						}}
						key={stamp}
					>
						<p
							className={cn(
								"flex h-9 w-9 cursor-pointer items-center justify-center rounded-[3px] border-transparent text-center text-Gray70 transition-all hover:scale-110 hover:bg-Gray10 lg:text-[16px] max-md:text-[12px] max-lg:h-7 max-lg:w-7",
								isToday && "text-PB100",
								isFocused && "bg-PY100 hover:bg-PY100",
								!isInRange &&
									"cursor-default bg-White text-Gray20 hover:scale-100 hover:bg-White",
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

const isInCurrentMonthRange = (
	stamp: number,
	startStamp: number,
	endStamp: number,
): boolean => {
	return stamp >= startStamp && stamp < endStamp
}
