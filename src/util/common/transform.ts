/* 형태 변환 함수 관리 파일 */

import type { TDayDivision, TNTTime } from "@/type"

/** TNTTime 를 timestamp 로 변환 */
export const transToTimestamp = (from: TNTTime): number => {
	const { year, month, day, hour, minute, division } = from
	let convertedHour = hour
	if (division === "PM" && hour < 12) convertedHour += 12
	else if (division === "AM" && hour === 12) convertedHour = 0
	const date = new Date(year, month - 1, day, convertedHour, minute)
	return date.getTime()
}
/** timestamp 를 TNTTime 로 변환 */
export const transToNTTime = (from: number): TNTTime => {
	const date = new Date(from)
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const minute = date.getMinutes()

	const hourIn24System = date.getHours()
	const hour = transHourTo12System(hourIn24System)
	const division = getDayDivision(hourIn24System)

	return {
		year,
		month,
		day,
		hour,
		minute,
		division,
	}
}
/** 24시간제 -> 12시간제 "시간" 으로 변환 */
const transHourTo12System = (hourIn24System: number): number => {
	if (hourIn24System == 12) return 12
	if (hourIn24System > 12) return hourIn24System - 12
	return hourIn24System
}
/** 현재 시간을 통해, "AM" 혹은 "PM" 반환  */
const getDayDivision = (hourIn24System: number): TDayDivision => {
	if (hourIn24System >= 12) return "PM"
	return "AM"
}

export const convertStringToInteger = (input: string | number): number => {
	if (typeof input === "number") return input
	if (!isNaN(Number(input))) return parseInt(input)
	throw Error("number type 으로 변환할 수 없습니다.")
}
