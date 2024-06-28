"use client"

import dayjs from "dayjs"
import React from "react"

import NTIcon from "@/component/common/nt-icon"

export default function ManagerBaseScheduleThisWeekTask() {
	return (
		<div className="flex h-fit w-full flex-col py-[10px]">
			<ManagerScheduleTime />
			<div className="flex flex-col gap-[15px]">
				{Array.from({ length: 6 }).map((_, index) => (
					<ManagerScheduleThisWeek key={index} index={index} />
				))}
			</div>
		</div>
	)
}

function ManagerScheduleTime() {
	const startHour = 11
	const hours = Array.from({ length: 7 }, (_, i) => {
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
					<div key={idx} className="relative px-[50px] text-Callout">
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
	index: number
}

function ManagerScheduleThisWeek({ index }: ManagerScheduleThisWeekPT) {
	const today = dayjs()
	const week = Array.from({ length: 6 }, (_, i) => today.add(i, "day"))
	const day = week[index]
	const isToday = day.isSame(today, "day")

	return (
		<div
			className={`flex h-[160px] w-full rounded-[24px] border-[2px] py-[10px] pl-[20px] ${
				isToday ? "border-PB100" : "border-Gray50"
			}`}
		>
			<ManagerScheduleDay index={index} isToday={isToday} />
			<ManagerScheduleTask index={index} />
			<ManagerScheduleMoreTask />
		</div>
	)
}

type ManagerScheduleDayPT = {
	index: number
	isToday: boolean
}

function ManagerScheduleDay({ index, isToday }: ManagerScheduleDayPT) {
	const today = dayjs()
	const week = Array.from({ length: 6 }, (_, i) => today.add(i, "day"))
	const daysOfWeek = ["월", "화", "수", "목", "금", "토"]

	const day = week[index]

	return (
		<div className="ml-[10px] flex h-[131.27px] w-[100px] flex-col justify-between border-r-[2px] border-Gray10">
			<div>
				<div
					className={`text-Headline02 ${
						isToday ? "text-PB100" : "text-Gray100"
					}`}
				>
					{daysOfWeek[index]}
				</div>
				<div
					className={`text-Body02 ${isToday ? "text-PB100" : "text-Gray40"}`}
				>
					{day.format("D일")}
				</div>
			</div>
			<div
				className={`text-Title03 font-Bold ${
					isToday ? "text-PB100" : "text-Gray40"
				}`}
			>
				4건
			</div>
		</div>
	)
}

const reservationData = [
	[
		{
			date: 24,
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
			date: 24,
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
			date: 25,
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
			date: 26,
			firstTime: 11,
			endTime: 14,
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
			date: 26,
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
	[
		{
			date: 27,
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
			date: 27,
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
			date: 28,
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
			date: 29,
			firstTime: 11,
			endTime: 14,
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
			date: 29,
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

function ManagerScheduleTask({ index }: ManagerScheduleThisWeekPT) {
	const today = dayjs()
	const week = Array.from({ length: 6 }, (_, i) => today.add(i, "day"))
	const day = week[index]

	const dailyReservations = reservationData
		.flat()
		.filter((res) => day.date() === res.date)

	const startHour = 11
	const endHour = 18

	return (
		<div className="grid h-full w-[1000px] grid-cols-8">
			{Array.from({ length: endHour - startHour }).map((_, i) => (
				<div key={i} className="mt-[12px]" style={{ minHeight: "136.8px" }}>
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
								className={`mb-2 rounded-lg grid-column-span-${duration}`}
							>
								{res.artistArr.map((artist, artistIdx) => {
									const artistBgColorClass =
										artist.name === "모비쌤" ? "bg-BGblue02" : "bg-PY50"
									return (
										<div
											key={`${idx}-${artistIdx}`}
											className={`mb-2 rounded-lg ${widthClass} ${artistBgColorClass} flex h-[50px] items-center px-[10px]`}
										>
											<div className="mr-2 text-Body02 font-Bold text-Gray100">
												{artist.name}
											</div>
											<div className="text-Callout text-Gray100">
												{artist.optionArr.join(" / ")}
											</div>
										</div>
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

function ManagerScheduleMoreTask() {
	return (
		<div className="flex h-full w-[100px] items-center justify-center border-l-[2px] border-Gray10">
			<div className="flex h-[35px] w-[55.38px] items-center justify-center rounded-[35px] border-[0.5px] border-Gray40">
				<NTIcon
					icon="expandRightLight"
					className="w-[25px] cursor-pointer text-Gray70"
				/>
			</div>
		</div>
	)
}
