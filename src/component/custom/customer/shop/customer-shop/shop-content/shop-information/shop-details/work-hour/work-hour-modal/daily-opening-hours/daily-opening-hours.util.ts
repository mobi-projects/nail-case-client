import type { TWorkHour } from "@/util/api/get-shop-by-id"
import {
	getHourFromStamp,
	getMinFromStamp,
	getThisDayOfWeekToNumber,
	padStartToPrinting,
} from "@/util/common"

/** 0~6로 전달된 dayOfWeek를 입력받아 "요일"로 반환 */
export const getDayOfWeek = (dayOfWeek: number) => dayOfWeekArr[dayOfWeek]

export const dayOfWeekArr = ["일", "월", "화", "수", "목", "금", "토"]

/** 영업시간을 입력받아 00:00 ~ 00:00 형식으로 출력 / !isOpen이라면 "휴 무" 출력 */
export const getOpeningHoursString = (dailyWorkHours: TWorkHour) => {
	if (!dailyWorkHours.isOpen) return "휴 무"
	const { padHour: startHour, padMinute: startMin } = separateHourMin(
		dailyWorkHours.openTime,
	)
	const { padHour: endHour, padMinute: endMin } = separateHourMin(
		dailyWorkHours.closeTime,
	)
	return `${startHour} : ${startMin} ~ ${endHour} : ${endMin}`
}

/** timeStamp를 입력받아 "시간" "분" 을 두자로 출력 */
export const separateHourMin = (time: number) => {
	const hour = getHourFromStamp(time)
	const minute = getMinFromStamp(time)
	const padHour = padStartToPrinting("time", hour)
	const padMinute = padStartToPrinting("time", minute)
	return { padHour, padMinute }
}
type getWorkHoursSummaryPT = {
	todayWorkHour?: TWorkHour
	tomorrowWorkHour?: TWorkHour
}
export const getWorkHoursSummary = (
	workHours: Array<TWorkHour>,
): getWorkHoursSummaryPT => {
	const todayIndex = getThisDayOfWeekToNumber()
	const tomorrowIndex = (todayIndex + 1) % 7
	const todayWorkHour = workHours.find((hour) => hour.dayOfWeek === todayIndex)
	const tomorrowWorkHour = workHours.find(
		(hour) => hour.dayOfWeek === tomorrowIndex,
	)

	return { todayWorkHour, tomorrowWorkHour }
}

export const getWorkHourSummaryString = (dailyWorkHours: TWorkHour) => {
	return `${getDayOfWeek(dailyWorkHours.dayOfWeek)} : ${getOpeningHoursString(dailyWorkHours)}`
}
