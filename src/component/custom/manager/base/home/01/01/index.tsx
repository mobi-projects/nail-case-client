"use client"

import React from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import NTContent from "@/component/common/nt-content"
import type { ICON_DATA } from "@/component/common/nt-icon"
import NTIcon from "@/component/common/nt-icon"
import NTOption from "@/component/common/nt-option"
import { useReservationArr } from "@/hook/use-common"
import { useOption } from "@/hook/use-component"
import type { TNTTime } from "@/type"
import { getAllDay } from "@/util/common/time"

type ReservationCardPT = {
	icon?: keyof typeof ICON_DATA
}

const ReservationPendingCard: React.FC<ReservationCardPT> = ({ icon }) => {
	const { onClickOption, checkedOption, optionArr } = useOption([
		"이달의 아트",
		"연장 필요",
		"타샵 제거 있음",
	])

	const { reservationArr } = useReservationArr(getAllDay())

	const filteredData =
		reservationArr?.filter((item) => item.status === "PENDING") || []

	const getFormattedDate = (startTime: TNTTime) => {
		const days = ["일", "월", "화", "수", "목", "금", "토"]
		const date = new Date(
			startTime.year,
			startTime.month - 1,
			startTime.day,
			startTime.hour,
			startTime.minute,
		)
		const dayName = days[date.getDay()]
		const hour = date.getHours()
		const minute = date.getMinutes()
		const period = hour >= 12 ? "오후" : "오전"
		const formattedHour = hour > 12 ? hour - 12 : hour
		const formattedMinute = minute === 0 ? "" : `${minute}분`

		return `${startTime.month}월 ${startTime.day}일 (${dayName}) ${period} ${formattedHour}시 ${formattedMinute}`
	}

	return (
		<div className="relative flex h-[240px] w-[792px] items-center justify-between rounded-[26px] bg-White drop-shadow">
			<div className="flex h-[200px] flex-col justify-between border-r-[2px] border-Gray10 px-[40px]">
				<div className="flex items-center justify-center">
					{icon && (
						<NTIcon
							icon={icon}
							className="mr-[20px] h-[46px] w-[46px] text-PB100"
						/>
					)}
					<div>
						<div className="text-Title02 font-Bold">예약대기</div>
						<div className="text-Body01 text-Gray40">모비네일 한남점</div>
					</div>
				</div>
				<div className="text-LargeTitle font-Bold text-PB100">
					{`${filteredData.length}건`}
				</div>
			</div>
			<div>
				<div className="mr-[20px] w-[503.98px] border-b-[2px] border-Gray10 px-[15px] pb-[10px]">
					<div className="flex justify-between">
						<div className="text-Title03 text-Gray70">
							{filteredData.length > 0 &&
								getFormattedDate(filteredData[0].schedule.startTime)}
						</div>
						<NTContent mode="day">
							{filteredData.length > 0 ? `1/${filteredData.length}` : "0/0"}
						</NTContent>
					</div>
				</div>
				<div className="mr-[20px] h-[152.8px] pt-[30px]">
					<div className="flex w-[503.98px] justify-between pr-[15px]">
						<NTOption
							optionArr={optionArr}
							checkedOption={checkedOption}
							onClickOption={onClickOption}
							size="large"
							itemsPerRow={2}
						/>
						<div className="flex items-end justify-center">
							<NTButton icon="check">예약 확정</NTButton>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ReservationPendingCard
