/* 시간관련 함수 관리 */

import type { Dayjs, UnitTypeLong } from "dayjs"
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
/** KST 기준, 현재 호출 "연도" 를 타임스탬프 로 반환 */
export const getThisYear = () => getYearFromStamp(getNowStamp())
/** KST 기준, 현재 호출 "달" 를 타임스탬프 로 반환 */
export const getThisMonth = () => getMonthFromStamp(getNowStamp())
/** KST 기준, 현재 호출 "날" 를 타임스탬프 로 반환 */
export const getThisDate = () => getDateFromStamp(getNowStamp())
/** KST 기준, 현재 호출 "요일" 를 타임스탬프 로 반환 */
export const getThisDayOfWeek = () => getDayOfWeekFromStamp(getNowStamp())
/** KST 기준, 현재 호출 "시간" 를 타임스탬프 로 반환 */
export const getThisTime = () => getHourFromStamp(getNowStamp())
/** KST 기준, 현재 호출 "분" 를 타임스탬프 로 반환 */
export const getThisMin = () => getMinFromStamp(getNowStamp())
/** KST 기준, 현재 호출 "분" 를 타임스탬프 로 반환 */
export const getThisSec = () => getSecFromStamp(getNowStamp())

/** 입력받은 "연도", "월", "일" 기준, 당일 00시 00분 00초 반환 (timestamp) */
export const getThisDayFirst = (year: number, month: number, date: number) =>
	getKSTStamp(year, month, date)
/** 입력받은 "연도", "월", "일" 기준, 당일 23시 59분 59초 반환 (timestamp) */
export const getThisDayLast = (year: number, month: number, date: number) =>
	getKSTStamp(year, month, date, 23, 59, 59)

/** 입력받은 "연도", "월", "일" 기준, 당 주 첫째 날 00시 00분 00초 반환 (timestamp) */
export const getThisWeekFirst = (year: number, month: number, date: number) => {
	const weekFirst = dayjs
		.unix(getKSTStamp(year, month, date))
		.startOf("week")
		.locale("ko")
	return weekFirst.unix()
}
/** 입력받은 "연도", "월", "일" 기준, 당 주 마지막 날 23시 59분 59초 반환 (timestamp) */
export const getThisWeekLast = (year: number, month: number, date: number) => {
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

/** 입력(타임스탬프)을 "년","월","일","시간","분","초" 로 분해하여 반환 */
export const decomposeStamp = (timestamp: number) => {
	timestamp = convertSecondTimestamp(timestamp)
	const year = getYearFromStamp(timestamp)
	const month = getMonthFromStamp(timestamp)
	const date = getDateFromStamp(timestamp)
	const hour = getHourFromStamp(timestamp)
	const min = getMonthFromStamp(timestamp)
	const sec = getSecFromStamp(timestamp)
	return { year, month, date, hour, min, sec }
}
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
/** 입력(타입스탬프)으로부터 "시간" 반환 */
export const getHourFromStamp = (timestamp: number) => {
	timestamp = convertSecondTimestamp(timestamp)
	const ktcStamp = getKSTStampByStamp(timestamp)
	return new Date(ktcStamp * 1000).getHours()
}
/** 입력(타임스탬프)으로부터 "12시간제 시간" 반환 */
export const get12HourFromStamp = (timestamp: number) => {
	const hour = getHourFromStamp(timestamp)
	return hour === 12 ? 12 : hour % 12
}
/** 입력(타입스탬프)으로부터 "분" 반환 */
export const getMinFromStamp = (timestamp: number) => {
	timestamp = convertSecondTimestamp(timestamp)
	const ktcStamp = getKSTStampByStamp(timestamp)
	return new Date(ktcStamp * 1000).getMinutes()
}
/** 입력(타입스탬프)으로부터 "초" 반환 */
export const getSecFromStamp = (timestamp: number) => {
	timestamp = convertSecondTimestamp(timestamp)
	const ktcStamp = getKSTStampByStamp(timestamp)
	return new Date(ktcStamp * 1000).getSeconds()
}
/** "오전", "오후" 반환 */
export const getDayDivisionInKor = (timestamp: number) => {
	const hour = getHourFromStamp(timestamp)
	return hour < 12 ? "오전" : "오후"
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
	type: "year" | "month" | "date" | "time",
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

/**
 * 주어진 연도와 월을 기준으로 해당 월의 몇 번째 주차인지 계산합니다.
 * @param year - 연도
 * @param month - 월 (1부터 12까지의 값)
 * @param day - 날짜 (기본값은 1일로 설정)
 * @returns
 * - 해당요일이 `월`의 몇주차인지 반환
 * - 해당일이 1~7일인 경우 해당주차에 포함된 일수가 4일 미만이라면 0 반환
 * - 해당일이 월의 마지막주차라면 해당주차에 포함된 일수가 4일미만이라면 -1 반환
 */
export const getWeekNumber = (
	year: number,
	month: number,
	day: number = 1,
): number => {
	// year, month ,day를 기반으로 currentDate객체 생성
	const currentDate = dayjs()
		.year(year)
		.month(month - 1)
		.date(day)
	// 달의 첫번째 요일을 파악 일~토 => 0~6 으로 매칭됨
	const firstDayOfMonth = currentDate.startOf("month").day()
	// 현재 `월`의 요일 수
	const daysInMonth = currentDate.daysInMonth()

	// 첫 번째 주의 남은 일수 계산
	const firstWeekDays = 7 - firstDayOfMonth

	// 첫 주차가 4일 미만일 경우 주차로 인식하지 않음
	let weekNumber = 1
	if (firstWeekDays < 4) {
		weekNumber = 0
	}

	// 현재 날짜가 첫 주차에 해당할 경우
	if (day <= firstWeekDays) {
		if (weekNumber === 0) {
			return 0
		}
		return weekNumber
	}

	// 첫 주차 이후의 주차 계산
	const remainingDays = daysInMonth - firstWeekDays
	weekNumber += Math.floor((day - firstWeekDays - 1) / 7) + 1

	// 마지막 주차의 일수가 4일 미만일 경우 -1 반환
	const lastWeekDays = remainingDays % 7
	if (
		lastWeekDays > 0 &&
		lastWeekDays < 4 &&
		day > daysInMonth - lastWeekDays
	) {
		if (day > daysInMonth - lastWeekDays) {
			return -1
		}
	}

	return weekNumber
}

/** 시간 무효화, ["년","월","일"] 유지 & ["시간","분","초"] 는 0 으로 초기화 */
export const invalidateTime = (timestamp: number) =>
	getKSTStamp(
		getYearFromStamp(timestamp),
		getMonthFromStamp(timestamp),
		getDateFromStamp(timestamp),
	)

/**
 * @param {number} timestamp 기준시각
 * @param {number} n 가감될 시간
 * @param {"after" | "before"} division 전/후 구분
 * @param {"second" | "minute" | "hour" | "day" | "month" | "year"} timeUnit 시간 단위
 *
 * @description
 * - 입력된 시각을 기준으로 n ["년","월","일","시간","분","초"] 전/후 시각을 timestamp 반환
 * - before 일 경우, n {시간 단위} 이전 시각 반환
 * - after 일 경우, n {시간 단위} 이후 시각 반환
 */
/** 입력된 시각을 기준으로 n ["년","월","일","시간","분","초"] 전/후 시각을 timestamp 반환 */
export const getBeforeOrAfterN = (
	timestamp: number,
	n: number,
	division: "after" | "before",
	timeUnit: Exclude<UnitTypeLong, "millisecond" | "date"> = "day",
) => {
	timestamp = convertSecondTimestamp(timestamp)
	let result: Dayjs
	if (division === "before")
		result = dayjs.unix(timestamp).subtract(n, timeUnit)
	else result = dayjs.unix(timestamp).add(n, timeUnit)
	return result.unix()
}
