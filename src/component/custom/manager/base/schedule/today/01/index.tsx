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

export default function ScheduleDate() {
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
		<div className="flex h-full w-full flex-col rounded-[26px] shadow-customGray60">
			<div className="h-full max-h-[962px] min-h-[582px] overflow-y-scroll">
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
						<ReservationForm
							key={idx}
							startTime={startTime}
							endTime={endTime}
							tagList={translateTagList()}
						/>
					)
				})}
			</div>
			<ScheduleDateFooter />
		</div>
	)
}
type ReservationFormPT = {
	startTime: Date
	endTime: Date
	tagList: Array<string>
}
function ReservationForm({ startTime, endTime, tagList }: ReservationFormPT) {
	return (
		<div className="flex h-[145.5px] w-full items-center gap-[23px] border-b-[2px] border-Gray10 px-[24px]">
			<FormTimeRange startTime={startTime} endTime={endTime} />
			<ReservationDetailForm
				startTime={startTime}
				endTime={endTime}
				tagList={tagList}
			/>
			<FormButtonList startTime={startTime} endTime={endTime} />
		</div>
	)
}
//btnform : 284px
// gap -[7px]
type FormTimeRangePT = {
	startTime: Date
	endTime: Date
}
function FormTimeRange({ startTime, endTime }: FormTimeRangePT) {
	const startHour = startTime.getHours()
	const endHour = endTime.getHours()
	const timeRange = []
	for (let hour = startHour; hour <= endHour; hour++) {
		timeRange.push(hour)
	}

	return (
		<div className="flex w-[22px] flex-col items-center justify-center">
			{timeRange.map((time, idx) => (
				<div
					key={idx}
					className="flex h-full flex-col items-center justify-center gap-[6px] text-Headline02 text-Gray40"
				>
					<span className="">{time}</span>
					{idx < timeRange.length - 1 && (
						<div className="mb-[6px] h-[30px] border-l border-dashed border-Gray30"></div>
					)}
				</div>
			))}
		</div>
	)
}

function ReservationDetailForm({
	startTime,
	endTime,
	tagList,
}: ReservationFormPT) {
	return (
		<div className="flex h-[86px] min-w-[792px] items-center gap-[25.5px] rounded-[20px] px-[11px] shadow-customGray60">
			<FormTime startTime={startTime} endTime={endTime}></FormTime>
			<FormTagList tagList={tagList}></FormTagList>
		</div>
	)
}

type FormTimePT = { startTime: Date; endTime: Date }
function FormTime({ startTime, endTime }: FormTimePT) {
	const formatTime = (hour: number): string => {
		if (hour === 12) {
			return "정오"
		} else if (hour > 12) {
			return `오후 ${hour - 12}`
		} else {
			return `오전 ${hour}`
		}
	}
	return (
		<div className="flex flex-col gap-[7px] pl-[7px]">
			<div className="text-Headline02 text-Gray90">
				{formatTime(startTime.getHours())}
			</div>
			<div className="text-Callout font-SemiBold text-Gray40">
				{endTime.getHours() - startTime.getHours()}시간
			</div>
		</div>
	)
}
type FormTagListPT = { tagList: Array<string> }
function FormTagList({ tagList }: FormTagListPT) {
	const limitedTagList = tagList.slice(0, 4)
	return (
		<div className="flex h-[56.5px] items-center gap-[16px] border-l-2 border-Gray20 px-[17px]">
			<NTNameBox bgColor="Gray">미지정</NTNameBox>
			<div className="flex gap-[14px]">
				<NTOption
					size="large"
					optionArr={limitedTagList}
					className="font-Regular"
				/>
			</div>
		</div>
	)
}

function FormButtonList({ startTime, endTime }: FormTimePT) {
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
			<div className="flex gap-[21.5px]">
				<NTButton variant="secondary" size="medium" flexible="fit">
					예약관리
				</NTButton>
				<NTButton variant="primary" size="medium" flexible="fit">
					채팅하기
				</NTButton>
			</div>
		)
	} else if (now >= customDate && now < startTime) {
		buttonContent = (
			<NTButton variant="primary" size="medium" flexible="fit">
				채팅하기
			</NTButton>
		)
	} else {
		buttonContent = (
			<div className="flex gap-[21.5px]">
				<NTButton variant="secondary" size="medium" flexible="fit">
					예약관리
				</NTButton>
				<NTButton variant="primary" size="medium" flexible="fit">
					채팅하기
				</NTButton>
			</div>
		)
	}
	return (
		<div className="flex h-full w-[338px] items-center justify-end pr-[25px]">
			{buttonContent}
		</div>
	)
}
function ScheduleDateFooter() {
	return (
		<div className="flex h-[96px] w-full justify-center pt-[17.5px] text-Headline02 text-Gray50">
			근무 종료
		</div>
	)
}
