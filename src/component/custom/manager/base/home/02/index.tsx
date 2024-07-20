"use client"
import { cva } from "class-variance-authority"
import { useEffect, useRef, useState } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import NTIcon from "@/component/common/nt-icon"
import NTOption from "@/component/common/nt-option"
import { CONDITION_LIST, REMOVE_LIST, TREATMENT_LIST } from "@/constant/tagList"
import { useListReservationQuery } from "@/hook/use-reservation-controller"
import type { TReservationDetailList } from "@/type"
import type { TNailCondition } from "@/type/union-option/nail-condition"
import {
	getDayOfWeekFromStamp,
	getThisDate,
	getThisDayFirst,
	getThisDayLast,
	getThisMonth,
	getThisYear,
} from "@/util/common"
export default function ReservationForm() {
	const [dateInfo, setDateInfo] = useState({
		year: getThisYear(),
		month: getThisMonth(),
		date: getThisDate(),
	})

	const timeRange = {
		startTime: getThisDayFirst(dateInfo.year, dateInfo.month, dateInfo.date),
		lastTime: getThisDayLast(dateInfo.year, dateInfo.month, dateInfo.date),
	}
	return (
		<div className="mb-[9px] h-[646px] rounded-[26px] shadow-customGray60">
			<ReservationFormHeader
				dateInfo={dateInfo}
				setDateInfo={setDateInfo}
				dayOfWeek={getDayOfWeekFromStamp(timeRange.lastTime)}
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
			<div className="w-[120px] text-center text-Headline02 text-Gray50">{`${dateInfo.month}월 ${dateInfo.date}일 (${dayOfWeek})`}</div>
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
		startTime: number
		lastTime: number
	}
}
function ReservationTimeList({ timeRange }: ReservationTimeListPT) {
	const scrollContainerRef = useRef<HTMLDivElement | null>(null)
	const reservationRef = useRef<(HTMLDivElement | null)[]>([])
	const { data: confirmedData } = useListReservationQuery(
		1,
		timeRange.startTime,
		timeRange.lastTime,
		"CONFIRMED",
	)
	const { data: completedData } = useListReservationQuery(
		1,
		timeRange.startTime,
		timeRange.lastTime,
		"COMPLETED",
	)
	const confirmedDataArr = confirmedData?.dataList || []
	const completedDataArr = completedData?.dataList || []
	const reservationDataArr = [...confirmedDataArr, ...completedDataArr]
	const reservationDataList = reservationDataArr.reduce<
		TReservationDetailList[]
	>((data, reservation) => {
		data.push(...reservation.reservationDetailList)
		return data
	}, [])
	console.log(reservationDataList)
	useEffect(() => {
		const reservationFormscroll = () => {
			const now = new Date()
			for (let i = 0; i < reservationDataList.length; i++) {
				const reservation = reservationDataList[i]
				const startTime = new Date(reservation.startTime * 1000)
				const endTime = new Date(reservation.endTime * 1000)
				if (now >= startTime && now <= endTime) {
					const currentElement = reservationRef.current[i]
					const containerElement = scrollContainerRef.current

					if (currentElement && containerElement) {
						const elementTop = currentElement.offsetTop
						const elementHeight = currentElement.clientHeight
						const containerHeight = containerElement.clientHeight

						containerElement.scrollTop =
							elementTop - containerHeight / 2 + elementHeight / 2
					}
					break
				} else if (now < startTime) {
					const currentElement = reservationRef.current[i]
					const containerElement = scrollContainerRef.current

					if (currentElement && containerElement) {
						const elementTop = currentElement.offsetTop
						const elementHeight = currentElement.clientHeight
						const containerHeight = containerElement.clientHeight

						containerElement.scrollTop =
							elementTop - containerHeight / 2 + elementHeight / 2
					}
					break
				}
			}
		}

		reservationFormscroll()
		const intervalId = setInterval(reservationFormscroll, 1800000)

		return () => clearInterval(intervalId)
	}, [reservationDataList])
	return (
		<div
			className="h-full max-h-[508px] scroll-p-3 overflow-y-scroll"
			ref={scrollContainerRef}
		>
			{reservationDataList.map((data, idx) => {
				const reservation = data
				const startTime = new Date(reservation.startTime * 1000)
				const endTime = new Date(reservation.endTime * 1000)
				const removeTag = data.remove
				const conditionTagList = data.conditionList.map(
					(data) => data.option as TNailCondition,
				)
				const treatmentTag = data.treatmentList[0].option
				const extendTag = data.extend

				const translateTagList = () => {
					const extendTagTranslate = extendTag ? "연장 필요" : "연장 필요없음"
					const removeTagTranslate = REMOVE_LIST[removeTag]
					const conditionTagTranslate = conditionTagList.map(
						(tag) => CONDITION_LIST[tag],
					)
					const treatmentTagTranslate = TREATMENT_LIST[treatmentTag]
					return [
						extendTagTranslate,
						removeTagTranslate,
						...conditionTagTranslate,
						treatmentTagTranslate,
					]
				}
				return (
					<div
						key={idx}
						ref={(el) => {
							reservationRef.current[idx] = el
						}}
					>
						<div className="flex h-[127px] w-full items-center justify-between gap-[26.5px] px-[27px]">
							<ReservationTimeGap idx={idx + 1} />
							<ReservationTagList
								startTime={startTime}
								endTime={endTime}
								tagList={translateTagList()}
							/>
							<ReservationButtonList startTime={startTime} endTime={endTime} />
						</div>
						<hr className="border border-Gray10" />
					</div>
				)
			})}
		</div>
	)
}
type ReservationTimeGap = {
	idx: number
}
function ReservationTimeGap({ idx }: ReservationTimeGap) {
	return (
		<div className="w-[20px] whitespace-nowrap text-center text-Headline02 font-Regular text-Gray40">
			{idx}
		</div>
	)
}

const ReservationFormVariants = cva(
	"flex rounded-[20px] w-full max-w-[798.5px] h-[86px] items-center justify-between py-[18px] pl-[18px] pr-[8px]",
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
	endTime: Date
}
function ReservationTagList({
	startTime,
	tagList,
	endTime,
}: ReservationTagListPT) {
	const [currentTagIdx, setCurrentTagIdx] = useState(0)
	const now = new Date()
	const colorEffect = now >= startTime && now <= endTime
	const formatTime = (date: Date) => {
		return date.toLocaleTimeString("ko-KR", {
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		})
	}
	const timeRange = () => {
		const timeRange = endTime.getTime() - startTime.getTime()

		const hours = Math.floor(timeRange / (1000 * 60 * 60))
		const minutes = Math.floor((timeRange % (1000 * 60 * 60)) / (1000 * 60))

		const minutesPart =
			minutes > 0 ? `${String(minutes).padStart(2, "0")}분` : ""

		return `${String(hours)}시간 ${minutesPart}`
	}

	const visibleTags = tagList.slice(currentTagIdx, currentTagIdx + 4)
	const handleIconClick = () => {
		if (currentTagIdx + 4 >= tagList.length) {
			setCurrentTagIdx(0)
		} else {
			setCurrentTagIdx(currentTagIdx + 4)
		}
	}
	return (
		<div
			className={ReservationFormVariants({
				colorEffect,
			})}
		>
			<div className="flex h-[56px] w-[95px] flex-shrink-0 flex-col items-center justify-center gap-[7px]">
				<div className="w-full pr-[8px] text-Headline02 text-Gray90">
					{formatTime(startTime)}
				</div>
				<div className="w-full text-Callout font-SemiBold text-Gray40">
					{timeRange()}
				</div>
			</div>
			<div className="w-full border-l-2 border-Gray10 pl-[14px]">
				<NTOption
					optionArr={visibleTags}
					className="w-full gap-x-[4] py-[10px]"
					size="large"
				/>
			</div>
			<NTIcon
				icon="expandRight"
				className={`h-[20px] w-[20px] text-Gray08 ${tagList.length > 4 ? "cursor-pointer" : ""}`}
				onClick={handleIconClick}
			/>
		</div>
	)
}
type ReservationButtonListPT = {
	startTime: Date
	endTime: Date
}
function ReservationButtonList({
	startTime,
	endTime,
}: ReservationButtonListPT) {
	const now = new Date()
	// const customDate = new Date(now.getTime() + 30 * 60 * 1000)
	let buttonContent
	if (now >= startTime && now <= endTime) {
		buttonContent = (
			<NTButton variant="primary" disabled size="medium" flexible="fit">
				시술중
			</NTButton>
		)
	} else if (now >= endTime) {
		buttonContent = (
			<NTButton variant="primary" disabled size="medium" flexible="fit">
				시술 끝
			</NTButton>
		)
		// } else if (now >= customDate && now < startTime) {
		// 	buttonContent = (
		// 		<NTButton variant="primary" size="medium" flexible="fit">
		// 			채팅하기
		// 		</NTButton>
		// 	)
		// }
	} else {
		buttonContent = (
			<>
				<NTButton variant="secondary" size="medium" flexible="fit">
					예약관리
				</NTButton>
				{/* <NTButton variant="primary" size="medium" flexible="fit">
					채팅하기
				</NTButton> */}
			</>
		)
	}
	return (
		<div className="ml-auto mr-[30px] flex gap-[22px]">{buttonContent}</div>
	)
}

function ReservationFormFooter() {
	return (
		<div className="flex h-[69px] w-full items-center justify-center text-Headline02 text-Gray50">
			근무 종료
		</div>
	)
}
