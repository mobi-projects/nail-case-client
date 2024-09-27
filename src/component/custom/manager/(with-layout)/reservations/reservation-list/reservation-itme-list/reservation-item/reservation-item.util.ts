import {
	decomposeStamp,
	get12HourFromStamp,
	getDayDivisionInKor,
	getDayOfWeekFromStamp,
	getMinFromStamp,
	padStartToPrinting,
} from "@/util/common"

export const getDecomposedDate = (timeStamp: number) => {
	const { date, month } = decomposeStamp(timeStamp)
	const dayOfWeek = getDayOfWeekFromStamp(timeStamp)

	return `${month}월 ${date}일 (${dayOfWeek}) `
}

export const getDecomposedTIme = (timeStamp: number) => {
	const min = getMinFromStamp(timeStamp) === 0 ? "00" : "30"
	const division = getDayDivisionInKor(timeStamp) === "오전" ? "AM" : "PM"
	const hour = padStartToPrinting("time", get12HourFromStamp(timeStamp))
	return { min, division, hour }
}
