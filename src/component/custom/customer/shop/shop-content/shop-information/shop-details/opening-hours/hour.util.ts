import type { TWorkHours } from "@/util/api-v2/get-shop-info"
import { getHourFromStamp, getMinFromStamp } from "@/util/common"

export const bulidWorkingTimeFormList = (data: TWorkHours) => {
	const day = ["일", "월", "화", "수", "목", "금", "토"]
	const unixDay = day[data.dayOfWeek]
	const openTime = data.openTime
	const closeTime = data.closeTime

	return { unixDay, openTime, closeTime }
}

export const separateHourMin = (time: number) => {
	const hour = getHourFromStamp(time)
	const minute = getMinFromStamp(time)
	return { hour, minute }
}
