"use client"
import { cva } from "class-variance-authority"
import { useEffect, useState } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import NTIcon from "@/component/common/nt-icon"
import NTOption from "@/component/common/nt-option"
import { useOption } from "@/hook/use-component"
import {
	getDayOfWeekFromStamp,
	getThisDate,
	getThisMonth,
	getThisYear,
} from "@/util/common"

export default function ReservationForm() {
	const [dateInfo, setDateInfo] = useState({
		year: getThisYear(),
		month: getThisMonth() - 1,
		date: getThisDate(),
	})
	const [startTime, setStartTime] = useState(
		new Date(dateInfo.year, dateInfo.month, dateInfo.date, 0, 0, 0),
	)
	const [lastTime, setLastTime] = useState(
		new Date(dateInfo.year, dateInfo.month, dateInfo.date, 23, 59, 59),
	)

	// console.log(startTime.getTime())
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
		setStartTime(updatedStartTime)
		setLastTime(updatedLastTime)
	}, [dateInfo])

	return (
		<div className="mb-[9px] h-[646px] rounded-[26px] shadow-customGray60">
			<ReservationFormHeader
				dateInfo={dateInfo}
				setDateInfo={setDateInfo}
				dayOfWeek={getDayOfWeekFromStamp(lastTime.getTime())}
			/>
			<hr className="border-Gray20" />
			<ReservationTimeList startTime={startTime} lastTime={lastTime} />
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
	startTime: Date
	lastTime: Date
}
function ReservationTimeList({ startTime, lastTime }: ReservationTimeListPT) {
	const time = ["오전11", "오후3", "오후4", "오후5", "오후6"]

	return (
		<div className="h-full max-h-[508px] scroll-p-3 overflow-y-scroll">
			{time.map((time, idx) => {
				return (
					<div key={idx}>
						<div className="flex h-[127px] w-full items-center justify-between gap-[26.5px] px-[27px]">
							<ReservationTimeGap startTime={startTime} endTime={lastTime} />
							<ReservationTagList time={time} idx={idx} />
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
	console.log(startHour)
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
	time?: string
	idx: number
}
function ReservationTagList({ time, idx }: ReservationTagListPT) {
	const tag = ["이달의 아트 ", "동반2인", "타샵 제거 있음", "1인 연장 필요"]
	const { checkedOption, optionArr } = useOption(tag)
	return (
		<div
			className={ReservationFormVariants({
				colorEffect: idx === 0,
			})}
		>
			<div className="flex h-[56px] w-[88px] items-center justify-center border-r-2 border-Gray10">
				<div className="text-Headline02 text-Gray90">{time}</div>
			</div>
			<div className="w-full pl-[34px]">
				<NTOption itemsPerRow={4} {...{ checkedOption, optionArr }} />
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
