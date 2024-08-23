import NTContent from "@/component/common/nt-content"
import { RESERVATION_STATUS } from "@/constant/reservation-status"
import { CONDITION_LIST, REMOVE_LIST, TREATMENT_LIST } from "@/constant/tagList"
import type {
	TMainPageDetail,
	TReservationInfo,
} from "@/util/api-v2/get-main-page-data"
import {
	getDateFromStamp,
	getDayDivisionInKor,
	getDayOfWeekFromStamp,
	getHourFromStamp,
	getMinFromStamp,
	getMonthFromStamp,
} from "@/util/common"

type InfoDetailsPT = { recentReservation: TReservationInfo }

export default function InfoDetails({ recentReservation }: InfoDetailsPT) {
	const dataList = recentReservation.details
	const status = getReservationStatus(dataList)
	const reservationTags = createTagList(dataList)

	const timestampFuntion = (timeStamp: number) => {
		const month = getMonthFromStamp(timeStamp)
		const day = getDateFromStamp(timeStamp)
		const dayOfWeek = getDayOfWeekFromStamp(timeStamp)
		const hour = getHourFromStamp(timeStamp)
		const minute = getMinFromStamp(timeStamp)
		const dayDivision = getDayDivisionInKor(timeStamp)
		const minuteForm = minute.toString().padStart(2, "0")

		return `${month}월 ${day}일 (${dayOfWeek}) ${dayDivision} ${hour}:${minuteForm}`
	}

	const endReservation = (timeStamp: number) => {
		const hour = getHourFromStamp(timeStamp)
		const minute = getMinFromStamp(timeStamp)
		const minuteForm = minute.toString().padStart(2, "0")
		return ` ~ ${hour}:${minuteForm}`
	}

	return (
		<div className="flex h-[152px] flex-col gap-[12px] border-b-[1.5px] border-Gray10 pb-[25px]">
			<NTContent mode="day" className="px-[15.5px]">
				{status}
			</NTContent>
			<div className="flex flex-col gap-[6px]">
				<div className="text-Body01 font-SemiBold text-Gray100">
					{recentReservation.shop.name}
				</div>
				<div className="text-Body02 font-SemiBold text-PB100">
					{timestampFuntion(dataList[0].startTime)}
					{dataList[0].endTime ? `${endReservation(dataList[0].endTime)}` : ""}
				</div>
				<div className="line-clamp-1 text-Body02 text-Gray100">
					{reservationTags}
				</div>
			</div>
		</div>
	)
}

export const getReservationStatus = (dataList: Array<TMainPageDetail>) => {
	return RESERVATION_STATUS[dataList[0].status]
}

export const createTagList = (dataList: Array<TMainPageDetail>) => {
	const tags = []
	if (dataList[0]) {
		tags.push("동반 2인")
	}
	if (dataList[0].accompanied) {
		tags.push("연장 필요")
	} else {
		tags.push("연장 필요없음")
	}
	const removeTagTranslate = REMOVE_LIST[dataList[0].removeOption]
	if (removeTagTranslate) {
		tags.push(removeTagTranslate)
	}
	const conditionTagTranslate = dataList[0].conditionOptions
		.map((tag) => CONDITION_LIST[tag])
		.filter((tag) => tag)
	tags.push(...conditionTagTranslate)

	const treatmentTagTranslate = dataList[0].treatmentOptions
		.map((tag) => TREATMENT_LIST[tag])
		.filter((tag) => tag)
	tags.push(...treatmentTagTranslate)

	return tags.slice(0, 5).join(", ")
}
