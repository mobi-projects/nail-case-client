"use client"

import dayjs from "dayjs"
import React, { useState } from "react"

import NTEventDetail from "@/component/common/nt-event-deatli"
import NTIcon from "@/component/common/nt-icon"

export default function ManagerBaseScheduleThisWeekTask() {
	const [startHour, setStartHour] = useState(11)
	const [incremented, setIncremented] = useState(false)

	const incrementHour = () => {
		if (!incremented) {
			setStartHour(13)
			setIncremented(true)
		} else {
			setStartHour(11)
			setIncremented(false)
		}
	}

	return (
		<div className="flex h-fit w-full flex-col py-[10px]">
			<ManagerScheduleTime startHour={startHour} />
			<div className="flex flex-col gap-[15px]">
				{Array.from({ length: 6 }).map((_, idx) => (
					<ManagerScheduleThisWeek
						key={idx}
						idx={idx}
						startHour={startHour}
						incrementHour={incrementHour}
						incremented={incremented}
					/>
				))}
			</div>
		</div>
	)
}

type ManagerScheduleTimePT = {
	startHour: number
}

function ManagerScheduleTime({ startHour }: ManagerScheduleTimePT) {
	const hours = Array.from({ length: 8 }, (_, i) => {
		const hour = dayjs().hour(startHour + i)
		if (hour.hour() === 12) {
			return "정오"
		} else if (hour.hour() > 12) {
			return `오후${hour.hour() - 12}`
		} else {
			return `오전${hour.hour()}`
		}
	})

	return (
		<div className="flex h-[65px] w-full items-center justify-center">
			{hours.map((date, idx) => {
				return (
					<div key={idx} className="relative px-[40px] text-Callout">
						{date}
						{idx < hours.length - 1 && (
							<div className="absolute right-0 top-0 h-full"></div>
						)}
					</div>
				)
			})}
		</div>
	)
}

type ManagerScheduleThisWeekPT = {
	idx: number
	startHour: number
	incrementHour: () => void
	incremented: boolean
}

function ManagerScheduleThisWeek({
	idx,
	startHour,
	incrementHour,
	incremented,
}: ManagerScheduleThisWeekPT) {
	const today = dayjs()
	const week = Array.from({ length: 6 }, (_, i) => today.add(i, "day"))
	const day = week[idx]
	const isToday = day.isSame(today, "day")

	return (
		<div
			className={`flex h-[160px] w-full rounded-[24px] border-[2px] py-[10px] pl-[20px] ${
				isToday ? "border-PB100" : "border-Gray50"
			}`}
		>
			<ManagerScheduleDay idx={idx} isToday={isToday} />
			<ManagerScheduleTask idx={idx} startHour={startHour} />
			<ManagerScheduleMoreTask
				onClick={incrementHour}
				incremented={incremented}
			/>
		</div>
	)
}

type ManagerScheduleDayPT = {
	idx: number
	isToday: boolean
}

function ManagerScheduleDay({ idx, isToday }: ManagerScheduleDayPT) {
	const today = dayjs()
	const week = Array.from({ length: 6 }, (_, i) => today.add(i, "day"))
	const daysOfWeek = ["월", "화", "수", "목", "금", "토"]

	const day = week[idx]

	return (
		<div className="ml-[10px] flex h-[131.27px] w-[100px] flex-col justify-between border-r-[2px] border-Gray10">
			<div>
				<div
					className={`text-Headline02 ${isToday ? "text-PB100" : "text-Gray100"}`}
				>
					{daysOfWeek[idx]}
				</div>
				<div
					className={`text-Body02 ${isToday ? "text-PB100" : "text-Gray40"}`}
				>
					{day.format("D일")}
				</div>
			</div>
			<div
				className={`text-Title03 font-Bold ${isToday ? "text-PB100" : "text-Gray40"}`}
			>
				4건
			</div>
		</div>
	)
}

const reservationData = [
	[
		{
			date: 2,
			firstTime: 11,
			endTime: 13,
			artistArr: [
				{
					name: "모비쌤",
					optionArr: ["아트", "동반 2인 시술"],
				},
				{
					name: "비모쌤",
					optionArr: ["아트", "동반 2인 시술"],
				},
			],
		},
		{
			date: 2,
			firstTime: 15,
			endTime: 18,
			artistArr: [
				{
					name: "비모쌤",
					optionArr: ["아트", "동반 2인 시술"],
				},
			],
		},
	],
	[
		{
			date: 3,
			firstTime: 13,
			endTime: 15,
			artistArr: [
				{
					name: "모비쌤",
					optionArr: ["이달의 아트", "타샵 제거 필요"],
				},
			],
		},
	],
	[
		{
			date: 4,
			firstTime: 16,
			endTime: 19,
			artistArr: [
				{
					name: "모비쌤",
					optionArr: ["아트", "동반 2인 시술"],
				},
				{
					name: "비모쌤",
					optionArr: ["아트", "동반 2인 시술"],
				},
			],
		},
		{
			date: 4,
			firstTime: 11,
			endTime: 13,
			artistArr: [
				{
					name: "비모쌤",
					optionArr: ["아트", "동반 2인 시술"],
				},
			],
		},
	],
	[
		{
			date: 5,
			firstTime: 12,
			endTime: 14,
			artistArr: [
				{
					name: "비모쌤",
					optionArr: ["아트", "동반 2인 시술"],
				},
				{
					name: "모비쌤",
					optionArr: ["아트", "동반 2인 시술"],
				},
			],
		},
		{
			date: 5,
			firstTime: 15,
			endTime: 18,
			artistArr: [
				{
					name: "비모쌤",
					optionArr: ["아트", "동반 2인 시술"],
				},
			],
		},
	],
	[
		{
			date: 6,
			firstTime: 13,
			endTime: 15,
			artistArr: [
				{
					name: "모비쌤",
					optionArr: ["이달의 아트", "타샵 제거 필요"],
				},
			],
		},
	],
	[
		{
			date: 7,
			firstTime: 11,
			endTime: 14,
			artistArr: [
				{
					name: "미지정",
					optionArr: ["아트", "동반 2인 시술"],
				},
				{
					name: "비모쌤",
					optionArr: ["아트", "동반 2인 시술"],
				},
			],
		},
		{
			date: 7,
			firstTime: 15,
			endTime: 17,
			artistArr: [
				{
					name: "비모쌤",
					optionArr: ["아트", "동반 2인 시술"],
				},
			],
		},
	],
]

type ManagerScheduleTaskPT = {
	idx: number
	startHour: number
}

function ManagerScheduleTask({ idx, startHour }: ManagerScheduleTaskPT) {
	const today = dayjs()
	const week = Array.from({ length: 6 }, (_, i) => today.add(i, "day"))
	const day = week[idx]

	const dailyReservations = reservationData
		.flat()
		.filter((res) => day.date() === res.date)

	const endHour = startHour + 7

	return (
		<div className="grid h-full w-[1000px] grid-cols-8">
			{Array.from({ length: endHour - startHour }).map((_, i) => (
				<div key={i} className="mt-[12px] min-h-[136.8px]">
					{dailyReservations.map((res, idx) => {
						const duration = res.endTime - res.firstTime
						const widthClass =
							duration === 2
								? "w-[263px]"
								: duration === 3
									? "w-[388px]"
									: "w-[263px]"

						return res.firstTime === startHour + i ? (
							<div
								key={idx}
								className={`rounded-lg grid-column-span-${duration}`}
							>
								{res.artistArr.map((artist, artistIdx) => {
									let variant: "PB" | "PY" | "Gray" | null = null
									if (artist.name === "모비쌤") {
										variant = "PB"
									} else if (artist.name === "비모쌤") {
										variant = "PY"
									} else if (artist.name === "미지정") {
										variant = "Gray"
									}
									return (
										<NTEventDetail
											key={`${idx}-${artistIdx}`}
											variant={variant}
											className={`${widthClass} mb-[15px]`}
											name={artist.name}
										>
											{artist.optionArr.join(" / ")}
										</NTEventDetail>
									)
								})}
							</div>
						) : null
					})}
				</div>
			))}
		</div>
	)
}

function ManagerScheduleMoreTask({
	onClick,
	incremented,
}: {
	onClick: () => void
	incremented: boolean
}) {
	return (
		<div className="flex h-full w-[100px] items-center justify-center border-l-[2px] border-Gray10">
			<div
				className="flex h-[35px] w-[55.38px] cursor-pointer items-center justify-center rounded-[35px] border-[0.5px] border-Gray40"
				onClick={onClick}
			>
				<NTIcon
					icon={incremented ? "expandLeftLight" : "expandRightLight"}
					className="w-[25px] cursor-pointer text-Gray70"
				/>
			</div>
		</div>
	)
}
