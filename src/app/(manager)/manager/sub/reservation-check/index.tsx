"use client"

import { NTButton } from "@/component/common/atom/nt-button"
import NTOption from "@/component/common/nt-option"
import { CONDITION_LIST, REMOVE_LIST, TREATMENT_LIST } from "@/constant/tagList"
import { useViewReservationQuery } from "@/hook/use-reservation-controller"
import {
	getDateFromStamp,
	getDayOfWeekFromStamp,
	getHourFromStamp,
	getMinFromStamp,
	getMonthFromStamp,
} from "@/util/common"
import { isUndefined } from "@/util/common/type-guard"

export default function ReservationCheck() {
	const { data: oneReservationInfo, isPending: isPendingViewReservation } =
		useViewReservationQuery(1, 23)

	if (isPendingViewReservation)
		return (
			<div className="flex h-screen items-center justify-center">
				<div className="flex items-center space-x-2">
					<div className="h-6 w-6 animate-spin rounded-full border-4 border-solid border-PB100 border-t-transparent"></div>
					<p className="font-medium text-lg">예약 정보를 불러오고 있습니다.</p>
				</div>
			</div>
		)
	if (isUndefined(oneReservationInfo)) return <div>데이터 없음</div>

	const oneReservationData = oneReservationInfo.data

	console.log(oneReservationData)

	const conditionOptions =
		oneReservationData.reservationDetailList[0].conditionList
			.map((condition) => CONDITION_LIST[condition.option])
			.filter((option) => option !== undefined) || []
	const treatmentOptions =
		oneReservationData.reservationDetailList[0].treatmentList
			.map((treatment) => TREATMENT_LIST[treatment.option])
			.filter((option) => option !== undefined) || []
	const surgeryOption = [...conditionOptions, ...treatmentOptions]

	const formatTimeStamp = () => {
		const surgeryMonth = getMonthFromStamp(
			oneReservationData.reservationDetailList[0].startTime,
		)
		const surgeryDay = getDateFromStamp(
			oneReservationData.reservationDetailList[0].startTime,
		)
		const surgeryDate = getDayOfWeekFromStamp(
			oneReservationData.reservationDetailList[0].startTime,
		)
		const surgeryDivision = `${getHourFromStamp(oneReservationData.reservationDetailList[0].startTime) > 12 ? "오후" : "오전"}`
		const surgeryStartTime = `${getHourFromStamp(oneReservationData.reservationDetailList[0].startTime)}:${getMinFromStamp(oneReservationData.reservationDetailList[0].startTime)}`
		const surgeryEndTime = `${getHourFromStamp(oneReservationData.reservationDetailList[0].endTime)}:${getMinFromStamp(oneReservationData.reservationDetailList[0].endTime)}`

		return `${surgeryMonth}월 ${surgeryDay}일 (${surgeryDate}요일) ${surgeryDivision} ${surgeryStartTime} - ${surgeryEndTime}`
	}

	return (
		<div className="flex h-fit w-full flex-col p-[10px]">
			<div className="absolute left-0 top-[10px] flex h-[85.09px] w-full items-center justify-center bg-Gray10">
				<div className="w-[1200px] px-[10px] text-Title03 font-SemiBold text-black">
					예약 내용 확인
				</div>
			</div>
			<div className="mt-[85px] flex items-center border-b border-Gray20 py-[30px]">
				<div className="mr-[20px] text-Body02 font-SemiBold text-Gray80">
					시술 시간
				</div>
				<div className="text-Body01 font-SemiBold text-PB100">
					{formatTimeStamp()}
				</div>
			</div>
			<div className="flex items-center border-b border-Gray20 py-[20px]">
				<div className="mr-[20px] text-Body02 font-SemiBold text-Gray80">
					시술 내용
				</div>
				<NTOption optionArr={surgeryOption} />
			</div>
			<div className="flex items-center border-b border-Gray20 py-[20px]">
				<div className="mr-[20px] text-Body02 font-SemiBold text-Gray80">
					네일 제거 유무
				</div>
				<NTOption
					optionArr={[
						REMOVE_LIST[oneReservationData?.reservationDetailList[0]?.remove],
					].filter((option) => option !== undefined)}
				/>
			</div>
			<div className="flex items-center border-b border-Gray20 py-[20px]">
				<div className="mr-[20px] text-Body02 font-SemiBold text-Gray80">
					연장 유무
				</div>
				<NTOption
					optionArr={[
						oneReservationData.reservationDetailList[0].extend
							? "연장 필요"
							: "연장 필요 없음",
					]}
				/>
			</div>
			<div className="mt-[40px] flex justify-center gap-[22px]">
				<NTButton variant="secondary">예약취소</NTButton>
				<NTButton>채팅하기</NTButton>
			</div>
		</div>
	)
}
