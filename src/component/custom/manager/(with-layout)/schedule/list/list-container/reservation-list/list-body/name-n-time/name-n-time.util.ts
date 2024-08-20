import { decomposeStamp, padStartToPrinting } from "@/util/common"

export const getPrintedNickname = (nickname: string) => {
	const shortenedNickname = addEllipsesToText(nickname, 5)
	return [shortenedNickname, "님"].join(" ")
}
export const getFormattedTime = (timestamp: number) => {
	const { year, month, date, hour, min } = decomposeStamp(timestamp)
	const [
		formattedYear,
		formattedMonth,
		formattedDate,
		formattedHour,
		formattedMin,
	] = [
		year.toString().substring(2, 4),
		padStartToPrinting("month", month),
		padStartToPrinting("date", date),
		padStartToPrinting("time", hour),
		padStartToPrinting("time", min),
	]
	const yymmdd = [formattedYear, formattedMonth, formattedDate].join(".")
	const hhmm = [formattedHour, formattedMin].join(":")
	return [yymmdd, hhmm].join(" ")
}

const addEllipsesToText = (text: string, length: number) => {
	if (text.length > length) text = text.substring(0, length) + ".."
	return text
}
