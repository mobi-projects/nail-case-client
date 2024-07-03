"use client"

import type { Dispatch, SetStateAction } from "react"
import { useCallback, useState } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import NTIcon from "@/component/common/nt-icon"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"
import NTOption from "@/component/common/nt-option"
import { cn } from "@/config/tailwind"
import {
	getCalendarArr,
	getDateFromStamp,
	getDayOfWeekFromStamp,
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

import CreationReservationModal from "../modal/01"

export default function ReservationSchedule({ shopId }: { shopId: number }) {
	const [clickedStamp, setClickedStamp] = useState(getNowStamp())

	return (
		<div className="grid h-fit w-full grid-cols-[690px_485px] justify-between">
			<ReservationCalendar {...{ clickedStamp, setClickedStamp, shopId }} />
			<ReservationCheck {...{ clickedStamp }} />
		</div>
	)
}
type ReservationScheduleSubComponentPT = {
	clickedStamp: number
	setClickedStamp: Dispatch<SetStateAction<number>>
	shopId: number
}

function ReservationCalendar({
	clickedStamp,
	setClickedStamp,
	shopId,
}: ReservationScheduleSubComponentPT) {
	const { onOpenModal } = useModal()
	const onOpenCreatingReservationModal = () => {
		onOpenModal({
			size: "large",
			isX: true,
			children: (
				<CreationReservationModal
					startTime={clickedStamp}
					endTime={clickedStamp + 1 * 60 * 60} // [Todo] 추후 수정: 일단 시술 시간을 1시간으로 설정
					shopId={shopId}
				/>
			),
		})
	}
	return (
		<div className="grid h-full w-full grid-rows-[326.8px_auto] gap-[21px]">
			<div className="flex h-full w-full items-center justify-center rounded-[26px] shadow-customGray60">
				<Calendar {...{ setClickedStamp }} />
			</div>
			<NTButton
				variant="tertiary"
				flexible="full"
				size="small"
				onClick={onOpenCreatingReservationModal}
			>
				예약하기
			</NTButton>
		</div>
	)
}
function ReservationCheck({
	clickedStamp,
}: Pick<ReservationScheduleSubComponentPT, "clickedStamp">) {
	return (
		<div className="grid h-full w-full grid-rows-[326.8px_auto] gap-[22px]">
			<ReservationCheckBody {...{ clickedStamp }} />
			<NTButton variant="tertiary" flexible="full" size="small">
				전화하기
			</NTButton>
		</div>
	)
}
function ReservationCheckBody({
	clickedStamp,
}: Pick<ReservationScheduleSubComponentPT, "clickedStamp">) {
	return (
		<div className="flex h-full w-full flex-col justify-around gap-[16px] py-[10px]">
			<p className="w-full justify-center pt-2 text-center text-[18px] font-SemiBold text-Gray90">
				{getMonthFromStamp(clickedStamp)}월 {getDateFromStamp(clickedStamp)}일 (
				{getDayOfWeekFromStamp(clickedStamp)}요일)
			</p>
			<hr className="border-BGblue02" />
			<NTOption
				optionArr={[
					"오전 11시",
					"오후 1시",
					"오후 2시",
					"오후 3시",
					"오후 4시",
					"오후 5시",
					"오후 7시",
				]}
				className="flex h-[118px] w-full items-center gap-x-[11px]"
				size="large"
			/>
			<hr className="border-BGblue02" />
			<NTOption
				optionArr={["1인", "2인 동반"]}
				size="large"
				selectedIdxArr={[0]}
				disabledIdxArr={[1]}
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

function Calendar({
	setClickedStamp,
}: Pick<ReservationScheduleSubComponentPT, "setClickedStamp">) {
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
			<div className="flex h-[28px] w-full items-center justify-center gap-x-3">
				<NTIcon
					icon="expandLeft"
					className="h-6 w-6 cursor-pointer text-Gray30 transition-all hover:scale-105"
					onClick={onClickPrevButton}
				/>
				<p className="font-Semibold w-[120px] text-center text-Headline02 text-[18px]">
					{paddedFocusedYear} 년 {paddedFocusedMonth} 월
				</p>
				<NTIcon
					icon="expandRight"
					className="h-6 w-6 cursor-pointer text-Gray30 transition-all hover:scale-105"
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
						{...{ setClickedStamp }}
					/>
				</tbody>
			</table>
		</div>
	)
}

function CalenderBody({
	focusedStampArr = [],
	reservationStampArr = [],
	setClickedStamp,
}: {
	focusedStampArr: number[]
	reservationStampArr?: number[]
} & Pick<ReservationScheduleSubComponentPT, "setClickedStamp">) {
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
						className="flex h-full w-full items-center justify-center"
						key={stamp}
					>
						<p
							className={cn(
								"flex h-[30px] w-[34px] cursor-pointer items-center justify-center rounded-[3px] border-transparent text-center text-[14px] font-Regular text-Gray100 transition-all hover:scale-150",
								isToday && "text-[16px] text-PB100",
								isNextMonth && "text-Gray60",
								isReserved && "bg-PY100",
								isPrevDay &&
									"cursor-default bg-White text-Gray40 hover:scale-100",
							)}
							onClick={() => {
								if (isPrevDay) return
								setClickedStamp(stamp)
							}}
						>
							{getDateFromStamp(stamp)}
						</p>
					</th>
				)
			})}
		</tr>
	)
}
