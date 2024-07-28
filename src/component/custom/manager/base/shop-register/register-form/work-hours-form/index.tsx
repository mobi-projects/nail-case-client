"use client"

import type { Dispatch, SetStateAction } from "react"

import { getBeforeOrAfterN } from "@/util/common"

import { MAXIMUM_TIMESTAMP, MINIMUM_TIMESTAMP } from "../register-form.constant"
import type { TWorkHour } from "../register.form.type"

import EachDayOfWeek from "./each-day-of-week"
import { adjustWithinSafeBoundary, arrayDeepCopy } from "./work-hours-form.util"

type OpeningHoursFormPT = {
	workHours: TWorkHour[]
	setWorkHours: Dispatch<SetStateAction<TWorkHour[]>>
}

export default function OpeningHoursForm({
	workHours,
	setWorkHours,
}: OpeningHoursFormPT) {
	/** 영업요일 관리 */
	const onHandleIsOpen = (dayOfWeek: number) => {
		setWorkHours((prev) => {
			const _prev = arrayDeepCopy<TWorkHour>(prev)
			_prev[dayOfWeek].isOpen = !workHours[dayOfWeek].isOpen
			return _prev
		})
	}
	/** 시간 관리 */
	const onHandleTimestamp = (
		dayOfWeek: number,
		timeType: "openTime" | "closeTime",
		fluctuationType: "increase" | "decrease",
	) =>
		setWorkHours((prev) => {
			const _prev = arrayDeepCopy<TWorkHour>(prev)
			const openTime = _prev[dayOfWeek][timeType]
			const resultTime = getBeforeOrAfterN(
				openTime,
				30,
				fluctuationType === "increase" ? "after" : "before",
				"minute",
			)
			_prev[dayOfWeek][timeType] = adjustWithinSafeBoundary(
				resultTime,
				MAXIMUM_TIMESTAMP,
				MINIMUM_TIMESTAMP,
			)
			return _prev
		})
	return (
		<div className="mt-[12px] flex flex-col gap-[40px]">
			{workHours.map((workHour) => (
				<EachDayOfWeek
					key={workHour.dayOfWeek}
					{...{ workHour, onHandleIsOpen, onHandleTimestamp }}
				/>
			))}
		</div>
	)
}
