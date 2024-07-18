import { getListReservation } from "@/util/api/reservation-controller"
import { getBeforeOrAfterN, getTodayFirst, getTodayLast } from "@/util/common"

export const managerQuery = {
	all: null,
	scheduleList: (shopId: number) => ({
		queryKey: ["manager-schedule-list", shopId],
		queryFn: async () => {
			const todayFirst = getTodayFirst()
			const after30DaysFirst = getBeforeOrAfterN(todayFirst, 30, "after", "day")
			const todayLast = getTodayLast()
			const after30DaysLast = getBeforeOrAfterN(todayLast, 30, "before", "day")
			return await Promise.all([
				getListReservation(shopId, todayFirst, after30DaysFirst, "PENDING"),
				getListReservation(shopId, todayFirst, after30DaysFirst, "CONFIRMED"),
				getListReservation(shopId, after30DaysLast, todayLast, "COMPLETED"),
				getListReservation(shopId, after30DaysLast, todayLast, "REJECTED"),
			])
		},
	}),
}
