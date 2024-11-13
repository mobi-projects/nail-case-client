import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

import {
	decomposeStamp,
	get12HourFromStamp,
	getDayDivisionInKor,
	getNowStamp,
	padStartToPrinting,
} from "@/util/common"

dayjs.extend(relativeTime)

export const changeEngToKor = (arr: Array<string>) => {
	if (
		(arr.includes("few") && arr.includes("seconds")) ||
		(arr.includes("a") && arr.includes("minute"))
	) {
		return "방금 전"
	}
	if (arr.includes("day") && arr.includes("a")) {
		return "하루 전"
	}
	return arr
		.map((word) => {
			if (word === "an") return "한"
			if (word === "days") return "일"
			if (word === "hour") return "시간"
			if (word === "hours") return "시간"
			if (word === "minutes") return "분"
			if (word === "ago") return "전"
			if (word === "in") return "" // "in"은 미래 시간을 나타내므로 제거
			return word // 숫자는 그대로 반환
		})
		.filter(Boolean) // 빈 문자열 제거
		.join(" ") // 다시 문자열로 합치기
}

export const getTimeDifference = (timestamp: number) => {
	// 현재 시간과 예약 시간의 차이를 상대적으로 표시 (몇 분 전, 몇 시간 전)
	const now = dayjs()
	const reservationTime = dayjs.unix(timestamp)
	console.log(reservationTime.from(now))
	const timeDifferenceArr = reservationTime.from(now).split(" ")
	// 영어 단어를 한국어로 변환하는 함수

	// 변환된 결과 반환
	return changeEngToKor(timeDifferenceArr)
}

const isToday = (timeStamp: number) => {
	const { date: stampDate } = decomposeStamp(timeStamp)
	const { date: todayDate } = decomposeStamp(getNowStamp())
	return stampDate === todayDate
}

export const showTime = (timeStamp: number) => {
	let timeString = ""
	const { date, hour, min, month } = decomposeStamp(timeStamp)
	const dayDivision = getDayDivisionInKor(timeStamp)
	const divisionHour = get12HourFromStamp(timeStamp)
	const formattedMin = padStartToPrinting("time", min)
	if (isToday(timeStamp)) {
		timeString = `${dayDivision} ${divisionHour}:${formattedMin}`
	} else {
		timeString = `${month}/${date}  ${hour}:${formattedMin}`
	}

	return timeString
}
