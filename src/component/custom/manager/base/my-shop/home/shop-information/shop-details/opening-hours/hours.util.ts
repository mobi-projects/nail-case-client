import type { TWorkHours } from "@/util/api_v2/get-shop-Info"
import { getHourFromStamp, getMinFromStamp } from "@/util/common"

export const bulidWorkingTimeFormList = (data: TWorkHours) => {
	const day = ["일", "월", "화", "수", "목", "금", "토"]
	const unixDay = day[data.dayOfWeek]
	const openTime = data.opneTime
	const closeTime = data.closeTime

	return { unixDay, openTime, closeTime }
}

export const unixTimeForm = (time: number) => {
	const hour = getHourFromStamp(time)
	const minite = getMinFromStamp(time).toString().padStart(2, "0")
	return `${hour} : ${minite}`
}
