import type { TReseGetWortHours } from "@/type/shop"

import { formTime } from "./time"

export const groupedByHourList = (
	workDataList: TReseGetWortHours[],
): { [key: string]: TReseGetWortHours[] } =>
	workDataList.reduce<{
		[key: string]: TReseGetWortHours[]
	}>((acc, data) => {
		const key = `${data.openTime}-${data.closeTime}`
		if (!acc[key]) {
			acc[key] = []
		}
		acc[key].push(data)
		return acc
	}, {})
export const separateHourList = (workDataList: TReseGetWortHours[]) => {
	const groupedData = groupedByHourList(workDataList)
	const singleList: { [key: string]: TReseGetWortHours }[] = []
	const multipleList: { [key: string]: TReseGetWortHours[] }[] = []

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
export const MultipleHourList = (
	list: { [key: string]: TReseGetWortHours[] }[],
): string[] => {
	const days = ["일", "월", "화", "수", "목", "금", "토"]
	const result: string[] = []
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
			result.push(
				`${days[start]}-${days[end]}  ${formTime(value[0].openTime)} ~ ${formTime(value[0].closeTime)}`,
			)
		} else {
			const ranges = orderWeek.map((index) => days[index]).join(", ")
			result.push(
				`${ranges}  ${formTime(value[0].openTime)} ~ ${formTime(value[0].closeTime)}`,
			)
		}
	})
	return result
}
export const SingleHourList = (
	list: { [key: string]: TReseGetWortHours }[],
): string[] => {
	const days = ["일", "월", "화", "수", "목", "금", "토"]
	const result: string[] = []
	list.forEach((data) => {
		const key = Object.keys(data)[0]
		const value = data[key]
		result.push(
			`${days[value.dayOfWeek]}  ${formTime(value.openTime)} ~ ${formTime(value.closeTime)}`,
		)
	})
	return result
}
