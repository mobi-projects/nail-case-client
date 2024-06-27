"use client"

import { useCallback, useState } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import NTIcon from "@/component/common/nt-icon"
import NTOption from "@/component/common/nt-option"
import { cn } from "@/config/tailwind"
import { useOption } from "@/hook/use-component"
import {
	getCalendarArr,
	getDateFromStamp,
	getMonthFromStamp,
	getNextMonthFirstDate,
	getNowStamp,
	getPrevMonthLastDate,
	getThisMonth,
	getThisYear,
	getYearFromStamp,
	isAfter,
	isBefore,
	isSame,
	padStartToPrinting,
} from "@/util/common"

export default function ReservationSchedule() {
	return (
		<div className="grid h-fit w-full grid-cols-[690px_485px] justify-between">
			<ReservationCalendar />
			<ReservationCheck />
		</div>
	)
}
function ReservationCalendar() {
	return (
		<div className="grid h-full w-full grid-rows-[326.8px_auto] gap-[21px]">
			<div className="flex h-full w-full items-center justify-center rounded-[26px] shadow-[2.99px_2.99px_14.34px_0px_rgba(224,224,224,0.6)]">
				<Calendar />
			</div>
			<NTButton variant="tertiary" flexible="full" size="small">
				예약하기
			</NTButton>
		</div>
	)
}
function ReservationCheck() {
	return (
		<div className="grid h-full w-full grid-rows-[326.8px_auto] gap-[18px]">
			<ReservationCheckBody />
			<NTButton variant="tertiary" flexible="full" size="small">
				전화하기
			</NTButton>
		</div>
	)
}

function ReservationCheckBody() {
	const { checkedOption, onClickOption, optionArr } = useOption([
		"오전 11시",
		"오후 1시",
		"오후 2시",
		"오후 3시",
		"오전 11시",
		"오후 1시",
		"오후 3시",
	])
	const {
		checkedOption: checkedOption3,
		onClickOption: onClickOption3,
		optionArr: optionArr3,
	} = useOption(["1인", "2인 동반"])

	return (
		<div className="gap-[16px]] flex h-full w-full flex-col justify-around py-[10px]">
			<p className="w-full justify-center text-center text-[1rem] font-SemiBold text-Gray90">
				6월 27일 (목요일)
			</p>
			<hr />
			<NTOption
				{...{ checkedOption, optionArr, onClickOption }}
				itemsPerRow={4}
			/>
			<hr />
			<NTOption
				checkedOption={checkedOption3}
				optionArr={optionArr3}
				onClickOption={onClickOption3}
			/>
			<p className="text-[16px] font-Regular text-Gray50">
				2인 동반 선택시에는 두 타임 예약 부탁드립니다 :)
			</p>
		</div>
	)
}

const reservationDateMockData = [
	getNowStamp() - 48 * 60 * 60 * 1000,
	getNowStamp(),
	getNowStamp() + 48 * 60 * 60 * 1000,
]

function Calendar() {
	const [focusedYear, setFocusedYear] = useState(getThisYear())
	const [focusedMonth, setFocusedMonth] = useState(getThisMonth())

	const CalendarHeader = useCallback(() => {
		const paddedFocusedYear = padStartToPrinting("year", focusedYear)
		const paddedFocusedMonth = padStartToPrinting("month", focusedMonth)
		const onClickPrevButton = () => {
			const prevMonthLastDay = getPrevMonthLastDate(focusedYear, focusedMonth)
			const prevYear = getYearFromStamp(prevMonthLastDay)
			const prevMonth = getMonthFromStamp(prevMonthLastDay)
			setFocusedYear(prevYear)
			setFocusedMonth(prevMonth)
		}
		const onClickNextButton = () => {
			const prevMonthLastDay = getNextMonthFirstDate(focusedYear, focusedMonth)
			const prevYear = getYearFromStamp(prevMonthLastDay)
			const prevMonth = getMonthFromStamp(prevMonthLastDay)
			setFocusedYear(prevYear)
			setFocusedMonth(prevMonth)
		}
		return (
			<div className="flex h-[28px] w-full items-center justify-center gap-x-2">
				<NTIcon
					icon="expandLeft"
					className="h-5 w-5 cursor-pointer text-Gray40 transition-all hover:scale-105"
					onClick={onClickPrevButton}
				/>
				<p className="font-Semibold w-[120px] text-Headline02 text-[18px]">
					{paddedFocusedYear} 년 {paddedFocusedMonth} 월
				</p>
				<NTIcon
					icon="expandRight"
					className="h-5 w-5 cursor-pointer text-Gray40 transition-all hover:scale-105"
					onClick={onClickNextButton}
				/>
			</div>
		)
	}, [focusedYear, focusedMonth])
	const DayOfWeeks = useCallback(() => {
		return (
			<tr className="grid w-full grid-cols-7 text-center text-[14px] font-Regular text-Gray40">
				<th>월</th>
				<th>화</th>
				<th>수</th>
				<th>목</th>
				<th>금</th>
				<th>토</th>
				<th>일</th>
			</tr>
		)
	}, [])

	return (
		<div className="grid h-full w-full grid-rows-[28px_1fr] px-[30px] py-[13px]">
			<CalendarHeader />
			<table className="grid h-full w-full grid-rows-[1fr_6fr] items-center">
				<thead className="flex h-full w-full items-center">
					<DayOfWeeks />
				</thead>
				<tbody className="flex h-full w-full flex-col">
					<CalenderBody
						focusedStampArr={getCalendarArr(focusedYear, focusedMonth)}
						reservationStampArr={reservationDateMockData}
					/>
				</tbody>
			</table>
		</div>
	)
}

function CalenderBody({
	focusedStampArr = [],
	reservationStampArr = [],
}: {
	focusedStampArr: number[]
	reservationStampArr?: number[]
}) {
	return (
		<tr className="grid h-full w-full grid-cols-7">
			{focusedStampArr.map((stamp) => {
				const nowStamp = getNowStamp()
				const isPrevDay = isBefore(stamp, nowStamp)
				const isToday = isSame(stamp, nowStamp)
				const isNextMonth = isAfter(stamp, nowStamp, "month")
				const isReserved = reservationStampArr.some((reservationStamp) =>
					isSame(reservationStamp, stamp),
				)
				return (
					<th
						className="flex h-full w-full items-center justify-center shadow-none drop-shadow-none"
						key={stamp}
					>
						<p
							className={cn(
								"flex h-[30px] w-[34px] cursor-pointer items-center justify-center rounded-[3px] border-transparent text-center text-Gray100 shadow-none drop-shadow-none transition-all hover:scale-150",
								isToday && "text-PB100",
								isNextMonth && "text-Gray60",
								isReserved && "bg-PY100",
								isPrevDay &&
									"cursor-default bg-White text-Gray40 hover:scale-100",
							)}
						>
							{getDateFromStamp(stamp)}
						</p>
					</th>
				)
			})}
		</tr>
	)
}
