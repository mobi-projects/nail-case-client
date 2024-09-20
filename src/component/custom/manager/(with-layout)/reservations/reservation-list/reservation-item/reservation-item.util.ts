import {
	decomposeStamp,
	get12HourFromStamp,
	getDayDivisionInKor,
	getDayOfWeekFromStamp,
	padStartToPrinting,
} from "@/util/common"

export const getDecomposedDate = (timeStamp: number) => {
	const { date, month } = decomposeStamp(timeStamp)
	const dayOfWeek = getDayOfWeekFromStamp(timeStamp)

	return `${month}월 ${date}일 (${dayOfWeek}) `
}

export const getDecomposedHour = (timeStamp: number) => {
	const { hour, min } = decomposeStamp(timeStamp)
	const division = getDayDivisionInKor(hour)
	const divisionHour = get12HourFromStamp(hour)
	const formattedHour = padStartToPrinting("time", divisionHour)
	const formattedMin = padStartToPrinting("time", min)
	return `${formattedHour}시 ${formattedMin}분 (${division})`
}
