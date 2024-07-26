// utils.ts
export type TReseGetWortHours = {
	workHourId: number
	dayOfWeek: number
	isOpen: boolean
	openTime: number
	closeTime: number
}

export const WorkDay = (workDataList: TReseGetWortHours[]): string[] => {
	const days = ["월", "화", "수", "목", "금", "토", "일"]
	const openDays = workDataList.filter((data) => data.isOpen)

	const groupedByHours = openDays.reduce<{
		[key: string]: TReseGetWortHours[]
	}>((acc, data) => {
		const key = `${data.openTime}-${data.closeTime}`
		if (!acc[key]) {
			acc[key] = []
		}
		acc[key].push(data)
		return acc
	}, {})

	return Object.values(groupedByHours).map((group) => {
		group.sort((a, b) => a.dayOfWeek - b.dayOfWeek)

		const ranges = []
		let start = group[0].dayOfWeek
		let end = group[0].dayOfWeek

		for (let i = 1; i < group.length; i++) {
			if (group[i].dayOfWeek === end + 1) {
				end = group[i].dayOfWeek
			} else {
				ranges.push(
					start === end ? `${days[start]} ` : `${days[start]}-${days[end]}`,
				)
				start = group[i].dayOfWeek
				end = group[i].dayOfWeek
			}
		}
		ranges.push(
			start === end ? `${days[start]} :` : `${days[start]}-${days[end]} :`,
		)

		const openTime = new Date(group[0].openTime * 1000).toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		})
		const closeTime = new Date(group[0].closeTime * 1000).toLocaleTimeString(
			[],
			{
				hour: "2-digit",
				minute: "2-digit",
			},
		)

		return `${ranges.join(", ")}\n${openTime} ~${closeTime}`
	})
}

export const WorkWeek = (workDataList: TReseGetWortHours[]): string => {
	const days = ["월", "화", "수", "목", "금", "토", "일"]
	const openDays = workDataList.filter((data) => data.isOpen)
	return openDays.map((data) => days[data.dayOfWeek]).join(" ")
}
