import {
	getDateFromStamp,
	getHourFromStamp,
	getMinFromStamp,
	getNowStamp,
	padStartToPrinting,
} from "@/util/common"

export const generate30MinIntervalsArr = (start: number, end: number) => {
	if (end <= start) {
		console.error("Invalid range: end must be greater than start.")
		return []
	}
	const Arr: Array<number> = []
	let curTime = start

	while (curTime < end) {
		Arr.push(curTime)
		curTime += 1800 // 30분을 초 단위로 더함
	}
	return Arr
}

export const getPMStartIdx = (arr: Array<string>) => {
	let idx = -1
	if (arr.length === 0) {
		idx = 0
	} else idx = arr.length
	return idx
}

export const getPMSelectedIdx = (curIdx: number, arr: Array<string>) => {
	const pmStartIdx = getPMStartIdx(arr)
	return curIdx < arr.length ? -1 : curIdx - pmStartIdx
}

export const generateFromattedTimeOptionArr = (timeStampArr: Array<number>) =>
	timeStampArr.map((time) => {
		const hour = getHourFromStamp(time)
		const min = getMinFromStamp(time)
		const formattedHour = padStartToPrinting("time", hour)
		const formattedMin = padStartToPrinting("time", min)
		return `${formattedHour} : ${formattedMin}`
	})

export const getDisabledIdxArr = (
	selectedDate: number,
	timeRangeArr: Array<number>,
) => {
	const nowStamp = getNowStamp()
	const date = getDateFromStamp(selectedDate)
	const today = getDateFromStamp(nowStamp)
	if (date !== today) return [-1]
	return timeRangeArr
		.map((time, idx) => (time < nowStamp ? idx : -1))
		.filter((idx) => idx !== -1)
}
