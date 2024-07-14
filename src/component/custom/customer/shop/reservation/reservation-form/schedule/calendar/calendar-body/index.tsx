import type { Dispatch, SetStateAction } from "react"

import { cn } from "@/config/tailwind"
import {
	getDateFromStamp,
	getNowStamp,
	isAfter,
	isBefore,
	isSame,
} from "@/util/common"

type CalendarBodyPT = {
	selectedStamp: number
	setSelectedStamp: Dispatch<SetStateAction<number>>
	focusedStampArr?: number[]
}

export default function CalendarBody({
	focusedStampArr = [],
	selectedStamp,
	setSelectedStamp,
}: CalendarBodyPT) {
	return (
		<tr className="grid h-full w-full grid-cols-7">
			{focusedStampArr.map((stamp: number) => {
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
