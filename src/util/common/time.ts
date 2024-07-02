/* 시간관련 함수 관리 */

import dayjs from "dayjs"

/** 입력된 타임스탬프 가 millisecond 단위인지 확인 */
export const isMillisecondTimestamp = (timestamp: number): boolean =>
	timestamp > 1e10

/** 입력된 타임스탬프 를 second 단위로 변환 */
export const convertSecondTimestamp = (timestamp: number) => {
	if (isMillisecondTimestamp(timestamp)) return Math.floor(timestamp / 1000)
	return timestamp
}

/** 입력된 "연도","월","일","시간","분","초" 를 기준으로 (KST 기준) 타임스탬프 반환 */
export const getKSTStamp = (
	year: number = 0,
	month: number = 1,
	date: number = 1,
	hour: number = 0,
	min: number = 0,
	sec: number = 0,
) => getKSTStampByDate(new Date(year, month - 1, date, hour, min, sec))

/** 입력된 Date 객체에 대해 KST 기준, 타입스탬프 반환 */
export const getKSTStampByDate = (dateData: Date): number => {
	const utcStamp = getUTC(dateData)
	const kstStamp = utcStamp + 9 * 60 * 60
	return kstStamp
}
/** 입력된 타임스탬프에 대해 KST 기준, 타입스탬프 반환 */
export const getKSTStampByStamp = (timestamp: number) => {
	timestamp = convertSecondTimestamp(timestamp)
	const utcStamp = getUTC(new Date(timestamp * 1000))
	const kstStamp = utcStamp + 9 * 60 * 60
	return kstStamp
}

/** KST 기준, "현재 시각" 을 타임스탬프 로 반환 */
export const getNowStamp = (): number => getKSTStampByStamp(Date.now())
/** KST 기준, 이번 "연도" 반환 */
export const getThisYear = () => getYearFromStamp(getNowStamp())
/** KST 기준, 이번 "달" 반환 */
export const getThisMonth = () => getMonthFromStamp(getNowStamp())
/** KST 기준, 이번 "날" 반환 */
export const getThisDate = () => getDateFromStamp(getNowStamp())

/** 입력받은 "연도", "월", "일" 기준, 당일 00시 00분 00초 반환 (timestamp) */
export const getTodayFirst = (year: number, month: number, date: number) =>
	getKSTStamp(year, month, date)
/** 입력받은 "연도", "월", "일" 기준, 당일 23시 59분 59초 반환 (timestamp) */
export const getTodayLast = (year: number, month: number, date: number) =>
	getKSTStamp(year, month, date, 23, 59, 59)

/** 입력받은 "연도", "월", "일" 기준, 당 주 첫째 날 00시 00분 00초 반환 (timestamp) */
export const getWeekFirst = (year: number, month: number, date: number) => {
	const weekFirst = dayjs
		.unix(getKSTStamp(year, month, date))
		.startOf("week")
		.locale("ko")
	return weekFirst.unix()
}
/** 입력받은 "연도", "월", "일" 기준, 당 주 마지막 날 23시 59분 59초 반환 (timestamp) */
export const getWeekLast = (year: number, month: number, date: number) => {
	const weekLast = dayjs
		.unix(getKSTStamp(year, month, date))
		.endOf("week")
		.locale("ko")
	return weekLast.unix()
}

/** 입력받은 "연도", "월" 기준, 당 월 1일 00시 00분 00초 반환 (timestamp) */
export const getThisMonthFirstDate = (year: number, month: number) =>
	getKSTStamp(year, month, 1)
/** 입력받은 "연도", "월" 기준, 당 월 마지막 날 23시 59분 59초 반환 (timestamp) */
export const getThisMonthLastDate = (year: number, month: number) =>
	getKSTStamp(year, month + 1, 0, 23, 59, 59)
/** 입력받은 "연도", "월" 기준, 지난 달 마지막 날 23시 59분 59초 반환 (timestamp) */
export const getPrevMonthLastDate = (year: number, month: number) =>
	getKSTStamp(year, month, 0, 23, 59, 59)
/** 입력받은 "연도", "월" 기준, 다음 달 1일 00시 00분 00초 반환 (timestamp) */
export const getNextMonthFirstDate = (year: number, month: number) =>
	getKSTStamp(year, month + 1, 1)

/** 입력(타입스탬프)으로부터 "연도" 반환 */
export const getYearFromStamp = (timestamp: number): number => {
	timestamp = convertSecondTimestamp(timestamp)
	const ktcStamp = getKSTStampByStamp(timestamp)
	return new Date(ktcStamp * 1000).getFullYear()
}
/** 입력(타입스탬프)으로부터 "월" 반환 */
export const getMonthFromStamp = (timestamp: number): number => {
	timestamp = convertSecondTimestamp(timestamp)
	const ktcStamp = getKSTStampByStamp(timestamp)
	return new Date(ktcStamp * 1000).getMonth() + 1
}
/** 입력(타입스탬프)으로부터 "일" 반환 */
export const getDateFromStamp = (timestamp: number): number => {
	timestamp = convertSecondTimestamp(timestamp)
	const ktcStamp = getKSTStampByStamp(timestamp)
	return new Date(ktcStamp * 1000).getDate()
}
/** 입력(타입스탬프)으로부터 "요일" 반환 */
export const getDayOfWeekFromStamp = (timestamp: number) => {
	timestamp = convertSecondTimestamp(timestamp)
	const dayOfWeekArr = ["일", "월", "화", "수", "목", "금", "토"]
	const ktcStamp = getKSTStampByStamp(timestamp)
	const date = new Date(ktcStamp * 1000)
	return dayOfWeekArr[date.getDay()]
}

/** 입력된 "년", "월" 에 대해, 달력에 출력될 날짜(timestamp) 배열을 반환  */
export const getCalendarArr = (year: number, month: number): number[] => {
	const firstDayOfMonth = dayjs.unix(getThisMonthFirstDate(year, month))
	const firstDayOfWeek = firstDayOfMonth.startOf("week")
	const lastDayOfMonth = dayjs.unix(getThisMonthLastDate(year, month))
	const lastDayOfWeek = lastDayOfMonth.endOf("week")

	const dates: number[] = []
	let currentDate = firstDayOfWeek

	while (
		currentDate.isSame(lastDayOfWeek, "day") ||
		currentDate.isBefore(lastDayOfWeek, "day")
	) {
		dates.push(currentDate.unix())
		currentDate = currentDate.add(1, "day")
	}
	return dates
}

/** "년","월","일" 출력할 경우, 적절히 padding 하여 반환 */
export const padStartToPrinting = (
	type: "year" | "month" | "date",
	target: number,
) => {
	if (type === "year") return target.toString().padStart(4, "0")
	return target.toString().padStart(2, "0")
}
/**
 * @param {number} targetDateStamp 대상일 (유닉스 타임스탬프)
 * @param {number} standardDateStamp 기준일 (유닉스 타임스탬프)
 * @param {"year" | "month" | "date"} type 비교 기준
 *
 * @description
 * "대상일"이 "기준일"로부터 이전인지 판단
 */
export const isBefore = (
	targetDateStamp: number,
	standardDateStamp: number,
	type: "year" | "month" | "date" = "date",
) => {
	const [target, standard] = [
		dayjs.unix(convertSecondTimestamp(targetDateStamp)),
		dayjs.unix(convertSecondTimestamp(standardDateStamp)),
	]
	return target.isBefore(standard, type)
}
/**
 * @param {number} targetDateStamp 대상일 (유닉스 타임스탬프)
 * @param {number} standardDateStamp 기준일 (유닉스 타임스탬프)
 * @param {"year" | "month" | "date"} type 비교 기준
 *
 * @description
 * "대상일"이 "기준일" 과 같은지 판단
 */
export const isSame = (
	targetDateStamp: number,
	standardDateStamp: number,
	type: "year" | "month" | "date" = "date",
) => {
	const [target, standard] = [
		dayjs.unix(convertSecondTimestamp(targetDateStamp)),
		dayjs.unix(convertSecondTimestamp(standardDateStamp)),
	]
	return target.isSame(standard, type)
}
/**
 * @param {number} targetDateStamp 대상일 (유닉스 타임스탬프)
 * @param {number} standardDateStamp 기준일 (유닉스 타임스탬프)
 * @param {"year" | "month" | "date"} type 비교 기준
 *
 * @description
 * "대상일"이 "기준일" 이후인지 판단
 */
export const isAfter = (
	targetDateStamp: number,
	standardDateStamp: number,
	type: "year" | "month" | "date" = "date",
) => {
	const [target, standard] = [
		dayjs.unix(convertSecondTimestamp(targetDateStamp)),
		dayjs.unix(convertSecondTimestamp(standardDateStamp)),
	]
	return target.isAfter(standard, type)
}

/** 주어진 날짜의 UTC 타임스탬프(S) 반환 */
const getUTC = (date: Date): number =>
	Math.floor(date.getTime() / 1000) + date.getTimezoneOffset() * 60
