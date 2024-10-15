import { RESERVATION_STATUS } from "@/constant/reservation-status"
import { CONDITION_LIST, REMOVE_LIST, TREATMENT_LIST } from "@/constant/tagList"
import type { TMainPageDetail } from "@/util/api-v2/get-main-page-data"
import {
	getDateFromStamp,
	getDayDivisionInKor,
	getDayOfWeekFromStamp,
	getHourFromStamp,
	getMinFromStamp,
	getMonthFromStamp,
} from "@/util/common"

export const getReservationStatus = (dataList: Array<TMainPageDetail>) => {
	return RESERVATION_STATUS[dataList[0].status]
}

export const createReservationOptionArr = (
	dataList: Array<TMainPageDetail>,
) => {
	const tags = []

	const removeTagTranslate = REMOVE_LIST[dataList[0].removeOption]
	if (removeTagTranslate) {
		tags.push(removeTagTranslate)
	}
	const conditionTagTranslate = CONDITION_LIST[dataList[0].conditionOptions[0]]

	tags.push(conditionTagTranslate)

	const treatmentTagTranslate = TREATMENT_LIST[dataList[0].treatmentOptions[0]]
	tags.push(treatmentTagTranslate)
	return tags
}
export const transfromStartTimeToString = (startTime: number) => {
	const month = getMonthFromStamp(startTime)
	const day = getDateFromStamp(startTime)
	const dayOfWeek = getDayOfWeekFromStamp(startTime)
	const hour = getHourFromStamp(startTime)
	const minute = getMinFromStamp(startTime)
	const dayDivision = getDayDivisionInKor(startTime)
	const minuteForm = minute.toString().padStart(2, "0")

	return `${month}월 ${day}일 (${dayOfWeek}) ${dayDivision} ${hour}:${minuteForm}`
}

export const transformEndTimeToString = (endTime: number | null) => {
	if (!endTime) return null
	const hour = getHourFromStamp(endTime)
	const minute = getMinFromStamp(endTime)
	const minuteForm = minute.toString().padStart(2, "0")
	return ` ${hour}:${minuteForm}`
}
