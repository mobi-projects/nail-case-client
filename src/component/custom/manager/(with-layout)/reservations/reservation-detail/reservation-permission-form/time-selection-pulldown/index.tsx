import { type MutableRefObject, useEffect } from "react"

import NTIcon from "@/component/common/nt-icon"
import {
	NTPulldownContent,
	NTPulldownItem,
	NTPulldownLabel,
	NTPulldownTrigger,
	useNTPulldown,
} from "@/component/common/nt-pulldown"
import {
	generate30MinIntervalsArr,
	generateFromattedTimeOptionArr,
} from "@/component/custom/customer/shop/reservation/memorized-time-selection/available-times/availale-times.util"
import { cn } from "@/config/tailwind"
import type { TWorkHours } from "@/util/api-v2/get-shop-info"
import { add30Min, combineTimeStamp } from "@/util/common"

type TimeSelectionPulldownPT = {
	workHoursInfo: Omit<TWorkHours, "dayOfWeek">
	endTime: MutableRefObject<number | undefined>
	startTime: number
}

export default function TimeSelectionPulldown({
	workHoursInfo,
	endTime,
	startTime,
}: TimeSelectionPulldownPT) {
	const { clickedIdx, selectIdx } = useNTPulldown()
	const { closeTime } = workHoursInfo

	const timeRangeArr = getTimeRangeArrForPulldown(startTime, closeTime)

	const timeOptionArr = generateFromattedTimeOptionArr(timeRangeArr, "full")

	useEffect(() => {
		endTime.current = timeRangeArr[clickedIdx]
	}, [clickedIdx, endTime, startTime, timeRangeArr])

	return (
		<div className="relative min-w-[8rem]">
			<NTPulldownTrigger
				className={cn(
					"justify-end pr-2 text-end text-Body02 font-SemiBold text-PB80",
					clickedIdx === -1 && "text-Gray50",
				)}
			>
				{timeOptionArr[clickedIdx] || "시간선택"}
			</NTPulldownTrigger>
			<NTPulldownContent position="leftTop" className="w-[10rem]">
				<NTPulldownLabel className="bg-PB50 p-2 text-White">
					선택 가능한 시간
				</NTPulldownLabel>
				{timeOptionArr.map((option, idx) => (
					<NTPulldownItem key={idx} onClick={() => selectIdx(idx)}>
						{option}
						<NTIcon
							icon="check"
							className={cn(
								"h-6 w-6",
								clickedIdx === idx ? "opacity-100" : "opacity-0",
							)}
						/>
					</NTPulldownItem>
				))}
			</NTPulldownContent>
		</div>
	)
}

const getTimeRangeArrForPulldown = (
	timeRangeStart: number,
	timeRangeEnd: number,
) => {
	const combiendEndTime = combineTimeStamp(timeRangeStart, timeRangeEnd)

	const halfHourAddedStartTime = add30Min(timeRangeStart, 1)
	const twoHourAddedEndTime = add30Min(combiendEndTime, 4)

	const timeRangeArr = generate30MinIntervalsArr(
		halfHourAddedStartTime,
		twoHourAddedEndTime,
	)
	return timeRangeArr
}
