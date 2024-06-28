/* 시간관련 함수 관리 */

import dayjs from "dayjs"

import type { TNTTime } from "@/type"
import type { DayOfWeek } from "@/type/union-option/day-of-week"

import { transToNTTime, transToTimestamp } from "./transform"

/** 호출일 기준, "00:00 AM" ~ "11:59 PM" 시간을 반환 */
export const getAllDay = () => {
	const current = getCurrent()
	return {
		from: getDayFirst(current),
		to: getDayLast(current),
	}
}
/** 호출일 기준, 당 주의 첫째날 "00:00 AM" ~ 주의 마지막날 "11:59 PM" 시간을 반환 */
export const getAllWeek = () => {
	const current = getCurrent()
	return {
		from: getWeekFirst(current),
		to: getWeekLast(current),
	}
}
/** 호출일 기준, 당 월의 첫째날 "00:00 AM" ~ 월의 마지막날 "11:59 PM" 시간을 반환 */
export const getAllMonth = () => {
	const current = getCurrent()
	return {
		from: getMonthFirst(current),
		to: getMonthLast(current),
	}
}

/** 현재 시각을 TNTTime 으로 반환 */
export const getCurrent = (): TNTTime => {
	const currentStamp = Date.now()
	return transToNTTime(currentStamp)
}
/** 호출일 기준, "00:00 AM" 시각을 반환 */
export const getDayFirst = (when: TNTTime): TNTTime => ({
	...when,
	hour: 0,
	minute: 0,
	division: "AM",
})
/** 호출일 기준, "11:59 PM" 시각을 반환 */
export const getDayLast = (when: TNTTime): TNTTime => ({
	...when,
	hour: 11,
	minute: 59,
	division: "PM",
})
/** 호출일 기준, 당 주의 첫째 날 "00:00 AM" 시각을 반환 */
export const getWeekFirst = (when: TNTTime): TNTTime => {
	const whenStamp = transToTimestamp(when)
	const weekFirst = new Date(whenStamp)
	weekFirst.setDate(weekFirst.getDate() - weekFirst.getDay())
	const year = weekFirst.getFullYear()
	const month = weekFirst.getMonth()
	const day = weekFirst.getDate()
	return {
		year,
		month,
		day,
		hour: 0,
		minute: 0,
		division: "AM",
	}
}
/** 호출일 기준, 당 주의 마지막 날 "11:59 PM" 시각을 반환 */
export const getWeekLast = (when: TNTTime): TNTTime => {
	const whenStamp = transToTimestamp(when)
	const weekLast = new Date(whenStamp)
	weekLast.setDate(weekLast.getDate() + 6 - weekLast.getDay())
	const year = weekLast.getFullYear()
	const month = weekLast.getMonth()
	const day = weekLast.getDate()
	return {
		year,
		month,
		day,
		hour: 11,
		minute: 59,
		division: "PM",
	}
}
/** 호출일 기준, 당 월의 첫째 날 "00:00 AM" 시각을 반환 */
export const getMonthFirst = (when: TNTTime): TNTTime => ({
	...when,
	day: 1,
	hour: 0,
	minute: 0,
	division: "AM",
})
/** 호출일 기준, 당 월의 마지막 날 "11:59 PM" 시각을 반환 */
export const getMonthLast = (when: TNTTime): TNTTime => {
	const lastDay = getPrevMonthLastDate(when.year, when.month)
	return {
		...when,
		day: lastDay,
		hour: 11,
		minute: 59,
		division: "PM",
	}
}
/** 한국 기준, 이번 "연도" 반환 */
export const getThisYear = () => getYearFromStamp(getNowStamp())
/** 한국 기준, 이번 "달" 반환 */
export const getThisMonth = () => getMonthFromStamp(getNowStamp())
/** 한국 기준, 이번 "날" 반환 */
export const getThisDate = () => getDateFromStamp(getNowStamp())
/** 한국 기준, "현재 시각" 을 타임스탬프 로 반환 */
export const getNowStamp = (): number => {
	const now = new Date()
	const utc = getUTC(now)
	return getKoreanStamp(utc)
}
/** 지난 달, 마지막 날짜 반환*/
export const getPrevMonthLastDate = (year: number, month: number) =>
	new Date(year, month - 1, 0).getTime()
/** 다음 달, 첫번째 날짜 (1일) 반환*/
export const getNextMonthFirstDate = (year: number, month: number) =>
	new Date(year, month, 1).getTime()
/** 입력(타입스탬프)으로부터 "연도" 반환 */
export const getYearFromStamp = (timestamp: number): number => {
	const date = new Date(timestamp)
	return date.getFullYear()
}
/** 입력(타입스탬프)으로부터 "월" 반환 */
export const getMonthFromStamp = (timestamp: number): number => {
	const date = new Date(timestamp)
	return date.getMonth() + 1
}
/** 입력(타입스탬프)으로부터 "일" 반환 */
export const getDateFromStamp = (timestamp: number): number => {
	const date = new Date(timestamp)
	return date.getDate()
}
/** 입력(타입스탬프)으로부터 "요일" 반환 */
export const getDayOfWeekFromStamp = (timestamp: number): DayOfWeek => {
	const dayNames: DayOfWeek[] = ["일", "월", "화", "수", "목", "금", "토"]
	const date = new Date(timestamp)
	return dayNames[date.getDay()]
}
/** 입력된 년, 월에 달력에 출력될 날짜(timestamp) 배열을 반환  */
export const getCalendarArr = (year: number, month: number): number[] => {
	const firstDayOfMonth = dayjs(new Date(year, month - 1, 1))
	const firstDayOfWeek = firstDayOfMonth.startOf("week")
	const lastDayOfMonth = dayjs(new Date(year, month, 0))
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

/** UTC 기준 -> 한국 기준, 타입스탬프 반환 */
const getKoreanStamp = (timestamp: number): number => {
	const korTimeDiff = 9 * 60 * 60 * 1000
	return timestamp + korTimeDiff
}
/** 주어진 날짜의 UTC 타임스탬프 반환 */
const getUTC = (date: Date): number => {
	return date.getTime() + date.getTimezoneOffset() * 60 * 1000
}
