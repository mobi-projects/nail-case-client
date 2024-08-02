import type { TWorkHours } from "@/util/api_v2/get-shop-Info"
import {
	get12HourFromStamp,
	getDayDivisionInKor,
	getMinFromStamp,
} from "@/util/common"

export const groupedByHourList = (
	workDataList: TWorkHours[],
): { [key: string]: TWorkHours[] } =>
	workDataList.reduce<{
		[key: string]: TWorkHours[]
	}>((acc, data) => {
		const key = `${data.openTime}-${data.closeTime}`
		if (!acc[key]) {
			acc[key] = []
		}
		acc[key].push(data)
		return acc
	}, {})
export const separateHourList = (workDataList: TWorkHours[]) => {
	const groupedData = groupedByHourList(workDataList)
	const singleList: { [key: string]: TWorkHours }[] = []
	const multipleList: { [key: string]: TWorkHours[] }[] = []

	Object.keys(groupedData).forEach((key) => {
		const group = groupedData[key]
		if (group.length === 1) {
			singleList.push({ [key]: group[0] })
		} else {
			multipleList.push({ [key]: group })
		}
	})
	return { singleList, multipleList }
}
const workingTimeForm = (timestamp: number) => {
	const hour = get12HourFromStamp(timestamp)
	const minute = getMinFromStamp(timestamp).toString().padStart(2, "0")
	const dayDivision = getDayDivisionInKor(timestamp)
	return `${dayDivision} ${hour}:${minute}`
}
export const MultipleHourList = (
	list: { [key: string]: TWorkHours[] }[],
): { day: string; time: string }[] => {
	const days = ["일", "월", "화", "수", "목", "금", "토"]
	const result: { day: string; time: string }[] = []
	list.forEach((data) => {
		const key = Object.keys(data)[0]
		const value = data[key]
		const orderWeek = value.map((data) => data.dayOfWeek).sort((a, b) => a - b)
		const start = orderWeek[0]
		let end = orderWeek[0]
		let isOtherDay = false

		for (let i = 1; i < orderWeek.length; i++) {
			if (orderWeek[i] === end + 1) {
				end = orderWeek[i]
			} else {
				isOtherDay = true
				break
			}
		}

		if (!isOtherDay) {
			result.push({
				day: `${days[start]} - ${days[end]}`,
				time: `${workingTimeForm(value[0].openTime)} ~ ${workingTimeForm(value[0].closeTime)}`,
			})
		} else {
			const ranges = orderWeek.map((index) => days[index]).join(", ")
			result.push({
				day: ranges,
				time: `${workingTimeForm(value[0].openTime)} ~ ${workingTimeForm(value[0].closeTime)}`,
			})
		}
	})
	return result
}
export const SingleHourList = (
	list: { [key: string]: TWorkHours }[],
): { day: string; time: string }[] => {
	const days = ["일", "월", "화", "수", "목", "금", "토"]
	const result: { day: string; time: string }[] = []
	list.forEach((data) => {
		const key = Object.keys(data)[0]
		const value = data[key]
		result.push({
			day: days[value.dayOfWeek],
			time: `${workingTimeForm(value.openTime)} ~ ${workingTimeForm(value.closeTime)}`,
		})
	})
	return result
}
