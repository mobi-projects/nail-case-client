import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

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
	const timeDifferenceArr = reservationTime.from(now).split(" ")
	// 영어 단어를 한국어로 변환하는 함수

	// 변환된 결과 반환
	return changeEngToKor(timeDifferenceArr)
}
