import {
	decomposeStamp,
	get12HourFromStamp,
	getDayDivisionInKor,
	getDayOfWeekFromStamp,
} from "@/util/common"

export const formatTreatmentRequestTime = (timeStamp: number) => {
	const { date, min, month, year } = decomposeStamp(timeStamp)

	const dayOfWeek = getDayOfWeekFromStamp(timeStamp)
	const dayDivision = getDayDivisionInKor(timeStamp)
	const formattedHour = get12HourFromStamp(timeStamp)
	const formattedMin = min === 0 ? "" : "30분"
	return `${year}년 ${month}월 ${date}일 (${dayOfWeek}요일) ${dayDivision} ${formattedHour}시 ${formattedMin} `
}
