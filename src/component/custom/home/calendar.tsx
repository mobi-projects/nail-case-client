"use client"
import dayjs from "dayjs"
import React, { useState } from "react"

import { cn } from "@/config/tailwind"

import NTIcon from "../../common/nt-icon"

const generateDate = (month = dayjs().month(), year = dayjs().year()) => {
	const firstDateOfMonth = dayjs().year(year).month(month).startOf("month")
	const lastDateOfMonth = dayjs().year(year).month(month).endOf("month")

	const arrayOfDate = []

	// create prefix date
	for (let i = 0; i < firstDateOfMonth.day(); i++) {
		const date = firstDateOfMonth.day(i)

		arrayOfDate.push({
			currentMonth: false,
			date,
			isPast: true,
		})
	}

	// generate current date
	for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
		arrayOfDate.push({
			currentMonth: true,
			date: firstDateOfMonth.date(i),
			today:
				firstDateOfMonth.date(i).toDate().toDateString() ===
				dayjs().toDate().toDateString(),
			isPast: firstDateOfMonth.date(i).isBefore(dayjs(), "day"),
		})
	}

	const remaining = 42 - arrayOfDate.length

	for (
		let i = lastDateOfMonth.date() + 1;
		i <= lastDateOfMonth.date() + remaining;
		i++
	) {
		arrayOfDate.push({
			currentMonth: false,
			date: lastDateOfMonth.date(i),
			isPast: firstDateOfMonth.date(i).isBefore(dayjs(), "day"),
		})
	}
	return arrayOfDate
}

const months = Array.from({ length: 12 }, (_, idx) => idx + 1 + "월")

export default function Calendar() {
	const days = ["일", "월", "화", "수", "목", "금", "토"]
	const currentDate = dayjs()
	const [today, setToday] = useState(currentDate)
	const [selectDate, setSelectDate] = useState(currentDate)

	return (
		<div>
			<div className="h-full w-full">
				<div className="flex w-full items-center justify-between">
					<div className="flex w-full items-center justify-center gap-x-2">
						<button
							onClick={() => {
								setToday(today.month(today.month() - 1))
							}}
						>
							<NTIcon
								icon="expandLeft"
								className="h-5 w-5 cursor-pointer text-Gray40 transition-all hover:scale-105"
							/>
						</button>
						<p className="font-Semibold text-Headline02 text-[18px]">
							{today.year() + "년" + months[today.month()]}
						</p>
						<button
							onClick={() => {
								setToday(today.month(today.month() + 1))
							}}
						>
							<NTIcon
								icon="expandRight"
								className="h-5 w-5 cursor-pointer text-Gray40 transition-all hover:scale-105"
							/>
						</button>
					</div>
				</div>
				<div className="grid grid-cols-7">
					{days.map((day, index) => {
						return (
							<h1
								key={index}
								className="grid h-14 place-content-center text-center text-[14px] font-Regular text-Gray40"
							>
								{day}
							</h1>
						)
					})}
				</div>

				<div className="grid grid-cols-7">
					{generateDate(today.month(), today.year()).map(
						({ date, currentMonth, today, isPast }, index) => {
							return (
								<div
									key={index}
									className="grid h-14 place-content-center border-t p-2 text-center text-sm"
								>
									<p
										className={cn(
											isPast
												? "cursor-default text-Gray40 hover:bg-transparent"
												: "cursor-pointer hover:bg-PY50",
											!currentMonth && !isPast && "cursor-pointer text-Gray60",
											today ? "text-[16px] font-SemiBold text-PB100" : "",
											selectDate.toDate().toDateString() ===
												date.toDate().toDateString()
												? "bg-PY100 text-Button text-[16px] font-SemiBold"
												: "",
											"grid h-10 w-10 place-content-center rounded-[3px] transition-all",
										)}
										onClick={() => {
											if (isPast) return
											setSelectDate(date)
											console.log(dayjs())
										}}
									>
										{date.date()}
									</p>
								</div>
							)
						},
					)}
				</div>
			</div>
		</div>
	)
}
