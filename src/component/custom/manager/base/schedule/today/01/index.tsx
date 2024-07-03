"use client"
import { NTButton } from "@/component/common/atom/nt-button"
import NTNameBox from "@/component/common/nt-name-box"
import NTOption from "@/component/common/nt-option"
import { useListReservationQuery } from "@/hook/use-reservation-controller"
import type { TReservationDetailList } from "@/type"
import {
	getThisDayFirst,
	getThisDate,
	getThisMonth,
	getThisYear,
	getThisDayLast,
} from "@/util/common"
import { tagLists } from "@/util/common/tagList"

export default function DayScheDule() {
	const startTime = getThisDayFirst(
		getThisYear(),
		getThisMonth(),
		getThisDate(),
	)
	const endTime = getThisDayLast(getThisYear(), getThisMonth(), getThisDate())
	const { data: reservationData } = useListReservationQuery(
		1,
		startTime,
		endTime,
	)
	const reservationArr = reservationData?.dataList || []
	const confirmedReservations = reservationArr.reduce<TReservationDetailList[]>(
		(data, reservation) => {
			data.push(
				...reservation.reservationDetailList.filter(
					(detail) => detail.status === "CONFIRMED",
				),
			)
			return data
		},
		[],
	)
	return (
		<div className="flex h-fit w-full flex-col rounded-[26px] shadow-customGray60">
			<div className="flex flex-col">
				{confirmedReservations.map((data, idx) => {
					const reservation = data
					const startTime = new Date(reservation.startTime * 1000)
					const endTime = new Date(reservation.endTime * 1000)
					const tagList = [
						reservation.remove,
						...reservation.conditionList.map((data) => data.option.toString()),
						reservation.treatmentList[0]?.option,
					]
					const extendTag = reservation.extend
					const translateTagList = () => {
						const tagListTranslate = tagList.map((tag) => tagLists[tag])
						const extendTagTranslate = extendTag ? "연장 필요" : "연장 필요없음"
						return [extendTagTranslate, ...tagListTranslate]
					}
					return (
						<DayScheduleTime
							key={idx}
							startTime={startTime}
							endTime={endTime}
							tagList={translateTagList()}
						/>
					)
				})}
			</div>
			<div className="mt-[20px] flex h-[65px] w-full justify-center text-Headline02 text-Gray50">
				근무 종료
			</div>
		</div>
	)
}
type DayScheduleTimePT = {
	startTime: Date
	endTime: Date
	tagList: Array<string>
}
function DayScheduleTime({ startTime, endTime, tagList }: DayScheduleTimePT) {
	return (
		<div
			className={`flex h-fit max-h-[222.5px] min-h-[145.5px] w-full items-center border-b-[2px] border-Gray10`}
		>
			<DayScheduleDash startTime={startTime} endTime={endTime} />
			<DayScheduleTask
				startTime={startTime}
				endTime={endTime}
				tagList={tagList}
			/>
			<DayScheduleButton startTime={startTime} endTime={endTime} />
		</div>
	)
}
type DayScheduleDashPT = {
	startTime: Date
	endTime: Date
}
function DayScheduleDash({ startTime, endTime }: DayScheduleDashPT) {
	const startHour = startTime.getHours()
	const endHour = endTime.getHours()
	const timeRange = []
	for (let hour = startHour; hour <= endHour; hour++) {
		timeRange.push(hour)
	}

	return (
		<div className="flex w-[75px] flex-col items-center justify-center">
			<div className="flex h-full flex-col items-center justify-center">
				<span className="text-Headline02 text-Gray40">{timeRange}</span>
			</div>
		</div>
	)
}

function DayScheduleTask({ startTime, endTime, tagList }: DayScheduleTimePT) {
	const limitedTagList = tagList.slice(0, 4)
	return (
		<div className="flex h-[86px] w-[792px] items-center rounded-[20px] border shadow-customGray60">
			<div className="mr-[15px] h-[57px] border-r-[2px] border-Gray20 pl-[20px] pr-[40px]">
				<div className="text-Headline02 text-Gray90">
					{startTime.getHours()}
				</div>
				<div className="text-Callout text-Gray40">{endTime.getHours()}</div>
			</div>
			<div className="mr-[15px] flex items-center gap-2">
				<NTNameBox bgColor="Gray">미지정</NTNameBox>
				<div className="flex">
					<NTOption size="large" optionArr={limitedTagList} />
				</div>
			</div>
		</div>
	)
}

type DayScheduleButtonPT = {
	startTime: Date
	endTime: Date
}
function DayScheduleButton({ startTime, endTime }: DayScheduleButtonPT) {
	const now = new Date()
	const customDate = new Date(now.getTime() + 30 * 60 * 1000)
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
	} else if (now >= customDate && now < startTime) {
		buttonContent = (
			<NTButton variant="primary" size="medium" flexible="fit">
				채팅하기
			</NTButton>
		)
	} else {
		buttonContent = (
			<>
				<NTButton variant="secondary" size="medium" flexible="fit">
					변경하기
				</NTButton>
				<NTButton variant="primary" size="medium" flexible="fit">
					채팅하기
				</NTButton>
			</>
		)
	}
	return (
		<div className="flex h-full w-[300px] items-center justify-end">
			{buttonContent}
		</div>
	)
}
