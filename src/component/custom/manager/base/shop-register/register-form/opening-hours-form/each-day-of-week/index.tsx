"use client"
import { useState } from "react"

import NTToggleSwitch from "@/component/common/atom/nt-toggle-switch"
import type { DayOfWeek } from "@/type/union-option/day-of-week"

import { OPENING_HOURS_INIT_STATE } from "./each-day-of-week.constant"
import TimeSetter from "./time-setter"

type EachDayOfWeekPT = {
	dayOfWeek: DayOfWeek
}

type TOpeningHours = {
	startTime: number
	endTime: number
	isDisable: boolean
}

export default function EachDayOfWeek({ dayOfWeek }: EachDayOfWeekPT) {
	const [openingHours] = useState<TOpeningHours>(OPENING_HOURS_INIT_STATE)
	const isOpeningHoursInvalid = openingHours.startTime >= openingHours.endTime
	return (
		<div className="grid h-[55px] w-full grid-cols-[1fr_12fr_100px] items-center gap-[50px]">
			<p className="flex h-full w-full items-center justify-center text-center">
				{dayOfWeek}요일
			</p>
			<div className="grid h-full w-full grid-cols-[1fr_40px_1fr] items-center gap-[18px]">
				<TimeSetter
					timestamp={openingHours.startTime}
					isInvalid={isOpeningHoursInvalid}
				/>
				<hr className="border-Gray w-full border" />
				<TimeSetter
					timestamp={openingHours.endTime}
					isInvalid={isOpeningHoursInvalid}
				/>
			</div>
			<div className="flex h-full w-full items-center justify-center">
				<NTToggleSwitch checked={openingHours.isDisable} onChange={() => {}} />
			</div>
		</div>
	)
}
