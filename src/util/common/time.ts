/* 시간관련 함수 관리 */

import dayjs from "dayjs"

import { isDate } from "./type-guard"

/** KST 기준, "현재 시각" 을 타임스탬프 로 반환 */
export const getNowStamp = (): number => getKoreanStamp(Date.now())
/** KST 기준, 이번 "연도" 반환 */
export const getThisYear = () => getYearFromStamp(getNowStamp())
/** KST 기준, 이번 "달" 반환 */
export const getThisMonth = () => getMonthFromStamp(getNowStamp())
/** KST 기준, 이번 "날" 반환 */
export const getThisDate = () => getDateFromStamp(getNowStamp())

/** 입력받은 "연도", "월" 기준, 이번 달 1일 반환 (timestamp) */
export const getThisMonthFirstDate = (year: number, month: number) =>
	getKoreanStamp(new Date(year, month - 1))
/** 입력받은 "연도", "월" 기준, 이번 달 마지막 날 반환 (timestamp) */
export const getThisMonthLastDate = (year: number, month: number) =>
	getKoreanStamp(new Date(year, month, 0))
/** 입력받은 "연도", "월" 기준, 지난 달 마지막 날 반환 (timestamp) */
export const getPrevMonthLastDate = (year: number, month: number) =>
	getKoreanStamp(new Date(year, month - 1, 0))
/** 입력받은 "연도", "월" 기준, 다음 달 첫번째 날짜 (1일) 반환 (timestamp) */
export const getNextMonthFirstDate = (year: number, month: number) =>
	getKoreanStamp(new Date(year, month, 1))

/** 입력(타입스탬프)으로부터 "연도" 반환 */
export const getYearFromStamp = (timestamp: number): number => {
	const ktcStamp = getKoreanStamp(timestamp)
	return new Date(ktcStamp).getFullYear()
}
/** 입력(타입스탬프)으로부터 "월" 반환 */
export const getMonthFromStamp = (timestamp: number): number => {
	const ktcStamp = getKoreanStamp(timestamp)
	return new Date(ktcStamp).getMonth() + 1
}
/** 입력(타입스탬프)으로부터 "일" 반환 */
export const getDateFromStamp = (timestamp: number): number => {
	const ktcStamp = getKoreanStamp(timestamp)
	return new Date(ktcStamp).getDate()
}
/** 입력(타입스탬프)으로부터 "요일" 반환 */
export const getDayOfWeekFromStamp = (timestamp: number) => {
	const dayOfWeekArr = ["일", "월", "화", "수", "목", "금", "토"]
	const ktcStamp = getKoreanStamp(timestamp)
	const date = new Date(ktcStamp)
	return dayOfWeekArr[date.getDay()]
}

/** 입력된 "년", "월" 에 대해, 달력에 출력될 날짜(timestamp) 배열을 반환  */
export const getCalendarArr = (year: number, month: number): number[] => {
	const firstDayOfMonth = dayjs(getThisMonthFirstDate(year, month))
	const firstDayOfWeek = firstDayOfMonth.startOf("week")
	const lastDayOfMonth = dayjs(getThisMonthLastDate(year, month))
	const lastDayOfWeek = lastDayOfMonth.endOf("week")

	const dates: number[] = []
	let currentDate = firstDayOfWeek

	while (
		currentDate.isSame(lastDayOfWeek, "day") ||
		currentDate.isBefore(lastDayOfWeek, "day")
	) {
		dates.push(currentDate.valueOf())
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
 * @param {number} targetDateStamp 대상일 (timestamp)
 * @param {number} standardDateStamp 기준일 (timestamp)
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
	const [target, standard] = [dayjs(targetDateStamp), dayjs(standardDateStamp)]
	return target.isBefore(standard, type)
}
/**
 * @param {number} targetDateStamp 대상일 (timestamp)
 * @param {number} standardDateStamp 기준일 (timestamp)
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
	const [target, standard] = [dayjs(targetDateStamp), dayjs(standardDateStamp)]
	return target.isSame(standard, type)
}
/**
 * @param {number} targetDateStamp 대상일 (timestamp)
 * @param {number} standardDateStamp 기준일 (timestamp)
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
	const [target, standard] = [dayjs(targetDateStamp), dayjs(standardDateStamp)]
	return target.isAfter(standard, type)
}

/** 주어진 날짜의 UTC 타임스탬프 반환 */
const getUTC = (date: Date): number => {
	return date.getTime() + date.getTimezoneOffset() * 60 * 1000
}
/** 입력된 시각 데이터(타임스탬프 혹은 Date 객체)에 대해 KST 기준, 타입스탬프 반환 */
const getKoreanStamp = (dateData: number | Date): number => {
	let utcStamp = 0
	if (isDate(dateData)) utcStamp = getUTC(dateData)
	else utcStamp = getUTC(new Date(dateData))
	const kstStamp = utcStamp + 9 * 60 * 60 * 1000
	return kstStamp
}
