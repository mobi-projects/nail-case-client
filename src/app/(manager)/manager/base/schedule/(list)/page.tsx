import type { TResGetListReservation } from "@/type"
import { getListReservation } from "@/util/api/reservation-controller"
import {
	decomposeStamp,
	getBeforeOrAfterN,
	getNowStamp,
	getThisDayFirst,
	getThisDayLast,
} from "@/util/common"

export default async function ScheduleList() {
	return <h1>일정 목록</h1>
}

export const serverFetchReservationList = async (shopId: number) => {
	let isError = false
	const pendingList: TResGetListReservation[] = []
	const confirmedList: TResGetListReservation[] = []
	const canceledList: TResGetListReservation[] = []
	const completedList: TResGetListReservation[] = []

	const todayFirst = getTodayFirst()
	const todayLast = getTodayLast()
	const before30DaysAgoFromToday = getBeforeOrAfterN(todayLast, 30, "before")
	const after30DaysAgoFromToday = getBeforeOrAfterN(todayFirst, 30, "after")

	try {
		const response = await Promise.all([
			getListReservation(
				shopId,
				todayFirst,
				after30DaysAgoFromToday,
				"PENDING",
			),
			getListReservation(
				shopId,
				todayFirst,
				after30DaysAgoFromToday,
				"CONFIRMED",
			),
			getListReservation(
				shopId,
				before30DaysAgoFromToday,
				todayLast,
				"CANCELED",
			),
			getListReservation(
				shopId,
				before30DaysAgoFromToday,
				todayLast,
				"COMPLETED",
			),
		])
		pendingList.push(...response[0].dataList)
		confirmedList.push(...response[1].dataList)
		canceledList.push(...response[2].dataList)
		completedList.push(...response[3].dataList)
	} catch {
		isError = true
	}
	return { isError, pendingList, confirmedList, canceledList, completedList }
}
/** 조회일 기준, 00시 00분 반환 */
const getTodayFirst = () => {
	const nowStamp = getNowStamp()
	const { year, month, date } = decomposeStamp(nowStamp)
	const todayFirstStamp = getThisDayFirst(year, month, date)
	return todayFirstStamp
}
/** 조회일 기준, 23시 59분 59초 반환  */
const getTodayLast = () => {
	const nowStamp = getNowStamp()
	const { year, month, date } = decomposeStamp(nowStamp)
	const todayLastStamp = getThisDayLast(year, month, date)
	return todayLastStamp
}
