"use client"

import Calendar from "./01"
import DesiredTime from "./02"

export type TAvailabilityInfo = {
	time: number
	availableSeats: number
	artists: Array<{
		id: number
		nickname: string
		enable: boolean
		near: number
	}>
}

export type ScheduleSelectionPT = {
	availableArr: Array<TAvailabilityInfo>
}

export default function ScheduleSelection({
	availableArr,
}: ScheduleSelectionPT) {
	return (
		<div className="flex h-full w-full flex-col gap-[40px]">
			<div className="flex flex-col gap-[10px]">
				<h2 className="text-Headline02">희망 날짜 선택</h2>
				<Calendar />
			</div>
			<div className="flex flex-col gap-[10px]">
				<h2 className="text-Headline02">희망 시간 선택</h2>
				<DesiredTime {...{ availableArr }} />
			</div>
		</div>
	)
}
