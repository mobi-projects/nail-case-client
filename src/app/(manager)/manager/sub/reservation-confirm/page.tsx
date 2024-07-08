"use client"

import { useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"
import "dayjs/locale/ko"

import { NTButton } from "@/component/common/atom/nt-button"
import NTOption from "@/component/common/nt-option"
import { axiosInstance } from "@/config/axios"
import { REMOVE_LIST, TREATMENT_LIST } from "@/constant/tagList"
import type { TResGetListReservation, TReservationDetailList } from "@/type"
import {
	getThisDate,
	getThisDayFirst,
	getThisDayLast,
	getThisMonth,
	getThisYear,
	convertSecondTimestamp,
	getKSTStampByStamp,
} from "@/util/common"

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

const convertTimestampToFormattedString = (
	startTime: number,
	endTime: number,
) => {
	startTime = convertSecondTimestamp(startTime)
	endTime = convertSecondTimestamp(endTime)

	const kstStartTime = getKSTStampByStamp(startTime)
	const kstEndTime = getKSTStampByStamp(endTime)

	const startDate = dayjs.unix(kstStartTime).locale("ko")
	const endDate = dayjs.unix(kstEndTime).locale("ko")

	const formattedStartTime = startDate.format("MMMM D일 (dddd) A h:mm")
	const formattedEndTime = endDate.format("h:mm")

	return `${formattedStartTime} - ${formattedEndTime}`
}

export default function DaySchedule() {
	const startTime = getThisDayFirst(
		getThisYear(),
		getThisMonth(),
		getThisDate(),
	)
	const endTime = getThisDayLast(getThisYear(), getThisMonth(), getThisDate())

	const { data } = useQuery({
		queryKey: ["reservations", startTime, endTime],
		queryFn: fetchReservations,
	})

	const reservationData = data?.dataList

	const confirmedReservations = reservationData
		?.flatMap(
			(reservation: TResGetListReservation) =>
				reservation.reservationDetailList,
		)
		.filter((detail: TReservationDetailList) => detail.status === "CONFIRMED")

	const firstData = confirmedReservations && confirmedReservations[0]

	const formattedTime = firstData
		? convertTimestampToFormattedString(firstData.startTime, firstData.endTime)
		: ""

	type treatmentType = {
		createdAt: number
		createdBy: null
		imageId: number
		imageUrl: string
		modifiedAt: number
		modifiedBy: null
		option: keyof typeof TREATMENT_LIST
	}

	const treatmentOptions =
		firstData?.treatmentList.map(
			(treatment: treatmentType) => TREATMENT_LIST[treatment.option],
		) || []

	return (
		<div className="flex h-fit w-full flex-col p-[10px]">
			<div className="absolute left-0 top-[131px] flex h-[85.09px] w-full items-center justify-center bg-Gray10">
				<div className="w-[1200px] px-[10px] text-Title03 font-SemiBold text-black">
					예약 내용 확인
				</div>
			</div>
			<div className="mt-[80px] flex border-b border-Gray20 py-[20px]">
				<div className="mr-[20px] text-Body02 font-SemiBold text-Gray80">
					시술 시간
				</div>
				<div className="text-Body01 font-SemiBold text-PB100">
					{formattedTime}
				</div>
			</div>
			<div className="border-b border-Gray20 py-[20px]">
				<div className="flex items-center">
					<div className="mr-[20px] text-Body02 font-SemiBold text-Gray80">
						시술 내용
					</div>
					<NTOption optionArr={treatmentOptions} />
				</div>
			</div>
			<div className="flex items-center border-b border-Gray20 py-[20px]">
				<div className="mr-[20px] text-Body02 font-SemiBold text-Gray80">
					네일 제거 유무
				</div>
				<NTOption
					optionArr={[
						REMOVE_LIST[firstData?.remove as keyof typeof REMOVE_LIST],
					]}
				/>
			</div>
			<div className="flex items-center border-b border-Gray20 py-[20px]">
				<div className="mr-[20px] text-Body02 font-SemiBold text-Gray80">
					연장 유무
				</div>
				<NTOption
					optionArr={[firstData?.extend ? "연장 필요" : "연장 필요 없음"]}
				/>
			</div>
			<div className="mt-[40px] flex justify-center gap-[22px]">
				<NTButton variant="secondary">예약취소</NTButton>
				<NTButton>채팅하기</NTButton>
			</div>
		</div>
	)
}
