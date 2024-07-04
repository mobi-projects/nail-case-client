"use client"

import { useQuery } from "@tanstack/react-query"
import type { Dayjs } from "dayjs"
import dayjs from "dayjs"
import React, { useState } from "react"

import NTEventDetail from "@/component/common/nt-event-deatli"
import NTIcon from "@/component/common/nt-icon"
import { axiosInstance } from "@/config/axios"
import type { TResGetListReservation, TReservationDetailList } from "@/type"
import {
	convertSecondTimestamp,
	getNowStamp,
	getThisWeekFirst,
	getThisWeekLast,
	getHourFromStamp,
} from "@/util/common"
import { tagLists } from "@/util/common/tagList"

const fetchReservations = async ({
	queryKey,
}: {
	queryKey: [string, number, number]
}) => {
	const [, startTime, endTime] = queryKey

	const response = await axiosInstance().get(``, {
		params: {
			startTime: startTime,
			endTime: endTime,
		},
	})
	return response.data
}

export default function ManagerBaseScheduleThisWeekTask() {
	const [startHour, setStartHour] = useState(10)
	const [incremented, setIncremented] = useState(false)

	const incrementHour = () => {
		if (!incremented) {
			setStartHour(13)
			setIncremented(true)
		} else {
			setStartHour(10)
			setIncremented(false)
		}
	}

	const now = getNowStamp()
	const weekFirst = getThisWeekFirst(
		dayjs.unix(now).year(),
		dayjs.unix(now).month() + 1,
		dayjs.unix(now).date(),
	)
	const weekLast = getThisWeekLast(
		dayjs.unix(now).year(),
		dayjs.unix(now).month() + 1,
		dayjs.unix(now).date(),
	)

	const thisWeekTimeRange = {
		startTime: new Date(weekFirst * 1000),
		endTime: new Date(weekLast * 1000),
	}

	const { data } = useQuery({
		queryKey: [
			"reservations",
			convertSecondTimestamp(thisWeekTimeRange.startTime.getTime()),
			convertSecondTimestamp(thisWeekTimeRange.endTime.getTime()),
		],
		queryFn: fetchReservations,
	})

	const reservationData = data?.dataList

	const confirmedReservations = reservationData
		?.flatMap(
			(reservation: TResGetListReservation) =>
				reservation.reservationDetailList,
		)
		.filter((detail: TReservationDetailList) => detail.status === "CONFIRMED")

	return (
		<div className="flex h-fit w-full flex-col py-[10px]">
			<ManagerScheduleTime startHour={startHour} />
			<div className="flex flex-col gap-[15px]">
				{Array.from({ length: 7 }).map((_, idx) => {
					const today = dayjs()
					const weekFirst = today.startOf("week").add(1, "day")
					const week = Array.from({ length: 7 }, (_, i) =>
						weekFirst.add(i, "day"),
					)
					const day = week[idx]
					const dailyReservations = confirmedReservations?.filter(
						(res: TReservationDetailList) => {
							const reservationDate = dayjs.unix(res.startTime).date()
							return day.date() === reservationDate
						},
					)
					return (
						<ManagerScheduleThisWeek
							key={idx}
							idx={idx}
							startHour={startHour}
							incrementHour={incrementHour}
							incremented={incremented}
							confirmedReservations={confirmedReservations}
							dailyReservationsCount={
								dailyReservations ? dailyReservations.length : 0
							}
							day={day}
						/>
					)
				})}
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
	confirmedReservations: TReservationDetailList[]
	dailyReservationsCount: number
	day: Dayjs
}

function ManagerScheduleThisWeek({
	idx,
	startHour,
	incrementHour,
	incremented,
	confirmedReservations,
	dailyReservationsCount,
	day,
}: ManagerScheduleThisWeekPT) {
	const today = dayjs()
	const isToday = day.isSame(today, "day")

	return (
		<div
			className={`flex h-[160px] w-full rounded-[24px] border-[2px] py-[10px] pl-[20px] ${
				isToday ? "border-PB100" : "border-Gray50"
			}`}
		>
			<ManagerScheduleDay
				idx={idx}
				day={day}
				isToday={isToday}
				dailyReservationsCount={dailyReservationsCount}
			/>
			<ManagerScheduleTask
				idx={idx}
				startHour={startHour}
				day={day}
				confirmedReservations={confirmedReservations}
			/>
			<ManagerScheduleMoreTask
				onClick={incrementHour}
				incremented={incremented}
			/>
		</div>
	)
}

type ManagerScheduleDayPT = {
	idx: number
	day: Dayjs
	isToday: boolean
	dailyReservationsCount: number
}

function ManagerScheduleDay({
	day,
	isToday,
	dailyReservationsCount,
}: ManagerScheduleDayPT) {
	const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"]

	return (
		<div className="ml-[10px] flex h-[131.27px] w-[100px] flex-col justify-between border-r-[2px] border-Gray10">
			<div>
				<div
					className={`text-Headline02 ${isToday ? "text-PB100" : "text-Gray100"}`}
				>
					{daysOfWeek[day.day()]}
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
				{dailyReservationsCount}건
			</div>
		</div>
	)
}

type ManagerScheduleTaskPT = {
	idx: number
	startHour: number
	day: Dayjs
	confirmedReservations: TReservationDetailList[]
}

function ManagerScheduleTask({
	startHour,
	day,
	confirmedReservations,
}: ManagerScheduleTaskPT) {
	const dailyReservations = confirmedReservations?.filter((res) => {
		const reservationDate = dayjs.unix(res.startTime).date()
		return day.date() === reservationDate
	})

	const endHour = startHour + 7

	return (
		<div className="grid h-full w-[1000px] grid-cols-8">
			{Array.from({ length: endHour - startHour }).map((_, i) => (
				<div key={i} className="mt-[12px] min-h-[136.8px]">
					{dailyReservations?.map((res, idx) => {
						const startTime = getHourFromStamp(res.startTime)
						const endTime = getHourFromStamp(res.endTime)
						const duration = endTime - startTime
						const widthClass =
							duration === 2
								? "w-[263px]"
								: duration === 3
									? "w-[388px]"
									: "w-[263px]"

						return startTime === startHour + i ? (
							<div
								key={idx}
								className={`rounded-lg grid-column-span-${duration}`}
							>
								<NTEventDetail
									key={idx}
									variant={"Gray"}
									className={`${widthClass} mb-[15px]`}
									name={res.nailArtistId ? `미지정` : `미지정`}
								>
									{tagLists[res.remove]}
								</NTEventDetail>
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
