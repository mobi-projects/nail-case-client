"use client"

import { useState } from "react"

import { getNowStamp } from "@/util/common"

import Calendar from "./01"
import DesiredTime from "./02"

export type ScheduleSelectionPT = {
	shopId: number
}

export default function ScheduleSelection({ shopId }: ScheduleSelectionPT) {
	const [selectedStamp, setSelectedStamp] = useState(getNowStamp())
	return (
		<div className="flex h-full w-full flex-col gap-[40px]">
			<div className="flex flex-col gap-[10px]">
				<h2 className="text-Headline02">희망 날짜 선택</h2>
				<Calendar {...{ selectedStamp, setSelectedStamp }} />
			</div>
			<div className="flex flex-col gap-[10px]">
				<h2 className="text-Headline02">희망 시간 선택</h2>
				<DesiredTime {...{ shopId, selectedStamp }} />
			</div>
		</div>
	)
}
