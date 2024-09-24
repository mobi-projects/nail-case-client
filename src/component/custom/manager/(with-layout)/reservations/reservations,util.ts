import {
	decomposeStamp,
	getKSTStamp,
	getNowStamp,
	invalidateTime,
} from "@/util/common"

import { STATUS_PAIR } from "./reservations.constant"
import type { TStatusExcludeCanceled } from "./reservations.type"

export const translateStatus = (status: TStatusExcludeCanceled) =>
	STATUS_PAIR[status]

export const createDateRange = () => {
	const startDate = invalidateTime(getNowStamp())
	const { year, month, date } = decomposeStamp(startDate)
	const endDate = getKSTStamp(year, month + 1, date)
	return { startDate, endDate }
}
