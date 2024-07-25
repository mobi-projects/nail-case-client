"use client"

import NTToggleSwitch from "@/component/common/atom/nt-toggle-switch"

import { DAY_OF_WEEKS_KOR } from "../../register-form.constant"
import type { TWorkHour } from "../../register.form.type"

import TimeSetter from "./time-setter"

type EachDayOfWeekPT = {
	workHour: TWorkHour
	onHandleIsOpen: (dayOfWeek: number) => void
	onHandleTimestamp: (
		dayOfWeek: number,
		timeType: "startTime" | "endTime",
		fluctuationType: "increase" | "decrease",
	) => void
}

export default function EachDayOfWeek({
	workHour,
	onHandleIsOpen,
	onHandleTimestamp,
}: EachDayOfWeekPT) {
	const dayOfWeek = workHour.dayOfWeek
	const dayOfWeekKor = DAY_OF_WEEKS_KOR[dayOfWeek]
	const startTime = workHour.startTime
	const endTime = workHour.endTime
	const isOpen = workHour.isOpen
	const isValid = startTime < endTime
	return (
		<div className="grid grid-rows-[1fr_18px] gap-[5px]">
			<div className="grid h-[55px] w-full grid-cols-[1fr_12fr_100px] items-center gap-[50px]">
				<p className="flex h-full w-full items-center justify-center text-center">
					{dayOfWeekKor}요일
				</p>
				<div className="grid h-full w-full grid-cols-[1fr_40px_1fr] items-center gap-[18px]">
					<TimeSetter
						timestamp={startTime}
						isValid={isValid}
						isOpen={isOpen}
						onIncreaseTimestamp={() => {
							onHandleTimestamp(dayOfWeek, "startTime", "increase")
						}}
						onDecreaseTimestamp={() => {
							onHandleTimestamp(dayOfWeek, "startTime", "decrease")
						}}
					/>
					<hr className="border-Gray w-full border" />
					<TimeSetter
						timestamp={endTime}
						isValid={isValid}
						isOpen={isOpen}
						onIncreaseTimestamp={() => {
							onHandleTimestamp(dayOfWeek, "endTime", "increase")
						}}
						onDecreaseTimestamp={() => {
							onHandleTimestamp(dayOfWeek, "endTime", "decrease")
						}}
					/>
				</div>
				<div className="flex h-full w-full items-center justify-center">
					<NTToggleSwitch
						checked={isOpen}
						onChange={() => onHandleIsOpen(dayOfWeek)}
					/>
				</div>
			</div>
			{!isValid && isOpen && (
				<p className="w-full text-center text-Caption02 text-[#FF2C45]">
					<strong>개장시간</strong>은 <strong>마감시간</strong>보다 앞서야
					합니다.
				</p>
			)}
		</div>
	)
}
