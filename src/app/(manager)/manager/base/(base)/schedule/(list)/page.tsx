import OnError from "@/component/custom/manager/base/schedule/list/error-fallback"
import ExpandableSection from "@/component/custom/manager/base/schedule/list/expandable-section"
import ReservationList from "@/component/custom/manager/base/schedule/list/reservation-list"
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
	//[todo] 추후 수정, shopId 동적 확보
	const { isError, pendingList, confirmedList, canceledList, completedList } =
		await serverFetchReservationList(1)

	const pendingCount = pendingList.length
	const confirmedCount = confirmedList.length
	const canceledCount = canceledList.length
	const completedCount = completedList.length

	return (
		<div className="flex flex-col gap-[20px]">
			<ExpandableSection title={`예약대기 (${pendingCount}건)`}>
				{isError ? (
					<OnError />
				) : (
					<ReservationList reservationList={pendingList} status="PENDING" />
				)}
			</ExpandableSection>

			<ExpandableSection title={`예약승인 (${confirmedCount}건)`}>
				{isError ? (
					<OnError />
				) : (
					<ReservationList reservationList={confirmedList} status="CONFIRMED" />
				)}
			</ExpandableSection>

			<ExpandableSection
				title={`최근 30일동안 완료한 시술 (${canceledCount}건)`}
			>
				{isError ? (
					<OnError />
				) : (
					<ReservationList reservationList={canceledList} status="COMPLETED" />
				)}
			</ExpandableSection>

			<ExpandableSection
				title={`최근 30일동안 취소한 예약 (${completedCount}건)`}
			>
				{isError ? (
					<OnError />
				) : (
					<ReservationList reservationList={completedList} status="CANCELED" />
				)}
			</ExpandableSection>
		</div>
	)
}

const serverFetchReservationList = async (shopId: number) => {
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
