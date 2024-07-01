"use client"
import { cva } from "class-variance-authority"
import { useEffect, useState } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import NTIcon from "@/component/common/nt-icon"
import NTOption from "@/component/common/nt-option"
import { useListReservationQuery } from "@/hook/use-reservation-controller"
import {
	getDayOfWeekFromStamp,
	getThisDate,
	getThisMonth,
	getThisYear,
} from "@/util/common"
import { tagLists } from "@/util/common/tagList"

export default function ReservationForm() {
	const [dateInfo, setDateInfo] = useState({
		year: getThisYear(),
		month: getThisMonth() - 1,
		date: getThisDate(),
	})
	const [timeRange, setTimeRange] = useState({
		startTime: new Date(dateInfo.year, dateInfo.month, dateInfo.date, 0, 0, 0),
		lastTime: new Date(
			dateInfo.year,
			dateInfo.month,
			dateInfo.date,
			23,
			59,
			59,
		),
	})

	useEffect(() => {
		const updatedStartTime = new Date(
			dateInfo.year,
			dateInfo.month,
			dateInfo.date,
			0,
			0,
			0,
		)
		const updatedLastTime = new Date(
			dateInfo.year,
			dateInfo.month,
			dateInfo.date,
			23,
			59,
			59,
		)
		setTimeRange({ startTime: updatedStartTime, lastTime: updatedLastTime })
	}, [dateInfo])

	return (
		<div className="mb-[9px] h-[646px] rounded-[26px] shadow-customGray60">
			<ReservationFormHeader
				dateInfo={dateInfo}
				setDateInfo={setDateInfo}
				dayOfWeek={getDayOfWeekFromStamp(timeRange.lastTime.getTime())}
			/>
			<hr className="border-Gray20" />
			<ReservationTimeList timeRange={timeRange} />
			<ReservationFormFooter />
		</div>
	)
}

type ReservationFormHeaderPT = {
	dateInfo: {
		year: number
		month: number
		date: number
	}
	setDateInfo: React.Dispatch<
		React.SetStateAction<{
			year: number
			month: number
			date: number
		}>
	>
	dayOfWeek: string
}

function ReservationFormHeader({
	dateInfo,
	setDateInfo,
	dayOfWeek,
}: ReservationFormHeaderPT) {
	const handlePrevDay = () => {
		const newDate = new Date(dateInfo.year, dateInfo.month, dateInfo.date - 1)
		setDateInfo({
			year: newDate.getFullYear(),
			month: newDate.getMonth(),
			date: newDate.getDate(),
		})
	}
	const handleNextDay = () => {
		const newDate = new Date(dateInfo.year, dateInfo.month, dateInfo.date + 1)
		setDateInfo({
			year: newDate.getFullYear(),
			month: newDate.getMonth(),
			date: newDate.getDate(),
		})
	}
	return (
		<div className="flex h-[69px] items-center justify-center pb-[3px]">
			<NTIcon
				icon="expandLeftLight"
				className="cursor-pointer text-Gray08"
				onClick={handlePrevDay}
			/>
			<div className="text-Headline02 text-Gray50">{`${dateInfo.month + 1}월 ${dateInfo.date}일 (${dayOfWeek})`}</div>
			<NTIcon
				icon="expandRightLight"
				className="cursor-pointer text-Gray08"
				onClick={handleNextDay}
			/>
		</div>
	)
}
type ReservationTimeListPT = {
	timeRange: {
		startTime: Date
		lastTime: Date
	}
}
function ReservationTimeList({ timeRange }: ReservationTimeListPT) {
	const customTimeRage = (date: Date) => {
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, "0")
		const day = String(date.getDate()).padStart(2, "0")
		const hours = String(date.getHours()).padStart(2, "0")
		const minutes = String(date.getMinutes()).padStart(2, "0")
		return Number(`${year}${month}${day}${hours}${minutes}`)
	}
	const {
		data: reservationData,
		isError,
		error,
	} = useListReservationQuery(
		1,
		customTimeRage(timeRange.startTime),
		customTimeRage(timeRange.lastTime),
	)
	const reservationArr = reservationData?.dataList || []

	if (isError) {
		return <div>Error: {error.message}</div>
	}
	const confirmedReservations = reservationArr
		.map((reservation) =>
			reservation.reservationDetailList.filter(
				(detail) => detail.status === "CONFIRMED",
			),
		)
		.flat()

	return (
		<div className="h-full max-h-[508px] scroll-p-3 overflow-y-scroll">
			{confirmedReservations.map((data, idx) => {
				const reservation = data
				const startTime = new Date(reservation.startTime * 1000)
				const endTime = new Date(reservation.endTime * 1000)
				const tagList = [
					reservation.remove,
					reservation.conditionList[0]?.option,
					reservation.treatmentList[0]?.option,
				]
				const extendTag = reservation.extend

				const translateTagList = () => {
					const tagListTranslate = tagList.map((tag) => tagLists[tag])
					const extendTagTranslate = extendTag ? "연장 필요" : "연장 필요없음"
					return [...tagListTranslate, extendTagTranslate]
				}

				return (
					<div key={idx}>
						<div className="flex h-[127px] w-full items-center justify-between gap-[26.5px] px-[27px]">
							<ReservationTimeGap startTime={startTime} endTime={endTime} />
							<ReservationTagList
								idx={idx}
								startTime={startTime}
								tagList={translateTagList()}
							/>
							<ReservationButtonList idx={idx} />
						</div>
						<hr className="border border-Gray10" />
					</div>
				)
			})}
		</div>
	)
}
type ReservationTimeGapPT = {
	startTime: Date
	endTime: Date
}
function ReservationTimeGap({ startTime, endTime }: ReservationTimeGapPT) {
	const startHour = startTime.getHours()
	const endHour = endTime.getHours()
	const timeRange = []
	for (let hour = startHour; hour <= endHour; hour++) {
		timeRange.push(hour)
	}

	return (
		<ul className="flex w-[20px] flex-col gap-[2px]">
			{timeRange.map((data, idx) => (
				<li
					className="w-full whitespace-nowrap text-center text-Headline02 font-Regular text-Gray40"
					key={idx}
				>
					{data}
				</li>
			))}
		</ul>
	)
}

const ReservationFormVariants = cva(
	"flex rounded-[20px] w-full max-w-[798.5px] h-[86px] items-center justify-between p-[18px] ",
	{
		variants: {
			colorEffect: {
				true: "shadow-customCardPB border-PB100 border-[0.5px]",
				false: "shadow-customGray",
			},
		},
	},
)
type ReservationTagListPT = {
	startTime: Date
	tagList: Array<string>
	idx: number
}
function ReservationTagList({ startTime, tagList, idx }: ReservationTagListPT) {
	const formatTime = (date: Date) => {
		return date
			.toLocaleTimeString("ko-KR", {
				hour: "numeric",
				hour12: true,
			})
			.replace(":00", "")
			.replace("시", "")
	}

	return (
		<div
			className={ReservationFormVariants({
				colorEffect: idx === 0,
			})}
		>
			<div className="flex h-[56px] w-[72px] flex-shrink-0 items-center justify-start pl-[5px]">
				<div className="w-full text-Headline02 text-Gray90">
					{formatTime(startTime)}
				</div>
			</div>
			<div className="w-full border-l-2 border-Gray10 pl-[34px]">
				<NTOption optionArr={tagList} gap={4} />
			</div>
			<NTIcon icon="expandRight" className="h-[20px] w-[20px] text-Gray08" />
		</div>
	)
}
type ReservationButtonListPT = {
	idx: number
}
function ReservationButtonList({ idx }: ReservationButtonListPT) {
	return (
		<div className="ml-auto flex gap-[22px]">
			{idx === 0 && (
				<NTButton variant="primary" disabled size="medium" flexible="fit">
					시술중
				</NTButton>
			)}
			{idx === 1 && (
				<NTButton variant="primary" size="medium" flexible="fit">
					채팅하기
				</NTButton>
			)}
			{idx > 1 && (
				<>
					<NTButton variant="secondary" size="medium" flexible="fit">
						변경하기
					</NTButton>
					<NTButton variant="primary" size="medium" flexible="fit">
						채팅하기
					</NTButton>
				</>
			)}
		</div>
	)
}

function ReservationFormFooter() {
	return (
		<div className="flex h-[69px] w-full items-center justify-center text-Headline02 text-Gray50">
			근무 종료
		</div>
	)
}
